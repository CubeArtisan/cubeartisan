import mongoose from 'mongoose';

import connectionQ from '@cubeartisan/server/serverjs/mongoConnection.js';
import winston from '@cubeartisan/server/serverjs/winstonConfig.js';
import Deck from '@cubeartisan/server/models/deck.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import { getObjectCreatedAt, loadCardToInt, writeFile } from '@cubeartisan/jobs/exports/utils.js';

// Number of documents to process at a time
const batchSize = 1024;
// Minimum size in bytes of the output files (last file may be smaller).
const minFileSize = 128 * 1024 * 1024; // 128 MB

const processDeck = (deck, cardToInt) => {
  const main = [];
  const side = [];

  if (deck.seats[0] && deck.seats[0].deck) {
    for (const col of deck.seats[0].deck) {
      for (const cardIdx of col) {
        const card = deck.cards[cardIdx];
        if (card && card.cardID) {
          main.push(cardToInt[carddb.cardFromId(card.cardID).oracle_id]);
        }
      }
    }
  }

  if (deck.seats[0] && deck.seats[0].sideboard) {
    for (const col of deck.seats[0].sideboard) {
      for (const cardIdx of col) {
        const card = deck.cards[cardIdx];
        if (card && card.cardID) {
          side.push(cardToInt[carddb.cardFromId(card.cardID).oracle_id]);
        }
      }
    }
  }

  return {
    main,
    side,
    cubeid: deck.cube,
    draftid: deck.draft,
    username: deck.seats[0].username,
    date: deck.date,
    createdAt: getObjectCreatedAt(deck._id),
  };
};

try {
  // eslint-disable-next-line prettier/prettier
  await connectionQ();
  const { cardToInt } = await loadCardToInt();

  // process all deck objects
  const count = await Deck.countDocuments();
  winston.info(`Counted ${count} documents`);
  const cursor = Deck.find().lean().cursor();

  let counter = 0;
  let i = 0;
  while (i < count) {
    const decks = [];
    let size = 0;
    for (; size < minFileSize && i < count; ) {
      const processingDecks = [];
      const nextBound = Math.min(i + batchSize, count);
      for (; i < nextBound; i++) {
        // eslint-disable-next-line no-await-in-loop
        const deck = await cursor.next();
        if (deck) {
          processingDecks.push(processDeck(deck, cardToInt));
        }
      }
      size += Buffer.byteLength(JSON.stringify(processingDecks));
      decks.push(...processingDecks);
      winston.debug(`Finished: ${i} of ${count} decks and the buffer is approximately ${size / 1024 / 1024} MB.`);
    }
    if (decks.length > 0) {
      const filename = `decks/${counter.toString().padStart(6, '0')}.json`;
      writeFile(filename, decks);
      counter += 1;
      winston.info(`Wrote file ${filename} with ${decks.length} decks.`);
      decks.length = 0;
    }
  }
  await mongoose.disconnect();
  winston.info('Done exporting decks.');
  process.exit();
} catch (err) {
  winston.error('Failed to export decks.', err);
  process.exit();
}

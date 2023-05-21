import mongoose from 'mongoose';

import connectionQ from '@cubeartisan/server/serverjs/mongoConnection.js';
import winston from '@cubeartisan/server/serverjs/winstonConfig.js';
import ExternalDeck from '@cubeartisan/server/models/externalDeck.js';
import { getObjectCreatedAt, loadCardToInt, writeFile } from '@cubeartisan/jobs/exports/utils.js';

// Number of documents to process at a time
const batchSize = 256;
// Minimum size in bytes of the output files (last file may be smaller).
const minFileSize = 128 * 1024 * 1024; // 128 MB

const processDeck = (deck, cardToInt) => {
  const main = deck.main.map((id) => cardToInt[id]);
  const side = deck.side.map((id) => cardToInt[id]);
  const basics = deck.basics.map((id) => cardToInt[id]);

  return {
    main,
    side,
    basics,
    createdAt: getObjectCreatedAt(deck._id),
  };
};

try {
  // eslint-disable-next-line prettier/prettier
  await connectionQ();
  const { cardToInt } = await loadCardToInt();

  // process all deck objects
  const count = await ExternalDeck.countDocuments();
  winston.info(`Counted ${count} documents`);
  const cursor = ExternalDeck.find().lean().cursor();

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
      winston.debug(`Finished: ${i} of ${count} external decks and the buffer is approximately ${size / 1024 / 1024} MB.`);
    }
    if (decks.length > 0) {
      const filename = `external_decks/${counter.toString().padStart(6, '0')}.json`;
      writeFile(filename, decks);
      counter += 1;
      winston.info(`Wrote file ${filename} with ${decks.length} decks.`);
      decks.length = 0;
    }
  }
  await mongoose.disconnect();
  winston.info('Done exporting external decks.');
  process.exit();
} catch (err) {
  winston.error('Failed to export decks.', err);
  process.exit();
}

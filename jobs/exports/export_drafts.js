/* eslint-disable no-await-in-loop */
// run with: node --max-old-space-size=8192 download_drafts.js
// will oom without the added tag
// Load Environment Variables
import mongoose from 'mongoose';

import connectionQ from '@cubeartisan/server/serverjs/mongoConnection.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import Draft from '@cubeartisan/server/models/draft.js';
import winston from '@cubeartisan/server/serverjs/winstonConfig.js';
import { convertDrafterState, getDrafterState } from '@cubeartisan/client/drafting/draftutil.js';

import { getObjectCreatedAt, loadCardToInt, writeFile } from "@cubeartisan/jobs/exports/utils.js";

// Number of documents to process at a time
const batchSize = 256;
// Minimum size in bytes of the output files (last file may be smaller).
const minFileSize = 128 * 1024 * 1024; // 128 MB

let totalPicks = 0;

const processSeat = (seatNumber, draft, cardToInt) => {
  const picks = [];
  let drafterState;
  try {
    drafterState = getDrafterState({ draft, seatNumber, pickNumber: 0 });
  } catch (err) {
    winston.error('Failed to get initial drafterState.', err);
    return {};
  }
  let nextDrafterState;
  for (let pickNumber = 0; drafterState.packNum < drafterState.numPacks; pickNumber++) {
    winston.info('Getting next pick.');
    try {
      nextDrafterState = getDrafterState({ draft, seatNumber, pickNumber: pickNumber + 1 });
    } catch (err) {
      winston.error('Failed to get next drafter state.', err);
      return {
        picks,
        cubeid: draft.cube,
        username: draft.seats[0].username,
        date: draft.date,
        draftid: draft._id,
        createdAt: getObjectCreatedAt(draft._id),
      };
    }
    const pick = {
      ...convertDrafterState(drafterState),
      trashedIdx: nextDrafterState.trashedIdx,
      pickedIdx: nextDrafterState.pickedIdx,
    };
    const updateIndex = (cardIdx) => cardToInt[pick.cardOracleIds[cardIdx]]
    pick.picked = pick.picked.map(updateIndex);
    if (pick.picked.some((x) => (x ?? null) === null)) return [];
    pick.seen = pick.seen.map(updateIndex);
    if (pick.seen.some((x) => (x ?? null) === null)) return [];
    pick.cardsInPack = pick.cardsInPack.map(updateIndex);
    if (pick.cardsInPack.some((x) => (x ?? null) === null)) return [];
    pick.basics = pick.basics.map(updateIndex);
    if (pick.basics.some((x) => (x ?? null) === null)) return [];
    delete pick.cardOracleIds;
    delete pick.seed;
    picks.push(pick);
    totalPicks += 1;
    drafterState = nextDrafterState;
  }
  return {
    picks,
    cubeid: draft.cube,
    username: draft.seats[0].username,
    date: draft.date,
    draftid: draft._id,
    createdAt: getObjectCreatedAt(draft._id),
  };
};

const processDraft = (draft, cardToInt) => {
  for (const card of draft.cards) {
    card.details = carddb.cardFromId(card.cardID);
  }
  return draft.seats
    .map((x, idx) => [x, idx])
    .filter(([{ bot }]) => !bot)
    .map(([, idx]) => processSeat(idx, draft, cardToInt));
}

const isValidDraft = (draft) => draft?.cards?.length;

try {
  // eslint-disable-next-line prettier/prettier
  await connectionQ();
  const { cardToInt } = await loadCardToInt();
  const count = await Draft.countDocuments();
  winston.info(`Counted ${count} documents`);
  const cursor = Draft.find().lean().cursor();
  let counter = 0;
  let i = 0;
  while (i < count) {
    const processedDrafts = [];
    let size = 0;
    for (; size < minFileSize && i < count; ) {
      const processingDrafts = [];
      const nextBound = Math.min(i + batchSize, count);
      for (; i < nextBound; i++) {
        const draft = await cursor.next();
        if (isValidDraft(draft)) {
          processedDrafts.push(...processDraft(draft, cardToInt));
        }
      }
      size += Buffer.byteLength(JSON.stringify(processingDrafts));
      processedDrafts.push(...processingDrafts);
      winston.debug(
        `Finished: ${i} of ${count} drafts and the buffer is approximately ${(size / 1024 / 1024).toFixed(2)} MB.`,
      );
    }
    if (processedDrafts.length > 0) {
      const filename = `drafts/${counter.toString().padStart(6, '0')}.json`;
      writeFile(filename, processedDrafts);
      counter += 1;
      winston.info(`Wrote file ${filename} with ${processedDrafts.length} drafts * players.`);
    }
  }
  await mongoose.disconnect();
  winston.info(`Done exporting drafts. Exported ${totalPicks} total picks.`);
  process.exit();
} catch (err) {
  winston.error('Received an error when processing drafts.', err);
  process.exit();
}

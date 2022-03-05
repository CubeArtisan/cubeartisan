/* eslint-disable no-await-in-loop */
// run with: node --max-old-space-size=8192 download_drafts.js
// will oom without the added tag
// Load Environment Variables
import mongoose from 'mongoose';

import connectionQ from '@cubeartisan/server/serverjs/mongoConnection.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import Draft from '@cubeartisan/server/models/draft.js';
import winston from '@cubeartisan/server/serverjs/winstonConfig.js';
import { convertDrafterState, getAllDrafterStates } from "@cubeartisan/client/drafting/draftutil.js";
import { getObjectCreatedAt, loadCardToInt, writeFile } from "@cubeartisan/jobs/exports/utils.js";

// Number of documents to process at a time
const batchSize = 128;
// Minimum size in bytes of the output files (last file may be smaller).
const minFileSize = 128 * 1024 * 1024; // 128 MiB

let totalPicks = 0;

const processSeat = (seatNumber, draft, cardToInt) => {
  const picks = [];
  let drafterStates;
  try {
    drafterStates = getAllDrafterStates({ draft, seatNumber });
  } catch (err) {
    winston.error('Failed to get drafterStates.', err);
    return {};
  }
  if (drafterStates.length < 3) return {};
  for (let pickNumber = 1; pickNumber < drafterStates.length; pickNumber++) {
    const nextDrafterState = drafterStates[pickNumber];
    const {action} = nextDrafterState.step;
    if (action === 'pick' || action === 'trash') {
      const pick = convertDrafterState(drafterStates[pickNumber - 1]);
      // This will be the pack before we made our pick.
      if (action === 'pick' && nextDrafterState.pickedIdx >= 0) {
        pick.pickedIdx = nextDrafterState.pickedIdx;
      } else if (action === 'trash' && nextDrafterState.trashedIdx >= 0) {
        pick.trashedIdx = nextDrafterState.trashedIdx;
      } else {
        // eslint-disable-next-line no-continue
        continue;
      }
      const updateIndex = (cardIdx) => cardToInt[cardIdx]
      pick.picked = pick.picked.map(updateIndex);
      if (pick.picked.some((x) => (x ?? null) === null)) {
        winston.warn(`picked contained invalid indices ${JSON.stringify(pick.picked)}`);
        return [];
      }
      pick.cardsInPack = pick.cardsInPack.map(updateIndex);
      if (pick.cardsInPack.some((x) => (x ?? null) === null)) {
        winston.warn(`cardsInPack contained invalid indices ${JSON.stringify(pick.cardsInPack)}`);
        return [];
      }
      pick.seen = pick.seen.map(({ pack, ...rest}) => ({ pack: pack.map(updateIndex), ...rest }));
      if (pick.seen.some(({pack}) => pack && pack.some((x) => (x ?? null) === null))) {
        winston.warn(`seen contained invalid indices ${JSON.stringify(pick.seen)}`);
        return [];
      }
      pick.basics = pick.basics.map(updateIndex)
      picks.push(pick);
      totalPicks += 1;
    }
  }
  return {
    picks,
    cubeid: draft.cube,
    basics: draft.basics.map((cardIdx) => cardToInt[carddb.cardFromId(draft.cards[cardIdx].cardID).oracle_id]),
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
          processingDrafts.push(...processDraft(draft, cardToInt));
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

/* eslint-disable no-await-in-loop */
// run with: node --max-old-space-size=8192 download_drafts.js
// will oom without the added tag
// Load Environment Variables
import mongoose from 'mongoose';

import Draft from '@cubeartisan/server/models/draft.js';
import winston from '@cubeartisan/server/serverjs/winstonConfig.js';
import { convertDrafterState, getDrafterState } from '@cubeartisan/client/drafting/draftutil.js';

import { getObjectCreatedAt, writeFile } from '@cubeartisan/jobs/exports/utils.js';

// Number of documents to process at a time
const batchSize = 256;
// Minimum size in bytes of the output files (last file may be smaller).
const minFileSize = 128 * 1024 * 1024; // 128 MB

const processSeat = (seatNumber, draft) => {
  const picks = [];
  let drafterState = getDrafterState({ draft, seatNumber, pickNumber: 0 });
  for (let pickNumber = 0; drafterState.packNum < drafterState.numPacks; pickNumber++) {
    const nextDrafterState = getDrafterState({ draft, seatNumber });
    picks.push({
      ...convertDrafterState(drafterState),
      trashedIdx: nextDrafterState.trashedIdx,
      pickedIdx: nextDrafterState.pickedIdx,
    });
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

const processDraft = async (draft) => {
  return draft.seats
    .map((x, idx) => [x, idx])
    .filter(([{ bot }]) => !bot)
    .map(([, idx]) => processSeat(idx, draft));
};

const isValidDraft = (draft) => draft?.initial_state?.[0]?.[0]?.cards?.length;

try {
  (async () => {
    const count = await Draft.countDocuments();
    winston.log(`Counted ${count} documents`);
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
            processedDrafts.push(...processDraft(draft));
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
        winston.log(`Wrote file ${filename} with ${processedDrafts.length} drafts * players.`);
      }
    }
    await mongoose.disconnect();
    winston.log('done');
    process.exit();
  })();
} catch (err) {
  winston.error(err);
  process.exit();
}

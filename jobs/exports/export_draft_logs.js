/**
 * This file is part of CubeArtisan.
 *
 * CubeArtisan is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CubeArtisan is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with CubeArtisan.  If not, see <https://www.gnu.org/licenses/>.
 */
import mongoose from 'mongoose';

import connectionQ from '@cubeartisan/server/serverjs/mongoConnection.js';
import DraftLog from '@cubeartisan/server/models/draftLog.js';
import winston from '@cubeartisan/server/serverjs/winstonConfig.js';
import { loadCardToInt, writeFile } from "@cubeartisan/jobs/exports/utils.js";

const batchSize = 256;
const minFileSize = 128 * 1024 * 1024; // 128 MiB
let totalPicks = 0;

const processSeat = (choices, basics, createdAt, cardToInt) => {
  const picks = [];
  const seen = [];
  const picked = [];
  for (const choice of choices) {
    const cardsInPack = choice.pack.map((oracleId) => cardToInt[oracleId]);
    seen.push(...cardsInPack);
    let { pickNum } = choice;
    for (const pickedIdx of choice.picks) {
      picks.push({
        picked: picked.slice(),
        seen: seen.slice(),
        cardsInPack: cardsInPack.slice(),
        packNum: choice.packNum,
        numPacks: choice.numPacks,
        pickNum,
        numPicks: choice.numPicks,
        pickedIdx,
      });
      pickNum += 1;
      picked.push(cardsInPack[pickedIdx]);
      picked.splice(pickedIdx, 1);
      totalPicks += 1;
    }
    for (const trashedIdx of choice.picks) {
      picks.push({
        picked: picked.slice(),
        seen: seen.slice(),
        cardsInPack: cardsInPack.slice(),
        packNum: choice.packNum,
        numPacks: choice.numPacks,
        pickNum,
        numPicks: choice.numPicks,
        trashedIdx,
      });
      pickNum += 1;
      totalPicks += 1;
    }
  }
  return {
    picks,
    basics,
    date: createdAt,
    createdAt,
  };
};

const processDraftLog = (draftLog, cardToInt) => {
  return draftLog.players.map((choices) => processSeat(choices, draftLog.basics, draftLog.createdAt, cardToInt));
};

try {
  // eslint-disable-next-line prettier/prettier
  await connectionQ();
  const { cardToInt } = await loadCardToInt();
  const count = await DraftLog.countDocuments();
  winston.info(`Counted ${count} documents`);
  const cursor = DraftLog.find().lean().cursor();
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
        processedDrafts.push(...processDraftLog(draft, cardToInt));
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

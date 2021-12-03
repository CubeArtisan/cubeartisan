/* eslint-disable no-await-in-loop */
// run with: node --max-old-space-size=8192 download_cubes.js
// will oom without the added tag
// Load Environment Variables
import mongoose from 'mongoose';

import connectionQ from '@cubeartisan/server/serverjs/mongoConnection.js';
import winston from '@cubeartisan/server/serverjs/winstonConfig.js';
import Cube from '@cubeartisan/server/models/cube.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import { getObjectCreatedAt, loadCardToInt, writeFile } from '@cubeartisan/jobs/exports/utils.js';

// Number of documents to process at a time
const batchSize = 1024;
// Minimum size in bytes of the output files (last file may be smaller).
const minFileSize = 128 * 1024 * 1024; // 128 MB

const isValidCube = (cube) => (cube?.cards?.length ?? 0) > 0 && cube.isListed !== false;

const processCube = (cube, cardToInt) => ({
  name: cube.name,
  id: cube._id,
  ownerName: cube.owner_name,
  shortId: cube.shortID,
  categoryOverride: cube.categoryOverride,
  categoryPrefixes: cube.categoryPrefixes,
  tags: cube.tags,
  dateUpdated: cube.date_updated,
  cards: cube.cards
    .filter((c) => c)
    .map((card) => cardToInt[carddb.cardFromId(card.cardID).oracle_id])
    .filter((c) => c || c === 0),
  maybe: (cube.maybe || [])
    .filter((c) => c)
    .map((card) => cardToInt[carddb.cardFromId(card.cardID).oracle_id])
    .filter((c) => c || c === 0),
  basics: (cube.basics || [])
    .filter((c) => c)
    .map((card) => cardToInt[carddb.cardFromId(card).oracle_id])
    .filter((c) => c || c === 0),
  numUsersFollowing: (cube.users_following || []).length,
  imageUri: cube.image_uri,
  imageName: cube.image_name,
  imageArtist: cube.image_artist,
  numDecks: cube.numDecks,
  type: cube.type,
  createdAt: getObjectCreatedAt(cube._id),
});
try {
  // eslint-disable-next-line prettier/prettier
  await connectionQ();
  const { cardToInt } = await loadCardToInt();
  // process all cube objects
  const count = await Cube.countDocuments({ isListed: true });
  const cursor = Cube.find({ isListed: true }).lean().cursor();

  let counter = 0;
  let i = 0;
  while (i < count) {
    const cubes = [];
    let size = 0;
    for (; size < minFileSize && i < count; ) {
      const processingCubes = [];
      const nextBound = Math.min(i + batchSize, count);
      for (; i < nextBound; i++) {
        // eslint-disable-next-line no-await-in-loop
        const cube = await cursor.next();
        if (isValidCube(cube)) {
          processingCubes.push(processCube(cube, cardToInt));
        }
      }
      size += Buffer.byteLength(JSON.stringify(processingCubes));
      cubes.push(...processingCubes);
      winston.debug(
        `Finished: ${i} of ${count} cubes and the buffer is approximately ${(size / 1024 / 1024).toFixed(2)} MB.`,
      );
    }
    if (cubes.length > 0) {
      const filename = `cubes/${counter.toString().padStart(6, '0')}.json`;
      writeFile(filename, cubes);
      counter += 1;
      winston.info(`Wrote file ${filename} with ${cubes.length} cubes.`);
    }
  }
  await mongoose.disconnect();
  winston.info('Done with export_cubes');
  process.exit();
} catch (err) {
  winston.error('Failed to export decks.', err);
  process.exit();
}

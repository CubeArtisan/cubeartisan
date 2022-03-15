import mongoose from 'mongoose';

import connectionQ from '@cubeartisan/server/serverjs/mongoConnection.js';
import Cube from '@cubeartisan/server/models/cube.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import winston from '@cubeartisan/server/serverjs/winstonConfig.js';

const batchSize = 1000;

const isInvalidCardId = (id) => carddb.cardFromId(id).name === 'Invalid Card';

const needsCleaning = (cube) => !cube.cards || cube.cards.some((card) => !card || isInvalidCardId(card.cardID));

const processCube = async (leanCube) => {
  if (needsCleaning(leanCube)) {
    const cube = await Cube.findById(leanCube._id);

    winston.log(`Cleaning cube ${cube.name}: ${cube._id}`);

    if (!cube.cards) {
      cube.cards = [];
    }
    cube.cards = cube.cards.filter((c) => c && !isInvalidCardId(c.cardID));

    await cube.save();
  }
};

try {
  // eslint-disable-next-line prettier/prettier
  await connectionQ();
  await carddb.initializeCardDb('./private', true);

  // process all cube objects
  winston.log('Started clean_cubes');
  const count = await Cube.countDocuments();
  const cursor = Cube.find().lean().cursor();

  // batch them by batchSize
  for (let i = 0; i < count; i += batchSize) {
    const cubes = [];
    for (let j = 0; j < batchSize; j++) {
      if (i + j < count) {
        const cube = await cursor.next();
        if (cube) {
          cubes.push(cube);
        }
      }
    }

    await Promise.all(cubes.map(processCube));

    winston.log(`Finished: ${Math.min(count, i + batchSize)} of ${count} cubes`);
  }

  mongoose.disconnect();
  winston.log('done');
  process.exit();
} catch (err) {
  winston.error(err.message, err);
  process.exit();
}

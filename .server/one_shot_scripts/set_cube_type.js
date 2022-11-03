// Load Environment Variables
import mongoose from 'mongoose';
import { setCubeType } from '@cubeartisan/server/serverjs/cubefn.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import Cube from '@cubeartisan/server/models/cube.js';
import connectionQ from '@cubeartisan/server/serverjs/mongoConnection.js';

const batchSize = 100;

async function addVars(cube) {
  try {
    cube = setCubeType(cube, carddb);

    return cube.save();
  } catch (err) {
    console.error(err);
  }
  return -1;
}

(async () => {
  await Promise.all([carddb.initializeCardDb('private', true), connectionQ]);

  const count = await Cube.countDocuments();
  const cursor = Cube.find().cursor();

  // batch them by batchSize
  for (let i = 0; i < count; i += batchSize) {
    const cubes = [];
    for (let j = 0; j < batchSize; j++) {
      try {
        if (i + j < count) {
          const cube = await cursor.next();
          if (cube) {
            cubes.push(cube);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
    try {
      await Promise.all(cubes.map((cube) => addVars(cube)));
    } catch (err) {
      console.error(err);
    }

    console.log(`Finished: ${i} of ${count} cubes`);
  }
  mongoose.disconnect();
  console.log('done');
  process.exit();
})();

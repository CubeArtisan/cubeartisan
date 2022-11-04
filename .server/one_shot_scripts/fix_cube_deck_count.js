// Load Environment Variables
import mongoose from 'mongoose';
import Deck from '@cubeartisan/server/models/deck.js';
import Cube from '@cubeartisan/server/models/cube.js';
import connectionQ from '@cubeartisan/server/serverjs/mongoConnection.js';

const batchSize = 100;

async function addVars(cube) {
  cube.numDecks = await Deck.countDocuments({
    cube: cube._id,
  });

  return cube.save();
}

(async () => {
  await connectionQ();
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
        console.warn(err);
      }
    }
    await Promise.all(cubes.map((cube) => addVars(cube)));
    console.log(`Finished: ${i} of ${count} cubes`);
  }
  mongoose.disconnect();
  console.log('done');
  process.exit();
})();

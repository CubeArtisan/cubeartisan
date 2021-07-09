// Load Environment Variables
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Deck from '@cubeartisan/server/models/deck.js';
import Cube from '@cubeartisan/server/models/cube.js';

dotenv.config();

const batchSize = 100;

async function addVars(cube) {
  cube.numDecks = await Deck.countDocuments({
    cube: cube._id,
  });

  return cube.save();
}

(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
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
  await mongoose.disconnect();
  console.log('done');
  process.exit();
})();

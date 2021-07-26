import mongoose from 'mongoose';
import Cube from '@cubeartisan/server/models/cube.js';
import connectionQ from '@cubeartisan/server/serverjs/mongoConnection.js';

(async () => {
  await connectionQ();
  const totalCubes = await Cube.estimatedDocumentCount();
  for (let start = 0; start < totalCubes; start += 100) {
    const cubes = await Cube.find().skip(start).limit(100);
    const collected = [];
    for (const cube of cubes) {
      for (const card of cube.cards) {
        card.colors = card.colors.filter((c) => Array.from('WUBRG').includes(c));
      }
      collected.push(cube);
    }
    await Promise.all(collected.map((cube) => cube.save()));
    console.log(`Completed ${start + collected.length} cubes`);
  }
  await mongoose.disconnect();
})();

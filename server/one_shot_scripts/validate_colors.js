import mongoose from 'mongoose';
import Cube from '@cubeartisan/server/models/cube';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
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

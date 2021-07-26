// Load Environment Variables
import mongoose from 'mongoose';
import CardRating from '@cubeartisan/server/models/cardrating.js';
import connectionQ from '@cubeartisan/server/serverjs/mongoConnection';

(async () => {
  await connectionQ;
  const res = await CardRating.deleteMany({ name: null });
  console.log(res);
  console.log('done');
  await mongoose.disconnect();
  process.exit();
})();

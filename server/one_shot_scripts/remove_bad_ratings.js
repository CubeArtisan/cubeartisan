// Load Environment Variables
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import CardRating from '@cubeartisan/server/models/cardrating';

dotenv.config();

(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  const res = await CardRating.deleteMany({ name: null });
  console.log(res);
  console.log('done');
  process.exit();
})();

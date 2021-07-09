// Load Environment Variables
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import CardHistory from '@cubeartisan/server/models/cardHistory.js';

dotenv.config();

(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  const res = await CardHistory.deleteMany({ history: { $size: 1 } }).lean();
  console.log(res);
  console.log('done');
  process.exit();
})();

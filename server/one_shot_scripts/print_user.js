// Load Environment Variables
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '@cubeartisan/server/models/user';

dotenv.config();
const username = 'Ashok';

(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  const user = await User.findOne({ username });
  user.email = user.email.toLowerCase();
  await user.save();
  console.log(user);
  console.log('done');
  process.exit();
})();

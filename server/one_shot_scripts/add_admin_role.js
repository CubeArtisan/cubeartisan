// Load Environment Variables
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '@cubeartisan/server/models/user.js';

dotenv.config();

const USERNAME = 'CubeArtisan';

(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  const user = await User.findOne({ username: USERNAME });
  if (!user.roles) {
    user.roles = [];
  }
  if (!user.roles.includes('Admin')) {
    user.roles.push('Admin');
  }
  await user.save();
  console.log('done');
  await mongoose.disconnect();
  process.exit();
})();

// Load Environment Variables
import mongoose from 'mongoose';
import User from '@cubeartisan/server/models/user.js';
import connectionQ from '@cubeartisan/server/serverjs/mongoConnection.js';

const USERNAME = 'CubeArtisan';

(async () => {
  await connectionQ;
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

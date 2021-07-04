// Load Environment Variables
import mongoose from 'mongoose';
import User from '../models/user';

require('dotenv').config();

(async () => {
  mongoose.connect(process.env.MONGODB_URL).then(async () => {
    const user = await User.findOne({ username: 'Dekkaru' });

    if (!user.roles) {
      user.roles = [];
    }

    if (!user.roles.includes('Admin')) {
      user.roles.push('Admin');
    }

    await user.save();

    console.log('done');
    process.exit();
  });
})();

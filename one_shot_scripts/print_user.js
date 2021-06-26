// Load Environment Variables
import mongoose from 'mongoose';
import User from '../models/user';

require('dotenv').config();

const username = 'Ashok';

(async () => {
  mongoose.connect(process.env.MONGODB_URL).then(async () => {
    const user = await User.findOne({ username });

    user.email = user.email.toLowerCase();

    await user.save();

    console.log(user);

    console.log('done');
    process.exit();
  });
})();

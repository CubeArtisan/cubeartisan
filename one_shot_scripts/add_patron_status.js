// Load Environment Variables
import mongoose from 'mongoose';
import User from '../models/user';
import Patron from '../models/patron';

require('dotenv').config();

const username = 'dekkerglen';

const level = 'Cobra Hatchling';

(async () => {
  mongoose.connect(process.env.MONGODB_URL).then(async () => {
    const user = await User.findOne({ username });

    if (!user.roles.includes('Patron')) {
      user.roles.push('Patron');
    }

    const patron = await Patron.findOne({ user: user._id });

    if (patron) {
      patron.active = true;
      patron.level = level;

      await patron.save();
    } else {
      const newPatron = new Patron();
      newPatron.email = user.email;
      newPatron.user = user._id;
      newPatron.level = level;
      newPatron.active = true;

      await newPatron.save();
    }

    await user.save();

    console.log('done');
    process.exit();
  });
})();

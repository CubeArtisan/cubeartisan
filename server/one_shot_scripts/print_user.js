// Load Environment Variables
import User from '@cubeartisan/server/models/user.js';
import connectionQ from '@cubeartisan/server/serverjs/mongoConnection.js';

const username = 'Ashok';

(async () => {
  await connectionQ();
  const user = await User.findOne({ username });
  user.email = user.email.toLowerCase();
  await user.save();
  console.log(user);
  console.log('done');
  process.exit();
})();

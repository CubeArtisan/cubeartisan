// Load Environment Variables
import CardHistory from '@cubeartisan/server/models/cardHistory.js';
import connectionQ from '@cubeartisan/server/serverjs/mongoConnection';

(async () => {
  await connectionQ;
  const res = await CardHistory.deleteMany({ history: { $size: 1 } }).lean();
  console.log(res);
  console.log('done');
  process.exit();
})();

import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const credentials = process.env.MONGODB_USER ? `${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@` : '';
const queryParams = process.env.MONGODB_AUTH_DB
  ? `replicaSet=${process.env.MONGODB_REPLICASET}&authSource=${process.env.MONGODB_AUTH_DB}`
  : `replicSet=${process.env.MONGODB_REPLICASET}`;
// Connect db
export default mongoose.connect(
  `mongodb://${credentials}${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}?${queryParams}`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
);
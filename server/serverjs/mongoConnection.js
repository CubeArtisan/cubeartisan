import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const credentials = process.env.MONGODB_USER ? `${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@` : '';
const queryParams = `replicaSet=${process.env.MONGODB_REPLICASET}`;

export const MONGODB_CONNECTION_STRING = `mongodb://${credentials}${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}?${queryParams}`;

// Connect db
export default () =>
  mongoose.connect(MONGODB_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

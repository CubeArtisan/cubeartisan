import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const credentials = process.env.MONGODB_USER ? `${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@` : '';
const queryParams = `replicaSet=${process.env.MONGODB_REPLICASET}`;

export const MONGODB_CONNECTION_STRING = `mongodb://${credentials}${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}?${queryParams}`;

let dbConnected = false;

const getMongoConnection = async () => {
  if (dbConnected === false) {
    await mongoose.connect(MONGODB_CONNECTION_STRING);
    dbConnected = true;
  }
};
// Connect db
export default getMongoConnection;

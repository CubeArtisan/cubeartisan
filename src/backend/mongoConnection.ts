import mongoose from 'mongoose';

import logger from '@cubeartisan/cubeartisan/backend/logger';

export const getMongoDbConnectionString = () => {
  const credentials = import.meta.env.VITE_MONGODB_USER
    ? `${import.meta.env.VITE_MONGODB_USER}:${import.meta.env.VITE_MONGODB_PASSWORD}@`
    : '';
  const queryParams = `replicaSet=${import.meta.env.VITE_MONGODB_REPLICASET}`;
  const connectionString = `mongodb://${credentials}${import.meta.env.VITE_MONGODB_HOST}:${
    import.meta.env.VITE_MONGODB_PORT
  }/${import.meta.env.VITE_MONGODB_DBNAME}?${queryParams}`;
  return connectionString;
};

async function getMongoConnection(): Promise<typeof mongoose> {
  const opts = {};
  const connectionString = getMongoDbConnectionString();
  const db = mongoose.connection;
  db.once('open', () => {
    logger.info('Connected to Mongo.');
  });
  db.on('error', (err) => {
    logger.error('Error connecting to Mongo.', err);
  });

  return mongoose.connect(connectionString, opts);
}

export default getMongoConnection;

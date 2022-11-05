import mongoose from 'mongoose';

import logger from '@cubeartisan/next/backend/logger';

export const getMongoDbConnectionString = () => {
  const credentials = process.env.MONGODB_USER ? `${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@` : '';
  const queryParams = `replicaSet=${process.env.MONGODB_REPLICASET}`;
  const connectionString = `mongodb://${credentials}${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DBNAME}?${queryParams}`;
  return connectionString;
};

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

async function getMongoConnection(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {};
    const connectionString = getMongoDbConnectionString();
    const db = mongoose.connection;
    db.once('open', () => {
      logger.info('Connected to Mongo.');
    });
    // Check for db errors
    db.on('error', (err) => {
      logger.error('Error connecting to Mongo.', err);
    });
    // eslint-disable-next-line promise/prefer-await-to-then
    cached.promise = mongoose.connect(connectionString, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default getMongoConnection;

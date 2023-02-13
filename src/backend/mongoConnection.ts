import mongoose from 'mongoose';

import logger from '@cubeartisan/cubeartisan/backend/logger';

export const getMongoDbConnectionString = () => {
  // eslint-disable-next-line dot-notation,prettier/prettier
  const credentials = process.env['MONGODB_USER'] ? `${process.env['MONGODB_USER']}:${process.env['MONGODB_PASSWORD']}@` : '';
  const queryParams = `replicaSet=${process.env['MONGODB_REPLICASET']}`; // eslint-disable-line dot-notation
  // eslint-disable-next-line dot-notation
  const connectionString = `mongodb://${credentials}${process.env['MONGODB_HOST']}:${process.env['MONGODB_PORT']}/${process.env['MONGODB_DBNAME']}?${queryParams}`;
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

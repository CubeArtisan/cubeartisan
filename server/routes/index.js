/**
 * This file is part of CubeArtisan.
 *
 * CubeArtisan is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CubeArtisan is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with CubeArtisan.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Modified from the original version in CubeCobra. See LICENSE.CubeCobra for more information.
 */

// This needs to come first for apm to work correctly.
import winston, { connectMiddleware } from '@cubeartisan/server/serverjs/winstonConfig.js';

import express from 'express';
import ConnectFlash from 'connect-flash';
import ExpressMessages from 'express-messages';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import http from 'http';
import fileUpload from 'express-fileupload';
import compression from 'compression';
import MongoDBStoreFactory from 'connect-mongodb-session';
import schedule from 'node-schedule';
import { Server as SocketIO } from 'socket.io';
import { fileURLToPath } from 'url';

import { render } from '@cubeartisan/server/serverjs/render.js';
import connectionQ, { MONGODB_CONNECTION_STRING } from "@cubeartisan/server/serverjs/mongoConnection.js";
import updatedb from '@cubeartisan/server/serverjs/updatecards.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import CardRating from '@cubeartisan/server/models/cardrating.js';
import CardHistory from '@cubeartisan/server/models/cardHistory.js';
import passportConfig from '@cubeartisan/server/config/passport.js';
import {
  requestLogging,
  timeoutMiddleware,
} from '@cubeartisan/server/routes/middleware.js';
import router from '@cubeartisan/server/routes/router.js';
import manageWebsocketDraft from "@cubeartisan/server/routes/websockets/wsDraft.js";

// eslint-disable-next-line no-underscore-dangle,prettier/prettier
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);
await connectionQ();
const MongoDBStore = MongoDBStoreFactory(session);
const db = mongoose.connection;
db.once('open', () => {
  winston.info('Connected to Mongo.');
});
// Check for db errors
db.on('error', (err) => {
  winston.error(err);
});

const store = new MongoDBStore(
  {
    uri: MONGODB_CONNECTION_STRING,
    collection: 'session_data',
  },
  (err) => {
    if (err) {
      winston.error('Store failed to connect to mongoDB.', { error: err });
    }
  },
);
// scryfall updates this data at 9, so this will minimize staleness
schedule.scheduleJob(`${Math.floor(Math.random() * 60)} 11 * * *`, async () => {
  winston.info('String midnight cardbase update...');
  updatedb.downloadCardbase();
});

// Init app
const app = express();
// gzip middleware
app.use(compression());
// request timeout middleware
app.use(timeoutMiddleware);
// per-request logging configuration
app.use(requestLogging);
// upload file middleware
app.use(fileUpload());
// Body parser middleware
app.use(
  bodyParser.urlencoded({
    limit: '200mb',
    extended: true,
  }),
);
app.use(
  bodyParser.json({
    limit: '200mb',
    extended: true,
  }),
);
// Load view engine
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
// Set Public Folder
app.use(express.static(path.join(__dirname, '../public'), { maxAge: 86400, immutable: true }));
app.use('/js', express.static(path.join(__dirname, '../../client/dist'), { maxAge: 3600 }));
// Express session middleware
const sessionConfig = session({
      secret: process.env.SESSION,
      store,
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 52, // 1 year
      },
    });
app.use(sessionConfig);
app.use(ConnectFlash());
app.use((req, res, next) => {
  res.locals.messages = ExpressMessages(req, res);
  res.locals.node_env = app.get('env');
  next();
});
// Passport config and middleware
passportConfig(passport);
const passportInitialized = passport.initialize();
const passportSession = passport.session();
app.use(passportInitialized);
app.use(passportSession);
connectMiddleware(app);
app.use('/', router);
// eslint-disable-next-line no-unused-vars, promise/prefer-await-to-callbacks
app.use(async (err, req, res, _next) => {
  try {
    req.logger.error(err);
    if (!res.statusCode) {
      res.status(500);
    }
    return await render(req, res, 'ErrorPage', {
      error: err.message,
      requestId: req.uuid,
      title: 'Oops! Something went wrong.',
    });
  } catch(err2) {
    return res.end();
  }
});
app.use((_req, res) => res.redirect(303, '/404'));

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
// Start server after carddb is initialized.
await carddb.initializeCardDb();
const httpServer = http.createServer(app);
const wsServer = new SocketIO(httpServer, { cors: { origin: process.env.SITE_ROOT } });
wsServer.use(wrap(sessionConfig));
wsServer.use(wrap(passportInitialized));
wsServer.use(wrap(passportSession));
// wsServer.use(wrap(requestLogging));
wsServer.use((socket, next) => {
  if (socket.request.isAuthenticated()) return next();
  return next(new Error("Authentication is required to use websockets."));
});
const draftingWsRoute = wsServer.of('/wsdraft');
draftingWsRoute.use(wrap(sessionConfig));
draftingWsRoute.use(wrap(passportInitialized));
draftingWsRoute.use(wrap(passportSession));
draftingWsRoute.use((socket, next) => {
  if (socket.request.isAuthenticated()) return next();
  return next(new Error("Authentication is required to use websockets."));
});
draftingWsRoute.on('connection', manageWebsocketDraft)
httpServer.listen(process.env.PORT ?? 5000, process.env.LISTEN_ADDR, () => {
  winston.info(`Server started on port ${process.env.PORT || 5000}...`);
});

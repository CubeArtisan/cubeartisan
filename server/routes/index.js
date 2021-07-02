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
// Load Environment Variables
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
import dotenv from 'dotenv';

import winston from '@hypercube/server/serverjs/winstonConfig';
import updatedb from '@hypercube/server/serverjs/updatecards';
import carddb from '@hypercube/server/serverjs/cards';
import CardRating from '@hypercube/server/models/cardrating';
import CardHistory from '@hypercube/server/models/cardHistory';
import render from '@hypercube/server/serverjs/render';
import DevRoutes from '@hypercube/server/routes/dev';
import CardRoutes from '@hypercube/server/routes/card';
import CubeRoutes from '@hypercube/server/routes/cube';
import InfoRoutes from '@hypercube/server/routes/info';
import UserRoutes from '@hypercube/server/routes/user';
import CommentRoutes from '@hypercube/server/routes/comment';
import AdminRoutes from '@hypercube/server/routes/admin';
import ContentRoutes from '@hypercube/server/routes/content';
import PackagesRoutes from '@hypercube/server/routes/package';
import passportConfig from '@hypercube/server/config/passport';
import { handleRouteError, wrapAsyncApi } from '@hypercube/server/serverjs/util';
import Blog from '@hypercube/server/models/blog';
import Cube from '@hypercube/server/models/cube';
import Deck from '@hypercube/server/models/deck';
import User from '@hypercube/server/models/user';
import Article from '@hypercube/server/models/article';
import Video from '@hypercube/server/models/video';
import PodcastEpisode from '@hypercube/server/models/podcastEpisode';
import { makeFilter } from '@hypercube/server/serverjs/filterCubes';
import { ensureAuth, requestLogging, timeoutMiddleware } from '@hypercube/server/routes/middleware';
import { getCubeId } from '@hypercube/server/serverjs/cubefn';

dotenv.config();

const MongoDBStore = MongoDBStoreFactory(session);

// Connect db
mongoose.connect(process.env.MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
    uri: process.env.MONGODB_URL,
    collection: 'session_data',
  },
  (err) => {
    if (err) {
      winston.error('Store failed to connect to mongoDB.', { error: err });
    }
  },
);

// scryfall updates this data at 9, so his will minimize staleness
schedule.scheduleJob('0 10 * * *', async () => {
  winston.info('String midnight cardbase update...');

  let ratings = [];
  let histories = [];
  if (process.env.USE_S3 !== 'true') {
    ratings = await CardRating.find({}, 'name elo embedding').lean();
    histories = await CardHistory.find({}, 'oracleId current.total current.picks').lean();
  }
  updatedb.updateCardbase(ratings, histories);
});

const CUBE_PREVIEW_FIELDS =
  '_id shortID image_uri image_name image_artist name owner owner_name type card_count overrideCategory categoryPrefixes categoryOverride';

const redirectToLandingOrDash = (req, res) =>
  req.user ? res.redirect(302, '/dashboard') : res.redirect(302, '/landing');

const getChildComments = async (req, res) => {
  const comments = await Comment.find({
    $and: [{ parent: req.params.parent }, { parentType: req.params.type }],
  }).lean();

  return res.status(200).send({
    success: 'true',
    comments,
  });
};

const showDowntimePage = (req, res) => {
  return render(req, res, 'DownTimePage', {
    title: 'Down for Maintenance',
  });
};

const exploreCubes = async (req, res) => {
  const recentsq = Cube.find(
    {
      card_count: {
        $gt: 200,
      },
      isListed: true,
    },
    CUBE_PREVIEW_FIELDS,
  )
    .lean()
    .sort({
      date_updated: -1,
    })
    .limit(12)
    .exec();

  const featuredq = Cube.find(
    {
      isFeatured: true,
    },
    CUBE_PREVIEW_FIELDS,
  )
    .lean()
    .exec();

  const draftedq = Cube.find(
    {
      isListed: true,
    },
    CUBE_PREVIEW_FIELDS,
  )
    .lean()
    .sort({
      numDecks: -1,
    })
    .limit(12)
    .exec();

  const decksq = Deck.find()
    .lean()
    .sort({
      date: -1,
    })
    .limit(10)
    .exec();

  const [recents, featured, drafted, decks] = await Promise.all([recentsq, featuredq, draftedq, decksq]);

  const recentlyDrafted = await Cube.find({ _id: { $in: decks.map((deck) => deck.cube) } }, CUBE_PREVIEW_FIELDS).lean();

  return render(req, res, 'ExplorePage', {
    recents,
    featured,
    drafted,
    recentlyDrafted,
  });
};

const showRandomCube = async (_, res) => {
  const lastMonth = () => {
    const ret = new Date();
    ret.setMonth(ret.getMonth() - 1);
    return ret;
  };

  const [randCube] = await Cube.aggregate()
    .match({ isListed: true, card_count: { $gte: 360 }, date_updated: { $gte: lastMonth() } })
    .sample(1);
  res.redirect(303, `/cube/${encodeURIComponent(getCubeId(randCube))}/overview`);
};

const viewDashboard = async (req, res) => {
  try {
    const cubesq = Cube.find(
      {
        owner: req.user._id,
      },
      CUBE_PREVIEW_FIELDS,
    )
      .lean()
      .sort({
        date_updated: -1,
      });
    const postsq = Blog.find({
      $or: [
        {
          cube: {
            $in: req.user.followed_cubes,
          },
        },
        {
          owner: {
            $in: req.user.followed_users,
          },
        },
        {
          dev: 'true',
        },
      ],
    })
      .sort({
        date: -1,
      })
      .limit(10);

    const featuredq = Cube.find(
      {
        isFeatured: true,
      },
      CUBE_PREVIEW_FIELDS,
    ).lean();

    const articlesq = Article.find({ status: 'published' }).sort({ date: -1 }).limit(10);
    const episodesq = PodcastEpisode.find().sort({ date: -1 }).limit(10);
    const videosq = Video.find({ status: 'published' }).sort({ date: -1 }).limit(10);

    // We can do these queries in parallel
    const [cubes, posts, articles, videos, episodes, featured] = await Promise.all([
      cubesq,
      postsq,
      articlesq,
      videosq,
      episodesq,
      featuredq,
    ]);

    const content = [];

    for (const article of articles) {
      content.push({
        type: 'article',
        date: article.date,
        content: article,
      });
    }
    for (const video of videos) {
      content.push({
        type: 'video',
        date: video.date,
        content: video,
      });
    }
    for (const episode of episodes) {
      content.push({
        type: 'episode',
        date: episode.date,
        content: episode,
      });
    }

    content.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

    content.splice(10);

    const decks = await Deck.find({
      cubeOwner: req.user._id,
    })
      .sort({
        date: -1,
      })
      .lean()
      .limit(12);

    return render(req, res, 'DashboardPage', { posts, cubes, decks, content, featured });
  } catch (err) {
    return handleRouteError(req, res, err, '/landing');
  }
};

const dashboardDecks = async (req, res) => {
  try {
    const pagesize = 30;
    const { page } = req.params;
    const { user } = req;
    if (!user) {
      return res.redirect(401, '/landing');
    }

    const decks = await Deck.find({
      cubeOwner: user._id,
    })
      .sort({
        date: -1,
      })
      .skip(pagesize * page)
      .limit(pagesize)
      .lean()
      .exec();

    const numDecks = await Deck.countDocuments({
      cubeOwner: user._id,
    })
      .lean()
      .exec();

    return render(req, res, 'RecentDraftsPage', {
      decks,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(numDecks / pagesize),
      count: numDecks,
    });
  } catch (err) {
    req.logger.error(err);
    return res.status(500).send(err);
  }
};

const viewLanding = async (req, res) => {
  const cubeq = Cube.estimatedDocumentCount().exec();
  const deckq = Deck.estimatedDocumentCount().exec();
  const userq = User.estimatedDocumentCount().exec();

  const [cube, deck, user] = await Promise.all([cubeq, deckq, userq]);

  return render(req, res, 'LandingPage', {
    numusers: user.toLocaleString('en-US'),
    numcubes: cube.toLocaleString('en-US'),
    numdrafts: deck.toLocaleString('en-US'),
    version: process.env.SITE_VERSION,
  });
};

const getVersion = (req, res) => {
  return render(req, res, 'VersionPage', {
    version: process.env.SITE_VERSION,
    host: process.env.HOST,
  });
};

const viewSearchPage = (req, res) => {
  return render(req, res, 'SearchPage', {
    query: '',
    cubes: [],
  });
};

const searchResultsPage = async (req, res) => {
  try {
    const perPage = 36;
    const page = Math.max(0, Math.max(req.params.page, 0));

    const { order } = req.query;

    let sort = {
      date_updated: -1,
    };

    switch (order) {
      case 'pop':
        sort = {
          numDecks: -1,
        };
        break;
      case 'alpha':
        sort = {
          name: -1,
        };
        break;
      default:
        break;
    }

    const query = await makeFilter(req.params.query, carddb);

    if (query.error) {
      req.flash('danger', `Invalid Search Syntax: ${query.error}`);

      return render(req, res, 'SearchPage', {
        query: req.params.query,
        cubes: [],
        count: 0,
        perPage: 0,
        page: 0,
      });
    }

    if (query.warnings) {
      for (const warning of query.warnings) {
        req.flash('danger', `Warning: ${warning}`);
      }
      delete query.warnings;
    }

    query.isListed = true;

    const count = await Cube.countDocuments(query);

    const cubes = await Cube.find(query, CUBE_PREVIEW_FIELDS)
      .lean()
      .sort(sort)
      .skip(perPage * page)
      .limit(perPage);

    return render(req, res, 'SearchPage', {
      query: req.params.query,
      cubes,
      count,
      perPage,
      page,
      order,
    });
  } catch (err) {
    req.logger.error(err);
    req.flash('danger', 'Invalid Search Syntax');

    return render(req, res, 'SearchPage', {
      query: req.params.query,
      cubes: [],
      count: 0,
      perPage: 0,
      page: 0,
    });
  }
};

const showLeavePage = (req, res) => {
  return render(req, res, 'LeaveWarningPage', {
    url: req.query.url,
  });
};

const showErrorPage = (req, res) => {
  return render(req, res, 'ErrorPage', {
    requestId: req.uuid,
    title: '404: Page not found',
  });
};

const browsePackages = (req, res) => render(req, res, 'BrowsePackagesPage', {});

const listCardNames = (_, res) => {
  return res.status(200).send({
    success: 'true',
    cardnames: carddb.cardtree,
  });
};

// Get the full card images including image_normal and image_flip
const getCardImageUrls = (_, res) => {
  return res.status(200).send({
    success: 'true',
    cardimages: carddb.cardimages,
  });
};

const getImageDict = (_, res) => {
  res.status(200).send({
    success: 'true',
    dict: carddb.imagedict,
  });
};

const getFullNames = (_, res) => {
  res.status(200).send({
    success: 'true',
    cardnames: carddb.full_names,
  });
};

const loginUser = (req, res, next) => {
  const query = {
    [req.body.username.includes('@') ? 'email' : 'username_lower']: req.body.username.toLowerCase(),
  };
  // find by email
  User.findOne(query, (_err, user) => {
    if (!user) {
      req.flash('danger', 'Incorrect username or email address.');
      res.redirect('/user/login');
    } else {
      req.body.username = user.username;
      // TODO: fix confirmation and check it here.
      let redirect = '/';
      if (req.body.loginCallback) {
        redirect = req.body.loginCallback;
      }
      passport.authenticate('local', {
        successRedirect: redirect,
        failureRedirect: '/user/Login',
        failureFlash: true,
      })(req, res, next);
    }
  });
};

const logoutUser = (req, res) => {
  req.logout();
  req.flash('success', 'You have been logged out');
  res.redirect('/');
};

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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'dist')));
app.use('/jquery-ui', express.static(`${__dirname}/node_modules/jquery-ui-dist/`));
// Express session middleware
app.use(
  session({
    secret: process.env.SESSION,
    store,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 52, // 1 year
    },
  }),
);
app.use(ConnectFlash());
app.use((req, res, next) => {
  res.locals.messages = ExpressMessages(req, res);
  res.locals.node_env = app.get('env');
  next();
});
// Passport config and middleware
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', InfoRoutes);
// check for downtime
if (process.env.DOWNTIME_ACTIVE === 'true') {
  app.use(showDowntimePage);
}
app.use('/', CardRoutes);
app.use('/', ContentRoutes);
app.use('/admin', AdminRoutes);
app.use('/comment', CommentRoutes);
app.use('/cube', CubeRoutes);
app.use('/dev', DevRoutes);
app.use('/', PackagesRoutes);
app.use('/user', UserRoutes);
app.get('/', redirectToLandingOrDash);
app.get('/comments/:parent/:type', wrapAsyncApi(getChildComments));
app.get('/explore', wrapAsyncApi(exploreCubes));
app.get('/random', wrapAsyncApi(showRandomCube));
app.get('/dashboard', ensureAuth, wrapAsyncApi(viewDashboard));
app.get('/dashboard/decks/:page', wrapAsyncApi(dashboardDecks));
app.get('/landing', wrapAsyncApi(viewLanding));
app.get('/version', getVersion);
app.get('/search', viewSearchPage);
app.get('/search/:query/:page', searchResultsPage);
app.get('/leave', showLeavePage);
app.get('/packages', browsePackages);
app.get('/cardnames', listCardNames);
app.get('/cardimages', getCardImageUrls);
app.get('/imagedict', getImageDict);
app.get('/fullnames', getFullNames);
app.get('/login', (req, res) => render(req, res, 'LoginPage'));
app.post('/login', loginUser);
app.post('/logout', logoutUser);
app.get('/404', showErrorPage);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  req.logger.error(err);
  if (!res.statusCode) {
    res.status(500);
  }
  return render(req, res, 'ErrorPage', {
    error: err.message,
    requestId: req.uuid,
    title: 'Oops! Something went wrong.',
  });
});
app.use((_req, res) => res.redirect(303, '/404'));

// Start server after carddb is initialized.
carddb.initializeCardDb().then(() => {
  http.createServer(app).listen(process.env.PORT || 5000, '127.0.0.1', () => {
    winston.info(`Server started on port ${process.env.PORT || 5000}...`);
  });
});

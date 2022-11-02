import winston from '@cubeartisan/server/serverjs/winstonConfig.js';

import { body, param } from 'express-validator';
import fetch from 'node-fetch';
import RSS from 'rss';

import { createDraft, getDraftFormat } from '@cubeartisan/client/drafting/createdraft.js';
import { makeFilter } from '@cubeartisan/client/filtering/FilterCards.js';
import { decodeName, normalizeName } from '@cubeartisan/client/utils/Card.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import { render } from '@cubeartisan/server/serverjs/render.js';
import {
  cacheImmutableResponse,
  ensureAuth,
  ensureRole,
  jsonValidationErrors,
  wrapAsyncApi,
  wrapAsyncPage,
  handleRouteError,
} from '@cubeartisan/server/routes/middleware.js';
import {
  addMultipleNotifications,
  addNotification,
  binaryInsert,
  hasProfanity,
  isAdmin,
  newCard,
  turnToTree,
} from '@cubeartisan/server/serverjs/util.js';
import generateMeta from '@cubeartisan/server/serverjs/meta.js';
import {
  abbreviate,
  buildIdQuery,
  buildTagColors,
  cardsAreEquivalent,
  compareCubes,
  cubeCardTags,
  generatePack,
  generateSamplepackImageSharp,
  generateShortId,
  maybeCards,
  setCubeType,
  addDeckCardAnalytics,
} from '@cubeartisan/server/serverjs/cubefn.js';
import { addCardMarkdown, removeCardMarkdown, replaceCardMarkdown } from '@cubeartisan/markdown';
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  DEFAULT_BASICS,
  addBasics,
  createPool,
  shuffle,
} from '@cubeartisan/server/routes/cube/helper.js';
import Cube from '@cubeartisan/server/models/cube.js';

import Deck from '@cubeartisan/server/models/deck.js';
import Blog from '@cubeartisan/server/models/blog.js';
import User from '@cubeartisan/server/models/user.js';
import Draft from '@cubeartisan/server/models/draft.js';
import Package from '@cubeartisan/server/models/package.js';
import GridDraft from '@cubeartisan/server/models/gridDraft.js';
import CubeAnalytic from '@cubeartisan/server/models/cubeAnalytic.js';
import { getCubeDescription } from '@cubeartisan/client/utils/Util.js';

const createCubeHandler = async (req, res) => {
  try {
    if (req.body.name.length < 5 || req.body.name.length > 100) {
      req.flash('danger', 'Cube name should be at least 5 characters long, and shorter than 100 characters.');
      return res.redirect(303, `/user/${req.user._id}`);
    }

    if (hasProfanity(req.body.name)) {
      req.flash('danger', 'Cube name should not use profanity.');
      return res.redirect(303, `/user/${req.user._id}`);
    }

    const { user } = req;
    const cubes = await Cube.find({
      owner: user._id,
    }).lean();

    if (cubes.length >= 48) {
      req.flash(
        'danger',
        'Cannot create a cube: Users can only have 48 cubes. Please delete one or more cubes to create new cubes.',
      );
      return res.redirect(303, `/user/${req.user._id}`);
    }

    const shortID = await generateShortId();
    let cube = new Cube();
    cube.shortID = shortID;
    cube.name = req.body.name;
    cube.owner = req.user._id;
    cube.cards = [];
    cube.articles = [];
    const details = carddb.cardFromId(carddb.nameToId['doubling cube'][0]);
    cube.image_uri = details.art_crop;
    cube.image_name = details.full_name;
    cube.image_artist = details.artist;
    cube.description = 'This is a brand new cube!';
    cube.owner_name = user.username;
    cube.date_updated = Date.now();
    cube.updated_string = cube.date_updated.toLocaleString('en-US');
    cube = setCubeType(cube, carddb);
    await cube.save();

    req.flash('success', 'Cube Added');
    return res.redirect(`/cube/${cube.shortID}`);
  } catch (err) {
    return handleRouteError(req, res, err, `/user/${req.user._id}`);
  }
};
export const createCube = [ensureAuth, createCubeHandler];

const cloneCubeHandler = async (req, res) => {
  if (!req.user) {
    req.flash('danger', 'Please log on to clone this cube.');
    return res.send({ success: 'false' });
  }

  const cubes = await Cube.find({
    owner: req.user._id,
  }).lean();

  if (cubes.length >= 48) {
    req.flash(
      'danger',
      'Cannot clone this cube: Users can only have 48 cubes. Please delete one or more cubes to create new cubes.',
    );
    return res.send({ success: 'false' });
  }

  const source = await Cube.findOne(buildIdQuery(req.params.id)).lean();

  const shortID = await generateShortId();
  let cube = new Cube();
  cube.shortID = shortID;
  cube.name = `Clone of ${source.name}`;
  cube.owner = req.user._id;
  cube.cards = source.cards;
  cube.articles = [];
  cube.image_uri = source.image_uri;
  cube.image_name = source.image_name;
  cube.image_artist = source.image_artist;
  cube.description = source.description;
  cube.owner_name = req.user.username;
  cube.date_updated = Date.now();
  cube.updated_string = cube.date_updated.toLocaleString('en-US');
  cube = setCubeType(cube, carddb);
  await cube.save();

  const sourceOwner = await User.findById(source.owner);

  if (!source.disableNotifications) {
    await addNotification(
      sourceOwner,
      req.user,
      `/cube/${cube._id}`,
      `${req.user.username} made a cube by cloning yours: ${cube.name}`,
    );
  }

  return res.send({ success: 'true', newCube: `/cube/${cube.shortID}` });
};
export const cloneCube = [ensureAuth, wrapAsyncApi(cloneCubeHandler)];

const addFormatHandler = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id));
    if (!req.user._id.equals(cube.owner)) {
      req.flash('danger', 'Formats can only be changed by cube owner.');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/list`);
    }

    let message = '';
    const { id, serializedFormat } = req.body;
    const format = JSON.parse(serializedFormat);

    format.defaultSeats = Number.parseInt(format.defaultSeats, 10);
    if (Number.isNaN(format.defaultSeats)) format.defaultSeats = 8;
    if (format.defaultSeats < 2 || format.defaultSeats > 16) {
      req.flash('danger', 'Default seat count must be between 2 and 16');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/playtest`);
    }

    if (id === '-1') {
      if (!cube.draft_formats) {
        cube.draft_formats = [];
      }
      cube.draft_formats.push(format);
      message = 'Custom format successfully added.';
    } else {
      cube.draft_formats[req.body.id] = format;
      message = 'Custom format successfully edited.';
    }

    await cube.save();
    req.flash('success', message);
    return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/playtest`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${encodeURIComponent(req.params.id)}/playtest`);
  }
};
export const addFormat = [ensureAuth, addFormatHandler];

const featureCubeHandler = async (req, res) => {
  try {
    const { user } = req;
    if (!isAdmin(user)) {
      req.flash('danger', 'Not Authorized');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}`);
    }

    const cube = await Cube.findOne(buildIdQuery(encodeURIComponent(req.params.id)));
    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}`);
    }

    cube.isFeatured = true;
    await cube.save();

    req.flash('success', 'Cube updated successfully.');
    return res.redirect(`/cube/${encodeURIComponent(req.params.id)}`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${encodeURIComponent(req.params.id)}`);
  }
};
export const featureCube = [ensureRole('Admin'), featureCubeHandler];

const unfeatureCubeHandler = async (req, res) => {
  try {
    const { user } = req;
    if (!isAdmin(user)) {
      req.flash('danger', 'Not Authorized');
      return res.redirect(303, `/cube/${encodeURIComponent(req.params.id)}`);
    }

    const cube = await Cube.findOne(buildIdQuery(encodeURIComponent(req.params.id)));
    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect(303, `/cube/${encodeURIComponent(req.params.id)}`);
    }

    cube.isFeatured = false;
    await cube.save();

    req.flash('success', 'Cube updated successfully.');
    return res.redirect(303, `/cube/${req.params.id}`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}`);
  }
};
export const unfeatureCube = [ensureRole('Admin'), unfeatureCubeHandler];

export const viewOverview = async (req, res) => {
  try {
    const cubeID = req.params.id;
    const cube = await Cube.findOne(buildIdQuery(cubeID)).lean();
    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('404');
    }

    const blogsQ = Blog.find({
      cube: cube._id,
    })
      .sort({
        date: -1,
      })
      .limit(1)
      .lean();

    const followersQ = User.find(
      {
        _id: {
          $in: cube.users_following,
        },
      },
      '_id username image artist users_following',
    ).lean();

    // calc cube prices
    for (const card of cube.cards) {
      card.details = {
        ...carddb.cardFromId(card.cardID, 'name prices'),
      };
    }
    const nameToCards = {};
    for (const card of cube.cards) {
      if (!nameToCards[card.details.name]) {
        const allVersionsOfCard = carddb.getIdsFromName(card.details.name) || [];
        nameToCards[card.details.name] = allVersionsOfCard.map((id) => carddb.cardFromId(id));
      }
    }

    const [blogs, followers] = await Promise.all([blogsQ, followersQ]);

    const cheapestDict = {};
    for (const card of cube.cards) {
      if (!cheapestDict[card.details.name]) {
        for (const version of nameToCards[card.details.name]) {
          if (!cheapestDict[version.name] || (version.prices.usd && version.prices.usd < cheapestDict[version.name])) {
            cheapestDict[version.name] = version.prices.usd;
          }
          if (
            !cheapestDict[version.name] ||
            (version.prices.usd_foil && version.prices.usd_foil < cheapestDict[version.name])
          ) {
            cheapestDict[version.name] = version.prices.usd_foil;
          }
        }
      }
    }

    let totalPriceOwned = 0;
    let totalPricePurchase = 0;
    for (const card of cube.cards) {
      if (!['Not Owned', 'Proxied'].includes(card.status) && card.details.prices) {
        if (card.finish === 'Foil') {
          totalPriceOwned += card.details.prices.usd_foil || card.details.prices.usd || 0;
        } else {
          totalPriceOwned += card.details.prices.usd || card.details.prices.usd_foil || 0;
        }
      }

      totalPricePurchase += cheapestDict[card.details.name] || 0;
    }
    cube.raw_desc = cube.body;

    // Performance
    delete cube.cards;
    delete cube.draft_formats;
    delete cube.maybe;

    cube.basics = cube.basics || DEFAULT_BASICS;

    return await render(
      req,
      res,
      'CubeOverviewPage',
      {
        cube,
        post: blogs ? blogs[0] : null,
        followed: req.user && cube.users_following ? cube.users_following.some((id) => id.equals(req.user._id)) : false,
        followers,
        priceOwned: !cube.privatePrices ? totalPriceOwned : null,
        pricePurchase: !cube.privatePrices ? totalPricePurchase : null,
      },
      {
        title: `${abbreviate(cube.name)} - Overview`,
        metadata: generateMeta(
          `${process.env.SITE_NAME} Overview: ${cube.name}`,
          getCubeDescription(cube),
          cube.image_uri,
          `${process.env.SITE_ROOT}/cube/${req.params.id}`,
        ),
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}`);
  }
};

const getRssHandler = async (req, res) => {
  const split = req.params.id.split(';');
  const cubeID = split[0];
  const cube = await Cube.findOne(buildIdQuery(cubeID)).lean();
  if (!cube) {
    req.flash('danger', `Cube ID ${req.params.id} not found/`);
    return res.redirect('/404');
  }
  const blogs = await Blog.find({
    cube: cube._id,
  })
    .sort({
      date: -1,
    })
    .exec();

  const feed = new RSS({
    title: cube.name,
    feed_url: `${process.env.SITE_ROOT}/cube/rss/${cube._id}`,
    site_url: process.env.SITE_ROOT,
  });

  blogs.forEach((blog) => {
    feed.item({
      title: blog.title,
      description: blog.markdown,
      guid: blog.id,
      date: blog.date,
    });
  });
  res.set('Content-Type', 'text/xml');
  return res.status(200).send(feed.xml());
};
export const getRss = wrapAsyncPage(getRssHandler);

const viewCubeComparisonHandler = async (req, res) => {
  const { id: idA, idB } = req.params;

  const cubeAq = Cube.findOne(buildIdQuery(idA)).lean();
  const cubeBq = Cube.findOne(buildIdQuery(idB)).lean();

  const [cubeA, cubeB] = await Promise.all([cubeAq, cubeBq]);

  if (!cubeA) {
    req.flash('danger', `Base cube not found: ${idA}`);
    return res.redirect('/404');
  }
  if (!cubeB) {
    req.flash('danger', `Comparison cube not found: ${idB}`);
    return res.redirect('/404');
  }

  const pids = new Set();
  const cardNames = new Set();
  const addDetails = (cards) => {
    cards.forEach((card, index) => {
      card.details = {
        ...carddb.cardFromId(card.cardID),
      };
      card.index = index;
      if (!card.type_line) {
        card.type_line = card.details.type;
      }
      if (card.details.tcgplayer_id) {
        pids.add(card.details.tcgplayer_id);
      }
      cardNames.add(card.details.name);
    });
    return cards;
  };

  cubeA.cards = addDetails(cubeA.cards);
  cubeB.cards = addDetails(cubeB.cards);

  const { aNames, bNames, inBoth, allCards } = await compareCubes(cubeA.cards, cubeB.cards);

  return render(
    req,
    res,
    'CubeComparePage',
    {
      cube: cubeA,
      cubeB,
      onlyA: aNames,
      onlyB: bNames,
      both: inBoth.map((card) => card.details.name),
      cards: allCards.map((card, index) =>
        Object.assign(card, {
          index,
        }),
      ),
      defaultTagColors: [...cubeA.tag_colors, ...cubeB.tag_colors],
      defaultShowTagColors: !req.user || !req.user.hide_tag_colors,
      defaultSorts: cubeA.default_sorts,
    },
    {
      title: `Comparing ${cubeA.name} to ${cubeB.name}`,
      metadata: generateMeta(
        `${process.env.SITE_NAME} Compare Cubes`,
        `Comparing "${cubeA.name}" To "${cubeB.name}"`,
        cubeA.image_uri,
        `${process.env.SITE_ROOT}/cube/compare/${idA}/to/${idB}`,
      ),
    },
  );
};
export const viewCubeComparison = wrapAsyncPage(viewCubeComparisonHandler);

export const viewCubeList = async (req, res) => {
  try {
    const fields =
      'cards maybe basics card_count name owner type tag_colors default_sorts default_show_unsorted overrideCategory categoryOverride categoryPrefixes image_uri shortID';
    const cube = await Cube.findOne(buildIdQuery(req.params.id), fields).lean();
    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('404');
    }

    const addDetails = (cards) => {
      cards.forEach((card, index) => {
        card.details = {
          ...carddb.cardFromId(card.cardID),
        };
        card.index = index;
        if (!card.type_line) {
          card.type_line = card.details.type;
        }
      });
      return cards;
    };

    cube.cards = addDetails(cube.cards);
    cube.maybe = addDetails(cube.maybe ? cube.maybe : []);

    return await render(
      req,
      res,
      'CubeListPage',
      {
        cube,
        defaultView: req.query.view || 'table',
        defaultPrimarySort: req.query.s1 || '',
        defaultSecondarySort: req.query.s2 || '',
        defaultTertiarySort: req.query.s3 || '',
        defaultQuaternarySort: req.query.s4 || '',
        defaultShowUnsorted: req.query.so || '',
        defaultFilterText: req.query.f || '',
        defaultTagColors: cube.tag_colors || [],
        defaultShowTagColors: !req.user || !req.user.hide_tag_colors,
      },
      {
        title: `${abbreviate(cube.name)} - List`,
        metadata: generateMeta(
          `${process.env.SITE_NAME} List: ${cube.name}`,
          getCubeDescription(cube),
          cube.image_uri,
          `${process.env.SITE_ROOT}/cube/list/${req.params.id}`,
        ),
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}`);
  }
};

export const viewPlaytest = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();

    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('404');
    }

    const decks = await Deck.find(
      {
        cube: cube._id,
      },
      'date seats _id cube owner cubeOwner basics',
    )
      .sort({
        date: -1,
      })
      .limit(10)
      .lean();

    return await render(
      req,
      res,
      'CubePlaytestPage',
      {
        cube: { ...cube, _id: cube._id.toString() },
        decks: decks.map((deck) => ({ ...deck, _id: deck._id.toString() })),
      },
      {
        title: `${abbreviate(cube.name)} - Playtest`,
        metadata: generateMeta(
          `${process.env.SITE_NAME} Playtest: ${cube.name}`,
          getCubeDescription(cube),
          cube.image_uri,
          `${process.env.SITE_ROOT}/cube/playtest/${req.params.id}`,
        ),
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}`);
  }
};

export const viewAnalytics = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();

    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('404');
    }

    const pids = new Set();
    const cardNames = new Set();
    const addDetails = (cards) => {
      cards.forEach((card, index) => {
        card.details = {
          ...carddb.cardFromId(card.cardID),
        };
        card.index = index;
        if (card.details.tcgplayer_id) {
          pids.add(card.details.tcgplayer_id);
        }

        if (card.details.tokens) {
          card.details.tokens = card.details.tokens
            .filter((tokenId) => tokenId !== card.cardID)
            .map((tokenId) => {
              const tokenDetails = carddb.cardFromId(tokenId);
              return {
                tags: [],
                status: 'Not Owned',
                colors: tokenDetails.color_identity,
                cmc: tokenDetails.cmc,
                cardID: tokenDetails._id,
                type_line: tokenDetails.type,
                addedTmsp: new Date(),
                finish: 'Non-foil',
                details: tokenDetails,
              };
            });
        }

        cardNames.add(card.details.name);
      });
      return cards;
    };
    cube.cards = addDetails(cube.cards || []);
    cube.maybe = addDetails(cube.maybe || []);

    const cubeAnalytics = await CubeAnalytic.findOne({ cube: cube._id });

    return await render(
      req,
      res,
      'CubeAnalyticsPage',
      {
        cube,
        cubeAnalytics: cubeAnalytics || { cards: [] },
        cubeID: req.params.id,
        defaultNav: req.query.nav,
        defaultShowTagColors: !req.user || !req.user.hide_tag_colors,
        defaultFormatId: Number(req.query.formatId),
        defaultFilterText: req.query.f,
        defaultTab: req.query.tab ? Number(req.query.tab) : 0,
      },
      {
        metadata: generateMeta(
          `${process.env.SITE_NAME} Analysis: ${cube.name}`,
          getCubeDescription(cube),
          cube.image_uri,
          `${process.env.SITE_ROOT}/cube/${req.params.id}/analytics`,
        ),
        title: `${abbreviate(cube.name)} - Analysis`,
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}`);
  }
};

export const redirectToSamplePackWithSeed = (req, res) =>
  res.redirect(`/cube/${encodeURIComponent(req.params.id)}/playtest/sample/${Date.now().toString()}`);

export const viewSamplePack = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();
    let pack;
    try {
      pack = await generatePack(req.params.id, carddb, req.params.seed);
    } catch (err) {
      req.flash('danger', err.message);
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/playtest`);
    }

    const width = Math.floor(Math.sqrt((5 / 3) * pack.pack.length));
    const height = Math.ceil(pack.pack.length / width);

    return await render(
      req,
      res,
      'CubeSamplePackPage',
      {
        seed: pack.seed,
        pack: pack.pack,
        cube,
      },
      {
        title: `${abbreviate(cube.name)} - Sample Pack`,
        metadata: generateMeta(
          `${process.env.SITE_NAME} Sample Pack`,
          `A sample pack from ${cube.name}`,
          `${process.env.SITE_ROOT}/cube/sample/${req.params.id}/${pack.seed}/image`,
          `${process.env.SITE_ROOT}/cube/sample${req.params.id}/${pack.seed}`,
          CARD_WIDTH * width,
          CARD_HEIGHT * height,
        ),
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}/playtest`);
  }
};

const viewSamplePackImageHandler = async (req, res) => {
  req.params.seed = req.params.seed.replace('.png', '');

  let pack;
  try {
    pack = await generatePack(req.params.id, carddb, req.params.seed);
  } catch (err) {
    req.flash('danger', err.message);
    res.redirect(`/cube/${encodeURIComponent(req.params.id)}/playtest`);
    return null;
  }

  const height = Math.floor(Math.sqrt(pack.pack.length));
  const width = Math.ceil(pack.pack.length / height);

  const srcArray = pack.pack.map((card, index) => ({
    src: card.imgUrl || card.details.image_normal,
    x: CARD_WIDTH * (index % width),
    y: CARD_HEIGHT * Math.floor(index / width),
  }));

  const imageBuffer = await generateSamplepackImageSharp(srcArray, {
    width: CARD_WIDTH * width,
    height: CARD_HEIGHT * height,
  });

  res.writeHead(200, {
    'Content-Type': 'image/webp',
  });
  return res.end(imageBuffer);
};
export const viewSamplePackImage = [cacheImmutableResponse, wrapAsyncPage(viewSamplePackImageHandler)];

const startGridDraftHandler = async (req, res) => {
  try {
    const numPacks = parseInt(req.body.packs, 10);
    const { type } = req.body;

    const numCards = numPacks * 9;

    const cube = await Cube.findOne(buildIdQuery(req.params.id), '_id name draft_formats cards owner basics').lean();

    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }

    if (cube.cards.length < numCards) {
      req.flash('danger', `Not enough cards, need ${numCards} cards for a ${numPacks} pack grid draft.`);
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/playtest`);
    }

    const source = shuffle(cube.cards)
      .slice(0, numCards)
      .map((card, index) => {
        card.index = index;
        return card;
      });

    const gridDraft = new GridDraft();
    gridDraft.draftType = type;
    gridDraft.cube = cube._id;

    const packs = [];
    const cards = [];
    for (let i = 0; i < numPacks; i++) {
      const pack = source.splice(0, 9);
      cards.push(...pack);
      packs.push(pack.map(({ index }) => index));
    }

    gridDraft.initial_state = packs;
    addBasics(cards, cube.basics, gridDraft);
    gridDraft.cards = cards;
    gridDraft.seats = [];
    const pool = createPool();

    // add human
    gridDraft.seats.push({
      bot: false,
      name: req.user ? req.user.username : 'Anonymous',
      userid: req.user ? req.user._id : null,
      drafted: pool,
      sideboard: pool,
      pickorder: [],
      pickedIndices: [],
    });

    // add bot
    gridDraft.seats.push({
      bot: true,
      name: 'Grid Bot',
      userid: null,
      drafted: pool,
      sideboard: pool,
      pickorder: [],
      pickedIndices: [],
    });

    await gridDraft.save();

    return res.redirect(`/griddraft/${gridDraft._id}`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${encodeURIComponent(req.params.id)}/playtest`);
  }
};
export const startGridDraft = [
  body('packs').toInt({ min: 1, max: 16 }),
  body('defaultStatus', 'Status must be valid.').isIn(['bot', '2playerlocal']),
  startGridDraftHandler,
];

const startDraftHandler = async (req, res) => {
  try {
    const idQuery = buildIdQuery(req.params.id);
    const cube = await Cube.findOne(idQuery, '_id name draft_formats cards basics shortID').lean();
    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }
    if (cube.cards.length === 0) {
      // This is a 4XX error, not a 5XX error
      req.flash('danger', 'This cube has no cards!');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/playtest`);
    }
    const params = req.body;
    if (params.seats < params.humanSeats) {
      req.flash('danger', 'You cannot have more human seats than total seats!');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/playtest`);
    }

    // insert card details everywhere that needs them
    for (const card of cube.cards) {
      card.details = carddb.cardFromId(card.cardID);
    }
    // setup draft
    const format = getDraftFormat(params, cube);

    let draft = new Draft();
    let populated = {};
    try {
      populated = createDraft(format, cube.cards, params.seats, req?.user?._id ?? null, req.body.botsOnly);
    } catch (err) {
      // This is a 4XX error, not a 5XX error
      req.flash('danger', err.message);
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/playtest`);
    }

    draft.initial_state = populated.initial_state;
    draft.seats = populated.seats;
    draft.timeout = populated.timeout;
    draft.cube = cube._id;
    addBasics(populated.cards, cube.basics, draft);
    draft.cards = populated.cards;

    await draft.save();

    if (req.body.botsOnly) {
      draft = await Draft.findById(draft._id).lean();
      // insert card details everywhere that needs them
      for (const card of draft.cards) {
        card.details = carddb.cardFromId(card.cardID);
      }
      return res.status(200).send({
        success: 'true',
        draft,
      });
    }
    return res.redirect(`/draft/${draft._id}`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${encodeURIComponent(req.params.id)}/playtest`);
  }
};
export const startDraft = [
  body('id').toInt(),
  body('botsOnly').toBoolean(),
  body('seats').toInt({ min: 2, max: 16 }),
  body('packs').toInt({ min: 1, max: 36 }),
  body('cards').toInt({ min: 1, max: 90 }),
  body('humanSeats').toInt({ min: 1, max: 16 }),
  body('timeout').toInt({ min: 0, max: 30 }),
  startDraftHandler,
];

const editCubeHandler = async (req, res) => {
  try {
    let cube = await Cube.findOne(buildIdQuery(req.params.id));

    if (!req.user._id.equals(cube.owner)) {
      req.flash('danger', 'Only cube owner may edit.');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/list`);
    }

    cube.date_updated = Date.now();
    cube.updated_string = cube.date_updated.toLocaleString('en-US');

    const edits = req.body.body.split(';');
    const removes = new Set();
    const adds = [];
    const changelog = [];

    for (const edit of edits) {
      if (edit.charAt(0) === '+') {
        // add id
        const details = carddb.cardFromId(edit.substring(1));
        if (!details) {
          req.logger.error({
            message: `Card not found: ${edit}`,
          });
        } else {
          adds.push(details);
          changelog.push(addCardMarkdown({ name: details.name, cardID: details._id }));
        }
      } else if (edit.charAt(0) === '-') {
        // remove id
        const [indexOutStr, outID] = edit.substring(1).split('$');
        if (outID) {
          const indexOut = parseInt(indexOutStr, 10);

          if (!Number.isInteger(indexOut) || indexOut < 0 || indexOut >= cube.cards.length) {
            req.flash('danger', `Unable to remove card due to invalid index: ${carddb.cardFromId(outID).name}`);
          } else {
            const card = cube.cards[indexOut];
            if (card.cardID && card.cardID === outID) {
              removes.add(indexOut);
              const fetchedCard = carddb.cardFromId(card.cardID);
              if (fetchedCard) {
                changelog.push(removeCardMarkdown({ cardID: card.cardID, name: fetchedCard.name }));
              }
            } else {
              req.flash('danger', `Unable to remove card due outdated index: ${carddb.cardFromId(outID).name}`);
            }
          }
        }
      } else if (edit.charAt(0) === '/') {
        const [outStr, idIn] = edit.substring(1).split('>');
        const detailsIn = carddb.cardFromId(idIn);
        if (!detailsIn) {
          req.logger.error({
            message: `Card not found: ${edit}`,
          });
        } else {
          adds.push(detailsIn);
        }

        const [indexOutStr, outID] = outStr.split('$');
        const indexOut = parseInt(indexOutStr, 10);
        if (!Number.isInteger(indexOut) || indexOut < 0 || indexOut >= cube.cards.length) {
          req.flash('danger', `Unable to replace card due to invalid index: ${carddb.cardFromId(outID).name}`);
          changelog.push(addCardMarkdown({ name: detailsIn.name, cardID: detailsIn._id }));
        } else {
          const cardOut = cube.cards[indexOut];
          if (cardOut.cardID === outID && cardOut.cardID) {
            removes.add(indexOut);
            changelog.push(
              replaceCardMarkdown(
                { cardID: cardOut.cardID, name: carddb.cardFromId(cardOut.cardID).name },
                { name: detailsIn.name, cardID: detailsIn._id },
              ),
            );
          } else {
            req.flash('danger', `Unable to replace card due outdated index: ${carddb.cardFromId(outID).name}`);
            changelog.push(addCardMarkdown({ name: detailsIn.name, cardID: detailsIn._id }));
          }
        }
      } else {
        req.flash('danger', 'Bad request format, all operations must be add, remove, or replace.');
        return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/list`);
      }
    }

    // Filter out removed and invalid cards, and add new cards.
    const newCards = adds.map((add) => newCard(add, [], cube.defaultStatus));
    cube.cards = cube.cards.filter((card, index) => card.cardID && !removes.has(index)).concat(newCards);
    cube.maybe = cube.maybe.filter((maybeCard) => !adds.some((addedCard) => addedCard._id === maybeCard.cardID));

    const blogpost = new Blog();
    blogpost.title = req.body.title;
    blogpost.markdown = changelog.join('\n\n');
    if (req.body.blog.length > 0) {
      blogpost.markdown += '\n\n';
      blogpost.markdown += req.body.blog.substring(0, 10000 - blogpost.markdown.length);
    }
    blogpost.owner = cube.owner;
    blogpost.date = Date.now();
    blogpost.cube = cube._id;
    blogpost.dev = 'false';
    blogpost.date_formatted = blogpost.date.toLocaleString('en-US');
    blogpost.username = cube.owner_name;
    blogpost.cubename = cube.name;

    cube = setCubeType(cube, carddb);

    await Promise.all([blogpost.save(), cube.save()]);

    if (req.body.mentions) {
      const owner = await User.findById(req.user._id);
      const mentions = req.body.mentions.toLowerCase().split(';');
      const query = User.find({ username_lower: mentions });
      await addMultipleNotifications(
        query,
        owner,
        `/cube/${cube._id}/blog/post/${blogpost._id}`,
        `${cube.owner_name} mentioned you in their blog post`,
      );
    }

    req.flash('success', 'Cube Updated');
    return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/list?updated=true`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${encodeURIComponent(req.params.id)}/list`);
  }
};
export const editCube = [ensureAuth, editCubeHandler];

const resizeCubeHandler = async (req, res) => {
  try {
    let cube = await Cube.findOne(buildIdQuery(req.params.id));

    if (!cube) {
      return res.status(400).send({
        success: 'false',
        message: 'Cube not found',
      });
    }

    if (!req.user._id.equals(cube.owner)) {
      return res.status(403).send({
        success: 'false',
        message: 'Cube can only be updated by cube owner.',
      });
    }

    const response = await fetch(`${process.env.MTGML_SERVER}/cube?num_recs=${1000}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cube: cube.cards.map(({ cardID }) => carddb.cardFromId(cardID).oracle_id) }),
    });
    if (!response.ok) {
      return handleRouteError(
        req,
        res,
        'Error fetching suggestion data.',
        `/cube/${encodeURIComponent(req.params.id)}/list`,
      );
    }
    const { cuts, adds } = await response.json();

    const pids = new Set();
    const cardNames = new Set();

    const formatTuple = (tuple) => {
      const details = carddb.getFirstReasonable(carddb.oracleToId[tuple[0]]);
      const card = newCard(details);
      card.details = details;

      if (card.details.tcgplayer_id) {
        pids.add(card.details.tcgplayer_id);
      }
      cardNames.add(card.details.name);

      return card;
    };

    const newSize = parseInt(req.params.size, 10);

    if (newSize === cube.cards.length) {
      req.flash('success', 'Your cube is already this size!');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/list`);
    }

    // we sort the reverse way depending on adding or removing
    let list = (newSize > cube.cards.length ? adds : cuts)
      .sort((a, b) => {
        if (a[1] > b[1]) return newSize > cube.cards.length ? -1 : 1;
        if (a[1] < b[1]) return newSize > cube.cards.length ? 1 : -1;
        return 0;
      })
      .map(formatTuple);

    const { filter, err } = makeFilter(req.body.filter);
    if (err) {
      return handleRouteError(req, res, 'Error parsing filter.', `/cube/${encodeURIComponent(req.params.id)}/list`);
    }
    list = (filter ? list.filter(filter) : list).slice(0, Math.abs(newSize - cube.cards.length));

    const changelog = [];
    if (newSize > cube.cards.length) {
      // we add to cube
      const toAdd = list.map((card) => {
        changelog.push(addCardMarkdown({ name: card.details.name, cardID: card.cardID }));
        return newCard(card.details);
      });
      cube.cards = cube.cards.concat(toAdd);
    } else {
      // we cut from cube
      for (const card of list) {
        for (let i = 0; i < cube.cards.length; i += 1) {
          if (carddb.cardFromId(cube.cards[i].cardID).name === carddb.cardFromId(card.cardID).name) {
            changelog.push(removeCardMarkdown({ name: card.details.name, cardID: card.cardID }));
            cube.cards.splice(i, 1);
            i = cube.cards.length;
          }
        }
      }
    }

    cube = setCubeType(cube, carddb);

    const blogpost = new Blog();
    blogpost.title = 'Resize - Automatic Post';
    blogpost.owner = cube.owner;
    blogpost.date = Date.now();
    blogpost.cube = cube._id;
    blogpost.dev = 'false';
    blogpost.markdown = changelog.join('\n\n');
    blogpost.date_formatted = blogpost.date.toLocaleString('en-US');
    blogpost.username = cube.owner_name;
    blogpost.cubename = cube.name;

    await blogpost.save();
    await cube.save();

    req.flash('success', 'Cube Resized succesfully.');
    return res.redirect(`/cube/${req.params.id}/list`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${encodeURIComponent(req.params.id)}/list`);
  }
};
export const resizeCube = [ensureAuth, resizeCubeHandler];

const deleteCubeHandler = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id));

  if (!req.user._id.equals(cube.owner)) {
    req.flash('danger', 'Not Authorized');
    return res.redirect(`/cube/${encodeURIComponent(req.params.id)}`);
  }
  await Cube.deleteOne(buildIdQuery(req.params.id));

  req.flash('success', 'Cube Removed');
  return res.redirect('/dashboard');
};
export const deleteCube = [ensureAuth, wrapAsyncPage(deleteCubeHandler)];

const deleteFormatHandler = async (req, res) => {
  try {
    const { id: cubeid, index } = req.params;
    const cube = await Cube.findOne(buildIdQuery(cubeid));
    if (!cube) {
      return res.status(404).send({
        success: 'false',
        message: 'No such cube.',
      });
    }
    if (!req.user._id.equals(cube.owner)) {
      return res.status(401).send({
        success: 'false',
        message: 'Not authorized.',
      });
    }
    if (index < 0 || index >= cube.draft_formats.length) {
      return res.status(400).send({
        success: 'false',
        message: 'Invalid request format.',
      });
    }

    cube.draft_formats.splice(index, 1);
    // update defaultFormat if necessary
    if (index === cube.defaultDraftFormat) {
      cube.defaultDraftFormat = -1;
    } else if (index < cube.defaultDraftFormat) {
      cube.defaultDraftFormat -= 1;
    }

    await cube.save();
    return res.status(200).send({
      success: 'true',
    });
  } catch (err) {
    req.logger.error(err);
    return res.status(500).send({
      success: 'false',
      message: 'Error deleting format.',
    });
  }
};
export const deleteFormat = [ensureAuth, param('index').toInt(), deleteFormatHandler];

const setDefaultFormatHandler = async (req, res) => {
  const { formatId, id } = req.params;
  const cube = await Cube.findOne(buildIdQuery(id));
  if (
    !cube ||
    !cube.owner.equals(req.user._id) ||
    !Number.isInteger(formatId) ||
    formatId >= cube.draft_formats.length ||
    formatId < -1
  ) {
    return res.sendStatus(401);
  }

  cube.defaultDraftFormat = formatId;

  await cube.save();
  return res.status(200).send({
    success: 'true',
  });
};
export const setDefaultFormat = [ensureAuth, param('formatId').toInt(), wrapAsyncApi(setDefaultFormatHandler)];

const editCubeOverviewHandler = async (req, res) => {
  const updatedCube = req.body;

  const cube = await Cube.findById(updatedCube._id);
  if (!cube) {
    return res.status(404).send({
      success: 'false',
      message: 'Cube Not Found',
    });
  }

  const { user } = req;
  if (!user._id.equals(cube.owner)) {
    return res.status(403).send({
      success: 'false',
      message: 'Unauthorized',
    });
  }

  if (updatedCube.shortID !== cube.shortID) {
    updatedCube.shortID = updatedCube.shortID.toLowerCase();
    const taken = await Cube.findOne(buildIdQuery(updatedCube.shortID));

    if (taken) {
      return res.status(400).send({
        success: 'false',
        message: 'Custom URL already taken.',
      });
    }

    cube.shortID = updatedCube.shortID;
  }

  cube.name = updatedCube.name;
  cube.isListed = updatedCube.isListed;
  cube.privatePrices = updatedCube.privatePrices;
  cube.overrideCategory = updatedCube.overrideCategory;

  const image = carddb.imagedict[updatedCube.image_name.toLowerCase()];

  if (image) {
    cube.image_uri = updatedCube.image_uri;
    cube.image_artist = updatedCube.image_artist;
    cube.image_name = updatedCube.image_name;
  }

  if (updatedCube.description) {
    cube.description = updatedCube.description;
  }
  cube.date_updated = Date.now();
  cube.updated_string = cube.date_updated.toLocaleString('en-US');

  // cube category override
  if (cube.overrideCategory) {
    const categories = ['Vintage', 'Legacy+', 'Legacy', 'Modern', 'Pioneer', 'Historic', 'Standard', 'Set'];
    const prefixes = [
      'Powered',
      'Unpowered',
      'Pauper',
      'Peasant',
      'Budget',
      'Silver-bordered',
      'Commander',
      'Battle Box',
      'Multiplayer',
      'Judge Tower',
    ];

    if (!categories.includes(updatedCube.categoryOverride)) {
      return res.status(400).send({
        success: 'false',
        message: 'Not a valid category override.',
      });
    }

    for (let i = 0; i < updatedCube.categoryPrefixes.length; i += 1) {
      if (!prefixes.includes(updatedCube.categoryPrefixes[i])) {
        return res.status(400).send({
          success: 'false',
          message: 'Not a valid category prefix.',
        });
      }
    }

    cube.categoryOverride = updatedCube.categoryOverride;
    cube.categoryPrefixes = updatedCube.categoryPrefixes;
  }

  // cube tags
  cube.tags = updatedCube.tags.filter((tag) => tag && tag.length > 0).map((tag) => tag.toLowerCase());
  setCubeType(cube, carddb);

  await cube.save();
  return res.status(200).send({
    success: 'true',
  });
};
export const editCubeOverview = [
  ensureAuth,
  body('name', 'Cube name should be between 5 and 100 characters long.').isLength({ min: 5, max: 100 }),
  body('name', 'Cube name may not use profanity.').custom((value) => !hasProfanity(value)),
  body('shortID', 'Custom URL must contain only alphanumeric characters, dashes, and underscores.').matches(
    /^[A-Za-z0-9_-]*$/,
  ),
  body('shortID', `Custom URL may not be empty or longer than 100 characters.`).isLength({ min: 1, max: 100 }),
  body('shortID', 'Custom URL may not use profanity.').custom((value) => !hasProfanity(value)),
  jsonValidationErrors,
  wrapAsyncApi(editCubeOverviewHandler),
];

const updateCubeSettingsHandler = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id));
  if (!cube) {
    return res.status(404).send({
      success: 'false',
      message: 'Cube Not Found',
    });
  }

  if (!req.user._id.equals(cube.owner)) {
    return res.status(403).send({
      success: 'false',
      message: 'Unauthorized',
    });
  }

  const update = req.body;
  for (const field of [
    'isListed',
    'privatePrices',
    'defaultStatus',
    'defaultPrinting',
    'disableNotifications',
    'useCubeElo',
  ]) {
    if (update[field] !== undefined) {
      cube[field] = update[field];
    }
  }

  await cube.save();
  return res.status(200).send({
    success: 'true',
  });
};
export const updateCubeSettings = [
  ensureAuth,
  body('isListed').toBoolean(),
  body('privatePrices').toBoolean(),
  body('disableNotifications').toBoolean(),
  body('defaultStatus', 'Status must be valid.').isIn(['Owned', 'Not Owned']),
  body('defaultPrinting', 'Printing must be valid.').isIn(['recent', 'first']),
  jsonValidationErrors,
  wrapAsyncApi(updateCubeSettingsHandler),
];

const getCardNamesForCubeHandler = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();

  const cardnames = [];
  for (const card of cube.cards) {
    binaryInsert(carddb.cardFromId(card.cardID).name, cardnames);
  }

  // const result = turnToTree(cardnames);
  return res.status(200).send({
    success: 'true',
    cardnames,
  });
};
export const getCardNamesForCube = wrapAsyncApi(getCardNamesForCubeHandler);

const getCardTagsForCubeHandler = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();
  const tags = cubeCardTags(cube);

  return res.status(200).send({
    success: 'true',
    tags: turnToTree(tags),
  });
};
export const getCardTagsForCube = wrapAsyncApi(getCardTagsForCubeHandler);

const updateTagColorsHandler = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id));

  if (!req.user._id.equals(cube.owner)) {
    return res.status(401).send({
      success: 'false',
    });
  }

  cube.tag_colors = req.body;

  await cube.save();
  return res.status(200).send({
    success: 'true',
  });
};
export const updateTagColors = wrapAsyncApi(updateTagColorsHandler);

const getTagColorsHandler = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();

  const tagColors = buildTagColors(cube);
  const tags = tagColors.map((item) => item.tag);

  // this is for the case of cube compare
  const cubeB = await Cube.findOne(buildIdQuery(req.query.b_id)).lean();

  if (cubeB) {
    const bTagColors = buildTagColors(cubeB);
    for (const bTag of bTagColors) {
      if (!tags.includes(bTag.tag)) {
        tagColors.push(bTag);
      }
    }
  }

  const showTagColors = req.user ? !req.user.hide_tag_colors : true;

  res.status(200).send({
    success: 'true',
    tagColors,
    showTagColors,
  });
};
export const getTagColors = wrapAsyncApi(getTagColorsHandler);

const getCardInCubeByNameHandler = async (req, res) => {
  const { id: cubeid, name } = req.params;
  const cardname = normalizeName(decodeName(name));

  const cube = await Cube.findOne(buildIdQuery(cubeid)).lean();

  for (const card of cube.cards) {
    if (carddb.cardFromId(card.cardID).name_lower === cardname) {
      card.details = carddb.cardFromId(card.cardID);
      return res.status(200).send({
        success: 'true',
        card,
      });
    }
  }
  return res.status(200).send({
    success: 'true',
  });
};
export const getCardInCubeByName = wrapAsyncApi(getCardInCubeByNameHandler);

const updateCubeBasicsHandler = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id));

  if (!cube) {
    return res.status(400).send({
      success: 'false',
      message: 'Cube not found',
    });
  }

  if (!req.user._id.equals(cube.owner)) {
    return res.status(403).send({
      success: 'false',
      message: 'Cube can only be updated by cube owner.',
    });
  }

  cube.basics = req.body;

  await cube.save();

  return res.status(200).send({
    success: 'true',
  });
};
export const updateCubeBasics = [ensureAuth, wrapAsyncApi(updateCubeBasicsHandler)];

const getDefaultPrintingHandler = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id), 'defaultPrinting').lean();
  const card = carddb.getMostReasonable(req.params.name, cube.defaultPrinting);
  if (card) {
    return res.status(200).send({
      success: 'true',
      card,
    });
  }
  return res.status(200).send({
    success: 'false',
  });
};
export const getDefaultPrinting = wrapAsyncApi(getDefaultPrintingHandler);

const updateCardInCubeHandler = async (req, res) => {
  const { src, updated } = req.body;
  if (
    !src ||
    (src && typeof src.index !== 'number') ||
    (updated.cardID && typeof updated.cardID !== 'string') ||
    (updated.name && typeof updated.name !== 'string') ||
    (updated.cmc && (typeof updated.cmc !== 'number' || updated.cmc < 0 || !Number.isInteger(updated.cmc * 2))) ||
    (updated.status && typeof updated.status !== 'string') ||
    (updated.type_line && typeof updated.type_line !== 'string') ||
    (updated.colors && !Array.isArray(updated.colors)) ||
    (updated.tags && !Array.isArray(updated.tags)) ||
    (updated.finish && typeof updated.finish !== 'string')
  ) {
    return res.status(400).send({
      success: 'false',
      message: 'Failed input validation',
    });
  }
  const cube = await Cube.findOne(buildIdQuery(req.params.id));

  if (!req.user._id.equals(cube.owner)) {
    return res.status(401).send({
      success: 'false',
      message: 'Insufficient permissions',
    });
  }
  if (src.index >= cube.cards.length) {
    return res.status(400).send({
      success: 'false',
      message: 'No such card',
    });
  }

  const card = cube.cards[src.index];
  if (!card.type_line) {
    card.type_line = carddb.cardFromId(card.cardID).type;
  }

  if (!cardsAreEquivalent(src, card)) {
    return res.status(400).send({
      success: 'false',
      message: 'Cards not equivalent',
    });
  }

  for (const key of Object.keys(Cube.schema.paths.cards.schema.paths)) {
    if (!Object.prototype.hasOwnProperty.call(updated, key)) {
      updated[key] = card[key];
    }
  }
  for (const key of Object.keys(updated)) {
    if (updated[key] === null) {
      delete updated[key];
    }
  }
  cube.cards[src.index] = updated;

  setCubeType(cube, carddb);

  await cube.save();
  return res.status(200).send({
    success: 'true',
  });
};
export const updateCardInCube = [ensureAuth, wrapAsyncApi(updateCardInCubeHandler)];

const updateCardsInCubeHandler = async (req, res) => {
  const { selected, updated } = req.body;
  if (
    (updated.cmc && typeof updated.cmc !== 'number') ||
    (updated.status && typeof updated.status !== 'string') ||
    (updated.type_line && typeof updated.type_line !== 'string') ||
    (updated.colors && !Array.isArray(updated.colors)) ||
    (updated.tags && !Array.isArray(updated.tags)) ||
    !Array.isArray(selected) ||
    selected.some((index) => !Number.isInteger(index) || index < 0)
  ) {
    return res.status(400).send({
      success: 'false',
      message: 'Failed input validation',
    });
  }

  const cube = await Cube.findOne(buildIdQuery(req.params.id));
  if (!req.user._id.equals(cube.owner)) {
    return res.status(404).send({
      success: 'false',
      message: 'Unauthorized',
    });
  }

  const allUpdates = {
    $set: {},
  };
  for (const index of selected) {
    if (updated.status) {
      allUpdates.$set[`cards.${index}.status`] = updated.status;
    }
    if (updated.cmc) {
      allUpdates.$set[`cards.${index}.cmc`] = updated.cmc;
    }
    if (updated.type_line) {
      allUpdates.$set[`cards.${index}.type_line`] = updated.type_line;
    }
    if (updated.colors) {
      allUpdates.$set[`cards.${index}.colors`] = updated.colors.filter((color) => Array.from('WUBRG').includes(color));
    }
    if (updated.colorC) {
      allUpdates.$set[`cards.${index}.colors`] = [];
    }
    if (updated.finish) {
      allUpdates.$set[`cards.${index}.finish`] = updated.finish;
    }
    if (updated.tags) {
      if (updated.addTags) {
        if (!allUpdates.$addToSet) {
          allUpdates.$addToSet = {};
        }
        allUpdates.$addToSet[`cards.${index}.tags`] = updated.tags;
      }
      if (updated.deleteTags) {
        if (!allUpdates.$pullAll) {
          allUpdates.$pullAll = {};
        }
        allUpdates.$pullAll[`cards.${index}.tags`] = updated.tags;
      }
    }
  }

  await cube.updateOne(allUpdates);
  return res.status(200).send({
    success: 'true',
  });
};
export const updateCardsInCube = [ensureAuth, wrapAsyncApi(updateCardsInCubeHandler)];

export const getMaybeboard = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();
    return res.status(200).send({
      success: 'true',
      maybe: maybeCards(cube, carddb),
    });
  } catch (err) {
    res.logger.error(err);
    return res.status(500).send({
      success: 'false',
      maybe: [],
    });
  }
};

const addCardsToCubeHandler = async (req, res) => {
  let cube = await Cube.findOne(buildIdQuery(req.params.id));

  if (!cube) {
    return res.status(400).send({
      success: 'false',
      message: 'Cube not found',
    });
  }

  if (!req.user._id.equals(cube.owner)) {
    return res.status(403).send({
      success: 'false',
      message: 'Cube can only be updated by cube owner.',
    });
  }

  let tag = null;
  if (req.body.packid) {
    const pack = await Package.findById(req.body.packid);
    if (pack) {
      tag = pack.title;
    }
  }

  if (tag) {
    cube.cards.push(
      ...req.body.cards.map((id) => {
        const c = newCard(carddb.cardFromId(id));
        c.tags = [tag];
        c.notes = `Added from package "${tag}": ${process.env.SITE_ROOT}/packages/${req.body.packid}`;
        return c;
      }),
    );
  } else {
    cube.cards.push(...req.body.cards.map((id) => newCard(carddb.cardFromId(id))));
  }

  cube = setCubeType(cube, carddb);
  await cube.save();

  if (tag) {
    const blogpost = new Blog();
    blogpost.title = `Added Package "${tag}"`;
    blogpost.markdown = `Add from the package [${tag}](/packages/${req.body.packid})\n`;
    blogpost.markdown += req.body.cards
      .map((card) => addCardMarkdown({ cardID: card, name: carddb.cardFromId(card).name }))
      .join('\n\n');
    blogpost.owner = cube.owner;
    blogpost.date = Date.now();
    blogpost.cube = cube._id;
    blogpost.dev = 'false';
    blogpost.date_formatted = blogpost.date.toLocaleString('en-US');
    blogpost.username = cube.owner_name;
    blogpost.cubename = cube.name;

    await blogpost.save();
  }

  return res.status(200).send({
    success: 'true',
  });
};
export const addCardsToCube = [ensureAuth, wrapAsyncApi(addCardsToCubeHandler)];

const updateMaybeboardHandler = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id));

  if (!cube) {
    return res.status(400).send({
      success: 'false',
      message: 'Cube not found',
    });
  }

  if (!req.user._id.equals(cube.owner)) {
    return res.status(403).send({
      success: 'false',
      message: 'Maybeboard can only be updated by owner.',
    });
  }

  const maybe = Array.from(cube.maybe || []);

  const removeIndices = Array.isArray(req.body.remove) ? req.body.remove : [];
  const withRemoved = maybe.filter((_, index) => !removeIndices.includes(index));

  const addCards = Array.isArray(req.body.add) ? req.body.add : [];
  const addCardsNoDetails = addCards.map(({ details, ...card }) => ({
    ...newCard(details),
    ...card,
  }));
  const withAdded = [...withRemoved, ...addCardsNoDetails];

  cube.maybe = withAdded;
  await cube.save();

  const added = cube.maybe.slice(cube.maybe.length - addCardsNoDetails.length);

  return res.status(200).send({
    success: 'true',
    added: Object.fromEntries(added.map(({ _id, cardID }) => [cardID, _id])),
  });
};
export const updateMaybeboard = [ensureAuth, wrapAsyncApi(updateMaybeboardHandler)];

const updateMaybeboardCardHandler = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id));
  if (!req.user._id.equals(cube.owner)) {
    return res.status(403).send({
      success: 'false',
      message: 'Maybeboard can only be updated by cube owner.',
    });
  }

  const card = cube.maybe.find((c) => c._id.equals(req.params.cardid));
  if (!card) {
    return res.status(404).send({
      success: 'false',
      message: 'No card found to update.',
    });
  }

  const { updated } = req.body;
  if (!updated) {
    return res.status(400).send({
      success: 'false',
      message: 'Bad request.',
    });
  }
  const newVersion = updated.cardID && updated.cardID !== card.cardID;
  for (const field of ['cardID', 'status', 'finish', 'cmc', 'type_line', 'imgUrl', 'imgBackUrl', 'colors']) {
    if (Object.prototype.hasOwnProperty.call(updated, field)) {
      card[field] = updated[field];
    }
  }
  await cube.save();

  if (newVersion) {
    return res.status(200).send({
      success: 'true',
      details: carddb.cardFromId(card.cardID),
    });
  }

  return res.status(200).send({
    success: 'true',
  });
};
export const updateMaybeboardCard = [ensureAuth, wrapAsyncApi(updateMaybeboardCardHandler)];

const updateCubeSortsHandler = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id));

  if (!req.user._id.equals(cube.owner)) {
    return res.status(404).send({
      success: 'false',
      message: 'Unauthorized',
    });
  }

  cube.default_sorts = req.body.sorts;
  cube.default_show_unsorted = !!req.body.showOther;
  await cube.save();
  return res.status(200).send({
    success: 'true',
  });
};
export const updateCubeSorts = [ensureAuth, wrapAsyncApi(updateCubeSortsHandler)];

const generateP1P1Handler = async (req, res) => {
  const result = await generatePack(req.params.id, carddb, req.params.seed);

  return res.status(200).send({
    seed: req.params.seed,
    pack: result.pack.map((card) => card.name),
  });
};
export const generateP1P1 = wrapAsyncApi(generateP1P1Handler);

const getDateCubeUpdatedHandler = async (req, res) => {
  const { id } = req.params;
  const result = await Cube.findOne(buildIdQuery(id), 'date_updated').lean();
  if (!result) {
    return res.status(404).send({
      success: 'false',
      message: 'No such cube.',
    });
  }
  return res.status(200).send({
    success: 'true',
    date_updated: result.date_updated.valueOf(),
  });
};
export const getDateCubeUpdated = wrapAsyncApi(getDateCubeUpdatedHandler);

const getRecommendationsHandler = async (req, res) => {
  const { id } = req.params;
  const cube = await Cube.findOne(buildIdQuery(id)).lean();
  const response = await fetch(`${process.env.MTGML_SERVER}/cube?num_recs=${1000}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cube: cube.cards.map(({ cardID }) => carddb.cardFromId(cardID).oracle_id) }),
  });
  if (!response.ok) {
    winston.error('Flask server response not OK.', { response, text: await response.text() });
    return res.status(500).send({
      success: 'false',
      result: {},
    });
  }
  const { cuts, adds } = await response.json();

  const formatTuple = ([oracleId, score]) => {
    const details = carddb.getFirstReasonable(carddb.oracleToId[oracleId]);
    const card = newCard(details);
    card.details = details;

    return { card, score };
  };

  const addlist = adds.sort((a, b) => b[1] - a[1]).map(formatTuple);

  // this is sorted the opposite way, as lower numbers mean we want to cut it
  const cutlist = cuts.sort((a, b) => a[1] - b[1]).map(formatTuple);

  return res.status(200).send({
    success: 'true',
    result: {
      toAdd: addlist,
      toCut: cutlist,
    },
  });
};
export const getRecommendations = wrapAsyncApi(getRecommendationsHandler);

export const getCardImageById = async (req, res) => {
  try {
    const { cardid: id } = req.params;

    const cube = await Cube.findOne(buildIdQuery(req.params.id), 'cards').lean();

    const found = cube.cards
      .map((card) => ({ details: carddb.cardFromId(card.cardID), ...card }))
      .find(
        (card) => id === card.cardID || id.toLowerCase() === card.details.name_lower || id === card.details.oracleId,
      );

    // if id is not a scryfall ID, error
    const card = carddb.cardFromId(found ? found.cardID : '');
    if (card.error) {
      req.flash('danger', `Card with id ${id} not found.`);
      return res.redirect('/404');
    }

    return res.redirect(card.image_normal);
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

export const viewCubeDecks = async (req, res) => {
  try {
    const { id: cubeid } = req.params;
    const pagesize = 30;

    const cube = await Cube.findOne(buildIdQuery(cubeid), Cube.LAYOUT_FIELDS).lean();

    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }

    const decksq = Deck.find(
      {
        cube: cube._id,
      },
      '_id seats date cube owner cubeOwner',
    )
      .sort({
        date: -1,
      })
      .skip(pagesize * Math.max(req.params.page, 0))
      .limit(pagesize)
      .lean()
      .exec();
    const numDecksq = Deck.countDocuments({
      cube: cube._id,
    }).exec();

    const [numDecks, decks] = await Promise.all([numDecksq, decksq]);

    return await render(
      req,
      res,
      'CubeDecksPage',
      {
        cube,
        decks,
        pages: Math.ceil(numDecks / pagesize),
        activePage: Math.max(req.params.page, 0),
      },
      {
        title: `${abbreviate(cube.name)} - Draft Decks`,
        metadata: generateMeta(
          `${process.env.SITE_NAME} Decks: ${cube.name}`,
          getCubeDescription(cube),
          cube.image_uri,
          `${process.env.SITE_ROOT}/user/decks/${encodeURIComponent(req.params.cubeid)}`,
        ),
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${encodeURIComponent(req.params.cubeid)}/playtest`);
  }
};

const uploadDeckListHandler = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id));
  if (!cube) {
    req.flash('danger', 'Cube not found.');
    return res.redirect('/404');
  }

  if (!req.user._id.equals(cube.owner)) {
    req.flash('danger', 'Not Authorized');
    return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/playtest`);
  }

  const cards = req.body.body.match(/[^\r\n]+/g);
  if (!cards) {
    req.flash('danger', 'No cards detected');
    return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/playtest`);
  }

  const cardList = [];

  const added = [];
  for (let i = 0; i < 16; i += 1) {
    added.push([]);
  }

  for (let i = 0; i < cards.length; i += 1) {
    const item = cards[i].toLowerCase().trim();
    const numericMatch = item.match(/^([0-9]+)x? (.*)$/);
    if (numericMatch) {
      let count = parseInt(numericMatch[1], 10);
      if (!Number.isInteger(count)) {
        count = 1;
      }
      for (let j = 0; j < count; j += 1) {
        cards.push(numericMatch[2]);
      }
    } else {
      let selected = null;
      // does not have set info
      const normalizedName = normalizeName(item);
      const potentialIds = carddb.getIdsFromName(normalizedName);
      if (potentialIds && potentialIds.length > 0) {
        const inCube = cube.cards.find((card) => carddb.cardFromId(card.cardID).name_lower === normalizedName);
        if (inCube) {
          selected = {
            finish: inCube.finish,
            imgBackUrl: inCube.imgBackUrl,
            imgUrl: inCube.imgUrl,
            cardID: inCube.cardID,
            details: carddb.cardFromId(inCube.cardID),
          };
        } else {
          const reasonableCard = carddb.getMostReasonable(normalizedName, cube.defaultPrinting);
          const reasonableId = reasonableCard ? reasonableCard._id : null;
          const selectedId = reasonableId || potentialIds[0];
          selected = {
            cardID: selectedId,
            details: carddb.cardFromId(selectedId),
          };
        }
      }
      if (selected) {
        // push into correct column.
        let column = Math.min(7, selected.cmc !== undefined ? selected.cmc : selected.details.cmc);
        if (!selected.details.type.toLowerCase().includes('creature')) {
          column += 8;
        }
        added[column].push(cardList.length);
        cardList.push(selected);
      }
    }
  }

  const deck = new Deck();
  deck.cards = cardList;
  deck.date = Date.now();
  deck.cubename = cube.name;
  deck.cube = cube._id;
  deck.cubeOwner = cube.owner;
  deck.owner = req.user._id;
  deck.seats = [
    {
      userid: req.user._id,
      username: req.user.username,
      name: `${req.user.username}'s decklist upload on ${deck.date.toLocaleString('en-US')}`,
      deck: [added.slice(0, 8), added.slice(8, 16)],
      sideboard: createPool(),
    },
  ];
  deck.draft = null;

  await deck.save();

  cube.numDecks += 1;
  await addDeckCardAnalytics(cube, deck, carddb);

  await cube.save();

  return res.redirect(`/deck/${deck._id}/build`);
};
export const uploadDeckList = [ensureAuth, wrapAsyncPage(uploadDeckListHandler)];

export const redirectToFirstPageOfCubeBlog = (req, res) =>
  res.redirect(`/cube/${encodeURIComponent(req.params.id)}/blog/page/0`);

export const addSeedToP1P1 = (req, res) =>
  res.redirect(303, `/cube/${encodeURIComponent(req.params.id)}/playtest/p1p1/${Date.now().toString()}`);

export const redirectToFirstPageOfCubeDecks = (req, res) => res.redirect(`/cube/${req.params.id}/decks/0`);

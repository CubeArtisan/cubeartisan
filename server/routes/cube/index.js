import express from 'express';
import { body, param } from 'express-validator';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import RSS from 'rss';
import canvas from 'canvas';

import { createDraft, getDraftFormat } from '@cubeartisan/client/drafting/createdraft.js';
import { makeFilter } from '@cubeartisan/client/filtering/FilterCards.js';
import { decodeName, normalizeName } from '@cubeartisan/client/utils/Card.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import { render } from '@cubeartisan/server/serverjs/render.js';
import { ensureAuth, flashValidationErrors, jsonValidationErrors } from '@cubeartisan/server/routes/middleware.js';
import {
  addCardToCube,
  addMultipleNotifications,
  addNotification,
  binaryInsert,
  fromEntries,
  handleRouteError,
  hasProfanity,
  isAdmin,
  newCard,
  turnToTree,
  wrapAsyncApi,
} from '@cubeartisan/server/serverjs/util.js';
import generateMeta from '@cubeartisan/server/serverjs/meta.js';
import {
  CSVtoCards,
  abbreviate,
  addCardHtml,
  buildIdQuery,
  buildTagColors,
  cachePromise,
  cardsAreEquivalent,
  compareCubes,
  cubeCardTags,
  generatePack,
  generateSamplepackImage,
  generateShortId,
  maybeCards,
  removeCardHtml,
  replaceCardHtml,
  setCubeType,
  addDeckCardAnalytics,
} from '@cubeartisan/server/serverjs/cubefn.js';
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  DEFAULT_BASICS,
  addBasics,
  bulkUpload,
  createPool,
  shuffle,
  updateCubeAndBlog,
} from '@cubeartisan/server/routes/cube/helper.js';
import Cube from '@cubeartisan/server/models/cube.js';

import Deck from '@cubeartisan/server/models/deck.js';
import Blog from '@cubeartisan/server/models/blog.js';
import User from '@cubeartisan/server/models/user.js';
import Draft from '@cubeartisan/server/models/draft.js';
import Package from '@cubeartisan/server/models/package.js';
import GridDraft from '@cubeartisan/server/models/gridDraft.js';
import CubeAnalytic from '@cubeartisan/server/models/cubeAnalytic.js';
import {
  exportForMtgo,
  exportToCsv,
  exportToCubeCobra,
  exportToForge,
  exportToJson,
  exportToPlaintext,
  exportToXmage,
} from '@cubeartisan/server/routes/cube/export.js';
import CubeBlogRoutes from '@cubeartisan/server/routes/cube/blog.js';
import { getCubeDescription } from '@cubeartisan/client/utils/Util.js';

const { Canvas, Image } = canvas;
Canvas.Image = Image;

const createCube = async (req, res) => {
  try {
    if (req.body.name.length < 5 || req.body.name.length > 100) {
      req.flash('danger', 'Cube name should be at least 5 characters long, and shorter than 100 characters.');
      return res.redirect(303, `/user/view/${req.user.id}`);
    }

    if (hasProfanity(req.body.name)) {
      req.flash('danger', 'Cube name should not use profanity.');
      return res.redirect(303, `/user/view/${req.user.id}`);
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
      return res.redirect(303, `/user/view/${req.user.id}`);
    }

    const shortID = await generateShortId();
    let cube = new Cube();
    cube.shortID = shortID;
    cube.name = req.body.name;
    cube.owner = req.user.id;
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
    return res.redirect(`/cube/overview/${cube.shortID}`);
  } catch (err) {
    return handleRouteError(req, res, err, `/user/view/${req.user.id}`);
  }
};

const cloneCube = async (req, res) => {
  try {
    if (!req.user) {
      req.flash('danger', 'Please log on to clone this cube.');
      return res.redirect(303, `/cube/list/${encodeURIComponent(req.params.id)}`);
    }

    const cubes = await Cube.find({
      owner: req.user._id,
    }).lean();

    if (cubes.length >= 48) {
      req.flash(
        'danger',
        'Cannot clone this cube: Users can only have 48 cubes. Please delete one or more cubes to create new cubes.',
      );
      return res.redirect(303, `/cube/list/${encodeURIComponent(req.params.id)}`);
    }

    const source = await Cube.findOne(buildIdQuery(req.params.id)).lean();

    const shortID = await generateShortId();
    let cube = new Cube();
    cube.shortID = shortID;
    cube.name = `Clone of ${source.name}`;
    cube.owner = req.user.id;
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
        `/cube/view/${cube._id}`,
        `${req.user.username} made a cube by cloning yours: ${cube.name}`,
      );
    }

    req.flash('success', 'Cube Cloned');
    return res.redirect(303, `/cube/overview/${cube.shortID}`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/list/${encodeURIComponent(req.params.id)}`);
  }
};

const addFormat = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id));
    if (!req.user._id.equals(cube.owner)) {
      req.flash('danger', 'Formats can only be changed by cube owner.');
      return res.redirect(`/cube/list/${encodeURIComponent(req.params.id)}`);
    }

    let message = '';
    const { id, serializedFormat } = req.body;
    const format = JSON.parse(serializedFormat);
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
    return res.redirect(`/cube/playtest/${req.params.id}`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/playtest/${req.params.id}`);
  }
};

const followCube = async (req, res) => {
  const { user } = req;
  const cube = await Cube.findOne(buildIdQuery(req.params.id));
  if (!cube) {
    req.flash('danger', 'Cube not found');
    res.status(404).send({
      success: 'false',
    });
  }

  if (!cube.users_following.includes(user.id)) {
    cube.users_following.push(user.id);
  }
  if (!user.followed_cubes.includes(cube.id)) {
    user.followed_cubes.push(cube.id);
  }

  await Promise.all([user.save(), cube.save()]);

  res.status(200).send({
    success: 'true',
  });
};

const unfollowCube = async (req, res) => {
  const cube = await Cube.findById(buildIdQuery(req.params.id), 'users_following');
  if (!cube) {
    req.flash('danger', 'Cube not found');
    res.status(404).send({
      success: 'false',
    });
  }

  const { user } = req;
  cube.users_following = cube.users_following.filter((id) => !req.user._id.equals(id));
  user.followed_cubes = user.followed_cubes.filter((id) => id !== req.params.id);

  await Promise.all([user.save(), cube.save()]);

  res.status(200).send({
    success: 'true',
  });
};

const featureCube = async (req, res) => {
  try {
    const { user } = req;
    if (!isAdmin(user)) {
      req.flash('danger', 'Not Authorized');
      return res.redirect(`/cube/overview/${encodeURIComponent(req.params.id)}`);
    }

    const cube = await Cube.findOne(buildIdQuery(encodeURIComponent(req.params.id)));
    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect(`/cube/overview/${encodeURIComponent(req.params.id)}`);
    }

    cube.isFeatured = true;
    await cube.save();

    req.flash('success', 'Cube updated successfully.');
    return res.redirect(`/cube/overview/${encodeURIComponent(req.params.id)}`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/overview/${encodeURIComponent(req.params.id)}`);
  }
};

const unfeatureCube = async (req, res) => {
  try {
    const { user } = req;
    if (!isAdmin(user)) {
      req.flash('danger', 'Not Authorized');
      return res.redirect(`/cube/overview/${encodeURIComponent(req.params.id)}`);
    }

    const cube = await Cube.findOne(buildIdQuery(encodeURIComponent(req.params.id)));
    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect(`/cube/overview/${encodeURIComponent(req.params.id)}`);
    }

    cube.isFeatured = false;
    await cube.save();

    req.flash('success', 'Cube updated successfully.');
    return res.redirect(`/cube/overview/${req.params.id}`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/overview/${req.params.id}`);
  }
};

const viewOverview = async (req, res) => {
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

    return render(
      req,
      res,
      'CubeOverviewPage',
      {
        cube,
        post: blogs ? blogs[0] : null,
        followed: req.user && cube.users_following ? cube.users_following.includes(req.user.id) : false,
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
          `${process.env.SITE_ROOT}/cube/overview/${req.params.id}`,
        ),
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/overview/${req.params.id}`);
  }
};

const getRss = async (req, res) => {
  try {
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
      feed_url: `${process.env.SITE_ROOT}/cube/rss/${cube.id}`,
      site_url: process.env.SITE_ROOT,
    });

    blogs.forEach((blog) => {
      let content = blog.html ? blog.html : blog.content;

      if (blog.changelist) {
        const changeSetElement = `<div class="change-set">${blog.changelist}</div>`;
        if (content) {
          content += changeSetElement;
        } else {
          content = changeSetElement;
        }
      }

      feed.item({
        title: blog.title,
        description: content,
        guid: blog.id,
        date: blog.date,
      });
    });
    res.set('Content-Type', 'text/xml');
    return res.status(200).send(feed.xml());
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

const viewCubeComparison = async (req, res) => {
  try {
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
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

const viewList = async (req, res) => {
  try {
    const fields =
      'cards maybe card_count name owner type tag_colors default_sorts default_show_unsorted overrideCategory categoryOverride categoryPrefixes image_uri shortID';
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

    return render(
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
    return handleRouteError(req, res, err, `/cube/overview/${req.params.id}`);
  }
};

const viewPlaytest = async (req, res) => {
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
      'date seats _id cube owner cubeOwner',
    )
      .sort({
        date: -1,
      })
      .limit(10)
      .lean();

    return render(
      req,
      res,
      'CubePlaytestPage',
      {
        cube,
        decks,
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
    return handleRouteError(req, res, err, `/cube/overview/${req.params.id}`);
  }
};

const viewAnalytics = async (req, res) => {
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

    return render(
      req,
      res,
      'CubeAnalysisPage',
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
          `${process.env.SITE_ROOT}/cube/analysis/${req.params.id}`,
        ),
        title: `${abbreviate(cube.name)} - Analysis`,
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/overview/${req.params.id}`);
  }
};

const redirectToSamplePackWithSeed = (req, res) =>
  res.redirect(`/cube/${encodeURIComponent(req.params.id)}/playtest/sample/${Date.now().toString()}`);

const viewSamplePack = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();
    let pack;
    try {
      pack = await generatePack(req.params.id, carddb, req.params.seed);
    } catch (err) {
      req.flash('danger', err.message);
      return res.redirect(`/cube/playtest/${encodeURIComponent(req.params.id)}`);
    }

    const width = Math.floor(Math.sqrt((5 / 3) * pack.pack.length));
    const height = Math.ceil(pack.pack.length / width);

    return render(
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
          `${process.env.SITE_ROOT}/cube/samplepackimage/${req.params.id}/${pack.seed}.png`,
          `${process.env.SITE_ROOT}/cube/samplepack/${req.params.id}/${pack.seed}`,
          CARD_WIDTH * width,
          CARD_HEIGHT * height,
        ),
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/playtest/${req.params.id}`);
  }
};

const viewSamplePackImage = async (req, res) => {
  try {
    req.params.seed = req.params.seed.replace('.png', '');

    const imageBuffer = await cachePromise(`/samplepack/${req.params.id}/${req.params.seed}`, async () => {
      let pack;
      try {
        pack = await generatePack(req.params.id, carddb, req.params.seed);
      } catch (err) {
        req.flash('danger', err.message);
        return res.redirect(`/cube/playtest/${encodeURIComponent(req.params.id)}`);
      }

      const imgScale = 0.9;
      // Try to make it roughly 5 times as wide as it is tall in cards.
      const width = Math.floor(Math.sqrt((5 / 3) * pack.pack.length));
      const height = Math.ceil(pack.pack.length / width);

      const srcArray = pack.pack.map((card, index) => {
        return {
          src: card.imgUrl || card.details.image_normal,
          x: imgScale * CARD_WIDTH * (index % width),
          y: imgScale * CARD_HEIGHT * Math.floor(index / width),
          w: imgScale * CARD_WIDTH,
          h: imgScale * CARD_HEIGHT,
          rX: imgScale * 0.065 * CARD_WIDTH,
          rY: imgScale * 0.0464 * CARD_HEIGHT,
        };
      });

      const image = await generateSamplepackImage(srcArray, {
        width: imgScale * CARD_WIDTH * width,
        height: imgScale * CARD_HEIGHT * height,
        Canvas,
      });

      return Buffer.from(image.replace(/^data:image\/png;base64,/, ''), 'base64');
    });

    res.writeHead(200, {
      'Content-Type': 'image/png',
    });
    return res.end(imageBuffer);
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

const importFromCubeTutor = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id));
    if (!req.user._id.equals(cube.owner)) {
      req.flash('danger', 'Not Authorized');
      return res.redirect(`/cube/list/${encodeURIComponent(req.params.id)}`);
    }

    const response = await fetch(`https://www.cubetutor.com/viewcube/${req.body.cubeid}`, {
      headers: {
        // This tricks cubetutor into not redirecting us to the unsupported browser page.
        'User-Agent': 'Mozilla/5.0',
      },
    });
    if (!response.ok) {
      req.flash('danger', 'Error accessing CubeTutor.');
      return res.redirect(`/cube/list${encodeURIComponent(req.params.id)}`);
    }
    const text = await response.text();
    const data = cheerio.load(text);

    const tagColors = new Map();
    data('.keyColour').each((_, elem) => {
      const nodeText = elem.firstChild.nodeValue.trim();
      tagColors.set(elem.attribs.class.split(' ')[1], nodeText);
    });

    const cards = [];
    data('.cardPreview').each((_, elem) => {
      const str = elem.attribs['data-image'].substring(37, elem.attribs['data-image'].length - 4);
      const name = decodeURIComponent(elem.children[0].data).replace('_flip', '');
      const tagColorClasses = elem.attribs.class.split(' ').filter((c) => tagColors.has(c));
      const tags = tagColorClasses.map((c) => tagColors.get(c));
      cards.push({
        set: str.includes('/') ? str.split('/')[0] : 'unknown',
        name,
        tags,
      });
    });

    const added = [];
    let missing = '';
    let changelog = '';
    for (const card of cards) {
      const potentialIds = carddb.allVersions(card);
      if (potentialIds && potentialIds.length > 0) {
        const matchingSet = potentialIds.find((id) => carddb.cardFromId(id).set.toUpperCase() === card.set);
        const nonPromo = carddb.getMostReasonable(card.name, cube.defaultPrinting)._id;
        const selected = matchingSet || nonPromo || potentialIds[0];
        const details = carddb.cardFromId(selected);
        if (!details.error) {
          added.push(details);
          addCardToCube(cube, details, card.tags);
          changelog += addCardHtml(details);
        } else {
          missing += `${card.name}\n`;
        }
      } else {
        missing += `${card.name}\n`;
      }
    }

    return await updateCubeAndBlog(req, res, cube, changelog, added, missing);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/list/${encodeURIComponent(req.params.id)}`);
  }
};

const importFromPaste = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id));
    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }
    if (!req.user._id.equals(cube.owner)) {
      req.flash('danger', 'Not Authorized');
      return res.redirect(`/cube/list/${encodeURIComponent(req.params.id)}`);
    }

    await bulkUpload(req, res, req.body.body, cube);
    return null;
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/list/${req.params.id}`);
  }
};

const importFromFile = async (req, res) => {
  try {
    if (!req.files) {
      req.flash('danger', 'Please attach a file');
      return res.redirect(`/cube/list/${encodeURIComponent(req.params.id)}`);
    }

    const items = req.files.document.data.toString('utf8'); // the uploaded file object

    const cube = await Cube.findOne(buildIdQuery(req.params.id));
    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }
    if (!req.user._id.equals(cube.owner)) {
      req.flash('danger', 'Not Authorized');
      return res.redirect(`/cube/list/${encodeURIComponent(req.params.id)}`);
    }

    await bulkUpload(req, res, items, cube);
    return null;
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/list/${encodeURIComponent(req.params.id)}`);
  }
};

const replaceFromFile = async (req, res) => {
  try {
    if (!req.files) {
      req.flash('danger', 'Please attach a file');
      return res.redirect(`/cube/list/${encodeURIComponent(req.params.id)}`);
    }
    const items = req.files.document.data.toString('utf8'); // the uploaded file object
    const cube = await Cube.findOne(buildIdQuery(req.params.id));
    // We need a copy of cards we can mutate to be able to populate details for the comparison.
    const { cards } = await Cube.findOne(buildIdQuery(req.params.id), 'cards').lean();
    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }
    if (!req.user._id.equals(cube.owner)) {
      req.flash('danger', 'Not Authorized');
      return res.redirect(`/cube/list/${encodeURIComponent(req.params.id)}`);
    }
    const lines = items.match(/[^\r\n]+/g);
    if (lines) {
      let changelog = '';
      let missing = '';
      const added = [];
      let newCards = [];
      let newMaybe = [];
      if ((lines[0].match(/,/g) || []).length > 3) {
        ({ newCards, newMaybe, missing } = CSVtoCards(items, carddb));
        cube.cards = newCards;
        cube.maybe = newMaybe;
        const addDetails = (cardList) =>
          cardList.map((card, index) => {
            card = {
              ...card,
              details: {
                ...carddb.cardFromId(card.cardID),
              },
              index,
            };
            if (!card.type_line) {
              card.type_line = card.details.type;
            }
            return card;
          });

        const cubeCards = addDetails(cards);
        const newDetails = addDetails(newCards);

        const { onlyA, onlyB } = await compareCubes(cubeCards, newDetails);
        changelog += onlyA.map(({ cardID }) => removeCardHtml(carddb.cardFromId(cardID))).join('');
        changelog += onlyB.map(({ cardID }) => addCardHtml(carddb.cardFromId(cardID))).join('');
        added.push(...onlyB);
      } else {
        // Eventually add plaintext support here.
        throw new Error('Invalid file format');
      }
      await updateCubeAndBlog(req, res, cube, changelog, added, missing);
      return null;
    }
    throw new Error('Received empty file');
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/list/${req.params.id}`);
  }
};

const startGridDraft = async (req, res) => {
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
      return res.redirect(`/cube/playtest/${encodeURIComponent(req.params.id)}`);
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

    return res.redirect(`/cube/griddraft/${gridDraft._id}`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/playtest/${encodeURIComponent(req.params.id)}`);
  }
};

const startDraft = async (req, res) => {
  try {
    const cube = await Cube.findOne(
      buildIdQuery(req.params.id),
      '_id name draft_formats cards basics useCubeElo',
    ).lean();

    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }

    if (cube.cards.length === 0) {
      // This is a 4XX error, not a 5XX error
      req.flash('danger', 'This cube has no cards!');
      return res.redirect(`/cube/playtest/${encodeURIComponent(req.params.id)}`);
    }

    const params = req.body;

    let eloOverrideDict = {};
    if (cube.useCubeElo) {
      const analytic = await CubeAnalytic.findOne({ cube: cube._id });
      if (analytic) {
        eloOverrideDict = fromEntries(analytic.cards.map((c) => [c.cardName, c.elo]));
      }
    }

    // insert card details everywhere that needs them
    for (const card of cube.cards) {
      card.details = carddb.cardFromId(card.cardID);
      if (eloOverrideDict[card.details.name_lower]) {
        card.details.elo = eloOverrideDict[card.details.name_lower];
      }
    }
    // setup draft
    const format = getDraftFormat(params, cube);

    let draft = new Draft();
    let populated = {};
    try {
      populated = createDraft(
        format,
        cube.cards,
        params.seats,
        req.user
          ? req.user
          : {
              username: 'Anonymous',
            },
        req.body.botsOnly,
      );
    } catch (err) {
      // This is a 4XX error, not a 5XX error
      req.flash('danger', err.message);
      return res.redirect(`/cube/playtest/${encodeURIComponent(req.params.id)}`);
    }

    draft.initial_state = populated.initial_state;
    draft.seats = populated.seats;
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
    return res.redirect(`/cube/draft/${draft._id}`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/playtest/${encodeURIComponent(req.params.id)}`);
  }
};

const editCube = async (req, res) => {
  try {
    let cube = await Cube.findOne(buildIdQuery(req.params.id));

    if (!req.user._id.equals(cube.owner)) {
      req.flash('danger', 'Only cube owner may edit.');
      return res.redirect(`/cube/list/${encodeURIComponent(req.params.id)}`);
    }

    cube.date_updated = Date.now();
    cube.updated_string = cube.date_updated.toLocaleString('en-US');

    const edits = req.body.body.split(';');
    const removes = new Set();
    const adds = [];
    let changelog = '';

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
          changelog += addCardHtml(details);
        }
      } else if (edit.charAt(0) === '-') {
        // remove id
        const [indexOutStr, outID] = edit.substring(1).split('$');
        const indexOut = parseInt(indexOutStr, 10);

        if (!Number.isInteger(indexOut) || indexOut < 0 || indexOut >= cube.cards.length) {
          req.flash('danger', `Unable to remove card due to invalid index: ${carddb.cardFromId(outID).name}`);
        } else {
          const card = cube.cards[indexOut];
          if (card.cardID === outID) {
            removes.add(indexOut);
            changelog += removeCardHtml(carddb.cardFromId(card.cardID));
          } else {
            req.flash('danger', `Unable to remove card due outdated index: ${carddb.cardFromId(outID).name}`);
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
          changelog += addCardHtml(detailsIn);
        } else {
          const cardOut = cube.cards[indexOut];
          if (cardOut.cardID === outID) {
            removes.add(indexOut);
            changelog += replaceCardHtml(carddb.cardFromId(cardOut.cardID), detailsIn);
          } else {
            req.flash('danger', `Unable to replace card due outdated index: ${carddb.cardFromId(outID).name}`);
            changelog += addCardHtml(detailsIn);
          }
        }
      } else {
        req.flash('danger', 'Bad request format, all operations must be add, remove, or replace.');
        return res.redirect(`/cube/list/${encodeURIComponent(req.params.id)}`);
      }
    }

    // Filter out removed and invalid cards, and add new cards.
    const newCards = adds.map((add) => newCard(add, [], cube.defaultStatus));
    cube.cards = cube.cards.filter((card, index) => card.cardID && !removes.has(index)).concat(newCards);
    cube.maybe = cube.maybe.filter((maybeCard) => !adds.some((addedCard) => addedCard._id === maybeCard.cardID));

    const blogpost = new Blog();
    blogpost.title = req.body.title;
    if (req.body.blog.length > 0) {
      blogpost.markdown = req.body.blog.substring(0, 10000);
    }
    blogpost.changelist = changelog;
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
        `/cube/blog/blogpost/${blogpost._id}`,
        `${cube.owner_name} mentioned you in their blog post`,
      );
    }

    req.flash('success', 'Cube Updated');
    return res.redirect(`/cube/list/${encodeURIComponent(req.params.id)}?updated=true`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/list/${encodeURIComponent(req.params.id)}`);
  }
};

const resizeCube = async (req, res) => {
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

    const response = await fetch(
      `${process.env.FLASKROOT}/?cube_name=${encodeURIComponent(
        req.params.id,
      )}&num_recs=${1000}&root=${encodeURIComponent(process.env.HOST)}`,
    );
    if (!response.ok) {
      return handleRouteError(
        req,
        res,
        'Error fetching suggestion data.',
        `/cube/${encodeURIComponent(req.params.id)}/list`,
      );
    }
    const { cuts, additions } = await response.json();

    // use this instead if you want debug data
    // const additions = { island: 1, mountain: 1, plains: 1, forest: 1, swamp: 1, wastes: 1 };
    // const cuts = { ...additions };

    const pids = new Set();
    const cardNames = new Set();

    const formatTuple = (tuple) => {
      const details = carddb.getMostReasonable(tuple[0]);
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
      return res.redirect(`/cube/list/${encodeURIComponent(req.params.id)}`);
    }

    // we sort the reverse way depending on adding or removing
    let list = Object.entries(newSize > cube.cards.length ? additions : cuts)
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

    let changelog = '';
    if (newSize > cube.cards.length) {
      // we add to cube
      const toAdd = list.map((card) => {
        changelog += addCardHtml(card.details);
        return newCard(card.details);
      });
      cube.cards = cube.cards.concat(toAdd);
    } else {
      // we cut from cube
      for (const card of list) {
        for (let i = 0; i < cube.cards.length; i += 1) {
          if (carddb.cardFromId(cube.cards[i].cardID).name === carddb.cardFromId(card.cardID).name) {
            changelog += removeCardHtml(card.details);
            cube.cards.splice(i, 1);
            i = cube.cards.length;
          }
        }
      }
    }

    cube = setCubeType(cube, carddb);

    const blogpost = new Blog();
    blogpost.title = 'Resize - Automatic Post';
    blogpost.changelist = changelog;
    blogpost.owner = cube.owner;
    blogpost.date = Date.now();
    blogpost.cube = cube._id;
    blogpost.dev = 'false';
    blogpost.date_formatted = blogpost.date.toLocaleString('en-US');
    blogpost.username = cube.owner_name;
    blogpost.cubename = cube.name;

    await blogpost.save();
    await cube.save();

    req.flash('success', 'Cube Resized succesfully.');
    return res.redirect(`/cube/list/${req.params.id}`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/list/${encodeURIComponent(req.params.id)}`);
  }
};

const deleteCube = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id));

    if (!req.user._id.equals(cube.owner)) {
      req.flash('danger', 'Not Authorized');
      return res.redirect(`/cube/overview/${encodeURIComponent(req.params.id)}`);
    }
    await Cube.deleteOne(buildIdQuery(req.params.id));

    req.flash('success', 'Cube Removed');
    return res.redirect('/dashboard');
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

const deleteFormat = async (req, res) => {
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

const setDefaultFormat = async (req, res) => {
  const cubeid = req.params.id;
  const formatId = parseInt(req.params.formatId, 10);

  const cube = await Cube.findOne(buildIdQuery(cubeid));
  if (
    !cube ||
    cube.owner !== req.user.id ||
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

const editCubeOverview = async (req, res) => {
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

const updateCubeSettings = async (req, res) => {
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

const getCardNamesForCube = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();

  const cardnames = [];
  for (const card of cube.cards) {
    binaryInsert(carddb.cardFromId(card.cardID).name, cardnames);
  }

  const result = turnToTree(cardnames);
  return res.status(200).send({
    success: 'true',
    cardnames: result,
  });
};

const getCubeCardTags = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();
  const tags = cubeCardTags(cube);

  return res.status(200).send({
    success: 'true',
    tags: turnToTree(tags),
  });
};

const updateTagColors = async (req, res) => {
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

const getTagColors = async (req, res) => {
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

const getCardByName = async (req, res) => {
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

const updateCubeBasics = async (req, res) => {
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
const getDefaultPrinting = async (req, res) => {
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

const updateCardInCube = async (req, res) => {
  const { src, updated } = req.body;
  if (
    !src ||
    (src && typeof src.index !== 'number') ||
    (updated.cardID && typeof updated.cardID !== 'string') ||
    (updated.cmc && (typeof updated.cmc !== 'number' || updated.cmc < 0)) ||
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

const updateCardsInCube = async (req, res) => {
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

const getMaybeboard = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();
  return res.status(200).send({
    success: 'true',
    maybe: maybeCards(cube, carddb),
  });
};

const addCardsToCube = async (req, res) => {
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
    blogpost.changelist = req.body.cards.reduce((changes, card) => changes + addCardHtml(carddb.cardFromId(card)), '');
    blogpost.markdown = `Add from the package [${tag}](/packages/${req.body.packid})`;
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

const updateMaybeboard = async (req, res) => {
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

const updateMaybeboardCard = async (req, res) => {
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

const updateCubeSorts = async (req, res) => {
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

const generateP1P1 = async (req, res) => {
  const result = await generatePack(req.params.id, carddb, req.params.seed);

  return res.status(200).send({
    seed: req.params.seed,
    pack: result.pack.map((card) => card.name),
  });
};

const getDateUpdated = async (req, res) => {
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

const getRecommendations = async (req, res) => {
  const response = await fetch(
    `${process.env.FLASKROOT}/?cube_name=${encodeURIComponent(
      req.params.id,
    )}&num_recs=${1000}&root=${encodeURIComponent(process.env.SITE_ROOT)}`,
  );
  if (!response.ok) {
    req.logger.error({
      message: 'Flask server response not OK.',
    });
    return res.status(500).send({
      success: 'false',
      result: {},
    });
  }
  const { cuts, additions } = await response.json();

  // use this instead if you want debug data
  // const additions = { island: 1, mountain: 1, plains: 1, forest: 1, swamp: 1, wastes: 1 };
  // const cuts = { ...additions };

  const pids = new Set();
  const cardNames = new Set();

  const formatTuple = (tuple) => {
    const details = carddb.getMostReasonable(tuple[0]);
    const card = newCard(details);
    card.details = details;

    if (card.details.tcgplayer_id) {
      pids.add(card.details.tcgplayer_id);
    }
    cardNames.add(card.details.name);

    return card;
  };

  const addlist = Object.entries(additions)
    .sort((a, b) => b[1] - a[1])
    .map(formatTuple);

  // this is sorted the opposite way, as lower numbers mean we want to cut it
  const cutlist = Object.entries(cuts)
    .sort((a, b) => a[1] - b[1])
    .map(formatTuple);

  return res.status(200).send({
    success: 'true',
    result: {
      toAdd: addlist,
      toCut: cutlist,
    },
  });
};

const getCardImageById = async (req, res) => {
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

const viewDecks = async (req, res) => {
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

    return render(
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
    return handleRouteError(req, res, err, `/cube/playtest/${encodeURIComponent(req.params.cubeid)}`);
  }
};

const uploadDeckList = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id));
    if (!cube) {
      req.flash('danger', 'Cube not found.');
      return res.redirect('/404');
    }

    if (!req.user._id.equals(cube.owner)) {
      req.flash('danger', 'Not Authorized');
      return res.redirect(`/cube/playtest/${encodeURIComponent(req.params.id)}`);
    }

    const cards = req.body.body.match(/[^\r\n]+/g);
    if (!cards) {
      req.flash('danger', 'No cards detected');
      return res.redirect(`/cube/playtest/${encodeURIComponent(req.params.id)}`);
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

    return res.redirect(`/cube/deck/deckbuilder/${deck._id}`);
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

const router = express.Router();
router.post('/', ensureAuth, createCube);
router.get('/:id/export/json', wrapAsyncApi(exportToJson));
router.get('/:id/export/cubecobra', wrapAsyncApi(exportToCubeCobra));
router.get('/:id/export/csv', wrapAsyncApi(exportToCsv));
router.get('/:id/export/forge', wrapAsyncApi(exportToForge));
router.get('/:id/export/mtgo', wrapAsyncApi(exportForMtgo));
router.get('/:id/export/xmage', wrapAsyncApi(exportToXmage));
router.get('/:id/export/plaintext', wrapAsyncApi(exportToPlaintext));
router.use('/:id/blog', CubeBlogRoutes);
router.post('/:id/clone', ensureAuth, cloneCube);
router.get('/:id', viewOverview);
router.post('/:id/format', ensureAuth, addFormat);
router.post('/:id/follow', ensureAuth, wrapAsyncApi(followCube));
router.delete('/:id/follow', ensureAuth, wrapAsyncApi(unfollowCube));
router.post('/:id/feature', ensureAuth, featureCube);
router.delete('/:id/feature', ensureAuth, unfeatureCube);
router.get('/:id/rss', getRss);
router.get('/:id/compare/:idB', viewCubeComparison);
router.get('/:id/list', viewList);
router.get('/:id/playtest', viewPlaytest);
router.get('/:id/analytics', viewAnalytics);
router.get('/:id/playtest/sample', redirectToSamplePackWithSeed);
router.get('/:id/playtest/sample/:seed', viewSamplePack);
router.get('/:id/playtest/sample/:seed/image', viewSamplePackImage);
router.post('/:id/import/cubetutor', ensureAuth, body('cubeid').toInt(), flashValidationErrors, importFromCubeTutor);
router.post('/:id/import/paste', ensureAuth, importFromPaste);
router.post('/:id/import/file', ensureAuth, importFromFile);
router.post('/:id/import/file/replace', ensureAuth, replaceFromFile);
router.post(
  '/:id/playtest/griddraft',
  body('packs').toInt({ min: 1, max: 16 }),
  body('defaultStatus', 'Status must be valid.').isIn(['bot', '2playerlocal']),
  startGridDraft,
);
router.post(
  '/:id/playtest/draft',
  body('id').toInt(),
  body('botsOnly').toBoolean(),
  body('seats').toInt({ min: 2, max: 16 }),
  body('packs').toInt({ min: 1, max: 36 }),
  body('cards').toInt({ min: 1, max: 90 }),
  startDraft,
);
router.put('/:id', ensureAuth, editCube);
router.post('/:id/resize/:size', resizeCube);
router.delete('/:id', ensureAuth, deleteCube);
router.delete('/:id/format/:index', ensureAuth, param('index').toInt(), deleteFormat);
router.put('/:id/defaultformat/:formatId', ensureAuth, wrapAsyncApi(setDefaultFormat));
router.put(
  '/:id/overview',
  ensureAuth,
  body('name', 'Cube name should be between 5 and 100 characters long.').isLength({ min: 5, max: 100 }),
  body('name', 'Cube name may not use profanity.').custom((value) => !hasProfanity(value)),
  body('shortID', 'Custom URL must contain only alphanumeric characters, dashes, and underscores.').matches(
    /^[A-Za-z0-9_-]*$/,
  ),
  body('shortID', `Custom URL may not be empty or longer than 100 characters.`).isLength({ min: 1, max: 100 }),
  body('shortID', 'Custom URL may not use profanity.').custom((value) => !hasProfanity(value)),
  jsonValidationErrors,
  wrapAsyncApi(editCubeOverview),
);
router.put(
  '/:id/settings',
  ensureAuth,
  body('isListed').toBoolean(),
  body('privatePrices').toBoolean(),
  body('disableNotifications').toBoolean(),
  body('defaultStatus', 'Status must be valid.').isIn(['Owned', 'Not Owned']),
  body('defaultPrinting', 'Printing must be valid.').isIn(['recent', 'first']),
  jsonValidationErrors,
  wrapAsyncApi(updateCubeSettings),
);
router.get('/:id/cards/names', wrapAsyncApi(getCardNamesForCube));
router.get('/:id/cards/tags', wrapAsyncApi(getCubeCardTags));
router.put('/:id/tags/colors', wrapAsyncApi(updateTagColors));
router.get('/:id/tags/colors', wrapAsyncApi(getTagColors));
router.get('/:id/card/:name', wrapAsyncApi(getCardByName));
// TODO: -This uses a different meaning for the id field for put requests vs get. I'm not sure that's good.
router.put('/:id/card/:index', ensureAuth, wrapAsyncApi(updateCardInCube));
router.get('/:id/card/:name/default', wrapAsyncApi(getDefaultPrinting));
router.put('/:id/basics', wrapAsyncApi(updateCubeBasics));
router.put('/:id/cards', ensureAuth, wrapAsyncApi(updateCardsInCube));
router.post('/:id/cards', ensureAuth, wrapAsyncApi(addCardsToCube));
router.get('/:id/maybe', ensureAuth, wrapAsyncApi(getMaybeboard));
router.put('/:id/maybe', ensureAuth, wrapAsyncApi(updateMaybeboard));
router.put('/:id/maybe/:cardid', ensureAuth, wrapAsyncApi(updateMaybeboardCard));
router.put('/:id/sorts', ensureAuth, wrapAsyncApi(updateCubeSorts));
router.get('/:id/playtest/p1p1', (req, res) =>
  res.redirect(303, `/cube/${encodeURIComponent(req.params.id)}/playtest/p1p1/${Date.now().toString()}`),
);
router.get('/:id/playtest/p1p1/:seed', wrapAsyncApi(generateP1P1));
router.get('/:id/date_updated', wrapAsyncApi(getDateUpdated));
router.get('/:id/recommend', wrapAsyncApi(getRecommendations));
router.get('/:id/card/:cardid/image', getCardImageById);
router.get('/:id/decks', (req, res) => res.redirect(`/cube/${req.params.id}/decks/0`));
router.get('/:id/decks/:page', viewDecks);
router.post('/:id/deck/import/file', ensureAuth, uploadDeckList);
export default router;

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
import winston from '@cubeartisan/server/serverjs/winstonConfig.js';

import dotenv from 'dotenv';
import express from 'express';
import { body } from 'express-validator';

import { filterCardsDetails, makeFilter } from '@cubeartisan/client/filtering/FilterCards.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import { ORDERED_SORTS, SortFunctionsOnDetails } from '@cubeartisan/client/utils/Sort.js';
import { render } from '@cubeartisan/server/serverjs/render.js';
import { handleRouteError, wrapAsyncApi } from '@cubeartisan/server/serverjs/util.js';
import { decodeName, normalizeName } from '@cubeartisan/client/utils/Card.js';
import CardHistory from '@cubeartisan/server/models/cardHistory.js';
import getBlankCardHistory from '@cubeartisan/client/utils/BlankCardHistory.js';
import generateMeta from '@cubeartisan/server/serverjs/meta.js';
import { jsonValidationErrors } from '@cubeartisan/server/routes/middleware.js';

dotenv.config();

/* Page size for results */
const PAGE_SIZE = 96;

const getAllMostReasonable = (filter) => {
  const cards = filterCardsDetails(carddb.printedCardList, filter);

  const keys = new Set();
  const filtered = [];
  for (const card of cards) {
    if (!keys.has(card.name_lower)) {
      filtered.push(carddb.getMostReasonableById(card._id, 'recent', filter));
      keys.add(card.name_lower);
    }
  }
  return filtered;
};

const searchCards = (filter, sort = 'elo', page = 0, direction = 'descending', distinct = 'names') => {
  const cards = [];

  if (distinct === 'names') {
    cards.push(...getAllMostReasonable(filter));
  } else {
    cards.push(...filterCardsDetails(carddb.printedCardList, filter));
  }

  if (ORDERED_SORTS.includes(sort)) {
    cards.sort(SortFunctionsOnDetails(sort));
  } else {
    winston.info(`Sort function not found: ${sort}`);
  }

  if (direction === 'descending') {
    cards.reverse();
  }

  page = parseInt(page, 10);

  return {
    numResults: cards.length,
    data: cards.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
  };
};

const getCardFromId = (id) => {
  // if id is a cardname, redirect to the default version for that card
  const possibleName = decodeName(id);
  const ids = carddb.getIdsFromName(possibleName);
  if (ids) {
    id = carddb.getMostReasonable(possibleName)._id;
  }

  // if id is a foreign id, redirect to english version
  const english = carddb.getEnglishVersion(id);
  if (english) {
    id = english;
  }

  // if id is an oracle id, redirect to most reasonable scryfall
  if (carddb.oracleToId[id]) {
    id = carddb.getMostReasonableById(carddb.oracleToId[id][0])._id;
  }

  // if id is not a scryfall ID, error
  return carddb.cardFromId(id);
};

const getImageForId = (req, res) => {
  const reasonable = getCardFromId(req.params.id);
  const img = !reasonable.error ? carddb.imagedict[reasonable.name] : null;
  if (!img) {
    return res.status(404).send({ success: 'false' });
  }
  return res.status(200).send({ success: 'true', img });
};

const getCardObj = (req, res) => {
  const card = getCardFromId(req, res);
  if (!card.error) {
    return res.status(404).send({ success: 'false' });
  }
  return res.status(200).send({ success: 'true', card });
};

const getImageRedirectForId = (req, res) => {
  try {
    const card = getCardFromId(req.params.id);
    if (card.error) {
      req.flash('danger', `Card with id ${req.params.id} not found.`);
      return res.redirect(302, carddb.getPlaceholderCard(req.params.id).image_normal);
    }
    return res.redirect(301, card.image_normal);
  } catch (err) {
    return handleRouteError(req, res, err, carddb.getPlaceholderCard(req.params.id).image_normal);
  }
};

const getInfoForId = async (req, res) => {
  try {
    const card = getCardFromId(req.params.id);
    if (card.error) {
      req.flash('danger', `Card with id ${req.params.id} not found.`);
      return res.redirect(303, '/404');
    }
    // otherwise just go to this ID.
    let data = await CardHistory.findOne({ oracleId: card.oracle_id });
    // id is valid but has no matching history
    if (!data) {
      data = getBlankCardHistory(req.params.id);
    }
    const related = {};

    for (const category of ['top', 'synergistic', 'spells', 'creatures', 'other']) {
      related[category] = data.cubedWith[category].map((oracle) =>
        carddb.getMostReasonableById(carddb.oracleToId[oracle][0]),
      );
    }

    return render(
      req,
      res,
      'CardPage',
      {
        card,
        data,
        versions: carddb.oracleToId[card.oracle_id]
          .filter((cid) => cid !== card._id)
          .map((cardid) => carddb.cardFromId(cardid)),
        related,
      },
      {
        title: `${card.name}`,
        metadata: generateMeta(
          `${card.name} - ${process.env.SITE_NAME}`,
          `Analytics for ${card.name} on ${process.env.SITE_NAME}`,
          card.image_normal,
          `${process.env.SITE_HOST}/card/${req.params.id}`,
        ),
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

const findAllVersionsForId = (id) => {
  const card = getCardFromId(id);
  if (card.error) {
    return [];
  }
  const cardIds = carddb.allVersions(card);
  // eslint-disable-next-line prefer-object-spread
  return cardIds.map((newid) => Object.assign({}, carddb.cardFromId(newid)));
};

const getAllVersionsForId = (req, res) => {
  return res.status(200).send({
    success: 'true',
    cards: findAllVersionsForId(req.params.id),
  });
};

const getVersionsFromIds = (req, res) => {
  const allVersions = req.body
    .map((cardID) => findAllVersionsForId(cardID).sort((a, b) => -a.released_at.localeCompare(b.released_at)))
    .filter((versions) => versions.length > 0);

  const result = Object.fromEntries(
    allVersions.map((versions) => [
      normalizeName(versions[0].name),
      versions.map(({ _id, full_name, image_normal, image_flip, prices, elo }) => ({
        _id,
        version: full_name.toUpperCase().substring(full_name.indexOf('[') + 1, full_name.indexOf(']')),
        image_normal,
        image_flip,
        price: prices.usd,
        price_foil: prices.usd_foil,
        elo,
      })),
    ]),
  );

  return res.status(200).send({
    success: 'true',
    dict: result,
  });
};

const doCardSearch = (req, res) => {
  try {
    const { err, filter } = makeFilter(req.query.f);
    if (err) {
      return res.status(400).send({
        success: 'false',
        numResults: 0,
        data: [],
      });
    }
    const { data, numResults } = searchCards(filter, req.query.s, req.query.p, req.query.d, req.query.di);
    return res.status(200).send({
      success: 'true',
      data,
      numResults,
    });
  } catch (err) {
    req.logger.error(err);
    return res.status(500).send({
      success: 'false',
      numResults: 0,
      data: [],
    });
  }
};

const redirectToRandomCard = (req, res) => {
  const card = carddb.allCards()[Math.floor(Math.random() * carddb.allCards().length)];
  return res.redirect(`/card/${card.oracle_id}`);
};

const getFlipImageById = async (req, res) => {
  try {
    const card = getCardFromId(req.params.id);
    if (card.error) {
      req.flash('danger', `Card with id ${req.params.id} not found.`);
      return res.redirect('/404');
    }

    return res.redirect(card.image_flip);
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

const getDetailsForCards = async (req, res) => {
  return res.status(200).send({
    success: 'true',
    details: req.body.cards.map(getCardFromId),
  });
};

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
  return res.status(200).send({
    success: 'true',
    dict: carddb.imagedict,
  });
};

const getFullNames = (_, res) => {
  return res.status(200).send({
    success: 'true',
    cardnames: carddb.full_names,
  });
};

const router = express.Router();
router.get('/card/:id/details', getCardObj);
router.get('/card/:id/image', getImageForId);
router.get('/card/:id/image/redirect', getImageRedirectForId);
router.get('/card/:id', getInfoForId);
router.get('/card/:id/flip/image', getFlipImageById);
router.get('/card/:id/versions', wrapAsyncApi(getAllVersionsForId));
router.post(
  '/cards/versions',
  body([], 'Body must be an array.').isArray(),
  body('*', 'Each ID must be a valid UUID.').matches(
    /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}2?$/,
  ),
  jsonValidationErrors,
  getVersionsFromIds,
);
router.get('/cards/search', (req, res) => render(req, res, 'CardSearchPage', {}, { title: 'Search Cards' }));
router.get('/cards/search/query', doCardSearch);
router.get('/cards/random', redirectToRandomCard);
router.post('/cards/details', getDetailsForCards);
router.get('/cards/names', listCardNames);
router.get('/cards/images', getCardImageUrls);
router.get('/cards/images/dict', getImageDict);
router.get('/cards/names/full', getFullNames);
export default router;

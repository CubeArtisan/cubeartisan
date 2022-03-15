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

import axios from 'axios';
import NodeCache from 'node-cache';
import Papa from 'papaparse';
import sharp from 'sharp';

import CardRating from '@cubeartisan/server/models/cardrating.js';
import Cube from '@cubeartisan/server/models/cube.js';
import CubeAnalytic from '@cubeartisan/server/models/cubeAnalytic.js';
import { getDraftFormat, createDraft } from '@cubeartisan/client/drafting/createdraft.js';
import { getDrafterState } from '@cubeartisan/client/drafting/draftutil.js';
import { hasProfanity, toBase36 } from '@cubeartisan/server/serverjs/util.js';
import { arraysEqual } from '@cubeartisan/client/utils/Util.js';

const ELO_BASE = 1200;
const ELO_SPEED = 1 / 128;
const CUBE_ELO_SPEED = 4;

export const getCubeId = (cube) => {
  if (cube.shortID) return cube.shortID;
  return cube._id;
};

export const buildIdQuery = (id) => {
  if (!id || id.match(/^[0-9a-fA-F]{24}$/)) {
    return { _id: id };
  }
  return { shortID: encodeURIComponent(id.toLowerCase()) };
};

export const generateShortId = async () => {
  const cubes = await Cube.find({}, ['shortID']);
  const shortIds = cubes.map((cube) => cube.shortID);
  const space = shortIds.length * 2;

  let newId = '';
  let isGoodId = false;
  while (!isGoodId) {
    const rand = Math.floor(Math.random() * space);
    newId = toBase36(rand);
    isGoodId = !hasProfanity(newId) && !shortIds.includes(newId);
  }

  return newId;
};

const FORMATS = ['Vintage', 'Legacy', 'Modern', 'Pioneer', 'Standard'];

export const intToLegality = (val) => FORMATS[val];

export const legalityToInt = (legality) => {
  let res;
  FORMATS.forEach((format, index) => {
    if (legality === format) res = index;
  });

  return res;
};

export const cardsAreEquivalent = (card, details) => {
  if (card.cardID !== details.cardID) {
    return false;
  }
  if (card.status !== details.status) {
    return false;
  }
  if (card.cmc !== details.cmc) {
    return false;
  }
  if (card.type_line && details.type_line && card.type_line !== details.type_line) {
    return false;
  }
  if (!arraysEqual(card.tags, details.tags)) {
    return false;
  }
  if (!arraysEqual(card.colors, details.colors)) {
    return false;
  }
  // noinspection RedundantIfStatementJS
  if (card.finish && details.finish && card.finish !== details.finish) {
    return false;
  }
  return true;
};

export const cardIsLegal = (card, legality) =>
  card.legalities[legality] === 'legal' || card.legalities[legality] === 'banned';

export const setCubeType = (cube, carddb) => {
  let pauper = true;
  let peasant = false;
  let type = FORMATS.length - 1;
  for (const card of cube.cards) {
    if (pauper && !cardIsLegal(carddb.cardFromId(card.cardID), 'Pauper')) {
      pauper = false;
      peasant = true;
    }
    if (!pauper && peasant) {
      // check rarities of all card versions
      const rarities = carddb.allVersions(carddb.cardFromId(card.cardID)).map((id) => carddb.cardFromId(id).rarity);
      if (!rarities.includes('common') && !rarities.includes('uncommon')) {
        peasant = false;
      }
    }
    while (type > 0 && !cardIsLegal(carddb.cardFromId(card.cardID), intToLegality(type))) {
      type -= 1;
    }
  }

  cube.type = intToLegality(type);
  if (pauper) {
    cube.type += ' Pauper';
  }
  if (peasant) {
    cube.type += ' Peasant';
  }

  if (cube.overrideCategory) {
    cube.categories = [cube.categoryOverride.toLowerCase(), ...cube.categoryPrefixes.map((c) => c.toLowerCase())];
  } else {
    cube.categories = Array.from(new Set(`${cube.type}`.toLowerCase().split(' ')));
  }

  cube.cardOracles = Array.from(new Set(cube.cards.map((card) => carddb.cardFromId(card.cardID).oracle_id)));
  cube.keywords = `${cube.type} ${cube.name} ${cube.owner_name}`
    .replace(/[^\w\s]/gi, '')
    .toLowerCase()
    .split(' ')
    .filter((keyword) => keyword.length > 0);
  cube.keywords.push(
    ...(cube.tags || [])
      .filter((tag) => tag && tag.length > 0)
      .map((tag) => tag.replace(/[^\w\s]/gi, '').toLowerCase()),
  );
  cube.keywords.push(...cube.categories);
  cube.keywords = Array.from(new Set(cube.keywords));

  cube.card_count = cube.cards.length;

  return cube;
};

export const abbreviate = (name) => (name.length < 20 ? name : `${name.slice(0, 20)}…`);

export const buildTagColors = (cube) => {
  let { tag_colors: tagColor } = cube;
  const tags = tagColor.map((item) => item.tag);
  const notFound = tagColor.map((item) => item.tag);

  for (const card of cube.cards) {
    for (let tag of card.tags) {
      tag = tag.trim();
      if (!tags.includes(tag)) {
        tagColor.push({
          tag,
          color: null,
        });
        tags.push(tag);
      }
      if (notFound.includes(tag)) notFound.splice(notFound.indexOf(tag), 1);
    }
  }

  const tmp = [];
  for (const color of tagColor) {
    if (!notFound.includes(color.tag)) tmp.push(color);
  }
  tagColor = tmp;

  return tagColor;
};

export const cubeCardTags = (cube) => {
  const tags = [];
  for (const card of cube.cards) {
    for (let tag of card.tags) {
      tag = tag.trim();
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    }
  }
  return tags;
};

export const maybeCards = (cube, carddb) => {
  const maybe = (cube.maybe || []).filter((card) => card.cardID);
  return maybe.map((card) => ({ ...card, details: carddb.cardFromId(card.cardID) }));
};

export const getCardElo = async (cardname, round) => {
  const rating = await CardRating.findOne({ name: { $regex: new RegExp(cardname, 'i') } }).lean();

  if (!rating || Number.isNaN(rating.elo)) {
    return 1200;
  }

  return round ? Math.round(rating.elo) : rating.elo;
};

export const CSVtoCards = (csvString, carddb) => {
  let { data } = Papa.parse(csvString.trim(), { header: true });
  data = data.map((row) => Object.fromEntries(Object.entries(row).map(([key, value]) => [key.toLowerCase(), value])));
  const missing = [];
  const newCards = [];
  const newMaybe = [];
  for (const {
    name,
    cmc,
    type,
    color,
    set,
    'collector number': collectorNumber,
    status,
    finish,
    maybeboard,
    'image url': imageUrl,
    'image back url': imageBackUrl,
    tags,
    notes,
    'Color Category': colorCategory,
    rarity,
  } of data) {
    if (name) {
      const upperSet = (set || '').toUpperCase();
      const card = {
        name,
        cmc: cmc || null,
        type_line: (type || null) && type.replace('-', '—'),
        colors: (color || null) && color.split('').filter((c) => Array.from('WUBRG').includes(c)),
        addedTmsp: new Date(),
        collector_number: collectorNumber && collectorNumber.toUpperCase(),
        status: status || 'Not Owned',
        finish: finish || 'Non-foil',
        imgUrl: (imageUrl || null) && imageUrl !== 'undefined' ? imageUrl : null,
        imgBackUrl: (imageBackUrl || null) && imageBackUrl !== 'undefined' ? imageBackUrl : null,
        tags: tags && tags.length > 0 ? tags.split(';').map((t) => t.trim()) : [],
        notes: notes || '',
        rarity: rarity || null,
        colorCategory: colorCategory || null,
      };

      const potentialIds = carddb.allVersions(card);
      if (potentialIds && potentialIds.length > 0) {
        // First, try to find the correct set.
        const matchingSetAndNumber = potentialIds.find((id) => {
          const dbCard = carddb.cardFromId(id);
          return (
            upperSet === dbCard.set.toUpperCase() && card.collector_number === dbCard.collector_number.toUpperCase()
          );
        });
        const matchingSet = potentialIds.find((id) => carddb.cardFromId(id).set.toUpperCase() === upperSet);
        const nonPromo = potentialIds.find(carddb.reasonableId);
        const first = potentialIds[0];
        card.cardID = matchingSetAndNumber || matchingSet || nonPromo || first;
        if (maybeboard.toLowerCase() === 'true') {
          newMaybe.push(card);
        } else {
          newCards.push(card);
        }
      } else {
        missing.push(card.name);
      }
    }
  }
  return { newCards, newMaybe, missing };
};

export const compareCubes = async (cardsA, cardsB) => {
  const inBoth = [];
  const onlyA = cardsA.slice(0);
  const onlyB = cardsB.slice(0);
  const aNames = onlyA.map((card) => card.details.name);
  const bNames = onlyB.map((card) => card.details.name);
  for (const card of cardsA) {
    if (bNames.includes(card.details.name)) {
      inBoth.push(card);

      onlyA.splice(aNames.indexOf(card.details.name), 1);
      onlyB.splice(bNames.indexOf(card.details.name), 1);

      aNames.splice(aNames.indexOf(card.details.name), 1);
      bNames.splice(bNames.indexOf(card.details.name), 1);
    }
  }

  const allCards = inBoth.concat(onlyA).concat(onlyB);
  return {
    inBoth,
    onlyA,
    onlyB,
    aNames,
    bNames,
    allCards,
  };
};

export const getEloAdjustment = (winner, loser, speed) => {
  const diff = loser - winner;
  // Expected performance for pick.
  const expectedA = 1 / (1 + 10 ** (diff / 400));
  const expectedB = 1 - expectedA;
  const adjustmentA = (1 - expectedA) * speed;
  const adjustmentB = (0 - expectedB) * speed;
  return [adjustmentA, adjustmentB];
};

export const newCardAnalytics = (cardName, elo) => ({
  cardName,
  picks: 0,
  passes: 0,
  elo,
  mainboards: 0,
  sideboards: 0,
});

export const removeDeckCardAnalytics = async (cube, deck, carddb) => {
  // we don't want to save deck analytics for decks have not been built
  if (deck.seats[0].sideboard.flat().length > 0) {
    let analytic = await CubeAnalytic.findOne({ cube: cube._id });

    if (!analytic) {
      analytic = new CubeAnalytic();
      analytic.cube = cube._id;
    }

    for (const row of deck.seats[0].deck) {
      for (const col of row) {
        for (const ci of col) {
          let pickIndex = analytic.cards.findIndex(
            (card) => card.cardName === carddb.cardFromId(deck.cards[ci].cardID).name.toLowerCase(),
          );
          if (pickIndex === -1) {
            pickIndex =
              analytic.cards.push(newCardAnalytics(carddb.cardFromId(deck.cards[ci].cardID).name.toLowerCase(), 1200)) -
              1;
          }
          analytic.cards[pickIndex].mainboards = Math.max(0, analytic.cards[pickIndex].mainboards - 1);
        }
      }
    }
    for (const row of deck.seats[0].sideboard) {
      for (const col of row) {
        for (const ci of col) {
          let pickIndex = analytic.cards.findIndex(
            (card) => card.cardName === carddb.cardFromId(deck.cards[ci].cardID).name.toLowerCase(),
          );
          if (pickIndex === -1) {
            pickIndex =
              analytic.cards.push(newCardAnalytics(carddb.cardFromId(deck.cards[ci].cardID).name.toLowerCase(), 1200)) -
              1;
          }
          analytic.cards[pickIndex].sideboards = Math.max(0, analytic.cards[pickIndex].sideboards - 1);
        }
      }
    }

    await analytic.save();
  }
};

export const addDeckCardAnalytics = async (cube, deck, carddb) => {
  // we don't want to save deck analytics for decks have not been built
  if (deck.seats[0].sideboard.flat().length > 0) {
    let analytic = await CubeAnalytic.findOne({ cube: cube._id });

    if (!analytic) {
      analytic = new CubeAnalytic();
      analytic.cube = cube._id;
    }

    for (const row of deck.seats[0].deck) {
      for (const col of row) {
        for (const ci of col) {
          let pickIndex = analytic.cards.findIndex(
            (card) => card.cardName === carddb.cardFromId(deck.cards[ci].cardID).name.toLowerCase(),
          );
          if (pickIndex === -1) {
            pickIndex =
              analytic.cards.push(newCardAnalytics(carddb.cardFromId(deck.cards[ci].cardID).name.toLowerCase(), 1200)) -
              1;
          }
          analytic.cards[pickIndex].mainboards += 1;
        }
      }
    }
    for (const row of deck.seats[0].sideboard) {
      for (const col of row) {
        for (const ci of col) {
          let pickIndex = analytic.cards.findIndex(
            (card) => card.cardName === carddb.cardFromId(deck.cards[ci].cardID).name.toLowerCase(),
          );
          if (pickIndex === -1) {
            pickIndex =
              analytic.cards.push(newCardAnalytics(carddb.cardFromId(deck.cards[ci].cardID).name.toLowerCase(), 1200)) -
              1;
          }
          analytic.cards[pickIndex].sideboards += 1;
        }
      }
    }
    await analytic.save();
  }
};

export const saveDraftAnalytics = async (draft, seatNumber, carddb) => {
  try {
    // first get all the card rating objects we need
    const cards = await CardRating.find(
      {
        name: {
          $in: draft.cards.map(({ cardID }) => carddb.cardFromId(cardID).name),
        },
      },
      'elo picks name',
    );

    const nameToCardAnalytic = {};
    for (const analytic of cards) {
      nameToCardAnalytic[analytic.name] = analytic;
    }

    // fetch the cube analytic
    let analytic = await CubeAnalytic.findOne({ cube: draft.cube });

    if (!analytic) {
      analytic = new CubeAnalytic();
      analytic.cube = draft.cube;
    }

    const { pickorder, trashorder } = draft.seats[seatNumber];
    const numToTake = pickorder.length + trashorder.length;
    let prevPickedNum = 0;
    for (let pickNumber = 0; pickNumber <= numToTake; pickNumber++) {
      const { cardsInPack, pickedNum } = getDrafterState({ draft, seatNumber, pickNumber }, true);
      let pickedIndex = -1;

      if (pickedNum > prevPickedNum) {
        pickedIndex = pickorder[prevPickedNum];
      }
      prevPickedNum = pickedNum;

      if (pickedIndex !== -1) {
        const pickedCard = carddb.cardFromId(draft.cards[pickedIndex].cardID);
        const packCards = cardsInPack.map((index) => carddb.cardFromId(draft.cards[index].cardID));

        // update the local values of the cubeAnalytic
        let pickIndex = analytic.cards.findIndex((card) => card.cardName === pickedCard.name_lower);
        if (pickIndex === -1) {
          pickIndex = analytic.cards.push(newCardAnalytics(pickedCard.name_lower, ELO_BASE)) - 1;
        }

        analytic.cards[pickIndex].picks += 1;

        for (const packCard of packCards) {
          let index = analytic.cards.findIndex((card) => card.cardName === packCard.name_lower);
          if (index === -1) {
            index = analytic.cards.push(newCardAnalytics(packCard.name_lower, ELO_BASE)) - 1;
          }

          const adjustments = getEloAdjustment(
            analytic.cards[pickIndex].elo,
            analytic.cards[index].elo,
            CUBE_ELO_SPEED,
          );
          analytic.cards[pickIndex].elo += adjustments[0];
          analytic.cards[index].elo += adjustments[1];

          analytic.cards[index].passes += 1;
        }

        // update the local values of the cardAnalytics.

        // ensure we have valid analytics for all these cards
        if (!nameToCardAnalytic[pickedCard.name]) {
          nameToCardAnalytic[pickedCard.name] = new CardRating();
        }
        if (!nameToCardAnalytic[pickedCard.name].elo) {
          nameToCardAnalytic[pickedCard.name].name = pickedCard.name;
          nameToCardAnalytic[pickedCard.name].elo = ELO_BASE;
        } else if (!Number.isFinite(nameToCardAnalytic[pickedCard.name].elo)) {
          nameToCardAnalytic[pickedCard.name].elo = ELO_BASE;
        }
        if (!nameToCardAnalytic[pickedCard.name].picks) {
          nameToCardAnalytic[pickedCard.name].picks = 0;
        }
        nameToCardAnalytic[pickedCard.name].picks += 1;

        for (const packCard of packCards) {
          if (!nameToCardAnalytic[packCard.name]) {
            nameToCardAnalytic[packCard.name] = new CardRating();
          }
          if (!nameToCardAnalytic[packCard.name].elo) {
            nameToCardAnalytic[packCard.name].name = packCard.name;
            nameToCardAnalytic[packCard.name].elo = ELO_BASE;
          }
          if (!nameToCardAnalytic[packCard.name].picks) {
            nameToCardAnalytic[packCard.name].picks = 0;
          }

          if (!Number.isFinite(nameToCardAnalytic[packCard.name].elo)) {
            nameToCardAnalytic[packCard.name].elo = ELO_BASE;
          }

          // update the elos
          const adjustments = getEloAdjustment(
            nameToCardAnalytic[pickedCard.name].elo,
            nameToCardAnalytic[packCard.name].elo,
            ELO_SPEED,
          );

          nameToCardAnalytic[pickedCard.name].elo += adjustments[0];
          nameToCardAnalytic[packCard.name].elo += adjustments[1];
        }
      }
    }
    // save our docs
    await analytic.save();
    await Promise.all(cards.map((card) => card.save()));
  } catch (err) {
    winston.error(err);
  }
};

const loadImage = async (url) => (await axios({ url, responseType: 'arraybuffer' })).data;

export const generateSamplepackImageSharp = async (sources = [], options = {}) => {
  const imageSources = await Promise.all(
    sources.map(async (srcObj) => ({ ...srcObj, src: await loadImage(srcObj.src) })),
  );
  return sharp({
    create: {
      width: options.width,
      height: options.height,
      channels: 3,
      background: { r: 0, g: 0, b: 0 },
    },
  })
    .composite(imageSources.map(({ src, x, y }) => ({ input: src, top: y, left: x })))
    .webp({ quality: 50, alphaQuality: 0, reductionEffort: 2 })
    .toBuffer();
};

// A cache for promises that are expensive to compute and will always produce
// the same value, such as pack images. If a promise produces an error, it's
// removed from the cache. Each promise lives five minutes by default.
const promiseCache = new NodeCache({ stdTTL: 60 * 5, useClones: false });

// / Caches the result of the given callback in `promiseCache` with the given
// / key.
export const cachePromise = (key, callback) => {
  const existingPromise = promiseCache.get(key);
  if (existingPromise) return existingPromise;

  const newPromise = callback().catch((error) => {
    promiseCache.del(key);
    throw error;
  });
  promiseCache.set(key, newPromise);
  return newPromise;
};

export const generatePack = async (cubeId, carddb, seed) => {
  const cube = await Cube.findOne(buildIdQuery(cubeId)).lean();
  if (!seed) {
    seed = Date.now().toString();
  }
  cube.cards = cube.cards.map((card) => ({ ...card, details: { ...carddb.getCardDetails(card) } }));
  const formatId = cube.defaultDraftFormat === undefined ? -1 : cube.defaultDraftFormat;
  const format = getDraftFormat({ id: formatId, packs: 1, cards: 15 }, cube);
  const draft = createDraft(format, cube.cards, 1, { username: 'Anonymous' }, false, seed);
  return {
    seed,
    pack: draft.initial_state[0][0].cards.map((cardIndex) => ({
      ...draft.cards[cardIndex],
      details: carddb.cardFromId(draft.cards[cardIndex].cardID),
    })),
  };
};

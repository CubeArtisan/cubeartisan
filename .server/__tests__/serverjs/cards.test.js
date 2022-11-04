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
/* eslint no-underscore-dangle: ["error", {"allow": ["_id", "_RankleMasterofFixtures"]}] */
import carddb from '@cubeartisan/server/serverjs/cards.js';

const fixturesPath = '__tests__/fixtures';
const firstLetterCount = 21;
const fixtureCardCount = 100;
const fixtureCardNameCount = 99;
const placeholderCard = {
  set: '',
  collector_number: '',
  promo: false,
  digital: false,
  full_name: 'Invalid Card',
  name: 'Invalid Card',
  name_lower: 'invalid card',
  artist: '',
  scryfall_uri: '',
  rarity: '',
  reprint: false,
  legalities: {},
  oracle_text: '',
  image_normal: 'https://img.scryfall.com/errors/missing.jpg',
  cmc: 0,
  type: '',
  colors: [],
  color_identity: [],
  parsed_cost: [],
  colorcategory: 'c',
  error: true,
};

afterEach(() => {
  carddb.unloadCardDb();
});

test('initializeCardDb loads files properly', () => {
  expect.assertions(6);
  const promise = carddb.initializeCardDb(fixturesPath, true);
  return promise.then(() => {
    expect(Object.keys(carddb.cardtree).length).toBe(firstLetterCount);
    expect(Object.keys(carddb.imagedict).length).toBe(fixtureCardCount);
    expect(Object.keys(carddb.cardimages).length).toBe(fixtureCardNameCount);
    expect(carddb.cardnames.length).toBe(fixtureCardNameCount);
    expect(Object.keys(carddb.full_names).length).toBe(firstLetterCount);
    expect(Object.keys(carddb.nameToId).length).toBe(fixtureCardNameCount);
  });
});

test('unloadCardDb unloads the card database correctly', () => {
  expect.assertions(6);
  const promise = carddb.initializeCardDb(fixturesPath, true);
  return promise.then(() => {
    carddb.unloadCardDb();
    expect(carddb.cardtree).toBe(undefined);
    expect(carddb.imagedict).toBe(undefined);
    expect(carddb.cardimages).toBe(undefined);
    expect(carddb.cardnames).toBe(undefined);
    expect(carddb.full_names).toBe(undefined);
    expect(carddb.nameToId).toBe(undefined);
  });
});

const _RankleMasterofFixtures = {
  _id: '93c2c11d-dfc3-4ba9-8c0f-a98114090396',
  oracle_id: 'b8619990-9dc2-4fcc-bc7e-457b77cd2a8e',
  mtgo_id: 78320,
  color_identity: ['B'],
  set: 'eld',
  collector_number: '101',
  promo: false,
  digital: false,
  isToken: false,
  border_color: 'black',
  name: 'Rankle, Master of Pranks',
  name_lower: 'rankle, master of pranks',
  full_name: 'Rankle, Master of Pranks [eld-101]',
  artist: 'Dmitry Burmak',
  scryfall_uri: 'https://scryfall.com/card/eld/101/rankle-master-of-pranks?utm_source=api',
  rarity: 'mythic',
  oracle_text:
    'Flying, haste\nWhenever Rankle, Master of Pranks deals combat damage to a player, choose any number —\n• Each player discards a card.\n• Each player loses 1 life and draws a card.\n• Each player sacrifices a creature.',
  cmc: 4,
  legalities: {
    Standard: 'legal',
    Historic: 'legal',
    Pioneer: 'legal',
    Modern: 'legal',
    Legacy: 'legal',
    Pauper: 'not_legal',
    Vintage: 'legal',
    Penny: 'not_legal',
    Commander: 'legal',
    Brawl: 'legal',
  },
  cubeCount: 0,
  parsed_cost: ['b', 'b', '2'],
  colors: ['B'],
  type: 'Legendary Creature — Faerie Rogue',
  full_art: false,
  language: 'en',
  tcgplayer_id: 198584,
  power: '3',
  toughness: '3',
  image_small:
    'https://c1.scryfall.com/file/scryfall-cards/small/front/9/3/93c2c11d-dfc3-4ba9-8c0f-a98114090396.jpg?1572490217',
  image_normal:
    'https://c1.scryfall.com/file/scryfall-cards/normal/front/9/3/93c2c11d-dfc3-4ba9-8c0f-a98114090396.jpg?1572490217',
  art_crop:
    'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/9/3/93c2c11d-dfc3-4ba9-8c0f-a98114090396.jpg?1572490217',
  colorcategory: 'b',
  elo: 1200,
  embedding: [],
  layout: 'normal',
  set_name: 'Throne of Eldraine',
  released_at: '2019-10-04',
  reprint: false,
  pickCount: 0,
  popularity: 0,
  prices: {
    eur: 7.99,
    tix: 0.79,
    usd: 5.23,
    usd_foil: 10.81,
  },
  foil: true,
  nonfoil: true,
};

test('cardFromId returns a well-formed card object', () => {
  expect.assertions(1);
  const { _id } = _RankleMasterofFixtures;
  const expected = _RankleMasterofFixtures;
  const promise = carddb.initializeCardDb(fixturesPath, true);
  return promise.then(() => {
    const result = carddb.cardFromId(_id);
    expect(result).toEqual(expected);
  });
});

test('cardFromId returns only selected fields', async () => {
  expect.assertions(1);
  const { _id } = _RankleMasterofFixtures;
  const expected = {
    _id: '93c2c11d-dfc3-4ba9-8c0f-a98114090396',
    name: 'Rankle, Master of Pranks',
    colors: ['B'],
  };
  await carddb.initializeCardDb(fixturesPath, true);
  const result = carddb.cardFromId(_id, '_id name colors');
  expect(result).toEqual(expected);
});

test('cardFromId returns a placeholder card object when given a nonexistent ID', () => {
  expect.assertions(1);
  const _id = 'not real';
  const expected = placeholderCard;
  expected._id = _id;
  const promise = carddb.initializeCardDb(fixturesPath, true);
  return promise.then(() => {
    const result = carddb.cardFromId(_id);
    expect(result).toEqual(expected);
  });
});

test('getCardDetails returns a well-formed card object', () => {
  expect.assertions(1);
  const { _id } = _RankleMasterofFixtures;
  const expected = _RankleMasterofFixtures;
  const promise = carddb.initializeCardDb(fixturesPath, true);
  return promise.then(() => {
    const result = carddb.getCardDetails({
      cardID: _id,
    });
    expect(result).toEqual(expected);
  });
});

test('getCardDetails returns a placeholder card object when given a nonexistent ID', () => {
  expect.assertions(1);
  const _id = 'not real';
  const expected = placeholderCard;
  expected._id = _id;
  const promise = carddb.initializeCardDb(fixturesPath, true);
  return promise.then(() => {
    const result = carddb.getCardDetails({
      cardID: _id,
    });
    expect(result).toEqual(expected);
  });
});

test('normalizedName normalized ascii correctly', () => {
  const rawName = 'Garruk, Primal Hunter';
  const expected = 'garruk, primal hunter';
  const result = carddb.normalizedName({
    name: rawName,
    name_lower: expected,
  });
  expect(result).toBe(expected);
});

test('normalizedName normalizes unicode correctly', () => {
  const rawName = 'Ætherspouts';
  const expected = 'ætherspouts';
  const result = carddb.normalizedName({
    name: rawName,
    name_lower: expected,
  });
  expect(result).toBe(expected);
});

test('allVersions correctly maps a cardname to an ID', () => {
  expect.assertions(2);
  const promise = carddb.initializeCardDb(fixturesPath, true);
  return promise.then(() => {
    const expected = _RankleMasterofFixtures._id;
    const result = carddb.allVersions({
      name: 'Rankle, Master of Pranks',
    });
    expect(result.length).toBe(1);
    expect(result[0]).toBe(expected);
  });
});

test('allVersions correctly maps a cardname to an ID', () => {
  expect.assertions(2);
  const promise = carddb.initializeCardDb(fixturesPath, true);
  return promise.then(() => {
    const expected = _RankleMasterofFixtures._id;
    const result = carddb.allVersions({
      name: 'Rankle, Master of Pranks',
    });
    expect(result.length).toBe(1);
    expect(result[0]).toBe(expected);
  });
});

test('getVersionsByOracleId correctly gets all printings of a card', async () => {
  expect.assertions(1);
  await carddb.initializeCardDb(fixturesPath, true);
  // Sorcerous Spyglass: two printings in IXN and ELD.
  const expected = new Set(['e47e85d1-8c4a-43a9-92b3-7cb2a5b89219', '85506a24-8d60-475c-9f43-65994caca7d4']);
  const result = new Set(carddb.getVersionsByOracleId('b2187f45-80ae-4ac4-9f83-5eb7a00978e2'));
  expect(result).toEqual(expected);
});

test('getMostReasonableById correctly gets a card', async () => {
  expect.assertions(1);
  await carddb.initializeCardDb(fixturesPath, true);
  const expected = _RankleMasterofFixtures;
  const result = carddb.getMostReasonableById(expected._id);
  expect(result).toEqual(expected);
});

test('getMostReasonable correctly gets first printing', async () => {
  expect.assertions(1);
  await carddb.initializeCardDb(fixturesPath, true);
  const result = carddb.getMostReasonable('Sorcerous Spyglass', 'first');
  expect(result.set).toEqual('xln');
});

test('getMostReasonable correctly gets most recent printing', async () => {
  expect.assertions(1);
  await carddb.initializeCardDb(fixturesPath, true);
  const result = carddb.getMostReasonable('Sorcerous Spyglass', 'recent');
  expect(result.set).toEqual('eld');
});

test('loadJSONFile loads a JSON file into the correct attribute', () => {
  expect.assertions(1);
  const attribute = 'testAttribute';
  return carddb.loadJSONFile(`${fixturesPath}/names.json`, attribute).then(() => {
    expect(carddb[attribute].length).toBe(fixtureCardNameCount);
  });
});

test('getPlaceholderCard', () => {
  const _id = 'abckggght';
  const expected = placeholderCard;
  expected._id = _id;
  expect(carddb.getPlaceholderCard(_id)).toEqual(expected);
});

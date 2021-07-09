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
/* eslint-disable import/first */
jest.mock('@cubeartisan/server/serverjs/util.js');

import sinon from 'sinon';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import {
  buildIdQuery,
  compareCubes,
  CSVtoCards,
  generateShortId,
  intToLegality,
  legalityToInt,
  setCubeType,
} from '@cubeartisan/server/serverjs/cubefn.js';
import { hasProfanity, toBase36 } from '@cubeartisan/server/serverjs/util.js';
import Cube from '@cubeartisan/server/models/cube.js';
import { arraysEqual } from '@cubeartisan/client/utils/Util.js';
// eslint-disable-next-line no-restricted-imports
import cubefixture from '../fixtures/examplecube';

const fixturesPath = '__tests__/fixtures';

beforeEach(() => {
  sinon.stub(Cube, 'findOne');
});

afterEach(() => {
  Cube.findOne.restore();
  carddb.unloadCardDb();
});

test('buildIdQuery returns a simple query when passed a 24-character alphanumeric string', () => {
  const testId = 'a1a1a1a1a1a1a1a1a1a1a1a1';
  const result = buildIdQuery(testId);
  expect(result._id).toBe(testId);
});

test('buildIdQuery returns a shortID query when passed a non-alphanumeric string', () => {
  const testId = 'a1a-a1a1a1a1a1a1a1a1a1a1';
  const result = buildIdQuery(testId);
  expect(result.shortID).toBe(testId);
});

test('intToLegality returns the expected values', () => {
  expect(intToLegality(0)).toBe('Vintage');
  expect(intToLegality(1)).toBe('Legacy');
  expect(intToLegality(2)).toBe('Modern');
  expect(intToLegality(3)).toBe('Pioneer');
  expect(intToLegality(4)).toBe('Standard');
  expect(intToLegality(5)).toBe(undefined);
});

test('legalityToInt returns the expected values', () => {
  expect(legalityToInt('Vintage')).toBe(0);
  expect(legalityToInt('Legacy')).toBe(1);
  expect(legalityToInt('Modern')).toBe(2);
  expect(legalityToInt('Pioneer')).toBe(3);
  expect(legalityToInt('Standard')).toBe(4);
  expect(legalityToInt('not a format')).toBe(undefined);
});

test('generateShortId returns a valid short ID', async () => {
  const dummyModel = [{ shortID: '1x' }, { shortID: 'a2c' }, { shortID: 'custom_short-ID' }];
  const queryMockPromise = new Promise((resolve) => {
    process.nextTick(() => {
      resolve(dummyModel);
    });
  });
  toBase36.mockReturnValue('123456');
  hasProfanity.mockReturnValueOnce(false);
  const queryMock = jest.fn();
  queryMock.mockReturnValue(queryMockPromise);
  const initialCubeFind = Cube.find;
  Cube.find = queryMock;
  const result = await generateShortId();
  // result is a base36 number
  expect(result).toEqual('123456');
  // result is unique
  for (const cube of dummyModel) {
    expect(result).not.toEqual(cube.shortID);
  }
  Cube.find = initialCubeFind;
});

test('generateShortId returns a valid short ID without profanity', async () => {
  const dummyModel = {
    shortID: '1x',
  };
  const queryMockPromise = new Promise((resolve) => {
    process.nextTick(() => {
      resolve([dummyModel]);
    });
  });
  const mockHasProfanity = hasProfanity.mockReturnValueOnce(true).mockReturnValue(false);
  const queryMock = jest.fn().mockReturnValue(queryMockPromise);
  const initialCubeFind = Cube.find;
  Cube.find = queryMock;
  await generateShortId();
  // hasProfanity must be called at least once
  expect(mockHasProfanity.mock.calls.length).toBeGreaterThan(0);
  // the last profanity check must return false
  const { results } = mockHasProfanity.mock;
  expect(results[results.length - 1].value).toBe(false);
  Cube.find = initialCubeFind;
});

test('setCubeType correctly sets the type of its input cube', async () => {
  expect.assertions(2);
  const exampleCube = JSON.parse(JSON.stringify(cubefixture.exampleCube));
  await carddb.initializeCardDb(fixturesPath, true);
  const result = setCubeType(exampleCube, carddb);
  expect(result.type).toBe('Standard');
  expect(exampleCube.type).toBe('Standard');
});

describe('CSVtoCards', () => {
  it('can find a card', async () => {
    const expectedId = 'aaae15dd-11b6-4421-99e9-365c7fe4a5d6';
    const expectedCard = {
      name: 'Embercleave',
      cmc: '3',
      type_line: 'Creature - Test',
      colors: ['U'],
      set: 'ELD',
      collector_number: '359',
      status: 'Owned',
      finish: 'Is Foil',
      imgUrl: 'http://example.com/',
      tags: ['tag1', 'tag2'],
    };
    const expectedMaybe = {
      name: 'Embercleave',
      cmc: '2',
      type_line: 'Creature - Type',
      colors: ['R', 'W'],
      set: 'ELD',
      collector_number: '120',
      status: 'Not Owned',
      finish: 'Is Not Foil',
      imgUrl: null,
      tags: ['tag3', 'tag4'],
    };
    const cards = [
      'Name,CMC,Type,Color,Set,Collector Number,Status,Finish,Maybeboard,Image URL,Tags',
      `"${expectedCard.name}",${expectedCard.cmc},${expectedCard.type_line.replace(
        '—',
        '-',
      )},${expectedCard.colors.join('')},${expectedCard.set},${expectedCard.collector_number},${expectedCard.status},${
        expectedCard.finish
      },false,${expectedCard.imgUrl},"${expectedCard.tags.join(';')}"`,
      `"${expectedMaybe.name}",${expectedMaybe.cmc},${expectedMaybe.type_line.replace(
        '—',
        '-',
      )},${expectedMaybe.colors.join('')},${expectedMaybe.set},${expectedMaybe.collector_number},${
        expectedMaybe.status
      },${expectedMaybe.finish},true,undefined,"${expectedMaybe.tags.join(';')}"`,
    ];
    await carddb.initializeCardDb(fixturesPath, true);
    const { newCards, newMaybe, missing } = CSVtoCards(cards.join('\n'), carddb);
    expect.extend({
      equalsArray: (received, expected) => ({
        message: () => `expected ${received} to equal array ${expected}`,
        pass: arraysEqual(received, expected),
      }),
    });
    const expectSame = (card, expected) => {
      expect(card.cardID).toBe(expectedId);
      expect(card.name).toBe(expected.name);
      expect(card.cmc).toBe(expected.cmc);
      expect(card.colors).equalsArray(expected.colors);
      expect(card.collector_number).toBe(expected.collector_number);
      expect(card.status).toBe(expected.status);
      expect(card.finish).toBe(expected.finish);
      expect(card.imgUrl).toBe(expected.imgUrl);
      expect(card.tags).equalsArray(expected.tags);
    };
    expect(newCards.length).toBe(1);
    expectSame(newCards[0], expectedCard);
    expect(newMaybe.length).toBe(1);
    expectSame(newMaybe[0], expectedMaybe);
    expect(missing).toBe('');
  });
});

describe('compareCubes', () => {
  it('can calculate the diff between two cubes', async () => {
    await carddb.initializeCardDb(fixturesPath, true);
    const queryMockPromise = new Promise((resolve) => {
      process.nextTick(() => {
        resolve({});
      });
    });
    const queryMock = jest.fn();
    queryMock.mockReturnValue(queryMockPromise);
    const cardsA = [cubefixture.exampleCube.cards[0], cubefixture.exampleCube.cards[1]];
    const cardsB = [cubefixture.exampleCube.cards[1], cubefixture.exampleCube.cards[2]];
    for (const card of cardsA) {
      card.details = { ...carddb.cardFromId(card.cardID) };
    }
    for (const card of cardsB) {
      card.details = { ...carddb.cardFromId(card.cardID) };
    }
    const { inBoth, onlyA, onlyB, aNames, bNames, allCards } = await compareCubes(cardsA, cardsB);
    expect(inBoth.length).toBe(1);
    expect(inBoth[0].cardID).toBe(cubefixture.exampleCube.cards[1].cardID);
    expect(onlyA.length).toBe(1);
    expect(onlyA[0].cardID).toBe(cubefixture.exampleCube.cards[0].cardID);
    expect(onlyB.length).toBe(1);
    expect(onlyB[0].cardID).toBe(cubefixture.exampleCube.cards[2].cardID);
    expect(aNames.length).toBe(1);
    expect(bNames.length).toBe(1);
    expect(allCards.length).toBe(3);
  });
});

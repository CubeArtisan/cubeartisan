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
import {
  turnToTree,
  binaryInsert,
  hasProfanity,
  addCardToCube,
  generateEditToken,
  toBase36,
  fromBase36,
} from '@cubeartisan/server/serverjs/util';

beforeEach(() => {});

afterEach(() => {});

test('turnToTree returns a valid prefix tree', () => {
  const arrayToTree = ['tes', 'trail', 'another'];
  const result = turnToTree(arrayToTree);
  expect(Object.keys(result).length).toBe(2);
  expect(Object.keys(result.t).length).toBe(2);
  expect(Object.keys(result.a).length).toBe(1);
});

test('binaryInsert inserts to an empty array', () => {
  const testArray = [];
  const initialLength = testArray.length;
  const testValue = 1;
  binaryInsert(testValue, testArray);
  expect(testArray.length).toBe(initialLength + 1);
  expect(testArray[0]).toBe(testValue);
});

test('binaryInsert inserts new maximum correctly to a sorted array', () => {
  const testArray = [1, 2, 3, 4];
  const initialLength = testArray.length;
  const testValue = 5;
  binaryInsert(testValue, testArray);
  expect(testArray.length).toBe(initialLength + 1);
  expect(testArray[testArray.length - 1]).toBe(testValue);
});

test('binaryInsert inserts new minimum correctly to a sorted array', () => {
  const testArray = [1, 2, 3, 4];
  const initialLength = testArray.length;
  const testValue = 0;
  binaryInsert(testValue, testArray);
  expect(testArray.length).toBe(initialLength + 1);
  expect(testArray[0]).toBe(testValue);
});

test('binaryInsert inserts new median correctly to a sorted array', () => {
  const testArray = [1, 2, 4, 5];
  const initialLength = testArray.length;
  const testValue = 3;
  binaryInsert(testValue, testArray);
  expect(testArray.length).toBe(initialLength + 1);
  expect(testArray[initialLength / 2]).toBe(testValue);
});

test('binaryInsert does not fail when input array is unsorted', () => {
  const testArray = [1, 2, 9, 4];
  const initialLength = testArray.length;
  const testValue = 5;
  binaryInsert(testValue, testArray);
  expect(testArray.length).toBe(initialLength + 1);
});

test('addCardToCube adds a well-formed object', () => {
  const testCube = {
    cards: [],
  };
  const initialLength = testCube.cards.length;
  const testCard = {
    color_identity: 'W',
    cmc: 1,
    _id: 'abcdef',
    type: 'creature',
  };
  addCardToCube(testCube, testCard);
  expect(testCube.cards.length).toBe(initialLength + 1);
  const result = testCube.cards[0];
  expect(result.tags.length).toBe(0);
  expect(result.status).toBe('Owned');
  expect(result.finish).toBe('Non-foil');
  expect(result.colors).toBe(testCard.color_identity);
  expect(result.cmc).toBe(testCard.cmc);
  expect(result.cardID).toBe(testCard._id);
  expect(result.type_line).toBe(testCard.type);
  expect(result.imgUrl).toBe(undefined);
});

test('addCardToCube declines to add invalid card', () => {
  const testCube = {
    cards: [],
  };
  const initialLength = testCube.cards.length;
  const testCard = {
    error: true,
  };
  addCardToCube(testCube, testCard);
  expect(testCube.cards.length).toBe(initialLength);
});

test('addCardToCube allows custom tags', () => {
  const testCube = {
    cards: [],
  };
  const initialLength = testCube.cards.length;
  const testCard = {
    color_identity: 'W',
    cmc: 1,
    _id: 'abcdef',
    type: 'creature',
  };
  addCardToCube(testCube, testCard, ['Tag']);
  expect(testCube.cards.length).toBe(initialLength + 1);
  const result = testCube.cards[0];
  expect(result.tags.length).toBe(1);
  expect(result.tags[0]).toBe('Tag');
});

test('generateEditToken does not generate the same token on sequential calls', () => {
  const firstResult = generateEditToken();
  const secondResult = generateEditToken();
  expect(firstResult).not.toBe(secondResult);
});

test('toBase36 returns the base36 representation of its input', () => {
  const testInput = 69;
  const expected = testInput.toString(36);
  const result = toBase36(testInput);
  expect(result).toBe(expected);
});

test('fromBase36 returns the base10 int representation of its input', () => {
  const testInt = 69;
  const testInput = testInt.toString(36);
  const expected = parseInt(testInput, 36);
  const result = fromBase36(testInput);
  expect(result).toBe(expected);
});

test('hasProfanity returns true for strings containing profanity', () => {
  const testString = 'the quick brown fox jumped over the lazy ass dog';
  const result = hasProfanity(testString);
  expect(result).toBe(true);
});

test('hasProfanity returns false for strings not containing profanity', () => {
  const testString = 'the quick brown fox jumped over the lazy dog';
  const result = hasProfanity(testString);
  expect(result).toBe(false);
});

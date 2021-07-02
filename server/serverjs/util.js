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
import Filter from 'bad-words';
import shuffleSeed from 'shuffle-seed';

import winston from '@cubeartisan/server/serverjs/winstonConfig';

export const hasProfanity = (text) => {
  if (!text) return false;

  const filter = new Filter();
  const removeWords = ['hell', 'sadist', 'God'];
  filter.removeWords(...removeWords);

  return filter.isProfane(text.toLowerCase());
};

export const generateEditToken = () => {
  // Not sure if this function is actually used anywhere.
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const toBase36 = (num) => {
  // noinspection JSCheckFunctionSignatures
  return num.toString(36);
};

export const fromBase36 = (str) => {
  if (!str) return 0;
  return parseInt(str, 36);
};

export const addWordToTree = (obj, word) => {
  if (word.length <= 0) {
    return;
  }
  if (word.length === 1) {
    if (!obj[word.charAt(0)]) {
      obj[word.charAt(0)] = {
        $: {},
      };
    } else {
      obj[word.charAt(0)].$ = {};
    }
  } else {
    const character = word.charAt(0);
    word = word.substr(1, word.length);
    if (!obj[character]) {
      obj[character] = {};
    }
    addWordToTree(obj[character], word);
  }
};

export const redirect = (dest) => (_req, res) => res.redirect(dest);

export const binaryInsert = (value, array, startVal, endVal) => {
  const { length } = array;
  const start = typeof startVal !== 'undefined' ? startVal : 0;
  const end = typeof endVal !== 'undefined' ? endVal : length - 1; //! ! endVal could be 0 don't use || syntax
  const m = start + Math.floor((end - start) / 2);

  if (length === 0) {
    array.push(value);
    return;
  }

  if (value > array[end]) {
    array.splice(end + 1, 0, value);
    return;
  }

  if (value < array[start]) {
    array.splice(start, 0, value);
    return;
  }

  if (start >= end) {
    return;
  }

  if (value < array[m]) {
    binaryInsert(value, array, start, m - 1);
    return;
  }

  if (value > array[m]) {
    binaryInsert(value, array, m + 1, end);
  }
};

export const newCard = (cardDetails, tags, defaultStatus = 'Owned') => {
  return {
    tags: Array.isArray(tags) ? tags : [],
    status: defaultStatus,
    colors: cardDetails.color_identity,
    cmc: cardDetails.cmc,
    cardID: cardDetails._id,
    type_line: cardDetails.type,
    addedTmsp: new Date(),
    finish: 'Non-foil',
  };
};

export const addCardToCube = (cube, cardDetails, tags) => {
  if (cardDetails.error) {
    winston.error('Attempted to add invalid card to cube.');
    return;
  }

  const card = newCard(cardDetails, tags, cube.defaultStatus || 'Owned');
  cube.cards.push(card);
};

export const fromEntries = (entries) => {
  const obj = {};
  for (const [k, v] of entries) {
    obj[k] = v;
  }
  return obj;
};

export const addNotification = async (user, from, url, text) => {
  if (user.username === from.username) {
    return; // we don't need to give notifications to ourselves
  }

  user.notifications.push({
    user_from: from._id,
    user_from_name: from.username,
    url,
    date: new Date(),
    text,
  });
  user.old_notifications.push({
    user_from: from._id,
    user_from_name: from.username,
    url,
    date: new Date(),
    text,
  });
  while (user.old_notifications.length > 200) {
    user.old_notifications = user.old_notifications.slice(1);
  }
  await user.save();
};

export const addMultipleNotifications = async (users, from, url, text) => {
  for await (const user of users) {
    await addNotification(user, from, url, text);
  }
};

export const wrapAsyncApi = (route) => {
  return (req, res, next) => {
    try {
      return route(req, res, next);
    } catch (err) {
      req.logger.error(err);
      return res.status(500).send({
        success: 'false',
        message: 'Internal server error',
      });
    }
  };
};

export const handleRouteError = (req, res, err, reroute) => {
  req.flash('danger', err.message);
  res.redirect(reroute);
  req.logger.error(err);
};

export const toNonNullArray = (arr) => {
  if (!arr) return [];
  if (!Array.isArray(arr)) return typeof arr === 'object' ? Object.values(arr) : [];
  return arr;
};

export const mapNonNull = (arr, f) => {
  return toNonNullArray(arr).map(f);
};

export const flatten = (arr, n) => {
  if (n <= 1) return toNonNullArray(arr);
  return toNonNullArray([].concat(...mapNonNull(arr, (a) => flatten(a, n - 1))));
};

export const shuffle = (array, seed) => {
  if (!seed) {
    seed = Date.now();
  }
  return shuffleSeed.shuffle(array, seed);
};

export const turnToTree = (arr) => {
  const res = {};
  arr.forEach((item) => {
    addWordToTree(res, item);
  });
  return res;
};

export const isAdmin = (user) => {
  return user && user.roles.includes('Admin');
};

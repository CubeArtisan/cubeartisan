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
import fs from 'fs';
import winston from 'winston';
import { SortFunctions, ORDERED_SORTS } from '@cubeartisan/client/utils/Sort.js';
import updatecards from '@cubeartisan/server/serverjs/updatecards.js';

// eslint-disable-next-line
let data = {
  cardtree: {},
  imagedict: {},
  cardimages: {},
  cardnames: [],
  full_names: [],
  nameToId: {},
  oracleToId: {},
  english: {},
  _carddict: {},
  printedCardList: [], // for card filters
  fullCardList: [],
};

const fileToAttribute = {
  'carddict.json': '_carddict',
  'cardtree.json': 'cardtree',
  'names.json': 'cardnames',
  'nameToId.json': 'nameToId',
  'oracleToId.json': 'oracleToId',
  'full_names.json': 'full_names',
  'imagedict.json': 'imagedict',
  'cardimages.json': 'cardimages',
  'english.json': 'english',
};

function getPlaceholderCard(_id) {
  // placeholder card if we don't find the one due to a scryfall ID update bug
  return {
    _id,
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
}

function cardFromId(id, fields) {
  let details;
  if (data._carddict[id]) {
    details = data._carddict[id];
  } else {
    // TODO: replace this back with error. it was clogging the logs.
    // winston.info(null, { error: new Error(`Could not find card from id: ${JSON.stringify(id, null, 2)}`) });
    details = getPlaceholderCard(id);
  }

  if (!fields) {
    return details;
  }
  if (!Array.isArray(fields)) {
    fields = fields.split(' ');
  }

  return Object.fromEntries(fields.map((field) => [field, details[field]]));
}

function getCardDetails(card) {
  if (data._carddict[card.cardID]) {
    const details = data._carddict[card.cardID];
    card.details = details;
    return details;
  }
  winston.error(null, { error: new Error(`Could not find card details: ${card.cardID}`) });
  return getPlaceholderCard(card.cardID);
}

function loadJSONFile(filename, attribute) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, contents) => {
      if (!err) {
        try {
          data[attribute] = JSON.parse(contents);
        } catch (e) {
          winston.error(`Error parsing json from ${filename}.`, { error: e });
          err = e;
        }
      }
      if (err) {
        reject(err);
      } else {
        resolve(contents);
      }
    });
  });
}

function registerFileWatcher(filename, attribute) {
  fs.watchFile(filename, () => {
    winston.info(`File Changed: ${filename}`);
    loadJSONFile(filename, attribute);
  });
}

async function initializeCardDb(dataRoot, skipWatchers, attempt = 0) {
  winston.info('LoadingPage carddb...');
  if (dataRoot === undefined) {
    dataRoot = './private';
  }
  if (!Object.keys(fileToAttribute).every((filename) => fs.existsSync(`${dataRoot}/${filename}`))) {
    winston.info('Starting cardbase update...');

    await updatecards.downloadCardbase(dataRoot);
  }
  const promises = [];
  for (const [filename, attribute] of Object.entries(fileToAttribute)) {
    const filepath = `${dataRoot}/${filename}`;
    promises.push(loadJSONFile(filepath, attribute));
    if (skipWatchers !== true) {
      registerFileWatcher(filepath, attribute);
    }
  }
  try {
    await Promise.all(promises);
  } catch (err) {
    if (attempt < 2) {
      winston.info('Starting cardbase update...');
      await updatecards.downloadCardbase(dataRoot);
      return initializeCardDb(dataRoot, true, attempt + 1);
    }
    throw err;
  }
  // cache cards used in card filters
  data.fullCardList = Object.values(data._carddict);
  data.printedCardList = data.fullCardList.filter((card) => !card.digital && !card.isToken);
  return winston.info('Finished loading carddb.');
}

function unloadCardDb() {
  for (const [filename, attribute] of Object.entries(fileToAttribute)) {
    delete data[attribute];
    try {
      fs.unwatchFile(filename);
    } catch (e) {
      // This is likely just because we didn't register them.
      winston.warn(null, { error: new Error(`Failed to unwatch file ${filename}.`) });
    }
  }
  delete data.printedCardList;
  delete data.fullCardList;
}

function reasonableCard(card) {
  return (
    !card.promo &&
    !card.digital &&
    !card.isToken &&
    card.border_color !== 'gold' &&
    card.language === 'en' &&
    card.tcgplayer_id &&
    card.set !== 'myb' &&
    card.set !== 'mb1' &&
    card.collector_number.indexOf('★') === -1
  );
}

function reasonableId(id) {
  return reasonableCard(cardFromId(id));
}

function getIdsFromName(name) {
  // this is a fully-spcecified card name
  if (name.includes('[') && name.includes(']')) {
    name = name.toLowerCase();
    const split = name.split('[');
    return getIdsFromName(split[0])
      .map((id) => cardFromId(id))
      .filter((card) => card.full_name.toLowerCase() === name)
      .map((card) => card._id);
  }

  return (
    data.nameToId[
      name
        .trim()
        .normalize('NFD') // convert to consistent unicode format
        .replace(/[\u0300-\u036f]/g, '') // remove unicode
        .toLowerCase()
    ] ?? []
  );
}

// Printing = 'recent' or 'first'
function getMostReasonable(cardName, printing = 'recent', filter = null) {
  let ids = getIdsFromName(cardName);
  if (ids === undefined || ids.length === 0) {
    // Try getting it by ID in case this is an ID.
    // eslint-disable-next-line no-use-before-define
    return getMostReasonableById(cardName, printing);
  }

  if (filter) {
    ids = ids
      .map((id) => ({ details: cardFromId(id) }))
      .filter(filter)
      .map((card) => card.details._id);
  }

  if (ids.length === 0) {
    return null;
  }

  // sort chronologically by default
  const cards = ids.map((id) => ({
    details: cardFromId(id),
  }));
  cards.sort(SortFunctions[ORDERED_SORTS['Release Date']]);

  ids = cards.map((card) => card.details._id);

  // Ids are stored in reverse chronological order, so reverse if we want first printing.
  if (printing !== 'recent') {
    ids = Array.from(ids);
    ids.reverse();
  }

  return cardFromId(ids.find(reasonableId) || ids[0]);
}

function getMostReasonableById(id, printing = 'recent', filter = null) {
  const card = cardFromId(id);
  if (card.error) {
    winston.info(`Error finding most reasonable for id ${id}`);
    return null;
  }
  return getMostReasonable(card.name, printing, filter);
}

function getFirstReasonable(ids) {
  return cardFromId(ids.find(reasonableId) || ids[0]);
}

function getEnglishVersion(id) {
  return data.english[id];
}

function getVersionsByOracleId(oracleId) {
  return data.oracleToId[oracleId];
}

data = {
  ...data,
  cardFromId,
  getCardDetails,
  getIdsFromName,
  getEnglishVersion,
  getVersionsByOracleId,
  allVersions: (card) => getIdsFromName(card.name),
  allCards: () => Object.values(data._carddict),
  allOracleIds: () => Object.keys(data.oracleToId),
  initializeCardDb,
  loadJSONFile,
  getPlaceholderCard,
  unloadCardDb,
  getMostReasonable,
  getMostReasonableById,
  getFirstReasonable,
  reasonableId,
  reasonableCard,
  normalizedName: (card) => card.name_lower,
  fileToAttribute,
};

export default data;

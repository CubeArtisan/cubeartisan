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
  cardCmc,
  cardColorIdentity,
  cardCubeCount,
  cardDevotion,
  cardElo,
  cardPickCount,
  cardPopularity,
  cardPrice,
  cardPriceEur,
  cardRarity,
  cardReleaseDate,
  cardTix,
  cardType,
  COLOR_COMBINATIONS,
  COLORS,
  detailsToCard,
} from '@cubeartisan/client/utils/Card.js';
import { alphaCompare, arrayIsSubset } from '@cubeartisan/client/utils/Util.js';

/**
 * @typedef {import('@cubeartisan/client/proptypes/CardDetailsPropType.js').Color} Color
 * @typedef {import('@cubeartisan/client/proptypes/CardDetailsPropType.js').CardDetails} CardDetails
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef {import('@cubeartisan/client/proptypes/CubePropType.js').Cube} Cube
 */

const COLOR_MAP = {
  W: 'White',
  U: 'Blue',
  B: 'Black',
  R: 'Red',
  G: 'Green',
};

const GUILD_MAP = {
  WU: 'Azorius',
  UB: 'Dimir',
  BR: 'Rakdos',
  RG: 'Gruul',
  WG: 'Selesnya',
  WB: 'Orzhov',
  UR: 'Izzet',
  BG: 'Golgari',
  WR: 'Boros',
  UG: 'Simic',
};

const SHARD_AND_WEDGE_MAP = {
  WUG: 'Bant',
  WUB: 'Esper',
  UBR: 'Grixis',
  BRG: 'Jund',
  WRG: 'Naya',
  WBG: 'Abzan',
  WUR: 'Jeskai',
  UBG: 'Sultai',
  WBR: 'Mardu',
  URG: 'Temur',
};

const FOUR_COLOR_MAP = {
  UBRG: 'Non-White',
  WBRG: 'Non-Blue',
  WURG: 'Non-Black',
  WUBG: 'Non-Red',
  WUBR: 'Non-Green',
};

const CARD_TYPES = [
  'Creature',
  'Planeswalker',
  'Instant',
  'Sorcery',
  'Artifact',
  'Enchantment',
  'Conspiracy',
  'Contraption',
  'Phenomenon',
  'Plane',
  'Scheme',
  'Vanguard',
  'Land',
];

const SINGLE_COLOR = ['White', 'Blue', 'Black', 'Red', 'Green'];
const GUILDS = ['Azorius', 'Dimir', 'Rakdos', 'Gruul', 'Selesnya', 'Orzhov', 'Izzet', 'Golgari', 'Boros', 'Simic'];
const SHARDS_AND_WEDGES = ['Bant', 'Esper', 'Grixis', 'Jund', 'Naya', 'Mardu', 'Temur', 'Abzan', 'Jeskai', 'Sultai'];
const FOUR_AND_FIVE_COLOR = ['Non-White', 'Non-Blue', 'Non-Black', 'Non-Red', 'Non-Green', 'Five Color'];

const ELO_DEFAULT = 1200;

/**
 * @param {Date?} dateString
 */
function ISODateToYYYYMMDD(dateString) {
  const locale = 'en-US.js';

  if (!dateString) {
    return undefined;
  }

  return new Date(dateString).toLocaleDateString(locale);
}

/**
 * @template T
 * @param {T[]} arr
 */
function removeAdjacentDuplicates(arr) {
  return arr.filter((x, i) => i === 0 || x !== arr[i - 1]);
}

/**
 * @param {number | string} x
 * @param {number | string} y
 */
function defaultSort(x, y) {
  if (Number.isFinite(x) && Number.isFinite(y)) {
    return x < y ? -1 : 1;
  }
  return parseInt(x.toString(), 10) < parseInt(y.toString(), 10) ? -1 : 1;
}

/**
 * @param {Color[]} colors
 */
export function GetColorIdentity(colors) {
  if (colors.length === 0) {
    return 'Colorless';
  }
  if (colors.length === 1) {
    if (Object.keys(COLOR_MAP).includes(colors[0])) {
      return COLOR_MAP[colors[0]];
    }
    return 'None';
  }
  return 'Gold';
}

/**
 * @param {Color[]} colors
 */
export function getColorCombination(colors) {
  if (colors.length < 2) {
    return GetColorIdentity(colors);
  }
  const ordered = COLORS.filter((c) => colors.includes(c)).join('');
  if (colors.length === 2) {
    return GUILD_MAP[ordered];
  }
  if (colors.length === 3) {
    return SHARD_AND_WEDGE_MAP[ordered];
  }
  if (colors.length === 4) {
    return FOUR_COLOR_MAP[ordered];
  }
  return 'Five Color';
}

/**
 * @param {string} type
 * @param {Color[]} colors
 */
export function GetColorCategory(type, colors) {
  if (type.toLowerCase().includes('land')) {
    return 'Lands';
  }
  return GetColorIdentity(colors);
}

export const SORTS = [
  'Artist',
  'Mana Value',
  'Mana Value 2',
  'Mana Value Full',
  'Color Category',
  'Color Category Full',
  'Color Count',
  'Color Identity',
  'Color Identity Full',
  'Color Combination Includes',
  'Includes Color Combination',
  'Color',
  'Creature/Non-Creature',
  'Date Added',
  'Elo',
  'Finish',
  'Guilds',
  'Legality',
  'Loyalty',
  'Manacost Type',
  'Popularity',
  'Power',
  'Price USD',
  'Price USD Foil',
  'Price EUR',
  'MTGO TIX',
  'Rarity',
  'Set',
  'Shards / Wedges',
  'Status',
  'Subtype',
  'Supertype',
  'Tags',
  'Toughness',
  'Type',
  'Types-Multicolor',
  'Devotion to White',
  'Devotion to Blue',
  'Devotion to Black',
  'Devotion to Red',
  'Devotion to Green',
  'Unsorted',
];

export const ORDERED_SORTS = ['Alphabetical', 'Mana Value', 'Price', 'Elo', 'Release Date', 'Cube Count', 'Pick Count'];

export const SortFunctions = {
  Alphabetical: alphaCompare,
  /**
   * @param {Card} a
   * @param {Card} b
   */
  'Mana Value': (a, b) => cardCmc(a) - cardCmc(b),
  /**
   * @param {Card} a
   * @param {Card} b
   */
  Price: (a, b) => {
    const priceA = cardPrice(a);
    const priceB = cardPrice(b);
    if (priceA === null) {
      if (priceB === null) return 0;
      return -1;
    }
    if (priceB === null) {
      return 1;
    }
    return priceA - priceB;
  },
  /**
   * @param {Card} a
   * @param {Card} b
   */
  Elo: (a, b) => cardElo(a) - cardElo(b),
  /**
   * @param {Card} a
   * @param {Card} b
   */
  'Release Date': (a, b) => {
    if (cardReleaseDate(a) > cardReleaseDate(b)) {
      return 1;
    }
    if (cardReleaseDate(a) < cardReleaseDate(b)) {
      return -1;
    }
    return 0;
  },
  /**
   * @param {Card} a
   * @param {Card} b
   */
  'Cube Count': (a, b) => cardCubeCount(a) - cardCubeCount(b),
  /**
   * @param {Card} a
   * @param {Card} b
   */
  'Pick Count': (a, b) => cardPickCount(a) - cardPickCount(b),
};

/**
 * @param {keyof SortFunctions} sort
 * @returns {(a: CardDetails, b: CardDetails) => number}
 */
export const SortFunctionsOnDetails = (sort) => (a, b) => SortFunctions[sort](detailsToCard(a), detailsToCard(b));

/**
 * @param {Card[]} cards
 * @param {Color} color
 */
const allDevotions = (cards, color) => {
  const counts = new Set();
  for (const card of cards) {
    counts.add(cardDevotion(card, color));
  }
  return Array.from(counts).sort((a, b) => a - b);
};

const priceBuckets = [0.25, 0.5, 1, 2, 3, 4, 5, 7, 10, 15, 20, 25, 30, 40, 50, 75, 100];

// returns the price bucket label at the index designating the upper bound
// at index == 0, returns < lowest
// at index == length, returs >= highest
/**
 * @param {number} index
 * @param {string} prefix
 */
function priceBucketLabel(index, prefix) {
  if (index === 0) {
    return `< ${prefix}${priceBuckets[0]}`;
  }
  if (index === priceBuckets.length) {
    return `>= ${prefix}${priceBuckets[priceBuckets.length - 1]}`;
  }
  return `${prefix}${priceBuckets[index - 1]} - ${prefix}${priceBuckets[index] - 0.01}`;
}

/**
 * @param {number} price
 */
function priceBucketIndex(price) {
  if (price < priceBuckets[0]) {
    return 0;
  }
  for (let i = 1; i < priceBuckets.length; i++) {
    if (price >= priceBuckets[i - 1] && price < priceBuckets[i]) {
      return i;
    }
  }
  // Last bucket catches any remaining prices
  return priceBuckets.length;
}

/**
 * @param {number} price
 * @param {string} prefix
 */
function getPriceBucket(price, prefix) {
  return priceBucketLabel(priceBucketIndex(price), prefix);
}

/**
 * @param {number} elo
 */
function getEloBucket(elo) {
  const bucketFloor = Math.floor(elo / 50) * 50;
  return `${bucketFloor}-${bucketFloor + 49}`;
}

/**
 * @param {Card[]} cards
 * @param {typeof SORTS[number]} sort
 * @param {boolean} showOther
 */
function getLabelsRaw(cards, sort, showOther) {
  let ret = [];

  /* Start of sort Options */
  if (sort === 'Color Category') {
    ret = ['White', 'Blue', 'Black', 'Red', 'Green', 'Hybrid', 'Gold', 'Colorless', 'Lands'];
  } else if (sort === 'Color Category Full') {
    ret = SINGLE_COLOR.concat(['Colorless'])
      .concat(GUILDS)
      .concat(SHARDS_AND_WEDGES)
      .concat(FOUR_AND_FIVE_COLOR)
      .concat(['Lands']);
  } else if (sort === 'Color Identity') {
    ret = ['White', 'Blue', 'Black', 'Red', 'Green', 'Gold', 'Colorless'];
  } else if (sort === 'Color Identity Full') {
    ret = SINGLE_COLOR.concat(['Colorless']).concat(GUILDS).concat(SHARDS_AND_WEDGES).concat(FOUR_AND_FIVE_COLOR);
  } else if (sort === 'Color Combination Includes' || sort === 'Includes Color Combination') {
    ret = ['Colorless'].concat(SINGLE_COLOR).concat(GUILDS).concat(SHARDS_AND_WEDGES).concat(FOUR_AND_FIVE_COLOR);
  } else if (sort === 'Mana Value') {
    ret = ['0', '1', '2', '3', '4', '5', '6', '7', '8+'];
  } else if (sort === 'Mana Value 2') {
    ret = ['0-1', '2', '3', '4', '5', '6', '7+'];
  } else if (sort === 'Mana Value Full') {
    // All unique CMCs of cards in the cards, rounded to a half-integer
    ret = cards.map((card) => Math.round(cardCmc(card) * 2) / 2);
    ret = Array.from(new Set(ret))
      .sort((a, b) => a - b)
      .map((n) => n.toString());
  } else if (sort === 'Color') {
    ret = ['White', 'Blue', 'Black', 'Red', 'Green', 'Colorless'];
  } else if (sort === 'Type') {
    ret = CARD_TYPES.concat(['Other']);
  } else if (sort === 'Supertype') {
    ret = ['Snow', 'Legendary', 'Tribal', 'Basic', 'Elite', 'Host', 'Ongoing', 'World'];
  } else if (sort === 'Tags') {
    const tags = [];
    for (const card of cards) {
      for (const tag of card.tags) {
        if (tag.length > 0 && !tags.includes(tag)) {
          tags.push(tag);
        }
      }
    }
    ret = tags.sort();
  } else if (sort === 'Date Added') {
    const dates = cards
      .map((card) => card.addedTmsp)
      .map((date) => ISODateToYYYYMMDD(date ?? ''))
      .sort((a, b) => a - b);
    ret = removeAdjacentDuplicates(dates);
  } else if (sort === 'Status') {
    ret = ['Not Owned', 'Ordered', 'Owned', 'Premium Owned', 'Proxied'];
  } else if (sort === 'Finish') {
    ret = ['Non-foil', 'Foil'];
  } else if (sort === 'Guilds') {
    ret = GUILDS;
  } else if (sort === 'Shards / Wedges') {
    ret = SHARDS_AND_WEDGES;
  } else if (sort === 'Color Count') {
    ret = ['0', '1', '2', '3', '4', '5'];
  } else if (sort === 'Set') {
    const sets = [];
    for (const card of cards) {
      if (!sets.includes(card.details.set.toUpperCase())) {
        sets.push(card.details.set.toUpperCase());
      }
    }
    ret = sets.sort();
  } else if (sort === 'Artist') {
    const artists = [];
    for (const card of cards) {
      if (!artists.includes(card.details.artist)) {
        artists.push(card.details.artist);
      }
    }
    ret = artists.sort();
  } else if (sort === 'Rarity') {
    ret = ['Common', 'Uncommon', 'Rare', 'Mythic', 'Special'];
  } else if (sort === 'Unsorted') {
    ret = ['All'];
  } else if (sort === 'Popularity') {
    ret = ['0–1%', '1–2%', '3–5%', '5–8', '8–12%', '12–20%', '20–30%', '30–50%', '50–100%'];
  } else if (sort === 'Subtype') {
    const types = new Set();
    for (const card of cards) {
      const split = cardType(card).split(/[-–—]/);
      if (split.length > 1) {
        const subtypes = split[1].trim().split(' ');
        const nonemptySubtypes = subtypes.filter((x) => x.trim());
        for (const subtype of nonemptySubtypes) {
          types.add(subtype.trim());
        }
      }
    }
    ret = Array.from(types);
  } else if (sort === 'Types-Multicolor') {
    ret = CARD_TYPES.slice(0, -1)
      .concat(GUILDS)
      .concat(SHARDS_AND_WEDGES)
      .concat(FOUR_AND_FIVE_COLOR)
      .concat(['Land', 'Other']);
  } else if (sort === 'Legality') {
    ret = ['Standard', 'Modern', 'Legacy', 'Vintage', 'Pioneer', 'Brawl', 'Historic', 'Pauper', 'Penny', 'Commander'];
  } else if (sort === 'Power') {
    const items = [];
    for (const card of cards) {
      if (card.details.power) {
        if (!items.includes(card.details.power)) {
          items.push(card.details.power);
        }
      }
    }
    ret = items.sort(defaultSort);
  } else if (sort === 'Toughness') {
    const items = [];
    for (const card of cards) {
      if (card.details.toughness) {
        if (!items.includes(card.details.toughness)) {
          items.push(card.details.toughness);
        }
      }
    }
    ret = items.sort(defaultSort);
  } else if (sort === 'Loyalty') {
    const items = [];
    for (const card of cards) {
      if (card.details.loyalty) {
        if (!items.includes(card.details.loyalty)) {
          items.push(card.details.loyalty);
        }
      }
    }
    ret = items.sort(defaultSort);
  } else if (sort === 'Manacost Type') {
    ret = ['Gold', 'Hybrid', 'Phyrexian'];
  } else if (sort === 'Creature/Non-Creature') {
    ret = ['Creature', 'Non-Creature'];
  } else if (['Price', 'Price USD', 'Price Foil', 'Price USD Foil'].includes(sort)) {
    const labels = [];
    for (let i = 0; i <= priceBuckets.length; i++) {
      labels.push(priceBucketLabel(i, '$'));
    }
    labels.push('No Price Available');
    ret = labels;
  } else if (sort === 'Price EUR') {
    const labels = [];
    for (let i = 0; i <= priceBuckets.length; i++) {
      labels.push(priceBucketLabel(i, '€'));
    }
    labels.push('No Price Available');
    ret = labels;
  } else if (sort === 'MTGO TIX') {
    const labels = [];
    for (let i = 0; i <= priceBuckets.length; i++) {
      labels.push(priceBucketLabel(i, ''));
    }
    labels.push('No Price Available');
    ret = labels;
  } else if (sort === 'Devotion to White') {
    ret = allDevotions(cards, 'W');
  } else if (sort === 'Devotion to Blue') {
    ret = allDevotions(cards, 'U');
  } else if (sort === 'Devotion to Black') {
    ret = allDevotions(cards, 'B');
  } else if (sort === 'Devotion to Red') {
    ret = allDevotions(cards, 'R');
  } else if (sort === 'Devotion to Green') {
    ret = allDevotions(cards, 'G');
  } else if (sort === 'Elo') {
    let elos = [];
    for (const card of cards) {
      const elo = card.details.elo ?? ELO_DEFAULT;
      if (!elos.includes(elo)) {
        elos.push(elo);
      }
    }
    elos = elos.sort((x, y) => (x < y ? -1 : 1));
    const buckets = elos.map(getEloBucket);
    const res = [];
    for (const bucket of buckets) {
      if (!res.includes(bucket)) {
        res.push(bucket);
      }
    }
    ret = res;
  }
  /* End of sort options */

  // whitespace around 'Other' to prevent collisions
  return showOther ? [...ret, ' Other '] : ret;
}

/**
 * @param {Card} card
 * @param {typeof SORTS[number]} sort
 * @param {boolean} showOther
 */
export function cardGetLabels(card, sort, showOther = false) {
  let ret = [];
  /* Start of sort options */
  if (sort === 'Color Category') {
    ret = [card.colorCategory ?? GetColorCategory(cardType(card), cardColorIdentity(card))];
  } else if (sort === 'Color Category Full') {
    const colorCategory = card.colorCategory ?? GetColorCategory(cardType(card), cardColorIdentity(card));
    if (colorCategory === 'Gold') {
      ret = [getColorCombination(cardColorIdentity(card))];
    } else {
      ret = [colorCategory];
    }
  } else if (sort === 'Color Identity') {
    ret = [GetColorIdentity(cardColorIdentity(card))];
  } else if (sort === 'Color Identity Full') {
    ret = [getColorCombination(cardColorIdentity(card))];
  } else if (sort === 'Color Combination Includes') {
    ret = COLOR_COMBINATIONS.filter((comb) => arrayIsSubset(cardColorIdentity(card), comb)).map(getColorCombination);
  } else if (sort === 'Includes Color Combination') {
    ret = COLOR_COMBINATIONS.filter((comb) => arrayIsSubset(comb, cardColorIdentity(card))).map(getColorCombination);
  } else if (sort === 'Color') {
    const colors = card.details.colors ?? [];
    if (colors.length === 0) {
      ret = ['Colorless'];
    } else {
      ret = colors.map((c) => COLOR_MAP[c]).filter((c) => c);
    }
  } else if (sort === '4+ Color') {
    if (cardColorIdentity(card).length === 5) {
      ret = ['Five Color'];
    } else if (cardColorIdentity(card).length === 4) {
      ret = COLORS.filter((c) => !cardColorIdentity(card).includes(c)).map((c) => `Non-${COLOR_MAP[c]}`);
    }
  } else if (sort === 'Mana Value') {
    // Sort by CMC, but collapse all >= 8 into '8+' category.
    const cmc = Math.round(cardCmc(card));
    if (cmc >= 8) {
      ret = ['8+'];
    } else {
      ret = [cmc.toString()];
    }
  } else if (sort === 'Mana Value 2') {
    const cmc = Math.round(cardCmc(card));
    if (cmc >= 7) {
      ret = ['7+'];
    } else if (cmc <= 1) {
      ret = ['0-1'];
    } else {
      ret = [cmc.toString()];
    }
  } else if (sort === 'Mana Value Full') {
    // Round to half-integer.
    ret = [(Math.round(cardCmc(card) * 2) / 2).toString()];
  } else if (sort === 'Supertype' || sort === 'Type') {
    const split = cardType(card).split(/[-–—]/);
    let types;
    if (split.length > 1) {
      types = split[0]
        .trim()
        .split(' ')
        .map((x) => x.trim())
        .filter((x) => x);
    } else {
      types = cardType(card)
        .trim()
        .split(' ')
        .map((x) => x.trim())
        .filter((x) => x);
    }
    if (types.includes('Contraption')) {
      ret = ['Contraption'];
    } else if (types.includes('Plane')) {
      ret = ['Plane'];
    } else {
      const labels = getLabelsRaw([], sort, showOther);
      ret = types.filter((t) => labels.includes(t));
    }
  } else if (sort === 'Tags') {
    ret = card.tags;
  } else if (sort === 'Status') {
    ret = [card.status];
  } else if (sort === 'Finish') {
    ret = [card.finish];
  } else if (sort === 'Date Added') {
    ret = [ISODateToYYYYMMDD(card.addedTmsp)];
  } else if (sort === 'Guilds') {
    if (cardColorIdentity(card).length === 2) {
      const ordered = COLORS.filter((c) => cardColorIdentity(card).includes(c)).join('');
      ret = [GUILD_MAP[ordered]];
    }
  } else if (sort === 'Shards / Wedges') {
    if (cardColorIdentity(card).length === 3) {
      const ordered = COLORS.filter((c) => cardColorIdentity(card).includes(c)).join('');
      ret = [SHARD_AND_WEDGE_MAP[ordered]];
    }
  } else if (sort === 'Color Count') {
    ret = [cardColorIdentity(card).length];
  } else if (sort === 'Set') {
    ret = [card.details.set.toUpperCase()];
  } else if (sort === 'Rarity') {
    const rarity = cardRarity(card);
    ret = [rarity[0].toUpperCase() + rarity.slice(1)];
  } else if (sort === 'Subtype') {
    const split = cardType(card).split(/[-–—]/);
    if (split.length > 1) {
      const subtypes = split[1].trim().split(' ');
      ret = subtypes.map((subtype) => subtype.trim()).filter((x) => x);
    }
  } else if (sort === 'Types-Multicolor') {
    if (cardColorIdentity(card).length <= 1) {
      const split = cardType(card).split('—');
      const types = split[0].trim().split(' ');
      const type = types[types.length - 1];
      // check last type
      if (
        ![
          'Creature',
          'Planeswalker',
          'Instant',
          'Sorcery',
          'Artifact',
          'Enchantment',
          'Conspiracy',
          'Contraption',
          'Phenomenon',
          'Plane',
          'Scheme',
          'Vanguard',
          'Land',
        ].includes(type)
      ) {
        ret = ['Other'];
      } else {
        ret = [type];
      }
    } else if (cardColorIdentity(card).length === 5) {
      ret = ['Five Color'];
    } else {
      ret = [
        ...cardGetLabels(card, 'Guilds'),
        ...cardGetLabels(card, 'Shards / Wedges'),
        ...cardGetLabels(card, '4+ Color'),
      ];
    }
  } else if (sort === 'Artist') {
    ret = [card.details.artist];
  } else if (sort === 'Legality') {
    ret = Object.entries(card.details.legalities)
      .filter(([, v]) => ['legal', 'banned'].includes(v)) // eslint-disable-line no-unused-vars
      .map(([k]) => k); // eslint-disable-line no-unused-vars
  } else if (sort === 'Power') {
    if (card.details.power) {
      ret = [card.details.power];
    }
  } else if (sort === 'Toughness') {
    if (card.details.toughness) {
      ret = [card.details.toughness];
    }
  } else if (sort === 'Loyalty') {
    if (card.details.loyalty) {
      ret = [parseInt(card.details.loyalty, 10)];
    }
  } else if (sort === 'Manacost Type') {
    const colors = card.details.colors ?? [];
    if (colors.length > 1 && card.details.parsed_cost.every((symbol) => !symbol.includes('-'))) {
      ret = ['Gold'];
    } else if (
      colors.length > 1 &&
      card.details.parsed_cost.some((symbol) => symbol.includes('-') && !symbol.includes('-p'))
    ) {
      ret = ['Hybrid'];
    } else if (card.details.parsed_cost.some((symbol) => symbol.includes('-p'))) {
      ret = ['Phyrexian'];
    }
  } else if (sort === 'Creature/Non-Creature') {
    ret = cardType(card).toLowerCase().includes('creature') ? ['Creature'] : ['Non-Creature'];
  } else if (sort === 'Price USD' || sort === 'Price') {
    const price = card.details.prices.usd ?? card.details.prices.usd_foil;
    if (price) {
      ret = [getPriceBucket(price, '$')];
    } else {
      ret = ['No Price Available'];
    }
  } else if (sort === 'Price USD Foil') {
    const price = card.details.prices.usd_foil;
    if (price) {
      ret = [getPriceBucket(price, '$')];
    } else {
      ret = ['No Price Available'];
    }
  } else if (sort === 'Price EUR') {
    const price = cardPriceEur(card);
    if (price) {
      ret = [getPriceBucket(price, '€')];
    } else {
      ret = ['No Price Available'];
    }
  } else if (sort === 'MTGO TIX') {
    const price = cardTix(card);
    if (price) {
      ret = [getPriceBucket(price, '')];
    } else {
      ret = ['No Price Available'];
    }
  } else if (sort === 'Devotion to White') {
    ret = [cardDevotion(card, 'W').toString()];
  } else if (sort === 'Devotion to Blue') {
    ret = [cardDevotion(card, 'U').toString()];
  } else if (sort === 'Devotion to Black') {
    ret = [cardDevotion(card, 'B').toString()];
  } else if (sort === 'Devotion to Red') {
    ret = [cardDevotion(card, 'R').toString()];
  } else if (sort === 'Devotion to Green') {
    ret = [cardDevotion(card, 'G').toString()];
  } else if (sort === 'Unsorted') {
    ret = ['All'];
  } else if (sort === 'Popularity') {
    const popularity = cardPopularity(card);
    if (popularity < 1) ret = ['0–1%'];
    else if (popularity < 2) ret = ['1–2%'];
    else if (popularity < 5) ret = ['3–5%'];
    else if (popularity < 8) ret = ['5–8%'];
    else if (popularity < 12) ret = ['8–12%'];
    else if (popularity < 20) ret = ['12–20%'];
    else if (popularity < 30) ret = ['20–30%'];
    else if (popularity < 50) ret = ['30–50%'];
    else if (popularity <= 100) ret = ['50–100%'];
  } else if (sort === 'Elo') {
    ret = [getEloBucket(card.details.elo ?? ELO_DEFAULT)];
  }
  /* End of sort options */

  if (showOther && ret.length === 0) {
    // whitespace around 'Other' to prevent collisions
    ret = [' Other '];
  }
  return ret;
}

/**
 * @param {Card} card
 * @param {typeof SORTS[number]} sort
 */
export function cardCanBeSorted(card, sort) {
  return cardGetLabels(card, sort).length !== 0;
}

/**
 * @param {Card} card
 * @param {string} label
 * @param {typeof SORTS[number]} sort
 */
export function cardIsLabel(card, label, sort) {
  return cardGetLabels(card, sort).includes(label);
}

/**
 * @param {(string|Date)?} label
 */
export function formatLabel(label) {
  if (!label) {
    return 'Unknown';
  }
  if (label instanceof Date) {
    return ISODateToYYYYMMDD(label);
  }
  return label;
}

// Get labels in string form.
/**
 * @param {Card[]} cards
 * @param {typeof SORTS[number]} sort
 * @param {boolean} showOther
 */
export function getLabels(cards, sort, showOther = false) {
  return getLabelsRaw(cards, sort, showOther).map(formatLabel);
}

/**
 * @param {Card[]} cards
 * @param {typeof SORTS[number]} sort
 * @param {boolean} showOther
 */
export function sortGroupsOrdered(cards, sort, showOther = false) {
  const labels = getLabelsRaw(cards, sort, showOther);
  const allCardLabels = cards.map((card) => [card, cardGetLabels(card, sort, showOther)]);
  /**
   * @param {typeof allCardLabels[number]} x
   * @param {typeof allCardLabels[number]} y
   */
  const compare = (x, y) => labels.indexOf(x) - labels.indexOf(y);
  const byLabel = {};
  for (const [card, cardLabels] of allCardLabels) {
    if (cardLabels && cardLabels.length > 0) {
      cardLabels.sort(compare);
      for (const label of cardLabels) {
        if (!byLabel[label]) {
          byLabel[label] = [];
        }
        byLabel[label].push(card);
      }
    }
  }
  return labels.filter((label) => byLabel[label]).map((label) => [formatLabel(label), byLabel[label]]);
}

/**
 * @param {Card[]} cards
 * @param {typeof SORTS[number]} sort
 * @param {boolean} showOther
 */
export function sortIntoGroups(cards, sort, showOther = false) {
  return Object.fromEntries(sortGroupsOrdered(cards, sort, showOther));
}

/**
 * @param {Card[]} cards
 * @param {boolean} showOther
 * @param {typeof SORTS[number]} last
 * @param {(typeof SORTS[number])[]} sorts
 */
export function sortDeep(cards, showOther, last, ...sorts) {
  if (sorts.length === 0) {
    return Array.from(cards).sort(SortFunctions[last]);
  }
  const [first, ...rest] = sorts;
  const result = sortGroupsOrdered(cards, first ?? 'Unsorted', showOther);
  for (const labelGroup of result) {
    if (rest.length > 0) {
      labelGroup[1] = sortDeep(labelGroup[1], showOther, last, ...rest);
    } else {
      labelGroup[1].sort(SortFunctions[last]);
    }
  }
  return result;
}

export function countGroup(group) {
  if (Array.isArray(group[0])) {
    const counts = group.map(([, group2]) => countGroup(group2)); // eslint-disable-line no-unused-vars
    return counts.reduce((a, b) => a + b, 0);
  }
  return group.length;
}

/**
 * @param {Card[]} cards
 * @param {typeof SORTS[number]} primary
 * @param {typeof SORTS[number]} secondary
 * @param {typeof SORTS[number]} tertiary
 * @param {typeof SORTS[number]} quaternary
 * @param {boolean} showOther
 */
export function sortForDownload(
  cards,
  primary = 'Color Category',
  secondary = 'Types-Multicolor',
  tertiary = 'Mana Value',
  quaternary = 'Alphabetical',
  showOther = false,
) {
  const exportCards = [];
  const sortedCards = sortDeep(cards, showOther, quaternary, primary, secondary, tertiary);
  for (const firstGroup of sortedCards) {
    for (const secondGroup of firstGroup[1]) {
      for (const thirdGroup of secondGroup[1]) {
        for (const card of thirdGroup[1]) {
          exportCards.push(card);
        }
      }
    }
  }
  return exportCards;
}

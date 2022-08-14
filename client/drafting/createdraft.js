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
import seedrandom from 'seedrandom';
import shuffleSeed from 'shuffle-seed';

import {
  DEFAULT_FILTER,
  filterToString,
  makeFilter,
  operatorsRegex,
} from '@cubeartisan/client/filtering/FilterCards.js';
import { makeDefaultCard } from '@cubeartisan/client/utils/Card.js';

/**
 * @typedef {import('@cubeartisan/client/filtering/FilterCards.js').Filter} Filter
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef {import('@cubeartisan/client/proptypes/CubePropType.js').DraftFormat} DraftFormat
 * @typedef {import('@cubeartisan/client/proptypes/CubePropType.js').PackSpec} PackSpec
 * @typedef {import('@cubeartisan/client/proptypes/CubePropType.js').Cube} Cube
 * @typedef {import('@cubeartisan/client/proptypes/CubePropType.js').Step} Step
 * @typedef {import('@cubeartisan/client/proptypes/DraftPropType.js').Draft} Draft
 * @typedef {import('@cubeartisan/client/proptypes/DraftPropType.js').DraftPack} DraftPack
 */

/**
 * @typedef {Card & { asfan: number }} CardWithAsfan
 */

/**
 * @param {(Card | CardWithAsfan)[]} cards
 * @param {Filter?} filter
 */
export const matchingCards = (cards, filter) => {
  if (filter) {
    return cards.filter(filter);
  }
  return cards;
};

/** @param {string?} filterText */
const compileFilter = (filterText) => {
  if (!filterText || filterText === '' || filterText === '*') {
    return DEFAULT_FILTER;
  }

  let tagfilterText = null;
  if (!operatorsRegex.test(filterText)) {
    // if it contains spaces then wrap in quotes
    tagfilterText = filterText;
    if (tagfilterText.indexOf(' ') >= 0 && !tagfilterText.startsWith('"')) {
      tagfilterText = `"${filterText}"`;
    }
    tagfilterText = `tag:${tagfilterText}`; // TODO: use tag instead of 'tag'
  }
  const { filter, err } = makeFilter(tagfilterText || filterText);
  if (err) {
    throw new Error(`Invalid card filter: ${filterText}`);
  }
  return filter ?? DEFAULT_FILTER;
};

/**
 * @typedef ExtendedPackSpec
 * @property {Filter[][]} slots
 * @property {Step[]?} steps
 */

/**
 * @param {PackSpec[]} format
 * @param {string} [splitter]
 * @returns {ExtendedPackSpec[]}
 */
export const parseDraftFormat = (format, splitter = ',') => {
  const result = format.map((pack) => ({
    ...pack,
    slots: pack.slots.map((slot) => slot.split(splitter).map((txt) => compileFilter(txt.trim()))),
  }));
  return result;
};

// standard draft has no duplicates
/**
 * @param {Card[]} cards
 */
const standardDraft = (cards, rng) => {
  if (cards.length === 0) {
    throw new Error('Unable to create draft: not enough cards.');
  }
  cards = shuffleSeed.shuffle(cards, rng());
  /** @returns {{ card: Card, messages: string[] }} */
  return () => {
    // ignore cardFilters, just take any card in cube
    if (cards.length === 0) {
      throw new Error('Unable to create draft: not enough cards.');
    }
    // remove a random card
    return { card: /** @type {Card} */ (cards.pop()), messages: [] }; // eslint-disable-line prettier/prettier
  };
};

/** @param {CardWithAsfan[]} cards */
const standardDraftAsfan = (cards) => {
  if (cards.length === 0) {
    throw new Error('Unable to create draft asfan: not enough cards.');
  }
  const poolCount = cards.length;
  const poolWeight = 1 / poolCount;
  /** @returns {{ card: Card, messages: string[] }} */
  return () => {
    for (const card of cards) {
      card.asfan += poolWeight;
    }
    return { card: makeDefaultCard(), messages: [] };
  };
};

const customDraft =
  /**
   * @param {Card[]} cards
   * @param {boolean} [duplicates]
   */
    (cards, rng, duplicates = false) => // eslint-disable-line prettier/prettier
    /** @param {Filter[]} cardFilters */ // eslint-disable-line prettier/prettier
    (cardFilters) => {
      if (cards.length === 0) {
        throw new Error('Unable to create draft: not enough cards.');
      }

      // each filter is an array of parsed filter tokens, we choose one randomly
      let validCards = cards;
      let index = null;
      const messages = [];
      if (cardFilters.length > 0) {
        do {
          index = Math.floor(rng() * cardFilters.length);
          const filter = cardFilters[index];
          validCards = matchingCards(cards, filter);
          if (validCards.length === 0) {
            // TODO: display warnings for players
            messages.push(`Warning: no cards matching filter: ${filterToString(filter)}`);
            // try another options and remove this filter as it is now empty
            cardFilters.splice(index, 1);
          }
        } while (validCards.length === 0 && cardFilters.length > 0);
      }

      if (validCards.length === 0) {
        throw new Error(`Unable to create draft: not enough cards matching filter.\n${messages.join('\n')}`);
      }

      index = Math.floor(rng() * validCards.length);

      // slice out the first card with the index, or error out
      const card = validCards[index];
      if (!duplicates) {
        // remove from cards
        index = cards.indexOf(card);
        cards.splice(index, 1);
      }

      return { card, messages };
    };

const customDraftAsfan =
  /**
   * @param {CardWithAsfan[]} cards
   * @param {boolean} [duplicates]
   */ // eslint-disable-line prettier/prettier
    (cards, duplicates = false) => // eslint-disable-line prettier/prettier
    /** eslint-disable-line prettier/prettier
     * @param {Filter[]} cardFilters
     * @returns {{ card: Card, messages: string[] }}
     */
    (cardFilters) => {
      if (cards.length === 0) {
        throw new Error('Unable to create draft asfan: not enough cards.');
      }

      // each filter is an array of parsed filter tokens, we choose one randomly
      const validCardGroups = [];
      for (let i = 0; i < cardFilters.length; i++) {
        let validCards = /** @type {CardWithAsfan[]} */ (matchingCards(cards, cardFilters[i])); // eslint-disable-line prettier/prettier
        if (!duplicates) {
          validCards = validCards.filter((card) => card.asfan < 1);
        }
        if (validCards.length > 0) {
          validCardGroups.push(validCards);
        }
      }

      if (validCardGroups.length === 0) {
        throw new Error('Unable to create draft asfan: not enough cards matching filter.');
      }
      for (const validCards of validCardGroups) {
        if (duplicates) {
          // This one's simple 1 / number of cards to pick from / number of filters to choose from
          const poolCount = validCards.length;
          const poolWeight = 1 / poolCount / validCardGroups.length;
          for (const card of validCards) {
            card.asfan += poolWeight;
          }
        } else {
          // This is the expected number of cards to still be in the pool we're pulling out of
          // otherwise this is the same as above for poolWeight.
          const poolCount = validCards.reduce((sum, card) => sum + (1 - card.asfan), 0);
          const poolWeight = 1 / poolCount / validCardGroups.length;
          for (const card of validCards) {
            // The 1 - card.asfan is the odds that it is still in the pool.
            card.asfan += (1 - card.asfan) * poolWeight;
          }
        }
      }
      return { card: makeDefaultCard(), messages: [] };
    };

/**
 * @typedef InternalDraftProperties
 * @property {boolean} custom
 * @property {boolean} multiples
 * @property {number} timeout
 * @property {number} humanSeats
 */

/**
 * @typedef DraftParams
 * @property {number} id
 * @property {number} packs
 * @property {number} timeout
 * @property {number} humanSeats
 * @property {number} cards
 */

/** @typedef {InternalDraftProperties & ExtendedPackSpec[]} InternalDraftFormat

/**
 * @param {DraftParams} params
 * @param {Cube} cube
 */
export const getDraftFormat = (params, cube) => {
  let format;
  if (params.id >= 0) {
    /** @type {Partial<InternalDraftProperties> & ExtendedPackSpec[]} */
    const formatBase = parseDraftFormat(cube.draft_formats[params.id].packs);
    formatBase.custom = true;
    formatBase.multiples = cube.draft_formats[params.id].multiples;
    formatBase.timeout = params.timeout;
    formatBase.humanSeats = params.humanSeats;
    format = /** @type {InternalDraftFormat} */ (formatBase); // eslint-disable-line prettier/prettier
  } else {
    // default format
    /** @type {Partial<InternalDraftProperties> & ExtendedPackSpec[]} */
    const formatBase = [];
    formatBase.custom = false;
    formatBase.multiples = false;
    for (let pack = 0; pack < params.packs; pack++) {
      formatBase[pack] = { slots: [], steps: null };
      for (let card = 0; card < params.cards; card++) {
        formatBase[pack].slots.push([DEFAULT_FILTER]); // any card
      }
    }
    formatBase.timeout = params.timeout;
    formatBase.humanSeats = params.humanSeats;
    format = /** @type {InternalDraftFormat} */ (formatBase); // eslint-disable-line prettier/prettier
  }
  return format;
};

/**
 * @param {Draft} draft
 * @param {InternalDraftFormat} format
 * @param {number} seats
 * @param {(filters: Filter[]) => { card: Card, messages: string[] }} nextCardFn
 */
const createPacks = (draft, format, seats, nextCardFn) => {
  let ok = true;
  let messages = [];
  draft.initial_state = [];
  for (let seat = 0; seat < seats; seat++) {
    draft.initial_state.push([]);
    for (let packNum = 0; packNum < format.length; packNum++) {
      /** @type {DraftPack} */
      const pack = {
        steps: format[packNum].steps,
        cards: [],
      };
      for (let cardNum = 0; cardNum < format[packNum].slots.length; cardNum++) {
        const result = nextCardFn(format[packNum].slots[cardNum]);
        if (result.messages.length > 0) {
          messages = messages.concat(result.messages);
          ok = false;
        } else {
          pack.cards.push(result.card);
        }
      }
      draft.initial_state[seat].push(pack);
    }
  }
  return { ok, messages };
};

/** @type {Draft} */
const EMPTY_DRAFT = {
  _id: '',
  seats: [],
  cards: [],
  timeout: 0,
  seed: '42',
  basics: [],
  cube: '',
  initial_state: [],
  schemaVersion: 0,
  cas: 0,
};

// NOTE: format is an array with extra attributes, see getDraftFormat()
/**
 * @param {InternalDraftFormat} format
 * @param {Card[]} cubeCards
 * @param {number} seats
 * @param {string?} userid
 * @param {boolean} [botsOnly]
 * @param {string?} [seed]
 */
export const createDraft = (format, cubeCards, seats, userid, botsOnly = false, seed = null) => {
  if (botsOnly) format.humanSeats = 0;
  if (!seed) {
    seed = Date.now().toString();
  }
  const rng = seedrandom(seed);

  if (cubeCards.length === 0) {
    throw new Error('Unable to create draft: no cards.');
  }

  let nextCardFn = null;
  if (format.custom === true) {
    nextCardFn = customDraft(cubeCards, rng, format.multiples);
  } else {
    nextCardFn = standardDraft(cubeCards, rng);
  }
  const draft = structuredClone(EMPTY_DRAFT);

  const result = createPacks(draft, format, seats, nextCardFn);

  if (result.messages.length > 0) {
    draft.messages = result.messages.join('\n');
  }

  if (!result.ok) {
    throw new Error(`Could not create draft:\n${result.messages.join('\n')}`);
  }

  draft.seats = [];
  draft.cards = [];
  draft.initial_state = draft.initial_state.map((packs) =>
    packs.map(({ cards, ...pack }) => ({
      ...pack,
      cards: cards.map(({ details: _, ...card }) => {
        card.index = draft.cards.length;
        draft.cards.push(card);
        return card.index;
      }),
    })),
  );
  // No we randomize the order of the cards array to prevent leaking information.
  const shuffledIndices = shuffleSeed
    .shuffle(
      draft.cards.map((card, idx) => [card, idx]),
      rng(),
    )
    .map(([card, oldIdx], newIdx) => [card, oldIdx, newIdx])
    .sort(([, a], [, b]) => a - b);
  draft.initial_state = draft.initial_state.map((packs) =>
    packs.map(({ cards, ...pack }) => ({
      ...pack,
      cards: cards.map((oldIndex) => shuffledIndices[oldIndex][2]),
    })),
  );
  draft.cards = shuffledIndices.sort(([, , a], [, , b]) => a - b).map(([card], index) => ({ ...card, index }));

  let seatIndices = [];
  for (let i = 0; i < draft.initial_state.length; i++) seatIndices.push(i);
  seatIndices = shuffleSeed.shuffle(seatIndices, rng());
  const humanIndices = seatIndices.slice(0, format.humanSeats);
  let botIndex = 0;
  draft.seats = draft.initial_state.map((_, seatIndex) => {
    const bot = !humanIndices.includes(seatIndex);
    if (bot) botIndex += 1;
    return {
      bot,
      name: bot ? `Bot ${botIndex}` : 'Waiting for Player',
      userid: null,
      drafted: [new Array(8).fill([]), new Array(8).fill([])], // organized draft picks
      sideboard: [new Array(8).fill([])],
      pickorder: [],
      trashorder: [],
    };
  });

  return draft;
};

/**
 * @param {InternalDraftFormat} format
 * @param {Card[]} cards
 */
export const checkFormat = (format, cards) => {
  // check that all filters are sane and match at least one card
  /** @param {Filter[]} cardFilters */
  const checkFn = (cardFilters) => {
    const messages = [];
    for (let i = 0; i < cardFilters.length; i++) {
      const filter = cardFilters[i];
      const validCards = matchingCards(cards, filter);
      if (validCards.length === 0) {
        messages.push(`Warning: no cards matching filter: ${filterToString(filter)}`);
      }
    }
    if (messages.length > 0) {
      throw new Error(messages.join('\n'));
    }
    return { card: makeDefaultCard(), ok: messages.length === 0, messages };
  };
  return createPacks(structuredClone(EMPTY_DRAFT), format, 1, checkFn);
};

/** @param {[number, number][]} arr */
export const weightedAverage = (arr) => {
  const [count, total] = arr.reduce(([c, t], [weight, value]) => [c + weight, t + weight * value], [0, 0]);
  return total / (count || 1);
};

/** @param {[number, number][]} arr */
export const weightedMedian = (arr) => {
  const count = arr.reduce((acc, [weight]) => acc + weight, 0);
  const nums = Array.from(arr).sort(([, a], [, b]) => a - b);
  const mid = count / 2;
  let total = 0;
  let prevValue = nums[0]?.[1] ?? 0;
  for (const [weight, value] of nums) {
    const newTotal = total + weight;
    // We can assume that total < mid since otherwise we would've already returned
    // Small exception happens if mid = 0 due to zero weights or empty array
    // which we do handle correctly.
    if (newTotal > mid) return (prevValue + value) / 2;
    if (newTotal === mid) return value;
    prevValue = value;
    total = newTotal;
  }
  return 0;
};

// Returns num+1 elements that are min, 1/num, 2/num, ..., max
/**
 * @param {[number, number][]} arr
 * @param {number} num
 */
export const weightedPercentiles = (arr, num) => {
  const count = arr.reduce((acc, [weight]) => acc + weight, 0);
  const nums = Array.from(arr).sort(([, a], [, b]) => a - b);
  let total = 0;
  let prevValue = nums[0]?.[1] ?? 0;
  const percentiles = [];
  for (const [weight, value] of nums) {
    const newTotal = total + weight;
    while (newTotal > (percentiles.length * count) / num) {
      percentiles.push((prevValue + value) / 2);
    }
    if (newTotal === (percentiles.length * count) / num) {
      percentiles.push(value);
    }
    prevValue = value;
    total = newTotal;
  }
  return percentiles;
};

/**
 * @param {[number, number][]} arr
 * @param {number?} [avg]
 */
export const weightedStdDev = (arr, avg = null) => {
  const average = avg ?? weightedAverage(arr);
  /** @type {[number, number][]} */
  const squareDiffs = arr.map(([weight, value]) => [weight, (value - average) ** 2]);

  const count = arr.filter(([weight]) => weight).length;
  // Don't take stddev of 0 or 1 length vectors. The normalization is correct
  // something about degrees of freedom.
  const avgSquareDiff = (weightedAverage(squareDiffs) * count) / (count - 1 || 1);

  const stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
};

/**
 * @param {Cube} cube
 * @param {number} draftFormat
 */
export const calculateAsfans = (cube, draftFormat) => {
  let nextCardFn = null;

  const cards = cube.cards.map((card) => ({ ...card, asfan: 0 }));
  const format = getDraftFormat({ id: draftFormat, packs: 3, cards: 15, timeout: 0, humanSeats: 0 }, cube);

  if (cards.length === 0) {
    throw new Error('Unable to create draft: no cards.');
  }

  if (format.custom === true) {
    nextCardFn = customDraftAsfan(cards, format.multiples);
  } else {
    nextCardFn = standardDraftAsfan(cards);
  }

  const draft = structuredClone(EMPTY_DRAFT);
  const result = createPacks(draft, format, 1, nextCardFn);

  if (result.messages.length > 0) {
    draft.messages = result.messages.join('\n');
  }

  if (!result.ok) {
    throw new Error(`Could not create draft:\n${result.messages.join('\n')}`);
  }

  return Object.fromEntries(cards.map((card) => [card.cardID, card.asfan]));
};

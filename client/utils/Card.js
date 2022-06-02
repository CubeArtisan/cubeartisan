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
 * GNU Affero General Public License for more details?.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with CubeArtisan.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Modified from the original version in CubeCobra. See LICENSE.CubeCobra for more information.
 */
import CategoryOverrides from '@cubeartisan/client/res/CategoryOverrides.js';
import LandCategories from '@cubeartisan/client/res/LandCategories.js';
import { arrayIsSubset, arraysEqual } from '@cubeartisan/client/utils/Util.js';

/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef {import('@cubeartisan/client/proptypes/CardDetailsPropType.js').CardDetails} CardDetails
 * @typedef {import('@cubeartisan/client/proptypes/CardDetailsPropType.js').Color} Color
 */

/**
 * @type {Color[]}
 */
export const COLORS = ['W', 'U', 'B', 'R', 'G'];
/**
 * @type {Color[][]}
 */
export const COLOR_COMBINATIONS = [
  [],
  ['W'],
  ['U'],
  ['B'],
  ['R'],
  ['G'],
  ['W', 'U'],
  ['U', 'B'],
  ['B', 'R'],
  ['R', 'G'],
  ['G', 'W'],
  ['W', 'B'],
  ['U', 'R'],
  ['B', 'G'],
  ['R', 'W'],
  ['G', 'U'],
  ['G', 'W', 'U'],
  ['W', 'U', 'B'],
  ['U', 'B', 'R'],
  ['B', 'R', 'G'],
  ['R', 'G', 'W'],
  ['R', 'W', 'B'],
  ['G', 'U', 'R'],
  ['W', 'B', 'G'],
  ['U', 'R', 'W'],
  ['B', 'G', 'U'],
  ['U', 'B', 'R', 'G'],
  ['B', 'R', 'G', 'W'],
  ['R', 'G', 'W', 'U'],
  ['G', 'W', 'U', 'B'],
  ['W', 'U', 'B', 'R'],
  ['W', 'U', 'B', 'R', 'G'],
];

export const COLOR_INCLUSION_MAP = Object.fromEntries(
  COLOR_COMBINATIONS.map((colors) => [
    colors.join(''),
    Object.fromEntries(COLOR_COMBINATIONS.map((comb) => [comb.join(''), arrayIsSubset(comb, colors)])),
  ]),
);
for (const colorsIncluded of Object.values(COLOR_INCLUSION_MAP)) {
  colorsIncluded.includes = Object.keys(colorsIncluded).filter((c) => colorsIncluded[c]);
}

/**
 * @param {string} name
 */
export function normalizeName(name) {
  return name
    .trim()
    .normalize('NFD') // convert to consistent unicode format
    .replace(/[\u0300-\u036f]/g, '') // remove unicode
    .toLowerCase();
}

/**
 * @param {string} name
 */
export function encodeName(name) {
  return encodeURIComponent(name.toLowerCase());
}

/**
 * @param {string?} name
 */
export function decodeName(name) {
  return decodeURIComponent(name?.toLowerCase?.() ?? 'Invalid Card');
}

/**
 * @param {Card?} card
 */
export const cardColorIdentity = (card) => card?.colors ?? card?.details?.color_identity ?? [];

/**
 * @param {Card} a
 * @param {Card} b
 */
export function cardsAreEquivalent(a, b) {
  return (
    a.cardID === b.cardID &&
    a.type_line === b.type_line &&
    a.status === b.status &&
    a.cmc === b.cmc &&
    arraysEqual(cardColorIdentity(a), cardColorIdentity(b)) &&
    arraysEqual(a.tags, b.tags) &&
    a.finish === b.finish &&
    a.imgUrl === b.imgUrl &&
    a.imgBackUrl === b.imgBackUrl &&
    a.notes === b.notes &&
    a.colorCategory === b.colorCategory &&
    a.rarity === b.rarity
  );
}

export const mainboardRate = ({ mainboards, sideboards }) =>
  mainboards + sideboards > 0 ? mainboards / (mainboards + sideboards) : 0;

export const pickRate = ({ picks, passes }) => (picks + passes > 0 ? picks / (picks + passes) : 0);

/**
 * @param {Card?} card
 */
export const cardTags = (card) => card?.tags;

/**
 * @param {Card?} card
 */
export const cardFinish = (card) => card?.finish;

/**
 * @param {Card?} card
 */
export const cardStatus = (card) => card?.status;

/**
 * @param {Card?} card
 */
export const cardCmc = (card) => card?.cmc ?? card?.details?.cmc;

/**
 * @param {Card?} card
 */
export const cardId = (card) => card?.cardID ?? card?.details?._id;

/**
 * @param {Card?} card
 */
export const cardType = (card) => card?.type_line ?? card?.details?.type ?? '';

/**
 * @param {Card?} card
 */
export const cardRarity = (card) => card?.rarity ?? card?.details?.rarity;

/**
 * @param {Card?} card
 */
export const cardAddedTime = (card) => card?.addedTmsp;

/**
 * @param {Card?} card
 */
export const cardImageUrl = (card, showCustomImages = true) => {
  if (showCustomImages) {
    return card?.imgUrl ?? card?.details?.image_normal ?? card?.details?.image_small;
  }
  return card?.details?.image_normal ?? card?.details?.image_small;
};

/**
 * @param {Card?} card
 */
export const cardImageBackUrl = (card, showCustomImages = true) => {
  if (showCustomImages) {
    return card?.imgBackUrl ?? card?.details?.image_flip;
  }
  return card?.details?.image_flip;
};

/**
 * @param {Card?} card
 */
export const cardNotes = (card) => card?.notes;

/**
 * @param {Card?} card
 */
export const cardColorCategory = (card) => card?.colorCategory ?? card?.details?.color_category;

// prices being null causes unwanted coercing behaviour in price filters,
// so nullish price values are transformed to undefined instead
/**
 * @param {Card?} card
 */
export const cardPrice = (card) =>
  (cardFinish(card) === 'Foil'
    ? card?.details?.prices.usd_foil ?? card?.details?.prices.usd
    : card?.details?.prices.usd ?? card?.details?.prices.usd_foil) ?? null;

/**
 * @param {Card?} card
 */
export const cardNormalPrice = (card) => card?.details?.prices.usd ?? null;

/**
 * @param {Card?} card
 */
export const cardFoilPrice = (card) => card?.details?.prices.usd_foil ?? null;

/**
 * @param {Card?} card
 */
export const cardPriceEur = (card) => card?.details?.prices.eur ?? null;

/**
 * @param {Card?} card
 */
export const cardTix = (card) => card?.details?.prices.tix ?? null;

/**
 * @param {Card?} card
 */
export const cardIsFullArt = (card) => card?.details?.full_art;

/**
 * @param {Card?} card
 */
export const cardCost = (card) => card?.details?.parsed_cost;

/**
 * @param {Card?} card
 */
export const cardSet = (card) => card?.details?.set;

/**
 * @param {Card?} card
 */
export const cardCollectorNumber = (card) => card?.details?.collector_number;

/**
 * @param {Card?} card
 */
export const cardPromo = (card) => card?.details?.promo;

/**
 * @param {Card?} card
 */
export const cardDigital = (card) => card?.details?.digital;

/**
 * @param {Card?} card
 */
export const cardIsToken = (card) => card?.details?.isToken;

/**
 * @param {Card?} card
 */
export const cardBorderColor = (card) => card?.details?.border_color;

/**
 * @param {Card?} card
 */
export const cardName = (card) => card?.name ?? card?.details?.name;

/**
 * @param {Card?} card
 */
export const cardNameLower = (card) => card?.name?.toLowerCase?.() ?? card?.details?.name_lower;

/**
 * @param {Card?} card
 */
export const cardFullName = (card) => card?.name ?? card?.details?.full_name;

/**
 * @param {Card?} card
 */
export const cardArtist = (card) => card?.details?.artist;

/**
 * @param {Card?} card
 */
export const cardScryfallUri = (card) => card?.details?.scryfall_uri;

/**
 * @param {Card?} card
 */
export const cardOracleText = (card) => card?.details?.oracle_text;

/**
 * @param {Card?} card
 */
export const cardOracleId = (card) => card?.details?.oracle_id;

/**
 * @param {Card?} card
 */
export const cardLegalities = (card) => card?.details?.legalities ?? {};

/**
 * @param {Card?} card
 */
export const cardLegalIn = (card) => {
  const legalities = cardLegalities(card);
  return Object.keys(legalities).filter((format) => legalities[format] === 'legal');
};

/**
 * @param {Card?} card
 */
export const cardColors = (card) => card?.details?.colors;

/**
 * @param {Card?} card
 */
export const cardLanguage = (card) => card?.details?.language;

/**
 * @param {Card?} card
 */
export const cardMtgoId = (card) => card?.details?.mtgo_id;

/**
 * @param {Card?} card
 */
export const cardTcgplayerId = (card) => card?.details?.tcgplayer_id;

/**
 * @param {Card?} card
 */
export const cardLoyalty = (card) => card?.details?.loyalty;

/**
 * @param {Card?} card
 */
export const cardPower = (card) => card?.details?.power;

/**
 * @param {Card?} card
 */
export const cardToughness = (card) => card?.details?.toughness;

/**
 * @param {Card?} card
 */
export const cardImageSmall = (card) => card?.details?.image_small;

/**
 * @param {Card?} card
 */
export const cardImageNormal = (card) => card?.details?.image_normal;

/**
 * @param {Card?} card
 */
export const cardArtCrop = (card) => card?.details?.art_crop;

/**
 * @param {Card?} card
 */
export const cardImageFlip = (card) => card?.details?.image_flip;

/**
 * @param {Card?} card
 */
export const cardTokens = (card) => card?.details?.tokens;

/**
 * @param {Card?} card
 */
export const cardElo = (card) => card?.details?.elo ?? 1200;

/**
 * @param {Card?} card
 */
export const cardPopularity = (card) => card?.details?.popularity;

/**
 * @param {Card?} card
 */
export const cardCubeCount = (card) => card?.details?.cubeCount;

/**
 * @param {Card?} card
 */
export const cardPickCount = (card) => card?.details?.pickCount;

/**
 * @param {Card?} card
 */
export const cardLayout = (card) => card?.details?.layout;

/**
 * @param {Card?} card
 */
export const cardReleaseDate = (card) => card?.details?.released_at;

/**
 * @param {Card?} card
 * @param {Color} color
 */
export const cardDevotion = (card, color) => {
  let cost = cardCost(card);
  if (cost && cardLayout(card) === 'adventure') cost = cost.slice(cost.findIndex((x) => x === 'split') + 1);
  return cost?.reduce((count, symbol) => count + (symbol.includes(color.toLowerCase()) ? 1 : 0), 0) ?? 0;
};

/**
 * @param {Card?} card
 */
export const cardIsSpecialZoneType = (card) =>
  /\b(plane|phenomenon|vanguard|scheme|conspiracy|contraption)\b/i.test(cardType(card) ?? '');

/**
 * @param {CardDetails} details
 */
const isCreatureLand = (details) =>
  details?.type.includes('Land') && details?.oracle_text?.match?.(/\bbecomes? a .*\bcreature\b/);

/**
 * @param {CardDetails} details
 * @returns {Card} card
 */
export const detailsToCard = (details) => ({
  addedTmsp: null,
  cardID: null,
  cmc: null,
  colorCategory: null,
  colors: null,
  finish: 'Non-foil',
  imgBackUrl: null,
  imgUrl: null,
  isUnlimited: false,
  name: null,
  notes: null,
  rarity: null,
  status: 'Not Owned',
  tags: [],
  type_line: null,
  details,
});

/**
 * @param {CardDetails} card
 */
export const reasonableCard = (card) =>
  !card.promo &&
  !card.digital &&
  !card.isToken &&
  card.border_color !== 'gold' &&
  card.language === 'en' &&
  card.tcgplayer_id &&
  card.set !== 'myb' &&
  card.set !== 'mb1' &&
  card.collector_number.indexOf('★') === -1;

export const CARD_CATEGORY_DETECTORS = {
  /**
   * @param {CardDetails} details
   */
  gold: (details) =>
    (details?.colors?.length ?? 0) > 1 && details?.parsed_cost.every((symbol) => !symbol.includes('-')),
  /**
   * @param {CardDetails} details
   */
  twobrid: (details) => details?.parsed_cost.some((symbol) => symbol.includes('-') && symbol.includes('2')),
  /**
   * @param {CardDetails} details
   */
  hybrid: (details) =>
    (details?.colors?.length ?? 0) > 1 &&
    details?.parsed_cost.some((symbol) => symbol.includes('-') && !symbol.includes('-p')),
  /**
   * @param {CardDetails} details
   */
  phyrexian: (details) => details?.parsed_cost.some((symbol) => symbol.includes('-p')),
  /**
   * @param {CardDetails} details
   */
  promo: (details) => details?.promo,
  /**
   * @param {CardDetails} details
   */
  reprint: (details) => details?.reprint,
  /**
   * @param {CardDetails} details
   */
  firstprint: (details) => !details?.reprint,
  /**
   * @param {CardDetails} details
   */
  firtprinting: (details) => !details?.reprint,
  /**
   * @param {CardDetails} details
   */
  digital: (details) => details?.digital,
  /**
   * @param {CardDetails} details
   */
  reasonable: reasonableCard,
  /**
   * @param {CardDetails} details
   */
  dfc: (details) => ['transform', 'modal_dfc', 'meld', 'double_faced_token', 'double_sided'].includes(details?.layout),
  /**
   * @param {CardDetails} details
   */
  mdfc: (details) => details?.layout === 'modal_dfc',
  /**
   * @param {CardDetails} details
   */
  meld: (details) => details?.layout === 'meld',
  /**
   * @param {CardDetails} details
   */
  tdfc: (details) => details?.layout === 'transform',
  /**
   * @param {CardDetails} details
   */
  transform: (details) => details?.layout === 'transform',
  /**
   * @param {CardDetails} details
   */
  flip: (details) => details?.layout === 'flip',
  /**
   * @param {CardDetails} details
   */
  split: (details) => details?.layout === 'split',
  /**
   * @param {CardDetails} details
   */
  leveler: (details) => details?.layout === 'leveler',
  /**
   * @param {CardDetails} details
   */
  commander: (details) =>
    details?.legalities.Commander === 'legal' &&
    ((details?.type.includes('Legendary') && details?.type.includes('Creature')) ||
      details?.oracle_text?.includes?.('can be your commander') ||
      CategoryOverrides.commander.includes(details?.name)),
  /**
   * @param {CardDetails} details
   */
  spell: (details) => !details?.type.includes('Land') && !cardIsSpecialZoneType(detailsToCard(details)),
  /**
   * @param {CardDetails} details
   */
  permanent: (details) =>
    !details?.type.includes('Instant') &&
    !details?.type.includes('Sorcery') &&
    !cardIsSpecialZoneType(detailsToCard(details)),
  /**
   * @param {CardDetails} details
   */
  historic: (details) =>
    details?.type.includes('Legendary') || details?.type.includes('Artifact') || details?.type.includes('Saga'),
  /**
   * @param {CardDetails} details
   */
  vanilla: (details) => !details?.oracle_text,
  /**
   * @param {CardDetails} details
   */
  modal: (details) => details?.oracle_text?.includes?.('•'),
  /**
   * @param {CardDetails} details
   */
  creatureland: isCreatureLand,
  /**
   * @param {CardDetails} details
   */
  manland: isCreatureLand,
  /**
   * @param {CardDetails} details
   * @param {Card} card
   */
  foil: (details, card) => (cardFinish(card) ? cardFinish(card) === 'Foil' : details?.foil),
  /**
   * @param {CardDetails} details
   * @param {Card} card
   */
  nonfoil: (details, card) => (cardFinish(card) ? cardFinish(card) === 'Non-foil' : details?.nonfoil),
  /**
   * @param {CardDetails} details
   */
  fullart: (details) => details?.full_art,

  /**
   * @param {CardDetails} details
   */
  bikeland: (details) => LandCategories.CYCLE.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  cycleland: (details) => LandCategories.CYCLE.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  bicycleland: (details) => LandCategories.CYCLE.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  bounceland: (details) => LandCategories.BOUNCE.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  karoo: (details) => LandCategories.BOUNCE.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  canopyland: (details) => LandCategories.CANOPY.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  canland: (details) => LandCategories.CANOPY.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  checkland: (details) => LandCategories.CHECK.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  dual: (details) => LandCategories.DUAL.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  fastland: (details) => LandCategories.FAST.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  filterland: (details) => LandCategories.FILTER.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  fetchland: (details) => LandCategories.FETCH.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  gainland: (details) => LandCategories.GAIN.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  painland: (details) => LandCategories.PAIN.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  scryland: (details) => LandCategories.SCRY.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  shadowland: (details) => LandCategories.SHADOW.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  shockland: (details) => LandCategories.SHOCK.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  storageland: (details) => LandCategories.STORAGE.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  triland: (details) => LandCategories.TRI.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  tangoland: (details) => LandCategories.TANGO.includes(details?.name),
  /**
   * @param {CardDetails} details
   */
  battleland: (details) => LandCategories.TANGO.includes(details?.name),

  // Others from Scryfall:
  //   reserved, new, old, hires,
  //   spotlight, unique, masterpiece,
  //   funny,
  //   booster, datestamped, prerelease, planeswalker_deck,
  //   league, buyabox, giftbox, intro_pack, gameday, release,
};

export const CARD_CATEGORIES = Object.keys(CARD_CATEGORY_DETECTORS);

/**
 * @param {Card[]} cards
 */
export const makeSubtitle = (cards) => {
  const numCards = cards.length;
  const numLands = cards.filter((card) => /land/i.test(cardType(card))).length;
  const numNonlands = cards.filter((card) => !/land/i.test(cardType(card)) && !cardIsSpecialZoneType(card)).length;
  const numCreatures = cards.filter((card) => /creature/i.test(cardType(card))).length;
  const numNonCreatures = numNonlands - numCreatures;
  const numSpecial = cards.filter(cardIsSpecialZoneType).length;
  return (
    `${numCards} card${numCards === 1 ? '' : 's'}: ` +
    `${numLands} land${numLands === 1 ? '' : 's'}, ` +
    `${numNonlands} nonland${numNonlands === 1 ? '' : 's'}: ` +
    `${numCreatures} creature${numCreatures === 1 ? '' : 's'}, ` +
    `${numNonCreatures} noncreature${numNonCreatures === 1 ? '' : 's'}` +
    `${numSpecial > 0 ? ` ${numSpecial} special${numSpecial === 1 ? '' : 's'}` : ''}`
  );
};

export default {
  cardTags,
  cardFinish,
  cardStatus,
  cardColorIdentity,
  cardCmc,
  cardId,
  cardType,
  cardRarity,
  cardAddedTime,
  cardImageUrl,
  cardNotes,
  cardColorCategory,
  cardCost,
  cardIsFullArt,
  cardPrice,
  cardFoilPrice,
  cardNormalPrice,
  cardSet,
  cardCollectorNumber,
  cardPromo,
  cardDigital,
  cardIsToken,
  cardBorderColor,
  cardName,
  cardNameLower,
  cardFullName,
  cardArtist,
  cardScryfallUri,
  cardOracleText,
  cardOracleId,
  cardLegalities,
  cardLegalIn,
  cardColors,
  cardLanguage,
  cardMtgoId,
  cardTcgplayerId,
  cardLoyalty,
  cardPower,
  cardToughness,
  cardImageSmall,
  cardImageNormal,
  cardArtCrop,
  cardImageFlip,
  cardTokens,
  cardDevotion,
  cardLayout,
  cardIsSpecialZoneType,
  cardElo,
  cardPopularity,
  cardCubeCount,
  cardPickCount,
  COLOR_COMBINATIONS,
  normalizeName,
  encodeName,
  decodeName,
  cardsAreEquivalent,
  makeSubtitle,
};

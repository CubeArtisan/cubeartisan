import { Card, convertCard, readLargeJson, updateAllBulkData } from '@cubeartisan/carddb';

import { applyPatch } from '@cubeartisan/cubeartisan/shared/patches';
import type { CubeCard, CubeDbCard } from '@cubeartisan/cubeartisan/types/card';

export type CardDB = {
  cards: Card[];
  byId: { [S in string]: Card };
  byName: { [S in string]: string };
};

let carddbPromise: Promise<CardDB> | null = null;

export const updateCardDb = async () => {
  console.log('Loading cards.');
  await updateAllBulkData();
  const scryfallCards = await readLargeJson('data/all_cards.json');
  const cards: Card[] = scryfallCards.map(convertCard);
  console.log(`Loaded ${cards.length} cards.`);
  return {
    cards,
    byId: Object.fromEntries(cards.map((card) => [card.id, card])),
    byName: Object.fromEntries(cards.map((card) => [card.cardFaces[0]!.name, card.id])),
  };
};

export const loadCardDb = () => {
  if (!carddbPromise) carddbPromise = updateCardDb();
};

export const getCardById = async (cardId: string): Promise<Card | null> => {
  if (carddbPromise === null) loadCardDb();
  return (await carddbPromise)?.byId[cardId] ?? null;
};

export const getIdByCardName = async (cardName: string): Promise<string | null> => {
  if (carddbPromise === null) loadCardDb();
  return (await carddbPromise)?.byName[cardName] ?? null;
};

const defaultCard: Card = {
  id: 'custom:0000',
  source: 'custom',
  externalIds: {},
  cardFaces: [
    {
      name: 'Invalid Card',
      manaCost: [],
      images: {},
      cmc: 0,
      colors: [],
      oracleText: '',
      typeLine: '',
      borderColor: 'black',
      frame: '1993',
      fullArt: false,
      highresImage: false,
      storySpotlight: false,
      textless: false,
    },
  ],
  collectorNumber: '0',
  colorCategory: 'Colorless',
  colorIdentity: [],
  legalities: {
    standard: 'not_legal',
    future: 'not_legal',
    historic: 'not_legal',
    gladiator: 'not_legal',
    pioneer: 'not_legal',
    explorer: 'not_legal',
    modern: 'not_legal',
    legacy: 'not_legal',
    pauper: 'not_legal',
    vintage: 'not_legal',
    penny: 'not_legal',
    commander: 'not_legal',
    brawl: 'not_legal',
    historicbrawl: 'not_legal',
    alchemy: 'not_legal',
    paupercommander: 'not_legal',
    duel: 'not_legal',
    oldschool: 'not_legal',
    premodern: 'not_legal',
  },
  keywords: [],
  oversized: false,
  reserved: false,
  booster: false,
  digital: false,
  finishes: [],
  games: [],
  prices: {
    usd: null,
    usd_foil: null,
    usd_etched: null,
    eur: null,
    tix: null,
  },
  promo: false,
  rarity: 'special',
  relatedUris: {},
  releasedAt: '',
  reprint: false,
  setName: 'Invalid Set',
  setType: 'Invalid',
  set: 'Invalid',
  setId: '0000',
  variation: false,
};

export const loadCard = async (dbCard: CubeDbCard): Promise<CubeCard> => {
  const card: Card = (await getCardById(dbCard.id)) ?? { ...defaultCard };
  return {
    ...applyPatch(card, dbCard.patch),
    metadata: dbCard.metadata,
  } as CubeCard;
};

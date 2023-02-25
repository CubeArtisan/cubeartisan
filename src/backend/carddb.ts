import { convertCard, readLargeJson, updateAllBulkData } from '@cubeartisan/carddb';

type Card = ReturnType<typeof convertCard>;

export type CardDB = {
  byId: { [S in string]: Card };
  cards: Card[];
};

export const carddb: CardDB = {
  byId: {},
  cards: [],
};

export const loadCardDb = async () => {
  console.log('Loading cards.');
  await updateAllBulkData();
  const scryfallCards = await readLargeJson('data/all_cards.json');
  carddb.cards = scryfallCards.map(convertCard);
  carddb.byId = Object.fromEntries(carddb.cards.map((card) => [card.id, card]));
  console.log(`Loaded ${carddb.cards.length} cards.`);
};

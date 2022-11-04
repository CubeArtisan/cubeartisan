import carddb from '@cubeartisan/server/serverjs/cards.js';

const COLORS = ['W', 'U', 'B', 'R', 'G'];
const DEFAULT_FINISH = 'Non-foil';
const DEFAULT_STATUS = 'Not Owned';

const isInvalidCardId = (id) => carddb.cardFromId(id).name === 'Invalid Card';
const isInvalidFinish = (finish) => !['Foil', 'Non-foil'].includes(finish);
const isInvalidStatus = (status) => !['Not Owned', 'Ordered', 'Owned', 'Premium Owned', 'Proxied'].includes(status);
const isInvalidColors = (colors) => !colors || !Array.isArray(colors) || colors.some((c) => !COLORS.includes(c));
const isInvalidTags = (tags) => !tags || tags.some((t) => !t);

export const cleanCards = (collection, filter = true) => {
  if (filter) {
    collection = collection.filter((c) => c && !isInvalidCardId(c.cardID));
  }
  for (const card of collection) {
    if (isInvalidFinish(card.finish)) card.finish = DEFAULT_FINISH;
    if (isInvalidStatus(card.status)) card.status = DEFAULT_STATUS;
    if (isInvalidColors(card.colors)) card.colors = carddb.cardFromId(card.cardID).color_identity;
    if (isInvalidTags(card.tags)) card.tags = (card.tags || []).filter((t) => t);
  }
  return collection;
};

export const cardsNeedsCleaning = (collection) =>
  collection.some(
    (card) =>
      !card ||
      isInvalidCardId(card.cardID) ||
      isInvalidFinish(card.finish) ||
      isInvalidStatus(card.status) ||
      isInvalidColors(card.colors) ||
      isInvalidTags(card.tags),
  );

export default {
  cleanCards,
  cardsNeedsCleaning,
};

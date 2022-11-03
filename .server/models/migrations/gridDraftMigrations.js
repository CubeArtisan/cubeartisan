import Cube from '@cubeartisan/server/models/cube.js';
import { addBasics, createPool } from '@cubeartisan/server/routes/cube/helper.js';
import { flatten, mapNonNull } from '@cubeartisan/server/serverjs/util.js';
import { cleanCards } from '@cubeartisan/server/models/migrations/cleanCards.js';

const dedupeCardObjects = async (gridDraft) => {
  if (!gridDraft) return null;
  const gridDraftObject = gridDraft.toObject();
  delete gridDraftObject.synergies;

  let cube = await Cube.findById(gridDraft.cube, 'basics').lean();
  if (!cube || !Array.isArray(cube.basics)) {
    cube = {
      basics: [
        '1d7dba1c-a702-43c0-8fca-e47bbad4a00f',
        '42232ea6-e31d-46a6-9f94-b2ad2416d79b',
        '19e71532-3f79-4fec-974f-b0e85c7fe701',
        '8365ab45-6d78-47ad-a6ed-282069b0fabc',
        '0c4eaecf-dd4c-45ab-9b50-2abe987d35d4',
      ],
    };
  }

  let cardsArray = flatten(gridDraftObject.initial_state, 2).filter((c) => c);
  if (!Array.isArray(cardsArray) || (cardsArray.length > 0 && (!cardsArray[0] || !cardsArray[0].cardID))) {
    throw new Error(
      `Could not correctly transform the cardsArray. Got ${JSON.stringify(
        cardsArray[0],
        null,
        2,
      )}\n\tfrom ${JSON.stringify(gridDraftObject)}`,
    );
  }
  addBasics(cardsArray, cube.basics, gridDraft);
  cardsArray = cleanCards(cardsArray).map((card, index) => ({ ...card, index }));

  const replaceWithIndex = (card) => {
    const idx = cardsArray.findIndex((card2) => card && card2 && card.cardID === card2.cardID);
    if (idx === -1) {
      cardsArray.push(card);
      return cardsArray.length - 1;

      // throw new Error(
      //  `card ${JSON.stringify(card)} could not be found in the cardsArray.\n${JSON.stringify(cardsArray)}`,
      // );
    }
    return idx;
  };
  const replaceNd = (arrOrCard) => {
    if (!arrOrCard) return arrOrCard;
    if (Array.isArray(arrOrCard) || !arrOrCard.cardID) {
      return mapNonNull(arrOrCard, replaceNd);
    }
    return replaceWithIndex(arrOrCard);
  };

  const to3d = (collection) => {
    if (!collection || !Array.isArray(collection) || collection.length === 0) return createPool();
    if (Array.isArray(collection[0])) {
      if (collection[0].length > 0 && Array.isArray(collection[0][0])) return collection;
      if (collection.length > 8) return [collection.slice(0, 8), collection.slice(8)];
      return [collection];
    }
    const pool = createPool();
    pool[0][0] = collection.flatten();
    return pool;
  };

  gridDraft.cards = cardsArray;
  gridDraft.initial_state = replaceNd(gridDraftObject.initial_state);
  gridDraft.seats = mapNonNull(gridDraftObject.seats, (seat) => {
    seat.bot = !!seat.bot;
    seat.drafted = to3d(replaceNd(seat.drafted));
    seat.sideboard = to3d(replaceNd(seat.sideboard));
    seat.pickorder = replaceNd(seat.pickorder);
    seat.pickedIndices = [];
    return seat;
  });
  return gridDraft;
};

const migrations = [{ version: 1, migration: dedupeCardObjects }];

export default migrations;

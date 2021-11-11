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
/* eslint-disable no-loop-func */
import seedrandom from 'seedrandom';

import { moveOrAddCard } from '@cubeartisan/client/drafting/DraftLocation.js';
import { cardType } from '@cubeartisan/client/utils/Card.js';
import { cmcColumn, toNullableInt } from '@cubeartisan/client/utils/Util.js';

let draftbotsInitialized = false;
export const areDraftbotsInitialized = () => draftbotsInitialized;
export const initializeMtgDraftbots = async () => {
  const mtgdraftbots = await import('mtgdraftbots');
  if (draftbotsInitialized) return mtgdraftbots;
  await mtgdraftbots.initializeDraftbots();
  draftbotsInitialized = true;
  return mtgdraftbots;
};

export const defaultStepsForLength = (length) =>
  new Array(length)
    .fill([
      { action: 'pick', amount: 1 },
      { action: 'pass', amount: 1 },
    ])
    .flat()
    .slice(0, length * 2 - 1) // Remove the final pass.
    .map((action) => ({ ...action }));

const trash = ([oldDrafterState, internalState]) => {
  const { pickEnd, stepEnd, numSeats, offset, packsWithCards, seatNum, draft } = internalState;
  const drafterState = { ...oldDrafterState };
  delete drafterState.pickedIdx;
  delete drafterState.trashedIdx;
  if (
    drafterState.pickedNum + drafterState.trashedNum >= pickEnd ||
    drafterState.stepNumber > (stepEnd ?? drafterState.stepNumber)
  ) {
    internalState.done = true;
    return [drafterState, internalState];
  }
  for (let seatIndex = 0; seatIndex < numSeats; seatIndex++) {
    const offsetSeatIndex = (seatIndex + offset) % numSeats;
    const takenCardIndex = draft.seats[seatIndex].trashorder[drafterState.pickedNum] ?? -1;
    if (takenCardIndex < 0) {
      if (seatIndex === seatNum) {
        internalState.done = true;
        return [drafterState, internalState];
      }
      packsWithCards[offsetSeatIndex] = [];
    } else {
      const cardsInPackForSeat = packsWithCards[offsetSeatIndex];
      const indexToRemove = cardsInPackForSeat.indexOf(takenCardIndex);

      if (seatIndex === seatNum) {
        drafterState.trashedIdx = indexToRemove;
        delete drafterState.pickedIdx;
      }

      if (indexToRemove < 0) {
        // We needed the missing card.
        throw new Error(
          `Seat ${seatIndex} should have trashed ${takenCardIndex} at pickNumber ${
            drafterState.pickedNum + drafterState.trashedNum
          }, but the pack contains only [${packsWithCards[offsetSeatIndex].join(', ')}].`,
        );
      } else {
        packsWithCards[offsetSeatIndex].splice(indexToRemove, 1);
      }
    }
  }
  drafterState.cardsInPack = packsWithCards[(seatNum + offset) % numSeats].slice();
  drafterState.trashedNum += 1;
  drafterState.pickNum += 1;
  drafterState.pickNumber += 1;
  drafterState.stepNumber += 1;
  return [drafterState, internalState];
};

const pick = ([oldDrafterState, internalState]) => {
  const { pickEnd, stepEnd, numSeats, offset, packsWithCards, seatNum, draft } = internalState;
  const drafterState = { ...oldDrafterState };
  delete drafterState.pickedIdx;
  delete drafterState.trashedIdx;
  if (
    drafterState.pickedNum + drafterState.trashedNum >= pickEnd ||
    drafterState.stepNumber > (stepEnd ?? drafterState.stepNumber)
  ) {
    internalState.done = true;
    return [drafterState, internalState];
  }
  for (let seatIndex = 0; seatIndex < numSeats; seatIndex++) {
    const offsetSeatIndex = (seatIndex + offset) % numSeats;
    const takenCardIndex = draft.seats[seatIndex].pickorder[drafterState.pickedNum] ?? -1;
    if (takenCardIndex < 0) {
      if (seatIndex === seatNum) {
        internalState.done = true;
        return [drafterState, internalState];
      }
      packsWithCards[offsetSeatIndex] = [];
    } else {
      const cardsInPackForSeat = packsWithCards[offsetSeatIndex];
      const indexToRemove = cardsInPackForSeat.indexOf(takenCardIndex);
      if (indexToRemove < 0) {
        // We needed the missing card.
        throw new Error(
          `Seat ${seatIndex} should have picked ${takenCardIndex} at pickNumber ${
            drafterState.pickNumber
          }, but the pack contains only [${packsWithCards[offsetSeatIndex].join(', ')}].`,
        );
      } else {
        packsWithCards[offsetSeatIndex].splice(indexToRemove, 1);
        if (seatIndex === seatNum) {
          drafterState.pickedIdx = indexToRemove;
          delete drafterState.trashedIdx;
          drafterState.cardsInPack = packsWithCards[offsetSeatIndex].slice();
          drafterState.picked = [...drafterState.picked, takenCardIndex];
        }
      }
    }
  }
  drafterState.pickedNum += 1;
  drafterState.pickNumber += 1;
  drafterState.pickNum += 1;
  drafterState.stepNumber += 1;
  return [drafterState, internalState];
};

const newpack = ([oldDrafterState, internalState]) => {
  const drafterState = { ...oldDrafterState };
  delete drafterState.pickedIdx;
  delete drafterState.trashedIdx;
  const { draft, seatNum } = internalState;
  drafterState.packNum += 1;
  internalState.packsWithCards = draft.initial_state.map((packsForSeat) =>
    packsForSeat[drafterState.packNum].cards.slice(),
  );
  internalState.offset = 0;
  drafterState.packSize = internalState.packsWithCards[0].length;
  drafterState.pickNum = 0;
  drafterState.cardsInPack = internalState.packsWithCards[seatNum].slice();
  drafterState.seen = drafterState.seen.concat(internalState.packsWithCards[seatNum]); // We see the pack we opened.
  return [drafterState, internalState];
};

const pass = ([oldDrafterState, internalState]) => {
  const { stepEnd, numSeats, packsWithCards, seatNum } = internalState;
  const drafterState = { ...oldDrafterState };
  delete drafterState.pickedIdx;
  delete drafterState.trashedIdx;
  if (drafterState.stepNumber > (stepEnd ?? drafterState.stepNumber)) {
    internalState.done = true;
    return [drafterState, internalState];
  }
  const passLeft = drafterState.packNum % 2 === 0;
  internalState.offset = (internalState.offset + (passLeft ? 1 : numSeats - 1)) % numSeats;
  drafterState.cardsInPack = packsWithCards[(seatNum + internalState.offset) % numSeats].slice();
  drafterState.seen = drafterState.seen.concat(packsWithCards[(seatNum + internalState.offset) % numSeats]);
  internalState.stepNumber += 1;
  return [drafterState, internalState];
};

const done = ([oldDrafterState, internalState]) => {
  const drafterState = { ...oldDrafterState };
  delete drafterState.pickedIdx;
  delete drafterState.trashedIdx;
  internalState.done = true;
  return [drafterState, internalState];
};

const transitions = {
  trash,
  pick,
  trashrandom: trash,
  pickrandom: pick,
  newpack,
  pass,
  done,
};

export const validActions = Object.keys(transitions);

const toActionsArray = (packs) => [
  'newpack',
  ...packs.flatMap((pack, idx) =>
    (pack.steps ?? defaultStepsForLength(pack.cards.length))
      .flatMap(({ action, amount }) => new Array(amount ?? 1).fill(action))
      .concat(idx < packs.length - 1 ? ['newpack'] : []),
  ),
  'done',
];

export const getAllDrafterStates = ({ draft, seatNumber, pickNumber = -1, stepNumber = null }) => {
  const { cards, basics, seed, timeout } = draft;
  const numSeats = draft.initial_state.length;
  const seatNum = parseInt(seatNumber, 10);
  const ourSeat = draft.seats[seatNum];
  let actionIndex = 0;
  let internalState = {
    stepEnd: toNullableInt(stepNumber),
    pickEnd: pickNumber === -1 ? ourSeat.pickorder.length + ourSeat.trashorder.length : parseInt(pickNumber, 10),
    offset: 0,
    numSeats,
    seatNum,
    draft,
  };
  let drafterState = {
    cards,
    picked: [],
    trashed: [],
    drafted: ourSeat.drafted,
    sideboard: ourSeat.sideboard,
    seatNum,
    seen: [],
    cardsInPack: [],
    basics,
    packNum: -1,
    pickNum: 0,
    numPacks: draft.initial_state[0].length,
    packSize: 1,
    pickedNum: 0,
    trashedNum: 0,
    stepNumber: 0,
    pickNumber: 0,
    seed: toNullableInt(seed) ?? Math.floor(Math.random() * 65536),
    timeout,
  };
  const drafterStates = [];
  const actions = toActionsArray(draft.initial_state[0]);
  for (; actionIndex < actions.length; actionIndex++) {
    [drafterState, internalState] = transitions[actions[actionIndex]]([drafterState, internalState]);
    let i = 1;
    // eslint-disable-next-line no-empty
    for (; actions[actionIndex + i] === actions[actionIndex]; i++) {}
    drafterStates.push({ ...drafterState, step: { action: actions[actionIndex], amount: i - 1 } });
    if (internalState.done) break;
  }
  return drafterStates;
};

export const getDrafterState = (args) => {
  const drafterStates = getAllDrafterStates(args);
  return drafterStates[drafterStates.length - 1];
};

export const getDefaultPosition = (card, picks) => {
  const row = cardType(card).toLowerCase().includes('creature') ? 0 : 1;
  const col = cmcColumn(card);
  const colIndex = picks[row][col].length;
  return [row, col, colIndex];
};

export const convertDrafterState = (drafterState) => {
  const newState = {
    basics: drafterState.basics,
    picked: drafterState.picked,
    seen: drafterState.seen,
    cardsInPack: drafterState.cardsInPack,
    cardOracleIds: drafterState.cards.map(({ details }) => details.oracle_id),
    packNum: drafterState.packNum,
    numPacks: drafterState.numPacks,
    pickNum: drafterState.pickNum,
    numPicks: drafterState.packSize,
    seed: drafterState.seed ?? Math.floor(Math.random() * 65536),
  };
  return newState;
};

export const getWorstScore = (result) => {
  let worstIndex = 0;
  let worstScore = 2;
  for (let i = 0; i < result.scores.length; i++) {
    if (result.scores[i].score < worstScore) {
      worstScore = result.scores[i].score;
      worstIndex = i;
    }
  }
  return worstIndex;
};

export const allBotsDraft = async (draft) => {
  const { calculateBotPick } = await initializeMtgDraftbots();
  let drafterStates = draft.seats.map((_, seatNumber) => getDrafterState({ draft, seatNumber }));
  let [
    {
      numPacks,
      packNum,
      step: { action },
    },
  ] = drafterStates;
  const rng = seedrandom(draft.seed);
  while (numPacks > packNum) {
    const currentDraft = draft;
    let picks;
    if (action.match(/random/)) {
      picks = drafterStates.map(({ cardsInPack }) => cardsInPack[Math.floor(rng() * cardsInPack.length)]);
    }
    if (action.match(/pick/)) {
      if (!action.match(/random/)) {
        // eslint-disable-next-line no-await-in-loop
        picks = await Promise.all(
          drafterStates.map(async (drafterState) => {
            const result = await calculateBotPick(convertDrafterState(drafterState));
            return drafterState.cardsInPack[result.chosenOption];
          }),
        );
      }
      draft = {
        ...draft,
        seats: draft.seats.map(({ pickorder, drafted, ...seat }, seatIndex) => ({
          ...seat,
          pickorder: [...pickorder, picks[seatIndex]],
          drafted: moveOrAddCard(
            drafted,
            getDefaultPosition(currentDraft.cards[picks[seatIndex]], drafted),
            picks[seatIndex],
          ),
        })),
      };
    } else if (action.match(/trash/)) {
      if (!action.match(/random/)) {
        // eslint-disable-next-line no-await-in-loop
        picks = await Promise.all(
          drafterStates.map(async (drafterState) => {
            const result = await calculateBotPick(convertDrafterState(drafterState));
            return drafterState.cardsInPack[getWorstScore(result)];
          }),
        );
      }
      draft = {
        ...draft,
        seats: draft.seats.map(({ trashorder, ...seat }, seatIndex) => ({
          ...seat,
          trashorder: [...trashorder, picks[seatIndex]],
        })),
      };
    } else if (action.match(/done/)) {
      break;
    } else {
      const errorStr = `Unrecognized action '${action}' in allBotsDraft`;
      console.warn(errorStr);
      throw new Error(errorStr);
    }
    const constDraft = draft;
    drafterStates = draft.seats.map((_, seatNumber) => getDrafterState({ draft: constDraft, seatNumber }));
    [
      {
        numPacks,
        packNum,
        step: { action },
      },
    ] = drafterStates;
  }

  return draft;
};

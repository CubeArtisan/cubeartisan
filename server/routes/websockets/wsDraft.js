import winston from '@cubeartisan/server/serverjs/winstonConfig.js';

import { calculateBotPick } from 'mtgdraftbots';
import seedrandom from 'seedrandom';

import carddb from '@cubeartisan/server/serverjs/cards.js';
import Draft from '@cubeartisan/server/models/draft.js';
import { convertDrafterState, getDefaultPosition, getDrafterState } from '@cubeartisan/client/drafting/draftutil.js';
import { moveOrAddCard } from '@cubeartisan/client/drafting/DraftLocation.js';

const getSeat = async (draftid, user) => {
  let draft = await Draft.findById(draftid).lean();
  const existingSeat = draft.seats.findIndex(({ userid }) => user._id.toString() === userid);
  if (existingSeat >= 0) return [existingSeat, draft];
  for (
    let seatNumbers = draft.seats.filter(({ bot, userid }) => !bot && !userid).map((_, idx) => idx);
    seatNumbers.length > 0;
    seatNumbers = draft.seats.filter(({ bot, userid }) => !bot && !userid).map((_, idx) => idx)
  ) {
    const seatNumber = seatNumbers[Math.floor(Math.random() * seatNumbers.length)];
    const seat = draft.seats[seatNumber];
    seat.name = user.username;
    seat.userid = user._id;
    // eslint-disable-next-line no-await-in-loop
    const result = await Draft.updateOne(
      { _id: draftid, cas: draft.cas },
      {
        $inc: { cas: 1 },
        $set: { [`seats.${seatNumber}.name`]: user.username, [`seats.${seatNumber}.userid`]: user._id },
      },
    );
    if (result.nModified > 0) {
      draft.seats[seatNumber].name = user.username;
      draft.seats[seatNumber].userid = user._id;
      return [seatNumber, draft];
    }
    // eslint-disable-next-line no-await-in-loop
    draft = await Draft.findById(draftid).lean();
  }
  return [-1, null];
};

const manageWebsocketDraft = async (socket) => {
  const { draftid } = socket.handshake.query;

  const [seatNumber, initialDraft] = await getSeat(draftid, socket.request.user);

  const getDraft = async () => {
    const draft = await Draft.findById(draftid).lean();
    draft.cards = draft.cards.map((card) => ({ ...card, details: carddb.cardFromId(card.cardID) }));
    return draft;
  };

  if (seatNumber < 0) {
    socket.emit('no seats');
    socket.disconnect(true);
    return;
  }

  const rng = seedrandom(initialDraft.seed + 3 ** seatNumber);

  let advancePack;

  const trashCard = async (draft, cardIndex, seatIndex = seatNumber, changes = {}, drafterState = null) => {
    const fromClient = !drafterState;
    if (!drafterState) {
      drafterState = getDrafterState({ draft, seatNumber: seatIndex });
    }
    if (!drafterState.cardsInPack.includes(cardIndex)) return null;
    draft.seats[seatIndex].trashorder.push(cardIndex);
    if (!changes.$set) changes.$set = {};
    changes.$set[`$seats.${seatIndex}.trashorder`] = draft.seats[seatIndex].trashorder;
    if (fromClient) {
      return advancePack(draft, drafterState.nextSeat, changes);
    }
    return [changes, draft];
  };

  const pickCard = async (
    draft,
    cardIndex,
    target = null,
    seatIndex = seatNumber,
    changes = {},
    drafterState = null,
  ) => {
    const fromClient = !drafterState;
    if (!drafterState) {
      drafterState = getDrafterState({ draft, seatNumber: seatIndex });
    }
    if (!drafterState.cardsInPack.includes(cardIndex)) {
      winston.error({
        message: `Tried picking ${cardIndex} from ${drafterState.cardsInPack} in draft ${draftid}`,
        request: socket.request,
      });
      return [{}, draft];
    }
    target = target ?? getDefaultPosition(draft.cards[cardIndex], draft.seats[seatIndex].drafted);
    draft.seats[seatIndex].drafted = moveOrAddCard(draft.seats[seatNumber].drafted, target, cardIndex);
    draft.seats[seatIndex].pickorder.push(cardIndex);
    if (!changes.$set) changes.$set = {};
    changes.$set[`seats.${seatIndex}.drafted`] = draft.seats[seatIndex].drafted;
    changes.$set[`seats.${seatIndex}.pickorder`] = draft.seats[seatIndex].pickorder;
    drafterState.cardsInPack.splice(drafterState.cardsInPack.indexOf(cardIndex), 1);
    if (fromClient) {
      return advancePack(draft, changes);
    }
    return [changes, draft];
  };

  const applyChanges = async (changes) => {
    await Draft.updateOne({ _id: draftid }, changes);
  };

  const getAdvanceableDrafterStates = (draft) =>
    draft.seats
      .map((_, i) => getDrafterState({ draft, seatNumber: i }))
      .filter(
        ({ step: { action }, cardsInPack, seatNum }) =>
          cardsInPack.length > 0 && (action.match(/random/) || draft.seats[seatNum].bot),
      );

  advancePack = async (draft, changes = {}) => {
    for (
      let drafterStates = getAdvanceableDrafterStates(draft);
      drafterStates.length > 0;
      drafterStates = getAdvanceableDrafterStates(draft)
    ) {
      for (const drafterState of drafterStates) {
        if (drafterState.cardsInPack.length > 0) {
          if (drafterState.step.action.match(/random/)) {
            const cardIndex = drafterState.cardsInPack[Math.floor(rng() * drafterState.cardsInPack.length)];
            if (drafterState.step.action.match(/pick/)) {
              // eslint-disable-next-line no-await-in-loop
              [changes, draft] = await pickCard(draft, cardIndex, null, drafterState.seatNum, changes, drafterState);
            } else if (drafterState.step.action.match(/trash/)) {
              // eslint-disable-next-line no-await-in-loop
              [changes, draft] = await trashCard(draft, cardIndex, drafterState.seatNum, changes, drafterState);
            }
          } else if (draft.seats[drafterState.seatNum].bot) {
            if (drafterState.step.action.match(/pick/)) {
              // eslint-disable-next-line no-await-in-loop
              const result = await calculateBotPick(convertDrafterState(drafterState));
              // eslint-disable-next-line no-await-in-loop
              [changes, draft] = await pickCard(
                draft,
                drafterState.cardsInPack[result.chosenOption],
                null,
                drafterState.seatNum,
                changes,
                drafterState,
              );
            }
            if (drafterState.step.action.match(/trash/)) {
              // eslint-disable-next-line no-await-in-loop
              const result = await calculateBotPick(convertDrafterState(drafterState));
              let worstIndex = 0;
              let worstScore = 2;
              for (let i = 0; i < result.scores.length; i++) {
                if (result.scores[i].score < worstScore) {
                  worstScore = result.scores[i].score;
                  worstIndex = i;
                }
              }
              // eslint-disable-next-line no-await-in-loop
              [changes, draft] = await trashCard(
                draft,
                drafterState.cardsInPack[worstIndex],
                drafterState.seatNum,
                changes,
                drafterState,
              );
            }
          }
        }
      }
    }
    await applyChanges(changes);
    return [changes, draft];
  };

  const moveCard = async (draft, source, target) =>
    applyChanges({
      $set: { [`seats.${seatNumber}.drafted`]: moveOrAddCard(draft.seats[seatNumber].drafted, target, source) },
    });

  socket.on('pick card', async (...args) => pickCard(await getDraft(), ...args));
  socket.on('trash card', async (...args) => trashCard(await getDraft(), ...args));
  socket.on('move card', async (...args) => moveCard(await getDraft(), ...args));
  let stepNumber = -1;
  const updateState = async (draft) => {
    let drafterState = getDrafterState({ draft, seatNumber });
    stepNumber = drafterState.stepNumber;
    const { action } = drafterState.step;
    const doneDrafting = drafterState.packNum >= drafterState.numPacks;
    if (drafterState.stepNumber > stepNumber && action.match(/random/) && !doneDrafting) {
      [, draft] = await advancePack(draft, seatNumber, {});
      drafterState = getDrafterState({ draft, seatNumber });
    }
    socket.emit('drafterState', drafterState);
    const seatNumbers = draft.seats.filter(({ bot, userid }) => !bot && !userid).map((_, idx) => idx);
    console.log(seatNumbers);
    socket.emit('emptySeats', seatNumbers.length);
    if (drafterState.packNum >= drafterState.numPacks) {
      socket.disconnect(true);
    }
  };

  const changeStream = Draft.watch({ $match: { _id: draftid } });
  changeStream.on('change', async () => {
    await updateState(await getDraft());
  });
  socket.on('disconnect', () => {
    try {
      changeStream.close();
    } catch (err) {
      winston.error({
        message: err.message,
        stack: err.stack,
        request: socket.request,
      });
    }
  });

  initialDraft.cards = initialDraft.cards.map((card) => ({ ...card, details: carddb.cardFromId(card.cardID) }));
  updateState(initialDraft);
};

export default manageWebsocketDraft;

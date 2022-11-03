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
import { addNotification, wrapAsyncApi } from '@cubeartisan/server/serverjs/util.js';
import { abbreviate, addDeckCardAnalytics, saveDraftAnalytics } from '@cubeartisan/server/serverjs/cubefn.js';
import generateMeta from '@cubeartisan/server/serverjs/meta.js';
import { arraysAreEqualSets, getCubeDescription, toNullableInt } from '@cubeartisan/client/utils/Util.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import Draft from '@cubeartisan/server/models/draft.js';
import Cube from '@cubeartisan/server/models/cube.js';
import CubeAnalytic from '@cubeartisan/server/models/cubeAnalytic.js';
import User from '@cubeartisan/server/models/user.js';
import { render } from '@cubeartisan/server/serverjs/render.js';
import { createPool, rotateArrayLeft } from '@cubeartisan/server/routes/cube/helper.js';
import Deck from '@cubeartisan/server/models/deck.js';
import { buildDeck } from '@cubeartisan/client/drafting/deckutil.js';
import { COLOR_COMBINATIONS } from '@cubeartisan/client/utils/Card.js';
import { handleRouteError } from '@cubeartisan/server/routes/middleware.js';
import { convertDrafterState, getDrafterState, getDraftbotScores } from '@cubeartisan/client/drafting/draftutil.js';

export const getDraftPage = async (req, res) => {
  try {
    const draft = await Draft.findById(req.params.id).lean();
    if (!draft) {
      req.flash('danger', 'Draft not found');
      return res.redirect('/404');
    }

    const cube = await Cube.findOne(draft.cube).lean();

    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }

    const user = await User.findById(cube.owner);
    if (!user) {
      req.flash('danger', 'Owner not found');
      return res.redirect('/404');
    }

    let eloOverrideDict = {};
    if (cube.useCubeElo) {
      const analytic = await CubeAnalytic.findOne({ cube: cube._id });
      eloOverrideDict = Object.fromEntries(analytic.cards.map((c) => [c.cardName, c.elo]));
    }

    // insert card details everywhere that needs them
    for (const card of draft.cards) {
      card.details = carddb.cardFromId(card.cardID);
      if (eloOverrideDict[card.details.name_lower]) {
        card.details.elo = eloOverrideDict[card.details.name_lower];
      }
    }

    return await render(
      req,
      res,
      'CubeDraftPage',
      {
        cube,
        draftid: draft._id,
      },
      {
        title: `${abbreviate(cube.name)} - Draft`,
        metadata: generateMeta(
          `${process.env.SITE_NAME} Draft: ${cube.name}`,
          getCubeDescription(cube),
          cube.image_uri,
          `${process.env.SITE_ROOT}/draft/${encodeURIComponent(req.params.id)}`,
        ),
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

export const redraftDraft = async (req, res) => {
  try {
    const srcDraft = await Draft.findById(req.params.id).lean();
    const seat = parseInt(req.params.seat, 10);
    if (!srcDraft) {
      req.flash('danger', 'This deck is not able to be redrafted.');
      return res.redirect(303, `/deck/${req.params.id}`);
    }
    if (!Number.isInteger(seat) || seat < 0 || seat >= srcDraft.seats.length) {
      req.flash('dange', 'Did not give a valid seat number to redraft as.');
      return res.redirect(303, `/deck/${req.params.id}`);
    }

    const cube = await Cube.findById(srcDraft.cube);
    if (!cube) {
      req.flash('danger', 'The cube that this deck belongs to no longer exists.');
      return res.redirect(303, `/deck/${req.params.id}`);
    }

    let draft = new Draft();
    draft.cube = srcDraft.cube;
    draft.seats = srcDraft.seats.slice();
    rotateArrayLeft(draft.seats, seat);
    draft.seats[seat].bot = null;
    draft.basics = srcDraft.basics;
    draft.initial_state = srcDraft.initial_state.slice();
    draft.cards = srcDraft.cards;

    for (let i = 0; i < draft.seats.length; i += 1) {
      draft.seats[i].bot = [];
      draft.seats[i].drafted = createPool();
      draft.seats[i].sideboard = createPool();
      draft.seats[i].pickorder = [];
      draft.seats[i].trashorder = [];
    }
    draft.seats[0].bot = null;
    draft.seats[0].userid = req.user ? req.user._id : null;
    draft.seats[0].name = req.user ? req.user.username : 'Anonymous';

    await draft.save();

    let eloOverrideDict = {};
    if (cube.useCubeElo) {
      const analytic = await CubeAnalytic.findOne({ cube: cube._id });
      eloOverrideDict = Object.fromEntries(analytic.cards.map((c) => [c.cardName, c.elo]));
    }

    draft = await Draft.findById(draft._id).lean();
    // insert card details everywhere that needs them
    for (const card of draft.cards) {
      card.details = carddb.cardFromId(card.cardID);
      if (eloOverrideDict[card.details.name_lower]) {
        card.details.elo = eloOverrideDict[card.details.name_lower];
      }
    }
    return res.status(200).send({
      success: 'true',
      draft,
    });
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${encodeURIComponent(req.params.id)}/playtest`);
  }
};

const saveDraftHandler = async (req, res) => {
  const draft = await Draft.findOne({
    _id: req.body._id,
  });
  draft.seats = req.body.seats;
  await draft.save();

  return res.status(200).send({
    success: 'true',
  });
};
export const saveDraft = wrapAsyncApi(saveDraftHandler);

export const submitDraft = async (req, res) => {
  try {
    const draftid = req.params.id;
    const seatNum = toNullableInt(req.params.seat) ?? 0;
    const draft = await Draft.findById(draftid).lean();
    const cube = await Cube.findOne(draft.cube).lean();
    // TODO: Should have guards on if the objects aren't found in the DB.

    const deck = new Deck();
    deck.cube = draft.cube;
    deck.cubeOwner = cube.owner;
    deck.date = Date.now();
    deck.draft = draft._id;
    deck.cubename = cube.name;
    deck.seats = [];
    deck.owner = draft.seats[seatNum].userid;
    deck.cards = draft.cards;
    deck.basics = draft.basics;

    for (const card of draft.cards) {
      card.details = carddb.cardFromId(card.cardID);
    }
    let botNumber = 1;
    for (const seat of draft.seats) {
      // eslint-disable-next-line no-await-in-loop
      const { sideboard, deck: newDeck, colors } = await buildDeck({ cards: draft.cards, picked: seat.pickorder });
      const colorString =
        colors.length === 0 ? 'C' : COLOR_COMBINATIONS.find((comb) => arraysAreEqualSets(comb, colors)).join('');
      if (seat.bot) {
        deck.seats.push({
          bot: seat.bot,
          userid: seat.userid,
          username: `Bot ${botNumber}: ${colorString}`,
          name: `Draft of ${cube.name}`,
          description: '',
          deck: newDeck,
          sideboard,
        });
        botNumber += 1;
      } else {
        deck.seats.push({
          bot: seat.bot,
          userid: seat.userid,
          username: `${seat.name}: ${colorString}`,
          name: `Draft of ${cube.name}`,
          description: '',
          deck: seat.drafted,
          sideboard: seat.sideboard ? seat.sideboard : [],
        });
      }
    }
    rotateArrayLeft(deck.seats, seatNum);
    const deckQ = deck.save();
    const userq = User.findById(deck.seats[0].userid);
    const cubeOwnerq = User.findById(cube.owner);

    const [user, cubeOwner] = await Promise.all([userq, cubeOwnerq]);

    if (user && !cube.disableNotifications) {
      await addNotification(cubeOwner, user, `/deck/${deck._id}`, `${user.username} drafted your cube: ${cube.name}`);
    } else if (!cube.disableNotifications) {
      await addNotification(cubeOwner, {}, `/deck/${deck._id}`, `An anonymous user drafted your cube: ${cube.name}`);
    }
    const cubeUpdate = cube.numDecks ? { $inc: { numDecks: 1 } } : { $set: { numDecks: 1 } };
    Cube.updateOne({ _id: cube._id }, cubeUpdate);
    cubeOwner.save();
    await Promise.all([saveDraftAnalytics(draft, 0, carddb), deckQ]);
    addDeckCardAnalytics(cube, deck, carddb);
    return res.status(200).send({
      success: 'true',
      url: req.query.skipDeckbuilder ? `/deck/${deck._id}` : `/deck/${deck._id}/build`,
    });
  } catch (err) {
    req.logger.error(err);
    return res.status(500).send({
      success: 'false',
    });
  }
};

export const getDraftbotResponse = async (req, res) => {
  try {
    const draftid = req.params.id;
    const seatNumber = toNullableInt(req.params.seat) ?? 0;
    const pickNumber = toNullableInt(req.query.pickNumber) ?? -1;
    const draft = await Draft.findById(draftid).lean();
    for (const card of draft.cards) {
      card.details = carddb.cardFromId(card.cardID);
    }
    const drafterState = getDrafterState({ draft, seatNumber, pickNumber });

    const scores = await getDraftbotScores(
      convertDrafterState(drafterState),
      process.env.MTGML_SERVER,
      process.env.MTGML_AUTH_TOKEN,
      true,
    );
    return res.status(200).send(scores);
  } catch (err) {
    req.logger.warning(err);
    return res.status(500).send({
      success: 'false',
    });
  }
};

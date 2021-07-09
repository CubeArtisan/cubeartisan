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
import express from 'express';
import Cube from '@cubeartisan/server/models/cube.js';
import GridDraft from '@cubeartisan/server/models/gridDraft.js';
import { abbreviate, addDeckCardAnalytics, buildIdQuery } from '@cubeartisan/server/serverjs/cubefn.js';
import User from '@cubeartisan/server/models/user.js';
import CubeAnalytic from '@cubeartisan/server/models/cubeAnalytic.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import { render } from '@cubeartisan/server/serverjs/render.js';
import generateMeta from '@cubeartisan/server/serverjs/meta.js';
import Util, { getCubeDescription } from '@cubeartisan/client/utils/Util.js';
import { addNotification, handleRouteError, wrapAsyncApi } from '@cubeartisan/server/serverjs/util.js';
import { body } from 'express-validator';
import Deck from '@cubeartisan/server/models/deck.js';
import { buildDeck } from '@cubeartisan/client/drafting/deckutil.js';
import { COLOR_COMBINATIONS } from '@cubeartisan/client/utils/Card.js';

const getGridDraftPage = async (req, res) => {
  try {
    const draft = await GridDraft.findById(req.params.id).lean();
    if (!draft) {
      req.flash('danger', 'Draft not found');
      return res.redirect('/404');
    }

    const cube = await Cube.findOne(buildIdQuery(draft.cube)).lean();

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

    return render(
      req,
      res,
      'GridDraftPage',
      {
        cube,
        initialDraft: draft,
      },
      {
        title: `${abbreviate(cube.name)} - Grift Draft`,
        metadata: generateMeta(
          `${process.env.SITE_NAME} Grid Draft: ${cube.name}`,
          getCubeDescription(cube),
          cube.image_uri,
          `${process.env.SITE_ROOT}/cube/griddraft/${req.params.id}`,
        ),
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

const saveGridDraft = async (req, res) => {
  await GridDraft.updateOne(
    {
      _id: req.body._id,
    },
    req.body,
  );

  return res.status(200).send({
    success: 'true',
  });
};

const submitGridDraft = async (req, res) => {
  try {
    // req.body contains a draft
    const draftid = req.body.body;
    const draft = await GridDraft.findById(draftid).lean();
    const cube = await Cube.findOne(buildIdQuery(draft.cube));

    const deck = new Deck();
    deck.cube = draft.cube;
    deck.date = Date.now();
    deck.draft = draft._id;
    deck.cubename = cube.name;
    deck.seats = [];
    deck.cards = draft.cards;
    deck.basics = draft.basics;

    let eloOverrideDict = {};
    if (cube.useCubeElo) {
      const analytic = await CubeAnalytic.findOne({ cube: cube._id });
      eloOverrideDict = Object.fromEntries(analytic.cards.map((c) => [c.cardName, c.elo]));
    }
    const cards = draft.cards.map((c) => {
      const newCard = { ...c, details: carddb.cardFromId(c.cardID) };
      if (eloOverrideDict[newCard.details.name_lower]) {
        newCard.details.elo = eloOverrideDict[newCard.details.name_lower];
      }
      return newCard;
    });
    const botNumber = 1;
    for (const seat of draft.seats) {
      // eslint-disable-next-line no-await-in-loop
      const { sideboard, deck: newDeck, colors } = await buildDeck(cards, seat.pickorder, draft.basics);
      const colorString =
        colors.length > 0 ? 'C' : COLOR_COMBINATIONS.find((comb) => Util.arraysAreEqualSets(comb, colors)).join('');
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

    const userq = User.findById(deck.seats[0].userid);
    const cubeOwnerq = User.findById(cube.owner);

    const [user, cubeOwner] = await Promise.all([userq, cubeOwnerq]);

    if (user && !cube.disableNotifications) {
      await addNotification(
        cubeOwner,
        user,
        `/cube/deck/${deck._id}`,
        `${user.username} drafted your cube: ${cube.name}`,
      );
    }

    if (!cube.numDecks) {
      cube.numDecks = 0;
    }
    cube.numDecks += 1;
    await addDeckCardAnalytics(cube, deck, carddb);

    await Promise.all([cube.save(), deck.save(), cubeOwner.save()]);
    if (req.body.skipDeckbuilder) {
      return res.redirect(`/cube/deck/${deck._id}`);
    }
    return res.redirect(`/cube/deck/deckbuilder/${deck._id}`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/playtest/${encodeURIComponent(req.params.id)}`);
  }
};

const router = express.Router();
router.get('/:id', getGridDraftPage);
router.post('/:id', wrapAsyncApi(saveGridDraft));
router.post('/:id/submit', body('skipDeckbuilder').toBoolean(), submitGridDraft);
export default router;

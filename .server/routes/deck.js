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
import { arraysAreEqualSets, getCubeDescription } from '@cubeartisan/client/utils/Util.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import { buildDeck } from '@cubeartisan/client/drafting/deckutil.js';
import { render } from '@cubeartisan/server/serverjs/render.js';
import { addNotification, escapeXML } from '@cubeartisan/server/serverjs/util.js';
import generateMeta from '@cubeartisan/server/serverjs/meta.js';
import { ensureAuth, handleRouteError } from '@cubeartisan/server/routes/middleware.js';
import { abbreviate, addDeckCardAnalytics, removeDeckCardAnalytics } from '@cubeartisan/server/serverjs/cubefn.js';
import { exportToMtgo, createPool, rotateArrayLeft } from '@cubeartisan/server/routes/cube/helper.js';

import Cube from '@cubeartisan/server/models/cube.js';
import Deck from '@cubeartisan/server/models/deck.js';
import User from '@cubeartisan/server/models/user.js';
import CubeAnalytic from '@cubeartisan/server/models/cubeAnalytic.js';
import Draft from '@cubeartisan/server/models/draft.js';
import { COLOR_COMBINATIONS, cardName, cardNameLower } from '@cubeartisan/client/utils/Card.js';

export const exportDeckToXmage = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id).lean();

    if (!deck) {
      req.flash('danger', `Deck ID ${req.params.id} not found/`);
      return res.redirect('/404');
    }

    const seat = deck.seats[req.params.seat];

    res.setHeader('Content-disposition', `attachment; filename=${seat.name.replace(/\W/g, '')}.dck`);
    res.setHeader('Content-type', 'text/plain');
    res.charset = 'UTF-8';
    res.write(`NAME:${seat.name}\r\n`);
    const main = {};
    for (const row of seat.deck) {
      for (const col of row) {
        for (const cardIndex of col) {
          const details = carddb.cardFromId(deck.cards[cardIndex].cardID);
          const name = `[${details.set.toUpperCase()}:${details.collector_number}] ${
            deck.cards[cardIndex]?.name ?? details.name
          }`;
          if (main[name]) {
            main[name] += 1;
          } else {
            main[name] = 1;
          }
        }
      }
    }
    for (const [key, value] of Object.entries(main)) {
      res.write(`${value} ${key}\r\n`);
    }

    const side = {};
    for (const row of seat.sideboard) {
      for (const col of row) {
        for (const cardIndex of col) {
          const details = carddb.cardFromId(deck.cards[cardIndex].cardID);
          const name = `[${details.set.toUpperCase()}:${details.collector_number}] ${
            deck.cards[cardIndex]?.name ?? details.name
          }`;
          if (side[name]) {
            side[name] += 1;
          } else {
            side[name] = 1;
          }
        }
      }
    }
    for (const [key, value] of Object.entries(side)) {
      res.write(`SB: ${value} ${key}\r\n`);
    }
    return res.end();
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

export const exportDeckToForge = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id).lean();
    if (!deck) {
      req.flash('danger', `Deck ID ${req.params.id} not found/`);
      return res.redirect('/404');
    }
    const seat = deck.seats[req.params.seat];

    res.setHeader('Content-disposition', `attachment; filename=${seat.name.replace(/\W/g, '')}.dck`);
    res.setHeader('Content-type', 'text/plain');
    res.charset = 'UTF-8';
    res.write('[metadata]\r\n');
    res.write(`Name=${seat.name}\r\n`);
    res.write('[Main]\r\n');
    const main = {};
    for (const row of seat.deck) {
      for (const col of row) {
        for (const cardIndex of col) {
          const details = carddb.cardFromId(deck.cards[cardIndex].cardID);
          const name = `${deck.cards[cardIndex]?.name ?? details.name}|${details.set.toUpperCase()}`;
          if (main[name]) {
            main[name] += 1;
          } else {
            main[name] = 1;
          }
        }
      }
    }
    for (const [key, value] of Object.entries(main)) {
      res.write(`${value} ${key}\r\n`);
    }

    res.write('[Side]\r\n');
    const side = {};
    for (const row of seat.sideboard) {
      for (const col of row) {
        for (const cardIndex of col) {
          const details = carddb.cardFromId(deck.cards[cardIndex].cardID);
          const name = `${deck.cards[cardIndex]?.name ?? details.name}|${details.set.toUpperCase()}`;
          if (side[name]) {
            side[name] += 1;
          } else {
            side[name] = 1;
          }
        }
      }
    }
    for (const [key, value] of Object.entries(side)) {
      res.write(`${value} ${key}\r\n`);
    }

    return res.end();
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

export const exportDeckToPlaintext = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id).lean();
    if (!deck) {
      req.flash('danger', `Deck ID ${req.params.id} not found/`);
      return res.redirect('/404');
    }
    const seat = deck.seats[req.params.seat];

    res.setHeader('Content-disposition', `attachment; filename=${seat.name.replace(/\W/g, '')}.txt`);
    res.setHeader('Content-type', 'text/plain');
    res.charset = 'UTF-8';
    for (const row of seat.deck) {
      for (const col of row) {
        for (const cardIndex of col) {
          const { name } = carddb.cardFromId(deck.cards[cardIndex].cardID);
          res.write(`${name}\r\n`);
        }
      }
    }
    return res.end();
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

export const exportDeckToMtgo = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id).lean();
    if (!deck) {
      req.flash('danger', `Deck ID ${req.params.id} not found/`);
      return res.redirect('/404');
    }
    const seat = deck.seats[req.params.seat];
    return exportToMtgo(res, seat.name, seat.deck.flat(), seat.sideboard.flat(), deck.cards);
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

export const exportDeckToArena = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id).lean();
    if (!deck) {
      req.flash('danger', `Deck ID ${req.params.id} not found/`);
      return res.redirect('/404');
    }
    const seat = deck.seats[req.params.seat];

    res.setHeader('Content-disposition', `attachment; filename=${seat.name.replace(/\W/g, '')}.txt`);
    res.setHeader('Content-type', 'text/plain');
    res.charset = 'UTF-8';
    res.write('Deck\r\n');
    const main = {};
    for (const row of seat.deck) {
      for (const col of row) {
        for (const cardIndex of col) {
          const details = carddb.cardFromId(deck.cards[cardIndex].cardID);
          const name = `${deck.cards[cardIndex]?.name ?? details.name} (${details.set.toUpperCase()}) ${
            details.collector_number
          }`;
          if (main[name]) {
            main[name] += 1;
          } else {
            main[name] = 1;
          }
        }
      }
    }
    for (const [key, value] of Object.entries(main)) {
      res.write(`${value} ${key}\r\n`);
    }

    res.write('\r\nSideboard\r\n');
    const side = {};
    for (const row of seat.sideboard) {
      for (const col of row) {
        for (const cardIndex of col) {
          const details = carddb.cardFromId(deck.cards[cardIndex].cardID);
          const name = `${deck.cards[cardIndex]?.name ?? details.name} (${details.set.toUpperCase()}) ${
            details.collector_number
          }`;
          if (side[name]) {
            side[name] += 1;
          } else {
            side[name] = 1;
          }
        }
      }
    }
    for (const [key, value] of Object.entries(side)) {
      res.write(`${value} ${key}\r\n`);
    }

    return res.end();
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

export const exportDeckToCockatrice = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id).lean();
    if (!deck) {
      req.flash('danger', `Deck ID ${req.params.id} not found/`);
      return res.redirect('/404');
    }
    const seat = deck.seats[req.params.seat];

    res.setHeader('Content-disposition', `attachment; filename=${seat.name.replace(/\W/g, '')}.cod`);
    res.setHeader('Content-type', 'text/plain');
    res.charset = 'UTF-8';
    res.write('<?xml version="1.0" encoding="UTF-8"?>\n');
    res.write('<cockatrice_deck version="1">\n');
    res.write(`  <deckname>${seat.name}</deckname>\n`);
    res.write('  <zone name="main">\n');
    const main = {};
    for (const row of seat.deck) {
      for (const col of row) {
        for (const cardIndex of col) {
          const card = {
            ...deck.cards[cardIndex],
            details: carddb.cardFromId(deck.cards[cardIndex].cardID),
          };
          const name = cardName(card);
          if (main[name]) {
            main[name] += 1;
          } else {
            main[name] = 1;
          }
        }
      }
    }
    for (const [key, value] of Object.entries(main)) {
      res.write(`    <card number="${value}" name="${escapeXML(key)}"/>\n`);
    }
    res.write('  </zone>\n');
    res.write('  <zone name="side">\n');
    const side = {};
    for (const row of seat.sideboard) {
      for (const col of row) {
        for (const cardIndex of col) {
          const details = carddb.cardFromId(deck.cards[cardIndex].cardID);
          const name = `${deck.cards[cardIndex]?.name ?? details.name}`;
          if (side[name]) {
            side[name] += 1;
          } else {
            side[name] = 1;
          }
        }
      }
    }
    for (const [key, value] of Object.entries(side)) {
      res.write(`    <card number="${value}" name="${key}"/>\n`);
    }
    res.write('  </zone>\n');
    res.write('</cockatrice_deck>');
    return res.end();
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

const deleteDeckHandler = async (req, res) => {
  try {
    const query = {
      _id: req.params.id,
    };

    const deck = await Deck.findById(req.params.id);
    const deckOwner = (await User.findById(deck.seats[0].userid)) || {};

    if (!deckOwner._id.equals(req.user._id) && !deck.cubeOwner === req.user._id) {
      req.flash('danger', 'Unauthorized');
      return res.redirect('/404');
    }

    await Deck.deleteOne(query);

    req.flash('success', 'Deck Deleted');
    return res.send('Success');
  } catch (err) {
    return res.status(500).send({
      success: 'false',
      message: 'Error deleting deck.',
    });
  }
};
export const deleteDeck = [ensureAuth, deleteDeckHandler];

export const viewDeckbuilder = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id).lean();
    if (!deck) {
      req.flash('danger', 'Deck not found');
      return res.redirect('/404');
    }
    const deckOwner = await User.findById(deck.seats[0].userid).lean();
    if (!req.user || !deckOwner._id.equals(req.user._id)) {
      req.flash('danger', 'Only logged in deck owners can build decks.');
      return res.redirect(`/deck/${req.params.id}`);
    }

    const cube = await Cube.findOne(deck.cube, `${Cube.LAYOUT_FIELDS} basics useCubeElo`).lean();
    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }

    let eloOverrideDict = {};
    if (cube.useCubeElo) {
      const analytic = await CubeAnalytic.findOne({ cube: cube._id });
      eloOverrideDict = Object.fromEntries(analytic.cards.map((c) => [c.cardName, c.elo]));
    }

    // add details to cards
    for (const card of deck.cards) {
      card.details = carddb.cardFromId(card.cardID);
      if (eloOverrideDict[cardNameLower(card)]) {
        card.details.elo = eloOverrideDict[cardNameLower(card)];
      }
    }

    return await render(
      req,
      res,
      'CubeDeckbuilderPage',
      {
        cube,
        initialDeck: deck,
      },
      {
        title: `${abbreviate(cube.name)} - Deckbuilder`,
        metadata: generateMeta(
          `${process.env.SITE_NAME} Draft: ${cube.name}`,
          getCubeDescription(cube),
          cube.image_uri,
          `${process.env.SITE_ROOT}/deck/${req.params.id}/build`,
        ),
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

export const rebuildDeckHandler = async (req, res) => {
  try {
    const index = parseInt(req.params.index, 10);
    const base = await Deck.findById(req.params.id).lean();

    if (!base) {
      req.flash('danger', 'Deck not found');
      return res.redirect('/404');
    }
    const cube = await Cube.findById(base.cube);
    let eloOverrideDict = {};
    if (cube.useCubeElo) {
      const analytic = await CubeAnalytic.findOne({ cube: cube._id });
      eloOverrideDict = Object.fromEntries(analytic.cards.map((c) => [c.cardName, c.elo]));
    }

    const cardsArray = [];
    for (const card of base.cards) {
      const newCard = { ...card, details: carddb.cardFromId(card.cardID) };
      if (eloOverrideDict[cardNameLower(newCard)]) {
        newCard.details.elo = eloOverrideDict[cardNameLower(newCard)];
      }
      cardsArray.push(newCard);
    }

    const deck = new Deck();
    deck.cube = base.cube;
    deck.cubeOwner = base.owner;
    deck.date = Date.now();
    deck.cubename = cube.name;
    deck.draft = base.draft;
    deck.seats = [];
    deck.owner = req.user._id;
    deck.cards = base.cards;
    deck.basics = base.basics;

    deck.seats.push({
      bot: null,
      userid: req.user._id,
      username: base.seats[index].username,
      name: `${req.user.username}'s rebuild from ${cube.name} on ${deck.date.toLocaleString('en-US')}`,
      description: 'This deck was rebuilt from another draft deck.',
      deck: base.seats[index].deck,
      sideboard: base.seats[index].sideboard,
    });
    for (let i = 0; i < base.seats.length; i++) {
      if (i !== index) {
        deck.seats.push({
          userid: null,
          username: base.seats[i].username,
          name: `Draft of ${cube.name}`,
          description: base.seats[i].description,
          deck: base.seats[i].deck,
          sideboard: base.seats[i].sideboard,
        });
      }
    }

    cube.numDecks += 1;
    await addDeckCardAnalytics(cube, deck, carddb);

    const userq = User.findById(req.user._id);
    const baseuserq = User.findById(base.owner);
    const cubeOwnerq = User.findById(cube.owner);

    const [user, cubeOwner, baseUser] = await Promise.all([userq, cubeOwnerq, baseuserq]);

    if (!cubeOwner._id.equals(user._id) && !cube.disableNotifications) {
      await addNotification(
        cubeOwner,
        user,
        `/deck/${deck._id}`,
        `${user.username} rebuilt a deck from your cube: ${cube.name}`,
      );
    }
    if (baseUser && !baseUser._id.equals(user._id)) {
      await addNotification(
        baseUser,
        user,
        `/deck/${deck._id}`,
        `${user.username} rebuilt your deck from cube: ${cube.name}`,
      );
    }

    await Promise.all([cube.save(), deck.save()]);

    return res.redirect(`/deck/${deck._id}/build`);
  } catch (err) {
    return handleRouteError(req, res, err, `/404`);
  }
};
export const rebuildDeck = [ensureAuth, rebuildDeckHandler];

const updateDeckHandler = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    const deckOwner = await User.findById(deck.seats[0].userid);

    if (!deckOwner || !deckOwner._id.equals(req.user._id)) {
      req.flash('danger', 'Unauthorized');
      return res.redirect('/404');
    }

    const cube = await Cube.findOne({ _id: deck.cube });

    await removeDeckCardAnalytics(cube, deck, carddb);

    const newdeck = JSON.parse(req.body.draftraw);
    const name = JSON.parse(req.body.name);
    const description = JSON.parse(req.body.description);

    let eloOverrideDict = {};
    if (cube.useCubeElo) {
      const analytic = await CubeAnalytic.findOne({ cube: cube._id });
      eloOverrideDict = Object.fromEntries(analytic.cards.map((c) => [c.cardName, c.elo]));
    }
    const cardsArray = [];
    for (const card of deck.toObject().cards) {
      const newCard = { ...card, details: carddb.cardFromId(card.cardID) };
      if (eloOverrideDict[cardNameLower(newCard)]) {
        newCard.details.elo = eloOverrideDict[cardNameLower(newCard)];
      }
      cardsArray.push(newCard);
    }
    const { colors } = await buildDeck({ cards: cardsArray, picked: deck.toObject().seats[0].deck.flat(3) });
    const colorString =
      colors.length === 0 ? 'C' : COLOR_COMBINATIONS.find((comb) => arraysAreEqualSets(comb, colors)).join('');

    deck.seats[0].deck = newdeck.playerdeck;
    deck.seats[0].sideboard = newdeck.playersideboard;
    deck.seats[0].name = name;
    deck.seats[0].description = description;
    deck.seats[0].username = `${deckOwner.username}: ${colorString}`;

    await deck.save();
    await addDeckCardAnalytics(cube, deck, carddb);
    await cube.save();

    req.flash('success', 'Deck saved successfully');
    return res.redirect(`/deck/${deck._id}`);
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};
export const updateDeck = [ensureAuth, updateDeckHandler];

export const redraftDeck = async (req, res) => {
  try {
    const base = await Deck.findById(req.params.id).lean();
    if (!(base && base.draft)) {
      req.flash('danger', 'Deck not found');
      return res.redirect('/404');
    }

    const seat = parseInt(req.params.seat, 10);
    if (!Number.isInteger(seat) || seat < 0 || seat >= base.seats.length) {
      req.flash('dangeer', 'Invalid seat index to redraft as.');
      return res.redirect(`/deck/${req.params.id}`);
    }

    // TODO: Handle gridDraft
    const srcDraft = await Draft.findById(base.draft).lean();
    if (!srcDraft) {
      req.flash('danger', 'This deck is not able to be redrafted.');
      return res.redirect(`/deck/${req.params.id}`);
    }

    const cube = await Cube.findById(srcDraft.cube);
    if (!cube) {
      req.flash('danger', 'The cube that this deck belongs to no longer exists.');
      return res.redirect(`/deck/${req.params.id}`);
    }

    const draft = new Draft();
    draft.cube = srcDraft.cube;
    draft.seats = srcDraft.seats.slice();
    rotateArrayLeft(draft.seats, seat);
    draft.cards = srcDraft.cards;
    draft.basics = srcDraft.basics;
    draft.initial_state = srcDraft.initial_state.slice();

    for (let i = 0; i < draft.seats.length; i += 1) {
      draft.seats[i].drafted = createPool();
      draft.seats[i].sideboard = createPool();
      draft.seats[i].pickorder = [];
    }
    draft.seats[0].userid = req.user ? req.user._id : null;
    draft.seats[0].name = req.user ? req.user.username : 'Anonymous';

    await draft.save();
    return res.redirect(`/draft/${draft._id}`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}/playtest`);
  }
};

export const viewDeck = async (req, res) => {
  try {
    if (!req.params.id || req.params.id === 'null' || req.params.id === 'false') {
      req.flash('danger', 'Invalid deck ID.');
      return res.redirect('/404');
    }

    const deck = await Deck.findById(req.params.id).lean();

    if (!deck) {
      req.flash('danger', 'Deck not found');
      return res.redirect('/404');
    }

    const cube = await Cube.findOne(deck.cube, Cube.LAYOUT_FIELDS).lean();
    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }
    let eloOverrideDict = {};
    if (cube.useCubeElo) {
      const analytic = await CubeAnalytic.findOne({ cube: cube._id });
      eloOverrideDict = Object.fromEntries(analytic.cards.map((c) => [c.cardName, c.elo]));
    }

    for (const card of deck.cards) {
      card.details = carddb.cardFromId(card.cardID);
      if (eloOverrideDict[cardNameLower(card)]) {
        card.details.elo = eloOverrideDict[cardNameLower(card)];
      }
    }

    let draft = null;
    if (deck.draft) {
      draft = await Draft.findById(deck.draft).lean();
      if (draft && draft.cards) {
        for (const card of draft.cards) {
          card.details = carddb.cardFromId(card.cardID);
          if (eloOverrideDict[cardNameLower(card)]) {
            card.details.elo = eloOverrideDict[cardNameLower(card)];
          }
        }
      }
    }

    let drafter = 'Anonymous';

    const deckUser = await User.findById(deck.owner);

    if (deckUser) {
      drafter = deckUser.username;
    }

    return await render(
      req,
      res,
      'CubeDeckPage',
      {
        cube,
        deck,
        draft,
      },
      {
        title: `${abbreviate(cube.name)} - ${drafter}'s deck`,
        metadata: generateMeta(
          `${process.env.SITE_NAME} Deck: ${cube.name}`,
          getCubeDescription(cube),
          cube.image_uri,
          `${process.env.SITE_ROOT}/cube/deck/${req.params.id}`,
        ),
      },
    );
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

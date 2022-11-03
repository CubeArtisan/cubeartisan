import { sortForDownload } from '@cubeartisan/client/utils/Sort.js';
import { makeFilter } from '@cubeartisan/client/filtering/FilterCards.js';
import carddb from '@cubeartisan/server/serverjs/cards.js';
import { handleRouteError } from '@cubeartisan/server/routes/middleware.js';
import { buildIdQuery } from '@cubeartisan/server/serverjs/cubefn.js';
import { writeCard, CSV_HEADER, exportToMtgo } from '@cubeartisan/server/routes/cube/helper.js';
import Cube from '@cubeartisan/server/models/cube.js';
import { cardName } from '@cubeartisan/client/utils/Card.js';

export const sortCardsByQuery = (req, cards) => {
  if (req.query.filter) {
    const { filter, err } = makeFilter(req.query.filter);
    if (err) {
      throw err;
    }
    if (filter) {
      cards = cards.filter(filter);
    }
  }

  return sortForDownload(
    cards,
    req.query.primary,
    req.query.secondary,
    req.query.tertiary,
    req.query.quaternary,
    req.query.showother,
  );
};

export const exportCubeToJson = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();

    if (!cube) {
      return res.status(404).send('Cube not found.');
    }

    res.contentType('application/json');
    return res.status(200).send(JSON.stringify(cube));
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}/list`);
  }
};

export const exportCubeToCubeCobra = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();
    if (!cube) {
      req.flash('danger', `Cube ID ${req.params.id} not found/`);
      return res.redirect('/404');
    }

    for (const card of cube.cards) {
      const details = carddb.cardFromId(card.cardID);
      card.details = details;
    }

    cube.cards = sortCardsByQuery(req, cube.cards);

    res.setHeader('Content-disposition', `attachment; filename=${cube.name.replace(/\W/g, '')}.txt`);
    res.setHeader('Content-type', 'text/plain');
    res.charset = 'UTF-8';
    for (const card of cube.cards) {
      res.write(`${card.details.full_name}\n`);
    }
    return res.end();
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}/list`);
  }
};

export const exportCubeToCsv = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();

    if (!cube) {
      req.flash('danger', `Cube ID ${req.params.id} not found/`);
      return res.redirect('/404');
    }

    for (const card of cube.cards) {
      const details = carddb.cardFromId(card.cardID);
      card.details = details;
    }

    cube.cards = sortCardsByQuery(req, cube.cards);

    res.setHeader('Content-disposition', `attachment; filename=${cube.name.replace(/\W/g, '')}.csv`);
    res.setHeader('Content-type', 'text/plain');
    res.charset = 'UTF-8';
    res.write(`${CSV_HEADER}\n`);

    for (const card of cube.cards) {
      writeCard(res, card, false);
    }
    if (Array.isArray(cube.maybe)) {
      for (const card of cube.maybe) {
        writeCard(res, card, true);
      }
    }
    return res.end();
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}/list`);
  }
};

export const exportCubeToForge = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();
    if (!cube) {
      req.flash('danger', `Cube ID ${req.params.id} not found`);
      return res.redirect('/404');
    }

    for (const card of cube.cards) {
      const details = carddb.cardFromId(card.cardID);
      card.details = details;
    }

    cube.cards = sortCardsByQuery(req, cube.cards);

    res.setHeader('Content-disposition', `attachment; filename=${cube.name.replace(/\W/g, '')}.dck`);
    res.setHeader('Content-type', 'text/plain');
    res.charset = 'UTF-8';
    res.write('[metadata]\n');
    res.write(`Name=${cube.name}\n`);
    res.write('[Main]\n');
    for (const card of cube.cards) {
      res.write(`1 ${cardName(card)}|${card.details.set.toUpperCase()}\n`);
    }
    return res.end();
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}/list`);
  }
};

export const exportCubeToMtgo = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();
    if (!cube) {
      req.flash('danger', `Cube ID ${req.params.id} not found/`);
      return res.redirect('/404');
    }

    for (const card of cube.cards) {
      const details = carddb.cardFromId(card.cardID);
      card.details = details;
    }

    cube.cards = sortCardsByQuery(req, cube.cards);

    return exportToMtgo(res, cube.name, cube.cards, cube.maybe);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}/list`);
  }
};

export const exportCubeToXmage = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();
    if (!cube) {
      req.flash('danger', `Cube ID ${req.params.id} not found/`);
      return res.redirect('/404');
    }

    for (const card of cube.cards) {
      const details = carddb.cardFromId(card.cardID);
      card.details = details;
    }

    cube.cards = sortCardsByQuery(req, cube.cards);

    res.setHeader('Content-disposition', `attachment; filename=${cube.name.replace(/\W/g, '')}.dck`);
    res.setHeader('Content-type', 'text/plain');
    res.charset = 'UTF-8';
    for (const card of cube.cards) {
      res.write(`1 [${card.details.set.toUpperCase()}:${card.details.collector_number}] ${cardName(card)}\n`);
    }
    return res.end();
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}/list`);
  }
};

export const exportCubeToPlaintext = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();
    if (!cube) {
      req.flash('danger', `Cube ID ${req.params.id} not found/`);
      return res.redirect('/404');
    }

    for (const card of cube.cards) {
      const details = carddb.cardFromId(card.cardID);
      card.details = details;
    }

    cube.cards = sortCardsByQuery(req, cube.cards);

    res.charset = 'UTF-8';
    res.setHeader('Content-disposition', `attachment; filename=${cube.name.replace(/\W/g, '')}.txt`);
    res.type('text/plain');
    for (const card of cube.cards) {
      res.write(`${cardName(card)}\n`);
    }
    return res.end();
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}/list`);
  }
};

export const exportCubeToPlaintextLower = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();
    if (!cube) {
      req.flash('danger', `Cube ID ${req.params.id} not found/`);
      return res.redirect('/404');
    }

    for (const card of cube.cards) {
      const details = carddb.cardFromId(card.cardID);
      card.details = details;
    }

    cube.cards = sortCardsByQuery(req, cube.cards);

    res.charset = 'UTF-8';
    res.setHeader('Content-disposition', `attachment; filename=${cube.name.replace(/\W/g, '')}.txt`);
    res.set('Access-Control-Allow-Origin', '*');
    res.type('text/plain');
    for (const card of cube.cards) {
      res.write(`${cardName(card)}\n`);
    }
    return res.end();
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}/list`);
  }
};

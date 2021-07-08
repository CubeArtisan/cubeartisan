import { Canvas, Image } from 'canvas';
import { sortForDownload } from '@cubeartisan/client/utils/Sort';
import { makeFilter } from '@cubeartisan/client/filtering/FilterCards';
import carddb from '@cubeartisan/server/serverjs/cards';
import { handleRouteError } from '@cubeartisan/server/serverjs/util';
import { buildIdQuery } from '@cubeartisan/server/serverjs/cubefn';
import { writeCard, CSV_HEADER, exportToMtgo } from '@cubeartisan/server/routes/cube/helper';
import Cube from '@cubeartisan/server/models/cube';

Canvas.Image = Image;

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

export const exportToJson = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();

  if (!cube) {
    return res.status(404).send('Cube not found.');
  }

  res.contentType('application/json');
  return res.status(200).send(JSON.stringify(cube));
};

export const exportToCubeCobra = async (req, res) => {
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
    return handleRouteError(req, res, err, '/404');
  }
};

export const exportToCsv = async (req, res) => {
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
    return handleRouteError(req, res, err, '/404');
  }
};

export const exportToForge = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();
    req.logger.info(JSON.stringify(req.params));
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
      res.write(`1 ${card.details.name}|${card.details.set.toUpperCase()}\n`);
    }
    return res.end();
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

export const exportForMtgo = async (req, res) => {
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
    return handleRouteError(req, res, err, '/404');
  }
};

export const exportToXmage = async (req, res) => {
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
      res.write(`1 [${card.details.set.toUpperCase()}:${card.details.collector_number}] ${card.details.name}\n`);
    }
    return res.end();
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

export const exportToPlaintext = async (req, res) => {
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
      res.write(`${card.details.name}\n`);
    }
    return res.end();
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

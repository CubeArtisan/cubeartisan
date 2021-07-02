import express from 'express';
// eslint-disable-next-line import/no-unresolved
import { Canvas, Image } from 'canvas';
import sortutil from '@hypercube/client/utils/Sort';
import filterutil from '@hypercube/client/filtering/FilterCards';
import carddb from '@hypercube/server/serverjs/cards';
import { handleRouteError, wrapAsyncApi } from '@hypercube/server/serverjs/util';
import { buildIdQuery } from '@hypercube/server/serverjs/cubefn';
import { writeCard, CSV_HEADER, exportToMtgo } from '@hypercube/server/routes/cube/helper';
import Cube from '@hypercube/server/models/cube';

Canvas.Image = Image;

const sortCardsByQuery = (req, cards) => {
  if (req.query.filter) {
    const { filter, err } = filterutil.makeFilter(req.query.filter);
    if (err) {
      throw err;
    }
    if (filter) {
      cards = cards.filter(filter);
    }
  }

  return sortutil.sortForDownload(
    cards,
    req.query.primary,
    req.query.secondary,
    req.query.tertiary,
    req.query.quaternary,
    req.query.showother,
  );
};

const exportToJson = async (req, res) => {
  const cube = await Cube.findOne(buildIdQuery(req.params.id)).lean();

  if (!cube) {
    return res.status(404).send('Cube not found.');
  }

  res.contentType('application/json');
  return res.status(200).send(JSON.stringify(cube));
};

const exportToCubeCobra = async (req, res) => {
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

const exportToCsv = async (req, res) => {
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

const exportToForge = async (req, res) => {
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

const exportForMtgo = async (req, res) => {
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

const exportToXmage = async (req, res) => {
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

const exportToPlaintext = async (req, res) => {
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
      res.write(`${card.details.name}\n`);
    }
    return res.end();
  } catch (err) {
    return handleRouteError(req, res, err, '/404');
  }
};

const router = express.Router();
router.get('/json', wrapAsyncApi(exportToJson));
router.get('/cubecobra', exportToCubeCobra);
router.get('/csv', exportToCsv);
router.get('/forge', exportToForge);
router.get('/mtgo', exportForMtgo);
router.get('/xmage', exportToXmage);
router.get('/plaintext', exportToPlaintext);
export default router;

import { body } from 'express-validator';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

import carddb from '@cubeartisan/server/serverjs/cards.js';
import { addCardToCube } from '@cubeartisan/server/serverjs/util.js';
import { bulkUpload, updateCubeAndBlog } from '@cubeartisan/server/routes/cube/helper.js';
import Cube from '@cubeartisan/server/models/cube.js';
import { buildIdQuery, compareCubes, CSVtoCards } from '@cubeartisan/server/serverjs/cubefn.js';
import { addCardMarkdown, removeCardMarkdown } from '@cubeartisan/markdown';
import { ensureAuth, flashValidationErrors, handleRouteError } from '@cubeartisan/server/routes/middleware.js';

export const importFromCubeTutorHandler = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id));
    if (!req.user._id.equals(cube.owner)) {
      req.flash('danger', 'Not Authorized');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/list`);
    }

    const response = await fetch(`https://www.cubetutor.com/viewcube/${req.body.cubeid}`, {
      headers: {
        // This tricks cubetutor into not redirecting us to the unsupported browser page.
        'User-Agent': 'Mozilla/5.0',
      },
    });
    if (!response.ok) {
      req.flash('danger', 'Error accessing CubeTutor.');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/list`);
    }
    const text = await response.text();
    const data = cheerio.load(text);

    const tagColors = new Map();
    data('.keyColour').each((_, elem) => {
      const nodeText = elem.firstChild.nodeValue.trim();
      tagColors.set(elem.attribs.class.split(' ')[1], nodeText);
    });

    const cards = [];
    data('.cardPreview').each((_, elem) => {
      const str = elem.attribs['data-image'].substring(37, elem.attribs['data-image'].length - 4);
      const name = decodeURIComponent(elem.children[0].data).replace('_flip', '');
      const tagColorClasses = elem.attribs.class.split(' ').filter((c) => tagColors.has(c));
      const tags = tagColorClasses.map((c) => tagColors.get(c));
      cards.push({
        set: str.includes('/') ? str.split('/')[0] : 'unknown',
        name,
        tags,
      });
    });

    const added = [];
    const missing = [];
    const changelog = [];
    for (const card of cards) {
      const potentialIds = carddb.allVersions(card);
      if (potentialIds && potentialIds.length > 0) {
        const matchingSet = potentialIds.find((id) => carddb.cardFromId(id).set.toUpperCase() === card.set);
        const nonPromo = carddb.getMostReasonable(card.name, cube.defaultPrinting)._id;
        const selected = matchingSet || nonPromo || potentialIds[0];
        const details = carddb.cardFromId(selected);
        if (!details.error) {
          added.push(details);
          addCardToCube(cube, details, card.tags);
          changelog.push(addCardMarkdown({ cardID: selected, name: details.name }));
        } else {
          missing.push(card.name);
        }
      } else {
        missing.push(card.name);
      }
    }

    return await updateCubeAndBlog(req, res, cube, changelog, added, missing);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${encodeURIComponent(req.params.id)}/list`);
  }
};
export const importFromCubeTutor = [
  ensureAuth,
  body('cubeid').toInt(),
  flashValidationErrors,
  importFromCubeTutorHandler,
];

const importFromPasteHandler = async (req, res) => {
  try {
    const cube = await Cube.findOne(buildIdQuery(req.params.id));
    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }
    if (!req.user._id.equals(cube.owner)) {
      req.flash('danger', 'Not Authorized');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/list`);
    }

    await bulkUpload(req, res, req.body.body, cube);
    return null;
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}/list`);
  }
};
export const importFromPaste = [ensureAuth, importFromPasteHandler];

const importFromFileHandler = async (req, res) => {
  try {
    if (!req.files) {
      req.flash('danger', 'Please attach a file');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/list`);
    }

    const items = req.files.document.data.toString('utf8'); // the uploaded file object

    const cube = await Cube.findOne(buildIdQuery(req.params.id));
    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }
    if (!req.user._id.equals(cube.owner)) {
      req.flash('danger', 'Not Authorized');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/list`);
    }

    await bulkUpload(req, res, items, cube);
    return null;
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${encodeURIComponent(req.params.id)}/list`);
  }
};
export const importFromFile = [ensureAuth, importFromFileHandler];

export const replaceFromFileHandler = async (req, res) => {
  try {
    if (!req.files) {
      req.flash('danger', 'Please attach a file');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/list`);
    }
    const items = req.files.document.data.toString('utf8'); // the uploaded file object
    const cube = await Cube.findOne(buildIdQuery(req.params.id));
    // We need a copy of cards we can mutate to be able to populate details for the comparison.
    const { cards } = await Cube.findOne(buildIdQuery(req.params.id), 'cards').lean();
    if (!cube) {
      req.flash('danger', 'Cube not found');
      return res.redirect('/404');
    }
    if (!req.user._id.equals(cube.owner)) {
      req.flash('danger', 'Not Authorized');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/list`);
    }
    const lines = items.match(/[^\r\n]+/g);
    if (lines) {
      const changelog = [];
      let missing = [];
      const added = [];
      let newCards = [];
      let newMaybe = [];
      if ((lines[0].match(/,/g) || []).length > 3) {
        ({ newCards, newMaybe, missing } = CSVtoCards(items, carddb));
        cube.cards = newCards;
        cube.maybe = newMaybe;
        const addDetails = (cardList) =>
          cardList.map((card, index) => {
            card = {
              ...card,
              details: {
                ...carddb.cardFromId(card.cardID),
              },
              index,
            };
            if (!card.type_line) {
              card.type_line = card.details.type;
            }
            return card;
          });

        const cubeCards = addDetails(cards);
        const newDetails = addDetails(newCards);

        const { onlyA, onlyB } = await compareCubes(cubeCards, newDetails);
        changelog.push(
          ...onlyA.map(({ cardID }) => removeCardMarkdown({ cardID, name: carddb.cardFromId(cardID).name })),
        );
        changelog.push(...onlyB.map(({ cardID }) => addCardMarkdown({ cardID, name: carddb.cardFromId(cardID).name })));
        added.push(...onlyB);
      } else {
        // Eventually add plaintext support here.
        throw new Error('Invalid file format');
      }
      await updateCubeAndBlog(req, res, cube, changelog, added, missing);
      return null;
    }
    throw new Error('Received empty file');
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${req.params.id}/list`);
  }
};
export const replaceFromFile = [ensureAuth, replaceFromFileHandler];

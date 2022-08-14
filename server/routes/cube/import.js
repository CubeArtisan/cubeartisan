import carddb from '@cubeartisan/server/serverjs/cards.js';
import { bulkUpload, updateCubeAndBlog } from '@cubeartisan/server/routes/cube/helper.js';
import Cube from '@cubeartisan/server/models/cube.js';
import { buildIdQuery, compareCubes, CSVtoCards } from '@cubeartisan/server/serverjs/cubefn.js';
import { addCardMarkdown, removeCardMarkdown } from '@cubeartisan/markdown';
import { ensureAuth, handleRouteError } from '@cubeartisan/server/routes/middleware.js';

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

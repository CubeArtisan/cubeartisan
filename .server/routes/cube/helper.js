import carddb from '@cubeartisan/server/serverjs/cards.js';
import { render } from '@cubeartisan/server/serverjs/render.js';
import { addCardToCube } from '@cubeartisan/server/serverjs/util.js';
import { handleRouteError } from '@cubeartisan/server/routes/middleware.js';
import { setCubeType, CSVtoCards } from '@cubeartisan/server/serverjs/cubefn.js';
import Cube from '@cubeartisan/server/models/cube.js';
import Blog from '@cubeartisan/server/models/blog.js';
import { addCardMarkdown } from '@cubeartisan/markdown';

export const DEFAULT_BASICS = [
  '1d7dba1c-a702-43c0-8fca-e47bbad4a00f',
  '42232ea6-e31d-46a6-9f94-b2ad2416d79b',
  '19e71532-3f79-4fec-974f-b0e85c7fe701',
  '8365ab45-6d78-47ad-a6ed-282069b0fabc',
  '0c4eaecf-dd4c-45ab-9b50-2abe987d35d4',
];

export const CARD_HEIGHT = 680;
export const CARD_WIDTH = 488;
export const CSV_HEADER =
  'Name,Override Name,CMC,Type,Color,Set,Collector Number,Rarity,Color Category,Status,Finish,Maybeboard,Image URL,Image Back URL,Tags,Notes,MTGO ID';

export const updateCubeAndBlog = async (req, res, cube, changelog, added, missing) => {
  try {
    const blogpost = new Blog();
    blogpost.title = 'Cube Bulk Import - Automatic Post';
    blogpost.owner = cube.owner;
    blogpost.date = Date.now();
    blogpost.cube = cube._id;
    blogpost.dev = 'false';
    blogpost.date_formatted = blogpost.date.toLocaleString('en-US');
    blogpost.username = cube.owner_name;
    blogpost.cubename = cube.name;
    blogpost.markdown = changelog.join('\n\n');

    if (missing.length > 0) {
      return await render(req, res, 'BulkUploadPage', {
        cube,
        canEdit: true,
        cubeID: req.params.id,
        missing,
        added: added.map(({ _id, name, image_normal, image_flip }) => ({
          _id,
          name,
          image_normal,
          image_flip,
        })),
        blogpost: blogpost.toObject(),
      });
    }
    await blogpost.save();
    cube = setCubeType(cube, carddb);
    try {
      await Cube.updateOne(
        {
          _id: cube._id,
        },
        cube,
      );
    } catch (err) {
      req.logger.error(err);
      req.flash('danger', 'Error adding cards. Please try again.');
      return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/list`);
    }
    req.flash('success', 'All cards successfully added.');
    return res.redirect(`/cube/${encodeURIComponent(req.params.id)}/list`);
  } catch (err) {
    return handleRouteError(req, res, err, `/cube/${encodeURIComponent(req.params.id)}/list`);
  }
};

export const bulkUpload = async (req, res, list, cube) => {
  const lines = list.match(/[^\r\n]+/g);
  let missing = [];
  const added = [];
  const changelog = [];
  if (lines) {
    if ((lines[0].match(/,/g) || []).length > 3) {
      let newCards;
      let newMaybe;
      ({ newCards, newMaybe, missing } = CSVtoCards(list, carddb));
      changelog.push(
        ...newCards.map(({ cardID }) => addCardMarkdown({ cardID, name: carddb.cardFromId(cardID).name })),
      );
      cube.cards.push(...newCards);
      cube.maybe.push(...newMaybe);
      added.concat(newCards, newMaybe);
    } else {
      // Upload is in plaintext format
      for (const itemUntrimmed of lines) {
        const item = itemUntrimmed.trim();
        // separate counts and sets from the name
        //                              |    count?   |name|     (set)?         c.num? |
        const splitLine = item.match(/^(?:([0-9]+)x? )?(.*?)(?: \(([^)(]+)\)(?: (\S+))?)?$/);
        const name = splitLine[2];
        const set = splitLine[3];
        const collectorNum = splitLine[4];
        let count = parseInt(splitLine[1], 10);
        if (!Number.isInteger(count)) {
          count = 1;
        }

        let selectedId;
        if (set) {
          const potentialIds = carddb.getIdsFromName(name);
          if (potentialIds && potentialIds.length > 0) {
            const matchingItem = potentialIds.find((id) => {
              const card = carddb.cardFromId(id);
              return (
                card.set.toLowerCase() === set.toLowerCase() &&
                (!collectorNum || card.collector_number === collectorNum)
              );
            });
            // if no sets match, just take the first ID ¯\_(ツ)_/¯
            selectedId = matchingItem || potentialIds[0];
          }
        } else {
          const selectedCard = carddb.getMostReasonable(name, cube.defaultPrinting);
          selectedId = selectedCard ? selectedCard._id : null;
        }

        if (selectedId) {
          const details = carddb.cardFromId(selectedId);
          if (!details.error) {
            for (let i = 0; i < count; i++) {
              addCardToCube(cube, details);
              added.push(details);
              changelog.push(addCardMarkdown({ cardID: selectedId, name: details.name }));
            }
          }
        } else {
          missing.push(item);
        }
      }
    }
  }
  await updateCubeAndBlog(req, res, cube, changelog, added, missing);
};

export const writeCard = (res, card, maybe) => {
  if (!card.type_line) {
    card.type_line = carddb.cardFromId(card.cardID).type;
  }
  const { name, rarity, colorcategory } = carddb.cardFromId(card.cardID);
  let { imgUrl, imgBackUrl } = card;
  if (imgUrl) {
    imgUrl = `"${imgUrl}"`;
  } else {
    imgUrl = '';
  }
  if (imgBackUrl) {
    imgBackUrl = `"${imgBackUrl}"`;
  } else {
    imgBackUrl = '';
  }
  res.write(`"${name.replace(/"/g, '""')}",`);
  res.write(`"${card.name.replace(/"/g, '""')}",`);
  res.write(`${card.cmc},`);
  res.write(`"${card.type_line.replace('—', '-')}",`);
  res.write(`${(card.colors || []).join('')},`);
  res.write(`"${carddb.cardFromId(card.cardID).set}",`);
  res.write(`"${carddb.cardFromId(card.cardID).collector_number}",`);
  res.write(`${card.rarity && card.rarity !== 'undefined' ? card.rarity : rarity},`);
  res.write(`${card.colorCategory || colorcategory},`);
  res.write(`${card.status},`);
  res.write(`${card.finish},`);
  res.write(`${maybe},`);
  res.write(`${imgUrl},`);
  res.write(`${imgBackUrl},"`);
  card.tags.forEach((tag, tagIndex) => {
    if (tagIndex !== 0) {
      res.write(';');
    }
    res.write(tag);
  });
  res.write(`","${card.notes || ''}",`);
  res.write(`${carddb.cardFromId(card.cardID).mtgo_id || ''}`);
  res.write('\n');
};

export const exportToMtgo = (res, fileName, mainCards, sideCards, cards) => {
  res.charset = 'UTF-8';
  res.setHeader('Content-disposition', `attachment; filename=${fileName.replace(/\W/g, '')}.txt`);
  res.setHeader('Content-type', 'text/plain');
  const main = {};
  for (const cardIndex of mainCards.flat()) {
    const cardID = cardIndex.cardID ?? cards?.[cardIndex]?.cardID;
    const name = carddb.cardFromId(cardID)?.name ?? 'Unknown Card';
    if (main[name]) {
      main[name] += 1;
    } else {
      main[name] = 1;
    }
  }
  for (const [key, value] of Object.entries(main)) {
    const name = key.replace(' // ', '/');
    res.write(`${value} ${name}\n`);
  }
  res.write('\n\n');

  const side = {};
  for (const cardIndex of sideCards.flat()) {
    const { name } = carddb.cardFromId(cards[cardIndex].cardID);
    if (side[name]) {
      side[name] += 1;
    } else {
      side[name] = 1;
    }
  }
  for (const [key, value] of Object.entries(side)) {
    const name = key.replace(' // ', '/');
    res.write(`${value} ${name}\n`);
  }
  return res.end();
};

export const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const addBasics = (cardsArray, basics, collection = null) => {
  const populatedBasics = basics.map((cardID) => {
    const details = carddb.cardFromId(cardID);
    const populatedCard = {
      cardID: details._id,
      index: cardsArray.length,
      isUnlimited: true,
      type_line: details.type,
    };
    cardsArray.push(populatedCard);
    return populatedCard;
  });
  if (collection) collection.basics = populatedBasics.map(({ index }) => index);
};

export const createPool = () => {
  const pool = [];
  for (let i = 0; i < 2; i++) {
    pool.push([]);
    for (let j = 0; j < 8; j++) {
      pool[i].push([]);
    }
  }
  return pool;
};

export const reverseArray = (arr, start, end) => {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start += 1;
    end -= 1;
  }
};

export const rotateArrayRight = (arr, k) => {
  k %= arr.length;
  reverseArray(arr, 0, arr.length - 1);
  reverseArray(arr, 0, k - 1);
  reverseArray(arr, k, arr.length - 1);

  return arr;
};

export const rotateArrayLeft = (arr, k) => rotateArrayRight(arr, arr.length - (k % arr.length));

export default {
  CARD_HEIGHT,
  CARD_WIDTH,
  CSV_HEADER,
  DEFAULT_BASICS,
  addBasics,
  bulkUpload,
  createPool,
  exportToMtgo,
  reverseArray,
  rotateArrayLeft,
  rotateArrayRight,
  shuffle,
  updateCubeAndBlog,
  writeCard,
};

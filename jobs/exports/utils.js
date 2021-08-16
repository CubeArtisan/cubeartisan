import fs from 'fs';
import path from 'path';

import carddb from '@cubeartisan/server/serverjs/cards.js';

const folder = process.argv[2];

export const writeFile = (filename, object) => {
  const fullPath = `${folder}/${filename}`;
  const dirname = path.dirname(fullPath);
  fs.mkdirSync(dirname, { recursive: true });
  fs.writeFileSync(fullPath, JSON.stringify(object));
};

export const loadCardToInt = async () => {
  await carddb.initializeCardDb('private', false);
  const cardToIntFile = 'card_to_int.json';
  const intToCardFile = 'int_to_card.json';
  if (fs.existsSync(`${folder}/${cardToIntFile}`) && fs.existsSync(`${folder}/${intToCardFile}`)) {
    const intToCard = JSON.parse(fs.readFileSync(`${folder}/${intToCardFile}`));
    const cardToInt = JSON.parse(fs.readFileSync(`${folder}/${cardToIntFile}`));
    return { cardToInt, intToCard };
  }
  const cardNames = new Set(carddb.allCards().map((c) => c.name_lower));
  const cardToInt = Object.fromEntries(Array.from(cardNames, (name, index) => [name, index]));
  const intToCard = new Array(Array.from(cardNames).length);
  for (const card of carddb.allCards()) {
    intToCard[cardToInt[card.name_lower]] = card;
  }

  writeFile('card_to_int.json', cardToInt);
  writeFile('int_to_card.json', intToCard);
  return { cardToInt, intToCard };
};

export const getObjectCreatedAt = (id) => new Date(parseInt(id.toString().slice(0, 8), 16) * 1000);

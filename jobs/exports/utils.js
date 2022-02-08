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
  await carddb.initializeCardDb('./private', true);
  const cardToIntFile = 'card_to_int.json';

  const intToCardFile = 'int_to_card.json';
  if (fs.existsSync(`${folder}/${cardToIntFile}`) && fs.existsSync(`${folder}/${intToCardFile}`)) {
    const intToCard = JSON.parse(fs.readFileSync(`${folder}/${intToCardFile}`));
    const cardToInt = JSON.parse(fs.readFileSync(`${folder}/${cardToIntFile}`));
    return { cardToInt, intToCard };
  }
  const intToCard = carddb
    .allOracleIds()
    .map((oracleId) => carddb.getVersionsByOracleId(oracleId).filter((card) => carddb.reasonableCard(card)))
    .filter((cards) => cards.length > 0)
    .map(([card]) => card);
  const cardToInt = Object.fromEntries(intToCard.map((card, index) => [card.oracle_id, index]));
  writeFile('card_to_int.json', cardToInt);
  writeFile('int_to_card.json', intToCard);
  return { cardToInt, intToCard };
};

export const getObjectCreatedAt = (id) => new Date(parseInt(id.toString().slice(0, 8), 16) * 1000);

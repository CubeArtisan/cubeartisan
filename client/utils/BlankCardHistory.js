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
// eslint-disable-next-line
import carddb from '@cubeartisan/server/serverjs/cards.js';

function getBlankCardHistory(id) {
  const card = carddb.cardFromId(id);
  const cardVersions = carddb.getVersionsByOracleId(card.oracle_id);

  const data = {
    current: {
      rating: null,
      elo: card.elo,
      picks: 0,
      total: [0, 0],
      size180: [0, 0],
      size360: [0, 0],
      size450: [0, 0],
      size540: [0, 0],
      size720: [0, 0],
      pauper: [0, 0],
      legacy: [0, 0],
      modern: [0, 0],
      standard: [0, 0],
      vintage: [0, 0],
      cubes: 0,
      prices: cardVersions.map((cardId) => {
        return { ...carddb.cardFromId(cardId), version: carddb.cardFromId(cardId)._id };
      }),
    },
    cubedWith: {
      synergistic: [],
      top: [],
      creatures: [],
      spells: [],
      other: [],
    },
    versions: cardVersions,
    cubes: [],
    history: [
      {
        data: {
          size180: [0, 0],
          size360: [0, 0],
          size450: [0, 0],
          size540: [0, 0],
          size720: [0, 0],
          pauper: [0, 0],
          legacy: [0, 0],
          modern: [0, 0],
          standard: [0, 0],
          vintage: [0, 0],
          total: [0, 0],
          rating: null,
          elo: null,
          picks: 0,
          cubes: 0,
          prices: [],
        },
        date: '',
      },
    ],
    cardName: card.name,
    oracleId: card.oracle_id,
    __v: 0,
  };

  return data;
}

export default getBlankCardHistory;

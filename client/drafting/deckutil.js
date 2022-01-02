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

import { cardCmc, cardName, cardType } from '@cubeartisan/client/utils/Card.js';

export const calculateBasicCounts = () => ({ lands: [], remainingLands: [], colors: [] });

export const buildDeck = ({ cards, picked }) => {
  const deck = [];
  const sideboard = [];
  for (let i = 0; i < 16; i += 1) {
    deck.push([]);
    if (i < 8) {
      sideboard.push([]);
    }
  }

  for (const cardIndex of picked) {
    const card = cards[cardIndex];
    let index = Math.min(Math.ceil(cardCmc(card)) ?? 0, 7);
    if (!cardType(card).toLowerCase().includes('creature') && !cardType(card).toLowerCase().includes('basic')) {
      index += 8;
    }
    deck[index].push(cardIndex);
  }

  for (const col of deck) {
    // sort the basic land col
    col.sort((a, b) => cardName(cards[a]).localeCompare(cardName(cards[b])));
  }

  return {
    deck: [deck.slice(0, 8), deck.slice(8, 16)],
    sideboard: [sideboard],
    colors: [],
  };
};

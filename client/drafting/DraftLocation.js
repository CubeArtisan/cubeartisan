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
import { arraysEqual } from '@cubeartisan/client/utils/Util';

class DraftLocation {
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }

  static pack(data) {
    return new DraftLocation(DraftLocation.PACK, data);
  }

  static picks(data) {
    return new DraftLocation(DraftLocation.PICKS, data);
  }

  static deck(data) {
    return new DraftLocation(DraftLocation.DECK, data);
  }

  static sideboard(data) {
    return new DraftLocation(DraftLocation.SIDEBOARD, data);
  }

  equals(other) {
    if (this.type !== other.type) {
      return false;
    }

    if (Array.isArray(this.data) && Array.isArray(other.data)) {
      return arraysEqual(this.data, other.data);
    }

    return this.data === other.data;
  }

  toString() {
    return `DraftLocation.${this.type}(${this.data})`;
  }
}
DraftLocation.PACK = 'pack';
DraftLocation.PICKS = 'picks';
DraftLocation.DECK = 'deck';
DraftLocation.SIDEBOARD = 'sideboard';

export const moveOrAddCard = (cards, target, source) => {
  const newCards = [...cards];
  let card;
  if (Array.isArray(source)) {
    // Source is a location.
    const [sourceRow, sourceCol, sourceIndex] = source;
    newCards[sourceRow][sourceCol] = [...newCards[sourceRow][sourceCol]];
    [card] = newCards[sourceRow][sourceCol].splice(sourceIndex - 1, 1);
  } else {
    // Source is a card itself.
    card = source;
  }

  const [targetRow, targetCol, targetIndex] = target;
  if (newCards[targetRow].length < 1 + targetCol) {
    newCards[targetRow] = newCards[targetRow].concat(new Array(1 + targetCol - newCards[targetRow].length).fill([]));
  }
  newCards[targetRow] = [...newCards[targetRow]];
  newCards[targetRow][targetCol] = [...newCards[targetRow][targetCol]];
  newCards[targetRow][targetCol].splice(targetIndex, 0, card);
  return newCards;
};

export const removeCard = (cards, source) => {
  const newCards = [...cards];
  const [sourceRow, sourceCol, sourceIndex] = source;
  newCards[sourceRow] = [...newCards[sourceRow]];
  newCards[sourceRow][sourceCol] = [...newCards[sourceRow][sourceCol]];
  const [card] = newCards[sourceRow][sourceCol].splice(sourceIndex - 1, 1);
  return [card, newCards];
};

export default DraftLocation;

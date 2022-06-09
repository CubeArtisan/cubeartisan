/*
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
import PropTypes from 'prop-types';

import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import CommentPropType from '@cubeartisan/client/proptypes/CommentPropType.js';
import DraftSeatPropType from '@cubeartisan/client/proptypes/DraftSeatPropType.js';

/**
 * @typedef {import('@cubeartisan/client/proptypes/CommentPropType.js').Comment} Comment
 * @typedef {import('@cubeartisan/client/proptypes/DraftSeatPropType.js').DeckSeat} DeckSeat
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 */

/**
 * @typedef Deck
 * @property {string} _id
 * @property {string?} cube
 * @property {string?} owner
 * @property {string?} cubeOwner
 * @property {DeckSeat[]} seats
 * @property {string} date
 * @property {Comment[]} comments
 * @property {number[]} basics
 * @property {(Card|null)[]} cards
 */

const DeckPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  cube: PropTypes.string,
  owner: PropTypes.string,
  cubeOwner: PropTypes.string,
  seats: PropTypes.arrayOf(DraftSeatPropType).isRequired,
  date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  // TODO: Define commentproptype.
  comments: PropTypes.arrayOf(CommentPropType.isRequired).isRequired,
  basics: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  cards: PropTypes.arrayOf(CardPropType).isRequired,
});

export default DeckPropType;

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
 */
import PropTypes from 'prop-types';

/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef {import('@cubeartisan/client/proptypes/CubePropType.js').Step} Step
 * @typedef {import('@cubeartisan/client/proptypes/DraftSeatPropType.js').DraftSeat} DraftSeat
 */

/**
 * @typedef DraftPack
 * @property {number[]} cards
 * @property {Step[]?} steps
 */

/**
 * @typedef Draft
 * @property {string} _id
 * @property {number[]} basics
 * @property {Card[]} cards
 * @property {string} cube
 * @property {DraftPack[][]} initial_state
 * @property {number} schemaVersion
 * @property {DraftSeat[]} seats
 * @property {string} seed
 * @property {number} timeout
 * @property {number} cas
 */

const DraftPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
});
export default DraftPropType;

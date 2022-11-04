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
 * @typedef DraftSeat
 * @property {boolean} bot
 * @property {string} name
 * @property {string?} userid
 * @property {number[][][]} drafted
 * @property {number[][][]} sideboard
 * @property {number[]} pickorder
 * @property {number[]} trashorder
 */

const DraftSeatPropType = PropTypes.shape({
  bot: PropTypes.bool.isRequired,
});
export default DraftSeatPropType;

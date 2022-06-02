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
 */
import PropTypes from 'prop-types';

/**
 * @typedef CardLegalities
 * @property {string} Legacy
 * @property {string} Modern
 * @property {string} Standard
 * @property {string} Pauper
 * @property {string} Pioneer
 * @property {string} Brawl
 * @property {string} Historic
 * @property {string} Commander
 * @property {string} Penny
 * @property {string} Vintage
 */

const CardLegalitiesPropType = PropTypes.shape({
  Legacy: PropTypes.string,
  Modern: PropTypes.string,
  Standard: PropTypes.string,
  Pauper: PropTypes.string,
  Pioneer: PropTypes.string,
  Brawl: PropTypes.string,
  Historic: PropTypes.string,
  Commander: PropTypes.string,
  Penny: PropTypes.string,
  Vintage: PropTypes.string,
});
export default CardLegalitiesPropType;

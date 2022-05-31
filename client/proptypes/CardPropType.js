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
import PropTypes from 'prop-types';

import CardDetailsPropType from '@cubeartisan/client/proptypes/CardDetailsPropType.js';

/**
 * @typedef Card
 * @property {string} [_id]
 * @property {number} [index]
 * @property {string} [imgUrl]
 * @property {string} [imgBackUrl]
 * @property {string} cardID
 * @property {import('@cubeartisan/client/proptypes/CardDetailsPropType.js').Color[]} [colors]
 * @property {string[]} tags
 * @property {import('@cubeartisan/client/proptypes/CardDetailsPropType.js').CardDetails} details
 * @property {string?} [addedTmsp]
 */

const CardPropType = PropTypes.shape({
  _id: PropTypes.string,
  index: PropTypes.number,
  imgUrl: PropTypes.string,
  imgBackUrl: PropTypes.string,
  cardID: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.oneOf(Array.from('WUBRG'))),
  tags: PropTypes.arrayOf(PropTypes.string),
  details: CardDetailsPropType,
  addedTmsp: PropTypes.string,
});
export default CardPropType;

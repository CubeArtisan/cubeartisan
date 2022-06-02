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
 * @typedef {import('@cubeartisan/client/proptypes/CardDetailsPropType.js').Color} Color
 * @typedef {import('@cubeartisan/client/proptypes/CardDetailsPropType.js').CardDetails} CardDetails
 * @typedef Card
 * @property {string?} addedTmsp
 * @property {string?} cardID
 * @property {number?} cmc
 * @property {string?} colorCategory
 * @property {Color[]?} colors
 * @property {('Foil'|'Non-foil')} finish
 * @property {string?} imgBackUrl
 * @property {string?} imgUrl
 * @property {number?} [index]
 * @property {boolean} isUnlimited
 * @property {string?} name
 * @property {string?} notes
 * @property {string?} rarity
 * @property {'Not Owned'|'Ordered'|'Owned'|'Premium Owned'|'Proxied'} status
 * @property {string[]} tags
 * @property {string?} type_line
 * @property {CardDetails} details
 */

const CardPropType = PropTypes.shape({
  addedTmsp: PropTypes.string,
  cardID: PropTypes.string.isRequired,
  cmc: PropTypes.number,
  colorCategory: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.oneOf(Array.from('WUBRG'))),
  finish: PropTypes.oneOf(['Foil', 'Non-foil']).isRequired,
  imgBackUrl: PropTypes.string,
  imgUrl: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  notes: PropTypes.string,
  rarity: PropTypes.string,
  status: PropTypes.oneOf(['Not Owned', 'Ordered', 'Owned', 'Premium Owned', 'Proxied']).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  type_line: PropTypes.string,
  details: CardDetailsPropType.isRequired,
  isUnlimited: PropTypes.bool.isRequired,
});
export default CardPropType;

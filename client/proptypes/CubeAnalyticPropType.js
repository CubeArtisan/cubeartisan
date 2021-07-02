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
import CardPropType from '@hypercube/client/proptypes/CardPropType';

const CubePropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  shortID: PropTypes.string,
  name: PropTypes.string,
  card_count: PropTypes.number,
  cards: PropTypes.arrayOf(CardPropType),
  type: PropTypes.string,
  overrideCategory: PropTypes.bool,
  categoryOverride: PropTypes.string,
  categoryPrefixes: PropTypes.arrayOf(PropTypes.string),
  image_name: PropTypes.string,
  image_artist: PropTypes.string,
  image_uri: PropTypes.string,
  owner: PropTypes.string,
  owner_name: PropTypes.string,
  disableNotifications: PropTypes.bool,
});

export default CubePropType;

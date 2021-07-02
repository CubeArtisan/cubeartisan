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
import CardPricePropType from '@hypercube/client/proptypes/CardPricePropType';

const CardDataPointPropType = PropTypes.shape({
  prices: PropTypes.arrayOf(CardPricePropType).isRequired,
  vintage: PropTypes.bool.isRequired,
  legacy: PropTypes.bool.isRequired,
  modern: PropTypes.bool.isRequired,
  standard: PropTypes.bool.isRequired,
  pauper: PropTypes.bool.isRequired,
  peasant: PropTypes.bool.isRequired,
  size180: PropTypes.number.isRequired,
  size360: PropTypes.number.isRequired,
  size450: PropTypes.number.isRequired,
  size540: PropTypes.number.isRequired,
  size720: PropTypes.number.isRequired,
  total: PropTypes.arrayOf(PropTypes.number).isRequired,
});

export default CardDataPointPropType;

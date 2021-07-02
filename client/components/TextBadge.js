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

import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

const TextBadge = ({ name, className, children, fill }) => (
  <InputGroup size="sm" className={className ? `w-auto ${className}` : 'w-auto'}>
    <InputGroupAddon className={fill ? 'w-50' : ''} addonType="prepend">
      <InputGroupText className={fill ? `w-100` : ''}>{name}</InputGroupText>
    </InputGroupAddon>
    <InputGroupAddon className={fill ? 'w-50' : ''} addonType="append">
      <InputGroupText className={`${fill ? 'w-100 ' : ''}bg-white`}>{children}</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
);

TextBadge.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  fill: PropTypes.bool,
};

TextBadge.defaultProps = {
  name: 'textBade',
  fill: false,
};

export default TextBadge;

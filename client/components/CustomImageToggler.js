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
import { useContext } from 'react';

import { NavItem, NavLink } from 'reactstrap';

import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';

const CustomImageToggler = () => {
  const { showCustomImages, toggleShowCustomImages } = useContext(DisplayContext);
  return (
    <NavItem>
      <NavLink href="#" onClick={toggleShowCustomImages}>
        {showCustomImages ? 'Hide ' : 'Show '}
        Custom Images
      </NavLink>
    </NavItem>
  );
};

export default CustomImageToggler;

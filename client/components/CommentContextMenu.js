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

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import useToggle from '@cubeartisan/client/hooks/UseToggle.js';

const CommentContextMenu = ({ edit, remove, children }) => {
  const [open, toggle] = useToggle(false);

  return (
    <Dropdown isOpen={open} toggle={toggle}>
      <DropdownToggle tag="a" className="nav-link clickable py-0">
        {children}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={edit}>Edit</DropdownItem>
        <DropdownItem onClick={remove}>Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

CommentContextMenu.propTypes = {
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default CommentContextMenu;

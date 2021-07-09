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
import { Collapse, Nav, NavItem, NavLink, Navbar, NavbarToggler } from 'reactstrap';

import FilterCollapse from '@cubeartisan/client/components/FilterCollapse.js';
import SortCollapse from '@cubeartisan/client/components/SortCollapse.js';
import TagColorsModal from '@cubeartisan/client/components/modals/TagColorsModal.js';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';

const CubeCompareNavbar = ({ cubeA, cubeB, cards, filter, setFilter, setOpenCollapse, openCollapse }) => {
  const [isOpen, toggleOpen] = useToggle(false);
  const [tagColorsModalOpen, toggleTagColorsModal, openTagColorsModal] = useToggle(false);
  const toggle = (event) => {
    event.preventDefault();
    toggleOpen();
  };

  const handleOpenCollapse = (event) => {
    event.preventDefault();
    const { target } = event;
    const collapse = target.getAttribute('data-target');
    setOpenCollapse((prevOpenCollapse) => (prevOpenCollapse === collapse ? null : collapse));
  };

  const handleOpenTagColorsModal = (event) => {
    event.preventDefault();
    openTagColorsModal();
  };

  return (
    <>
      <div className="cubenav">
        <ul className="nav nav-tabs nav-fill pt-2">
          <li className="nav-item">
            <h5 style={{ color: '#218937' }}>Compare Cubes</h5>
            <h6 className="my-3" style={{ color: '#218937' }}>
              <span className="text-muted">Base Cube:</span>{' '}
              <a href={`/cube/${cubeA.shortID}/list`} className="mr-3" style={{ color: '#218937' }}>
                {cubeA.name} ({cubeA.card_count} cards)
              </a>{' '}
              <span className="text-muted">Comparison Cube:</span>{' '}
              <a href={`/cube/${cubeB.shortID}/list`} style={{ color: '#218937' }}>
                {cubeB.name} ({cubeB.card_count} cards)
              </a>
            </h6>
          </li>
        </ul>
      </div>
      <div className="usercontrols">
        <Navbar expand="md" light>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="#" data-target="sort" onClick={handleOpenCollapse}>
                  Sort
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" data-target="filter" onClick={handleOpenCollapse}>
                  Filter
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={handleOpenTagColorsModal}>
                  View Tag Colors
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <SortCollapse isOpen={openCollapse === 'sort'} />
        <FilterCollapse
          filter={filter}
          setFilter={setFilter}
          numCards={cards.length}
          isOpen={openCollapse === 'filter'}
        />
      </div>
      <TagColorsModal canEdit={false} isOpen={tagColorsModalOpen} toggle={toggleTagColorsModal} />
    </>
  );
};
CubeCompareNavbar.propTypes = {
  setOpenCollapse: PropTypes.func.isRequired,
  openCollapse: PropTypes.string,
  cubeA: CubePropType.isRequired,
  cubeB: CubePropType.isRequired,
  cards: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
  filter: PropTypes.func,
  setFilter: PropTypes.func.isRequired,
};
CubeCompareNavbar.defaultProps = {
  openCollapse: null,
  filter: null,
};
export default CubeCompareNavbar;

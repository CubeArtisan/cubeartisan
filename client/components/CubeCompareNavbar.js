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
import { Component } from 'react';

import { Collapse, Nav, NavItem, NavLink, Navbar, NavbarToggler } from 'reactstrap';

import FilterCollapse from './FilterCollapse';
import SortCollapse from './SortCollapse';
import TagColorsModal from './TagColorsModal';

class CubeCompareNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      tagColorsModalOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.handleOpenCollapse = this.handleOpenCollapse.bind(this);
    this.handleOpenTagColorsModal = this.handleOpenTagColorsModal.bind(this);
    this.handleToggleTagColorsModal = this.handleToggleTagColorsModal.bind(this);
  }

  toggle() {
    event.preventDefault();
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  }

  handleOpenCollapse(event) {
    event.preventDefault();
    const { target } = event;
    const collapse = target.getAttribute('data-target');
    const { setOpenCollapse } = this.props;
    setOpenCollapse((openCollapse) => (openCollapse === collapse ? null : collapse));
  }

  handleOpenTagColorsModal(event) {
    event.preventDefault();
    this.setState({ tagColorsModalOpen: true });
  }

  handleToggleTagColorsModal() {
    this.setState({ tagColorsModalOpen: false });
  }

  render() {
    const { cubeA, cubeB, cards, openCollapse, filter, setFilter } = this.props;
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
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href="#" data-target="sort" onClick={this.handleOpenCollapse}>
                    Sort
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" data-target="filter" onClick={this.handleOpenCollapse}>
                    Filter
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" onClick={this.handleOpenTagColorsModal}>
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
            isOpen={this.props.openCollapse === 'filter'}
          />
        </div>
        <TagColorsModal
          canEdit={false}
          isOpen={this.state.tagColorsModalOpen}
          toggle={this.handleToggleTagColorsModal}
        />
      </>
    );
  }
}

export default CubeCompareNavbar;

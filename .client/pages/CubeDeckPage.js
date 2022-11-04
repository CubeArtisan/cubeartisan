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
import { useCallback, useContext, useState } from 'react';
import {
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';

import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DeckCard from '@cubeartisan/client/components/DeckCard.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import CustomImageToggler from '@cubeartisan/client/components/inputs/CustomImageToggler.js';
import CubeLayout from '@cubeartisan/client/components/layouts/CubeLayout.js';
import SampleHandModal from '@cubeartisan/client/components/modals/SampleHandModal.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import DeckPropType from '@cubeartisan/client/proptypes/DeckPropType.js';
import { DraftPropType } from '@cubeartisan/client/proptypes/DraftbotPropTypes.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

export const CubeDeckPage = ({ cube, deck, draft, loginCallback }) => {
  const user = useContext(UserContext);

  const [seatIndex, setSeatIndex] = useQueryParam('seat', 0);
  const [view, setView] = useQueryParam('view', 'deck');

  /** @param {any} event */
  const handleChangeSeat = (event) => {
    setSeatIndex(event.target.value);
  };

  /** @param {any} event */
  const handleChangeView = (event) => {
    setView(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = useCallback(
    /** @param {any} event */
    (event) => {
      event.preventDefault();
      setIsOpen(!isOpen);
    },
    [isOpen],
  );

  return (
    <CubeLayout loginCallback={loginCallback} cube={cube} activeLink="playtest">
      <Navbar expand="md" light className="usercontrols mb-3">
        <div className="view-style-select pr-2">
          <Label className="sr-only" for="viewSelect">
            Cube View Style
          </Label>
          <Input type="select" id="viewSelect" value={seatIndex} onChange={handleChangeSeat}>
            {deck.seats.map((seat, index) => (
              <option key={seat._id} value={index}>
                {seat.username ? seat.username : seat.name}
              </option>
            ))}
          </Input>
        </div>
        <div className="view-style-select pr-2">
          <Label className="sr-only" for="viewSelect">
            Cube View Style
          </Label>
          <Input type="select" id="viewSelect" value={view} onChange={handleChangeView}>
            <option value="deck">Deck View</option>
            <option value="picks">Pick by Pick Breakdown</option>
          </Input>
        </div>
        <NavbarToggler onClick={toggleNavbar} className="ml-auto" />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <SampleHandModal
                deck={deck.seats[seatIndex].deck.map((row) =>
                  row.map((col) => col.map((cardIndex) => deck.cards[cardIndex])),
                )}
              />
            </NavItem>
            {user && deck.owner === user._id && <NavLink href={`/deck/${deck._id}/build`}>Edit</NavLink>}
            {draft ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Rebuild/Redraft Seat
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href={`/deck/${deck._id}/redraft/${seatIndex}`}>Redraft</DropdownItem>
                  <DropdownItem href={`/deck/${deck._id}/rebuild/${seatIndex}`}>Clone and Rebuild</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <NavItem>
                <NavLink href={`/deck/${deck._id}/rebuild/${seatIndex}`}>Clone and Rebuild</NavLink>
              </NavItem>
            )}
            <CustomImageToggler />
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Export
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href={`/deck/${deck._id}/export/${seatIndex}/plaintext`}>Card Names (.txt)</DropdownItem>
                <DropdownItem href={`/deck/${deck._id}/export/${seatIndex}/forge`}>Forge (.dck)</DropdownItem>
                <DropdownItem href={`/deck/${deck._id}/export/${seatIndex}/xmage`}>XMage (.dck)</DropdownItem>
                <DropdownItem href={`/deck/${deck._id}/export/${seatIndex}/mtgo`}>MTGO (.txt)</DropdownItem>
                <DropdownItem href={`/deck/${deck._id}/export/${seatIndex}/arena`}>Arena (.txt)</DropdownItem>
                <DropdownItem href={`/deck/${deck._id}/export/${seatIndex}/cockatrice`}>Cockatrice (.txt)</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
      <DynamicFlash />
      <Row className="mt-3 mb-3">
        <Col>
          <DeckCard
            seat={deck.seats[seatIndex]}
            deckid={deck._id}
            deck={deck}
            seatIndex={`${seatIndex}`}
            draft={draft}
            view={view}
          />
        </Col>
      </Row>
    </CubeLayout>
  );
};
CubeDeckPage.propTypes = {
  cube: CubePropType.isRequired,
  deck: DeckPropType.isRequired,
  draft: DraftPropType,
  loginCallback: PropTypes.string,
};
CubeDeckPage.defaultProps = {
  loginCallback: '/',
  draft: null,
};
export default RenderToRoot(CubeDeckPage);

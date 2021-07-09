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
import { useCallback, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
  Row,
  Label,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // Spinner,
} from 'reactstrap';

// import CSRFForm from '@cubeartisan/client/pages/CSRFForm.js'
import CustomImageToggler from '@cubeartisan/client/components/CustomImageToggler.js';
import DeckCard from '@cubeartisan/client/components/DeckCard.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import SampleHandModal from '@cubeartisan/client/components/modals/SampleHandModal.js';
import { DisplayContextProvider } from '@cubeartisan/client/components/contexts/DisplayContext.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import CubeLayout from '@cubeartisan/client/layouts/CubeLayout.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import DeckPropType from '@cubeartisan/client/proptypes/DeckPropType.js';

import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';
import { DraftPropType } from '@cubeartisan/client/proptypes/DraftbotPropTypes.js';

export const CubeDeckPage = ({ cube, deck, draft, loginCallback }) => {
  const user = useContext(UserContext);

  const [seatIndex, setSeatIndex] = useQueryParam('seat', 0);
  const [view, setView] = useQueryParam('view', 'deck');

  const handleChangeSeat = (event) => {
    setSeatIndex(event.target.value);
  };

  const handleChangeView = (event) => {
    setView(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = useCallback(
    (event) => {
      event.preventDefault();
      setIsOpen(!isOpen);
    },
    [isOpen],
  );

  return (
    <MainLayout loginCallback={loginCallback}>
      <CubeLayout cube={cube} activeLink="playtest">
        <DisplayContextProvider>
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
                <option value="draftbot">Draftbot Analysis</option>
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
                {user && deck.owner === user.id && (
                  <NavItem>
                    <NavLink href={`/cube/deck/deckbuilder/${deck._id}`}>Edit</NavLink>
                  </NavItem>
                )}
                {/* loading && <Spinner className="position-absolute" /> */}
                {draft ? (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Rebuild/Redraft Seat
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href={`/cube/deck/redraft/${deck._id}/${seatIndex}`}>Redraft</DropdownItem>
                      {/* <DropdownItem onClick={haveBotsRedraft}>Have Bots Redraft</DropdownItem> */}
                      <DropdownItem href={`/cube/deck/rebuild/${deck._id}/${seatIndex}`}>
                        Clone and Rebuild
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <NavItem>
                    <NavLink href={`/cube/deck/rebuild/${deck._id}/${seatIndex}`}>Clone and Rebuild</NavLink>
                  </NavItem>
                )}
                <CustomImageToggler />
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Export
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem href={`/cube/deck/download/txt/${deck._id}/${seatIndex}`}>
                      Card Names (.txt)
                    </DropdownItem>
                    <DropdownItem href={`/cube/deck/download/forge/${deck._id}/${seatIndex}`}>
                      Forge (.dck)
                    </DropdownItem>
                    <DropdownItem href={`/cube/deck/download/xmage/${deck._id}/${seatIndex}`}>
                      XMage (.dck)
                    </DropdownItem>
                    <DropdownItem href={`/cube/deck/download/mtgo/${deck._id}/${seatIndex}`}>MTGO (.txt)</DropdownItem>
                    <DropdownItem href={`/cube/deck/download/arena/${deck._id}/${seatIndex}`}>
                      Arena (.txt)
                    </DropdownItem>
                    <DropdownItem href={`/cube/deck/download/cockatrice/${deck._id}/${seatIndex}`}>
                      Cockatrice (.txt)
                    </DropdownItem>
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
        </DisplayContextProvider>
      </CubeLayout>
    </MainLayout>
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

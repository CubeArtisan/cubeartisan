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
import { useCallback, useRef, useState } from 'react';
import { Collapse, Input, Nav, Navbar, NavbarToggler, NavItem, NavLink } from 'reactstrap';

import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import CustomImageToggler from '@cubeartisan/client/components/inputs/CustomImageToggler.js';
import BasicsModal from '@cubeartisan/client/components/modals/BasicsModal.js';
import DeckDeleteModal from '@cubeartisan/client/components/modals/DeckDeleteModal.js';
import CSRFForm from '@cubeartisan/client/components/utils/CSRFForm.js';
import DeckPropType from '@cubeartisan/client/proptypes/DeckPropType.js';

const DeleteDeckModalLink = withModal(NavLink, DeckDeleteModal);
const BasicsModalLink = withModal(NavLink, BasicsModal);

const DeckbuilderNavbar = ({ deck, addBasics, name, description, className, setSideboard, setDeck, ...props }) => {
  const { basics } = deck;
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = useCallback(
    (event) => {
      event.preventDefault();
      setIsOpen(!isOpen);
    },
    [isOpen],
  );

  const saveForm = useRef(null);
  const saveDeck = useCallback(
    (event) => {
      event.preventDefault();
      if (saveForm.current) {
        saveForm.current.submit();
      }
    },
    [saveForm],
  );

  let stripped = null;
  if (deck) {
    const res = JSON.parse(JSON.stringify(deck));

    for (const collection of [res.playerdeck, res.playersideboard]) {
      for (const row of collection) {
        for (const column of row) {
          column.forEach((card, index) => {
            if (!Number.isFinite(card)) {
              column[index] = card.index;
            }
          });
        }
      }
    }
    stripped = JSON.stringify({
      playersideboard: res.playersideboard,
      playerdeck: res.playerdeck,
    });
  }

  return (
    <Navbar expand="md" light className={`usercontrols ${className}`} {...props}>
      <NavbarToggler onClick={toggleNavbar} className="ml-auto" />
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink href="#" onClick={saveDeck}>
              Save Deck
            </NavLink>
            <CSRFForm className="d-none" ref={saveForm} method="POST" action={`/deck/${deck._id}`}>
              <Input type="hidden" name="draftraw" value={stripped} />
              <Input type="hidden" name="name" value={JSON.stringify(name)} />
              <Input type="hidden" name="description" value={JSON.stringify(description)} />
            </CSRFForm>
          </NavItem>
          <NavItem>
            <DeleteDeckModalLink modalProps={{ deckID: deck._id, cubeID: deck.cube }}>Delete Deck</DeleteDeckModalLink>
          </NavItem>
          <NavItem>
            <BasicsModalLink
              modalProps={{
                basics,
                addBasics,
                deck: deck.playerdeck.flat(3).map(({ index }) => index),
                cards: deck.cards,
              }}
            >
              Add Basic Lands
            </BasicsModalLink>
          </NavItem>
          <CustomImageToggler />
        </Nav>
      </Collapse>
    </Navbar>
  );
};

DeckbuilderNavbar.propTypes = {
  deck: DeckPropType.isRequired,
  addBasics: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
  setDeck: PropTypes.func.isRequired,
  setSideboard: PropTypes.func.isRequired,
};

DeckbuilderNavbar.defaultProps = {
  className: null,
};

export default DeckbuilderNavbar;

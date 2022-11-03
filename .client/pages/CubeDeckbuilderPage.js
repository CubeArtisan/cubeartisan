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
import { useCallback, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';

import ErrorBoundary from '@cubeartisan/client/components/containers/ErrorBoundary.js';
import DeckStacks from '@cubeartisan/client/components/DeckStacks.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import TextEntry from '@cubeartisan/client/components/inputs/TextEntry.js';
import CubeLayout from '@cubeartisan/client/components/layouts/CubeLayout.js';
import DeckbuilderNavbar from '@cubeartisan/client/components/navbars/DeckbuilderNavbar.js';
import DndProvider from '@cubeartisan/client/components/utils/DndProvider.js';
import DraftLocation, { moveOrAddCard, removeCard } from '@cubeartisan/client/drafting/DraftLocation.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import DeckPropType from '@cubeartisan/client/proptypes/DeckPropType.js';
import { makeSubtitle } from '@cubeartisan/client/utils/Card.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const canDrop = () => true;

const oppositeLocation = {
  [DraftLocation.DECK]: DraftLocation.SIDEBOARD,
  [DraftLocation.SIDEBOARD]: DraftLocation.DECK,
};

export const CubeDeckbuilderPage = ({ cube, initialDeck, loginCallback }) => {
  const { basics } = initialDeck;
  const [deck, setDeck] = useState(
    initialDeck.seats[0].deck.map((row) => row.map((col) => col.map((cardIndex) => initialDeck.cards[cardIndex]))),
  );
  const [sideboard, setSideboard] = useState(
    initialDeck.seats[0].sideboard.map((row) => row.map((col) => col.map((cardIndex) => initialDeck.cards[cardIndex]))),
  );

  const handleMoveCard = useCallback(
    (source, target) => {
      const locationMap = {
        [DraftLocation.DECK]: [deck, setDeck],
        [DraftLocation.SIDEBOARD]: [sideboard, setSideboard],
      };
      if (source.equals(target)) {
        return;
      }

      if (source.type === target.type) {
        const [cards, setSource] = locationMap[source.type];

        setSource(moveOrAddCard(cards, target.data, source.data));
      } else {
        const [sourceCards, setSource] = locationMap[source.type];
        const [targetCards, setTarget] = locationMap[target.type];

        const [card, newSourceCards] = removeCard(sourceCards, source.data);
        setSource(newSourceCards);
        setTarget(moveOrAddCard(targetCards, target.data, card));
      }
    },
    [deck, sideboard],
  );

  const handleClickCard = useCallback(
    (event) => {
      event.preventDefault();
      const eventTarget = event.currentTarget;
      const locationType = eventTarget.getAttribute('data-location-type');
      const locationData = JSON.parse(eventTarget.getAttribute('data-location-data'));
      const source = new DraftLocation(locationType, locationData);
      const target = new DraftLocation(oppositeLocation[source.type], Array.from(source.data));
      target.data[2] = 0;
      if (target.type === DraftLocation.SIDEBOARD) {
        // Only one row for the sideboard.
        target.data[0] = 0;
      } else {
        // Pick row based on CMC.
        target.data[0] = eventTarget.getAttribute('data-cmc') === 'true' ? 0 : 1;
      }
      handleMoveCard(source, target);
    },
    [handleMoveCard],
  );

  const addBasics = useCallback(
    (numBasics) => {
      const toAdd = numBasics.flatMap((count, index) => new Array(count).fill(initialDeck.cards[basics[index]]));
      const newDeck = Array.from(deck);
      newDeck[1][0] = [].concat(newDeck[1][0], toAdd);
      setDeck(newDeck);
    },
    [deck, basics, initialDeck],
  );

  const currentDeck = { ...initialDeck };
  currentDeck.playerdeck = deck;
  currentDeck.playersideboard = sideboard;

  const [name, setName] = useState(initialDeck.seats[0].name);
  const [description, setDescription] = useState(initialDeck.seats[0].description);

  return (
    <CubeLayout loginCallback={loginCallback} cube={cube} activeLink="playtest">
      <DeckbuilderNavbar
        deck={currentDeck}
        addBasics={addBasics}
        name={name}
        description={description}
        className="mb-3"
        setDeck={setDeck}
        setSideboard={setSideboard}
        cards={initialDeck.cards}
      />
      <DynamicFlash />
      <Row className="mb-3">
        <Col>
          <Card>
            <ErrorBoundary>
              <DndProvider>
                <DeckStacks
                  cards={deck}
                  title="Deck"
                  subtitle={makeSubtitle(deck.flat().flat())}
                  locationType={DraftLocation.DECK}
                  canDrop={canDrop}
                  onMoveCard={handleMoveCard}
                  onClickCard={handleClickCard}
                />
                <DeckStacks
                  className="border-top"
                  cards={sideboard}
                  title="Sideboard"
                  locationType={DraftLocation.SIDEBOARD}
                  canDrop={canDrop}
                  onMoveCard={handleMoveCard}
                  onClickCard={handleClickCard}
                />
              </DndProvider>
            </ErrorBoundary>
            <CardHeader className="border-top">
              <CardTitle className="mb-0 d-flex flex-row align-items-end">
                <h4 className="mb-0 mr-auto">About</h4>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <h6>Deck Name</h6>
              <input
                className="form-control"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <h6>Description</h6>
              <TextEntry value={description} onChange={(e) => setDescription(e.target.value)} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </CubeLayout>
  );
};
CubeDeckbuilderPage.propTypes = {
  cube: CubePropType.isRequired,
  initialDeck: DeckPropType.isRequired,
  loginCallback: PropTypes.string,
};
CubeDeckbuilderPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(CubeDeckbuilderPage);

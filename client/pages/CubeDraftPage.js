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
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, CardTitle, Col, Collapse, Nav, Navbar, NavLink, Row, Spinner } from 'reactstrap';

import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';
import CustomImageToggler from '@cubeartisan/client/components/CustomImageToggler.js';
import DeckStacks from '@cubeartisan/client/components/DeckStacks.js';
import DndProvider from '@cubeartisan/client/components/DndProvider.js';
import { DraftbotBreakdownTable } from '@cubeartisan/client/components/DraftbotBreakdown.js';
import DraggableCard from '@cubeartisan/client/components/DraggableCard.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import ErrorBoundary from '@cubeartisan/client/components/ErrorBoundary.js';
import { DisplayContextProvider } from '@cubeartisan/client/components/contexts/DisplayContext.js';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';
import CubeLayout from '@cubeartisan/client/layouts/CubeLayout.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import { DrafterStatePropType, DraftPropType } from '@cubeartisan/client/proptypes/DraftbotPropTypes.js';
import { makeSubtitle } from '@cubeartisan/client/utils/Card.js';
import DraftLocation from '@cubeartisan/client/drafting/DraftLocation.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';
import { io } from 'socket.io-client';

const canDrop = (_, target) => {
  return target.type === DraftLocation.PICKS;
};

const Pack = ({ pack, packNumber, pickNumber, instructions, picking, onMoveCard, onClickCard }) => (
  <Card className="mt-3">
    <CardHeader>
      <CardTitle className="mb-0">
        <h4 className="mb-1">
          Pack {packNumber}, Pick {pickNumber}
          {instructions ? `: ${instructions}` : ''}
        </h4>
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Row noGutters>
        {pack.map((card, index) => (
          <Col
            key={/* eslint-disable-line react/no-array-index-key */ `${packNumber}:${pickNumber}:${index}`}
            xs={3}
            className="col-md-1-5 col-lg-1-5 col-xl-1-5 d-flex justify-content-center align-items-center"
          >
            {picking === index && <Spinner className="position-absolute" />}
            <DraggableCard
              location={DraftLocation.pack([index])}
              data-index={index}
              card={card}
              canDrop={canDrop}
              onMoveCard={picking === null ? onMoveCard : undefined}
              onClick={picking === null ? onClickCard : undefined}
              className={picking === index ? 'transparent' : undefined}
            />
          </Col>
        ))}
      </Row>
    </CardBody>
  </Card>
);

Pack.propTypes = {
  pack: PropTypes.arrayOf(PropTypes.object).isRequired,
  packNumber: PropTypes.number.isRequired,
  pickNumber: PropTypes.number.isRequired,
  instructions: PropTypes.string,
  picking: PropTypes.number,
  onMoveCard: PropTypes.func.isRequired,
  onClickCard: PropTypes.func.isRequired,
};

Pack.defaultProps = {
  picking: null,
  instructions: null,
};

const CubeDraftPlayerUI = ({ drafterState, drafted, takeCard, moveCard, picking }) => {
  const {
    cards,
    cardsInPack,
    step: { action, amount },
    packNum,
    pickNum,
    numPacks,
  } = drafterState;

  const [showBotBreakdown, toggleShowBotBreakdown] = useToggle(false);
  const pack = useMemo(() => cardsInPack.map((cardIndex) => cards[cardIndex]), [cardsInPack, cards]);
  // Picks is an array with 1st key C/NC, 2d key CMC, 3d key order
  const picks = useMemo(
    () => drafted.map((row) => row.map((col) => col.map((cardIndex) => cards[cardIndex]))),
    [drafted, cards],
  );
  const instructions = useMemo(() => {
    if (action === 'pick') {
      return `Pick ${amount + 1} More Card${amount + 1 > 1 ? 's' : ''}.`;
    }
    if (action === 'trash') {
      return `Trash ${amount + 1} More Card${amount + 1 > 1 ? 's' : ''}.`;
    }
    return null;
  }, [action, amount]);

  const handleMoveCard = useCallback(
    async (source, target) => {
      if (source.equals(target)) return;
      if (source.type === DraftLocation.PACK) {
        if (target.type === DraftLocation.PICKS) {
          takeCard(cardsInPack[source.data[0]], target.data);
        } else {
          console.error("Can't move cards inside pack.");
        }
      } else if (source.type === DraftLocation.PICKS) {
        if (target.type === DraftLocation.PICKS) {
          moveCard({ target: target.data, source: source.data });
        } else {
          console.error("Can't move cards from picks back to pack.");
        }
      }
    },
    [takeCard, cardsInPack, moveCard],
  );

  const handleClickCard = useCallback(
    async (event) => {
      event.preventDefault();
      const cardPackIndex = parseInt(event.currentTarget.getAttribute('data-index'), 10);
      const cardIndex = cardsInPack[cardPackIndex];
      await takeCard(cardIndex);
    },
    [cardsInPack, takeCard],
  );
  return (
    <>
      <Navbar expand="xs" light className="usercontrols">
        <Collapse navbar>
          <Nav navbar>
            <CustomImageToggler />
          </Nav>
          <Nav>
            <NavLink href="#" onClick={toggleShowBotBreakdown}>
              Toggle Bot Breakdown
            </NavLink>
          </Nav>
        </Collapse>
      </Navbar>
      <DynamicFlash />
      <DndProvider>
        {packNum < numPacks && (
          <>
            <ErrorBoundary>
              <Pack
                pack={pack}
                packNumber={packNum + 1}
                pickNumber={pickNum + 1}
                instructions={instructions}
                picking={picking}
                onMoveCard={handleMoveCard}
                onClickCard={handleClickCard}
              />
            </ErrorBoundary>
            {showBotBreakdown && (
              <ErrorBoundary>
                <Card className="mt-3">
                  <CardHeader className="mb-0">
                    <h4 className="mb-0">Draftbot Breakdown</h4>
                  </CardHeader>
                  <CardBody>
                    <DraftbotBreakdownTable drafterState={drafterState} />
                  </CardBody>
                </Card>
              </ErrorBoundary>
            )}
          </>
        )}
        <ErrorBoundary className="mt-3">
          <Card className="my-3">
            <DeckStacks
              cards={picks}
              title="Picks"
              subtitle={makeSubtitle(picks.flat(3))}
              locationType={DraftLocation.PICKS}
              canDrop={canDrop}
              onMoveCard={handleMoveCard}
            />
          </Card>
        </ErrorBoundary>
      </DndProvider>
    </>
  );
};
CubeDraftPlayerUI.propTypes = {
  drafterState: DrafterStatePropType.isRequired,
  drafted: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number.isRequired).isRequired).isRequired)
    .isRequired,
  takeCard: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  picking: PropTypes.number,
};
CubeDraftPlayerUI.defaultProps = {
  picking: null,
};
export const CubeDraftPage = ({ cube, initialDraft, loginCallback }) => {
  const [picking, setPicking] = useState(null);
  const socket = useRef();
  const [drafterState, setDrafterState] = useState({
    step: { action: 'loading' },
    drafted: [],
    sideboard: [],
    seatNum: -1,
    packNum: 0,
    numPacks: 1,
    cardsInPack: [0],
    cards: [{ details: { type: '' } }],
  });
  useEffect(() => {
    socket.current = io('/wsdraft', { autoConnect: false, query: { draftid: initialDraft._id } });
    socket.current.on('drafterState', (newDrafterState) => {
      setPicking(null);
      setDrafterState(newDrafterState);
    });
    socket.current.connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { action, drafted, sideboard, seatNum, doneDrafting, cardsInPack } = useMemo(
    () => ({
      action: drafterState.step.action,
      drafted: drafterState.drafted,
      sideboard: drafterState.sideboard,
      seatNum: drafterState.seatNum,
      cardsInPack: drafterState.cardsInPack,
      doneDrafting: drafterState.packNum >= drafterState.numPacks,
    }),
    [drafterState],
  );

  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (doneDrafting && !submitted) {
      setSubmitted(true);
      (async () => {
        const response = await csrfFetch(`/draft/${initialDraft._id}/submit/${seatNum}`, { method: 'POST' });
        const json = await response.json();
        window.location.replace(json.url);
      })();
    }
  }, [doneDrafting, submitted, seatNum, initialDraft._id]);

  // This has to be async to allow the loading animation to be applied while it runs.
  const takeCard = useCallback(
    (cardIndex, target) => {
      if (socket.current && picking === null) {
        setPicking(cardsInPack.indexOf(cardIndex));
        if (action.match(/pick/)) {
          socket.current.emit('pick card', cardIndex, target);
        } else {
          socket.current.emit('trash card', cardIndex);
        }
      }
    },
    [action, picking, cardsInPack],
  );

  const moveCard = useCallback(({ source, target }) => {
    if (socket.current) {
      socket.current.emit('move card', source, target);
    }
  }, []);
  return (
    <MainLayout loginCallback={loginCallback}>
      <CubeLayout cube={cube} activeLink="playtest">
        <DisplayContextProvider cubeID={cube._id}>
          <CubeDraftPlayerUI
            picking={picking}
            drafterState={drafterState}
            sideboard={sideboard}
            drafted={drafted}
            takeCard={takeCard}
            moveCard={moveCard}
          />
        </DisplayContextProvider>
      </CubeLayout>
    </MainLayout>
  );
};
CubeDraftPage.propTypes = {
  cube: CubePropType.isRequired,
  initialDraft: DraftPropType.isRequired,
  loginCallback: PropTypes.string,
};
CubeDraftPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(CubeDraftPage);

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
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Collapse,
  Nav,
  Navbar,
  Button,
  Col,
  Row,
  Input,
  Badge,
} from 'reactstrap';

import CSRFForm from '@cubeartisan/client/components/CSRFForm.js';
import CustomImageToggler from '@cubeartisan/client/components/CustomImageToggler.js';
import DeckStacks from '@cubeartisan/client/components/DeckStacks.js';
import DndProvider from '@cubeartisan/client/components/DndProvider.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import ErrorBoundary from '@cubeartisan/client/components/ErrorBoundary.js';
import FoilCardImage from '@cubeartisan/client/components/FoilCardImage.js';
import { DisplayContextProvider } from '@cubeartisan/client/components/contexts/DisplayContext.js';
import CubeLayout from '@cubeartisan/client/layouts/CubeLayout.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import { makeSubtitle } from '@cubeartisan/client/utils/Card.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';
import Location, { moveOrAddCard } from '@cubeartisan/client/drafting/DraftLocation.js';
import { calculateBotPickFromOptions } from '@cubeartisan/client/drafting/draftbots.js';
import { getDefaultPosition } from '@cubeartisan/client/drafting/draftutil.js';
import { getGridDrafterState } from '@cubeartisan/client/drafting/griddraftutils.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';
import { fromEntries, toNullableInt } from '@cubeartisan/client/utils/Util.js';

const GRID_DRAFT_OPTIONS = [0, 1, 2].flatMap((ind) => [
  [0, 1, 2].map((offset) => 3 * ind + offset),
  [0, 1, 2].map((offset) => ind + 3 * offset),
]);
export const calculateGridBotPick = calculateBotPickFromOptions(GRID_DRAFT_OPTIONS);

const Pack = ({ pack, packNumber, pickNumber, makePick, seatIndex, turn }) => (
  <Card className="mt-3">
    <CardHeader>
      <CardTitle className="mb-0">
        <h4>
          Pack {packNumber + 1}, Pick {pickNumber + 1}
        </h4>
        <h4 className="mb-0">
          {turn && (
            <Badge color={turn === 1 ? 'primary' : 'danger'}>{`Player ${turn === 1 ? 'one' : 'two'}'s pick`}</Badge>
          )}
        </h4>
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Row className="mb-2 justify-content-center">
        <Col xs="1" />
        {[0, 1, 2].map((col) => (
          <Col key={`col-btn-${col}`} xs="3" md="2">
            <Button
              block
              outline
              color="success"
              onClick={() => {
                makePick({
                  seatIndex,
                  cardIndices: [0, 1, 2]
                    .map((row) => [pack[3 * row + col]?.index, 3 * row + col])
                    .filter(([x]) => x || x === 0),
                });
              }}
            >
              🡇
            </Button>
          </Col>
        ))}
      </Row>
      {[0, 1, 2].map((row) => (
        <Row key={`row-${row}`} className="justify-content-center">
          <Col className="my-2" xs="1">
            <Button
              className="float-right h-100"
              outline
              color="success"
              onClick={() => {
                makePick({
                  seatIndex,
                  cardIndices: [0, 1, 2]
                    .map((col) => [pack[3 * row + col]?.index, 3 * row + col])
                    .filter(([x]) => x || x === 0),
                });
              }}
            >
              🡆
            </Button>
          </Col>
          {[0, 1, 2].map((col) => (
            <Col key={`cell-${col}-${row}`} className="px-0" xs="3" md="2">
              {pack[row * 3 + col] ? (
                <FoilCardImage card={pack[row * 3 + col]} tags={[]} autocard />
              ) : (
                <img
                  src="/content/default_card.png"
                  alt="Empty card slot"
                  width="100%"
                  height="auto"
                  className="card-border"
                />
              )}
            </Col>
          ))}
        </Row>
      ))}
    </CardBody>
  </Card>
);

Pack.propTypes = {
  pack: PropTypes.arrayOf(CardPropType).isRequired,
  packNumber: PropTypes.number.isRequired,
  pickNumber: PropTypes.number.isRequired,
  seatIndex: PropTypes.number.isRequired,
  makePick: PropTypes.func.isRequired,
  turn: PropTypes.number,
};

Pack.defaultProps = {
  turn: null,
};

const MUTATIONS = {
  makePick: ({ newGridDraft, seatIndex, cardIndices }) => {
    console.log({ newGridDraft, seatIndex, cardIndices });

    newGridDraft.seats[seatIndex].pickorder.push(...cardIndices.map(([x]) => x));
    newGridDraft.seats[seatIndex].pickedIndices.push(...cardIndices.map(([, x]) => x));
    for (const [cardIndex] of cardIndices) {
      const pos = getDefaultPosition(newGridDraft.cards[cardIndex], newGridDraft.seats[seatIndex].drafted);
      newGridDraft.seats[seatIndex].drafted = moveOrAddCard(newGridDraft.seats[seatIndex].drafted, pos, cardIndex);
    }
  },
};

const useMutatableGridDraft = (initialGridDraft) => {
  const { cards } = initialGridDraft;
  const [gridDraft, setGridDraft] = useState(initialGridDraft);
  const mutations = fromEntries(
    Object.entries(MUTATIONS).map(([name, mutation]) => [
      name,
      // eslint-disable-next-line
      useCallback(
        ({ seatIndex, cardIndices }) =>
          setGridDraft((oldGridDraft) => {
            const newGridDraft = { ...oldGridDraft };
            newGridDraft.seats = Array.from(newGridDraft.seats);
            newGridDraft.seats[seatIndex] = { ...newGridDraft.seats[seatIndex] };
            mutation({ newGridDraft, seatIndex, cardIndices });
            return newGridDraft;
          }),
        // eslint-disable-next-line
        [mutation, setGridDraft, cards],
      ),
    ]),
  );
  return { gridDraft, mutations };
};

export const GridDraftPage = ({ cube, initialDraft, seatNumber, loginCallback }) => {
  const { cards, draftType } = initialDraft;
  const seatNum = toNullableInt(seatNumber) ?? 0;
  const { gridDraft, mutations } = useMutatableGridDraft(initialDraft);
  const submitDeckForm = useRef();
  const drafterStates = useMemo(() => {
    console.log(gridDraft);
    return [0, 1].map((idx) => getGridDrafterState({ gridDraft, seatNumber: idx }));
  }, [gridDraft]);
  const { turn, numPacks, packNum, pickNum } = drafterStates[seatNum];
  console.log(seatNum);
  const { cardsInPack } = drafterStates[turn ? 0 : 1];
  const doneDrafting = packNum >= numPacks;
  const pack = useMemo(() => cardsInPack.map((cardIndex) => cards[cardIndex]), [cardsInPack, cards]);

  // Picks is an array with 1st key C/NC, 2d key CMC, 3d key order
  const picked = useMemo(
    () =>
      gridDraft.seats.map(({ drafted }) =>
        drafted.map((row) => row.map((col) => col.map((cardIndex) => cards[cardIndex]))),
      ),
    [gridDraft, cards],
  );
  const botIndex = (seatNum + 1) % 2;
  const botDrafterState = drafterStates[botIndex];

  // The finish callback.
  useEffect(() => {
    (async () => {
      if (doneDrafting) {
        const submitableGridDraft = {
          ...gridDraft,
          cards: gridDraft.cards.map(({ details: _, ...card }) => ({ ...card })),
        };
        await csrfFetch(`/griddraft/${gridDraft._id}`, {
          method: 'PUT',
          body: JSON.stringify(submitableGridDraft),
          headers: { 'Content-Type': 'application/json' },
        });
        // eslint-disable-next-line
        submitDeckForm.current?.submit?.();
      }
    })();
  }, [doneDrafting, gridDraft]);

  useEffect(() => {
    if (botDrafterState.turn && draftType === 'bot') {
      mutations.makePick({ cardIndices: calculateGridBotPick(botDrafterState), seatIndex: botIndex });
    }
  }, [draftType, botDrafterState, mutations, botIndex]);

  return (
    <MainLayout loginCallback={loginCallback}>
      <CubeLayout cube={cube} activeLink="playtest">
        <DisplayContextProvider>
          <Navbar expand="xs" light className="usercontrols">
            <Collapse navbar>
              <Nav navbar>
                <CustomImageToggler />
              </Nav>
            </Collapse>
          </Navbar>
          <DynamicFlash />
          <CSRFForm
            className="d-none"
            innerRef={submitDeckForm}
            method="POST"
            action={`/griddraft/${initialDraft._id}/submit`}
          >
            <Input type="hidden" name="body" value={initialDraft._id} />
          </CSRFForm>
          <DndProvider>
            <ErrorBoundary>
              <Pack
                pack={pack}
                packNumber={packNum}
                pickNumber={pickNum}
                seatIndex={turn ? 0 : 1}
                makePick={mutations.makePick}
                turn={turn ? 1 : 2}
              />
            </ErrorBoundary>
            <ErrorBoundary className="mt-3">
              <Card className="mt-3">
                <DeckStacks
                  cards={picked[0]}
                  title={draftType === 'bot' ? 'Picks' : "Player One's Picks"}
                  subtitle={makeSubtitle(picked[0].flat(3))}
                  locationType={Location.PICKS}
                  canDrop={() => false}
                  onMoveCard={() => {}}
                />
              </Card>
              <Card className="my-3">
                <DeckStacks
                  cards={picked[1]}
                  title={draftType === 'bot' ? 'Bot Picks' : "Player Two's Picks"}
                  subtitle={makeSubtitle(picked[1].flat(3))}
                  locationType={Location.PICKS}
                  canDrop={() => false}
                  onMoveCard={() => {}}
                />
              </Card>
            </ErrorBoundary>
          </DndProvider>
        </DisplayContextProvider>
      </CubeLayout>
    </MainLayout>
  );
};

GridDraftPage.propTypes = {
  cube: CubePropType.isRequired,
  initialDraft: PropTypes.shape({
    cards: PropTypes.arrayOf(PropTypes.shape({ cardID: PropTypes.string })).isRequired,
    _id: PropTypes.string,
    ratings: PropTypes.objectOf(PropTypes.number),
    initial_state: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number.isRequired)).isRequired,
    basics: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    cube: PropTypes.string.isRequired,
    draftType: PropTypes.string.isRequired,
  }).isRequired,
  seatNumber: PropTypes.number,
  loginCallback: PropTypes.string,
};

GridDraftPage.defaultProps = {
  seatNumber: 0,
  loginCallback: '/',
};

export default RenderToRoot(GridDraftPage);

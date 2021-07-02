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
import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

import FoilCardImage from '@cubeartisan/client/components/FoilCardImage';
import withAutocard from '@cubeartisan/client/components/WithAutocard';
import { getCardColorClass } from '@cubeartisan/client/contexts/TagContext';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam';
import { DraftPropType } from '@cubeartisan/client/proptypes/DraftbotPropTypes';
import { cardName, encodeName } from '@cubeartisan/client/utils/Card';
import { getDrafterState } from '@cubeartisan/client/drafting/draftutil';
import { toNullableInt } from '@cubeartisan/client/utils/Util';

const AutocardItem = withAutocard(ListGroupItem);

export const ACTION_LABELS = Object.freeze({
  pick: 'Picked ',
  trash: 'Trash ',
  pickrandom: 'Randomly Picked ',
  trashrandom: 'Randomly Trashed ',
});

export const usePickListAndDrafterState = ({ draft, seatIndex, defaultIndex }) => {
  const [pickNumber, setPickNumber] = useQueryParam('pick', defaultIndex ?? 0);
  // This could be done a lot nicer with the proposed rewind function for recovering earlier states
  // from later ones.
  const [drafterStateByPickNumber, picksList] = useMemo(() => {
    const { cards } = draft;
    const { pickorder, trashorder } = draft.seats[seatIndex];
    const numToTake = pickorder.length + trashorder.length;
    const takenCards = [];
    const drafterStates = [];
    let prevTrashedNum = 0;
    let prevPickedNum = 0;
    for (let pickNumber2 = 0; pickNumber2 <= numToTake; pickNumber2++) {
      const drafterState = getDrafterState({ draft, seatNumber: seatIndex, pickNumber: pickNumber2 });
      const { packNum, pickedNum, trashedNum, step } = drafterState;
      // This handles the case of empty packs which we'll hopefully never have to deal with.
      while (packNum >= takenCards.length) takenCards.push([]);
      // It should not be possible for both to increase across 1 pick number
      // If it did we'd have a problem since multiple cards would be marked as part of the same pick.
      if (trashedNum > prevTrashedNum) {
        takenCards[packNum].push({
          action: step.action,
          card: cards[trashorder[prevTrashedNum]],
          pickNumber: pickNumber2 - 1,
        });
      } else if (pickedNum > prevPickedNum) {
        takenCards[packNum].push({
          action: step.action,
          card: cards[pickorder[prevPickedNum]],
          pickNumber: pickNumber2 - 1,
        });
      }
      prevTrashedNum = trashedNum;
      prevPickedNum = pickedNum;
      drafterStates.push(drafterState);
    }
    return [drafterStates, takenCards];
  }, [draft, seatIndex]);

  const setPickNumberFromEvent = useCallback(
    (event) => {
      const newPickNumber = toNullableInt(event.target.getAttribute('data-pick-number')) ?? 0;
      if (newPickNumber !== pickNumber) setPickNumber(newPickNumber);
    },
    [pickNumber, setPickNumber],
  );
  const drafterState = drafterStateByPickNumber[pickNumber];

  return { picksList, drafterState, setPickNumberFromEvent };
};

const DecksPickBreakdownInternal = ({ draft, seatIndex, defaultIndex }) => {
  const { picksList, setPickNumberFromEvent, drafterState } = usePickListAndDrafterState({
    draft,
    seatIndex,
    defaultIndex,
  });
  const { cards, cardsInPack, pickNum, packNum } = drafterState;
  return (
    <Row>
      <Col xs={12} sm={3}>
        <h4>Pick Order</h4>
        {picksList.map((list, listindex) => (
          <ListGroup key={/* eslint-disable-line react/no-array-index-key */ listindex} className="list-outline">
            <ListGroupItem className="list-group-heading">{`Pack ${listindex + 1}`}</ListGroupItem>
            {list.map(({ action, card, pickNumber }) => (
              <AutocardItem
                key={pickNumber}
                card={card}
                className={`card-list-item d-flex flex-row ${getCardColorClass(card)}`}
                data-in-modal
                onClick={setPickNumberFromEvent}
                data-pick-number={pickNumber}
              >
                {drafterState.pickNumber === pickNumber ? (
                  <strong>{`${ACTION_LABELS[action]}: ${cardName(card)}`}</strong>
                ) : (
                  <>{`${ACTION_LABELS[action]}: ${cardName(card)}`}</>
                )}
              </AutocardItem>
            ))}
          </ListGroup>
        ))}
      </Col>
      <Col xs={12} sm={9}>
        <h4>{`Pack ${packNum + 1}: Pick ${pickNum + 1}`}</h4>
        <Row noGutters>
          {cardsInPack.map((cardIndex) => (
            <Col key={/* eslint-disable-line react/no-array-index-key */ cardIndex} xs={4} sm={2}>
              <a href={`/tool/card/${encodeName(cards[cardIndex].details.name)}`}>
                <FoilCardImage autocard data-in-modal card={cards[cardIndex]} className="clickable" />
              </a>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};
DecksPickBreakdownInternal.propTypes = {
  draft: DraftPropType.isRequired,
  seatIndex: PropTypes.number.isRequired,
  defaultIndex: PropTypes.number,
};
DecksPickBreakdownInternal.defaultProps = {
  defaultIndex: 0,
};

const DecksPickBreakdown = ({ draft, ...props }) =>
  draft ? (
    <DecksPickBreakdownInternal draft={draft} {...props} />
  ) : (
    <h4>This deck does not have a related draft log or it is a Grid Draft log which we do not support yet.</h4>
  );

DecksPickBreakdown.propTypes = {
  draft: DraftPropType.isRequired,
  seatIndex: PropTypes.number.isRequired,
  defaultIndex: PropTypes.number,
};

DecksPickBreakdown.defaultProps = {
  defaultIndex: 0,
};

export default DecksPickBreakdown;

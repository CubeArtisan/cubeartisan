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
import { useCallback, useMemo } from 'react';
import { Col, Row } from 'reactstrap';

import CardImage from '@cubeartisan/client/components/CardImage.js';
import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';
import PickSelector from '@cubeartisan/client/components/inputs/PickSelector.js';
import { getDrafterState } from '@cubeartisan/client/drafting/draftutil.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import { DraftPropType } from '@cubeartisan/client/proptypes/DraftbotPropTypes.js';
import { cardName, encodeName } from '@cubeartisan/client/utils/Card.js';
import { toNullableInt } from '@cubeartisan/client/utils/Util.js';

const AutocardImage = withAutocard(CardImage);

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
    let prevPackNum = 0;
    for (let pickNumber2 = 0; pickNumber2 <= numToTake; pickNumber2++) {
      const drafterState = getDrafterState({ draft, seatNumber: seatIndex, pickNumber: pickNumber2 });
      const { packNum, pickedNum, trashedNum, step } = drafterState;
      // This handles the case of empty packs which we'll hopefully never have to deal with.
      while (prevPackNum >= takenCards.length) takenCards.push([]);
      // It should not be possible for both to increase across 1 pick number
      // If it did we'd have a problem since multiple cards would be marked as part of the same pick.
      if (trashedNum > prevTrashedNum) {
        takenCards[prevPackNum].push({
          action: step.action,
          card: cards[trashorder[prevTrashedNum]],
          pickNumber: pickNumber2 - 1,
        });
      } else if (pickedNum > prevPickedNum) {
        takenCards[prevPackNum].push({
          action: step.action,
          card: cards[pickorder[prevPickedNum]],
          pickNumber: pickNumber2 - 1,
        });
      }
      prevPackNum = packNum;
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
        <PickSelector
          picksList={picksList}
          curPickNumber={drafterState.pickNumber}
          setPickNumberFromEvent={setPickNumberFromEvent}
        />
      </Col>
      <Col xs={12} sm={9}>
        <h4>{`Pack ${packNum + 1}: Pick ${pickNum + 1}`}</h4>
        <Row noGutters>
          {cardsInPack.map((cardIndex) => (
            <Col key={/* eslint-disable-line react/no-array-index-key */ cardIndex} xs={4} sm={2}>
              <a href={`/card/${encodeName(cardName(cards[cardIndex]))}`}>
                <AutocardImage data-in-modal card={cards[cardIndex]} />
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

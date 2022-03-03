import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { getCardColorClass } from '@cubeartisan/client/components/contexts/TagContext.js';
import { cardName } from '@cubeartisan/client/utils/Card.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';

export const ACTION_LABELS = Object.freeze({
  pick: 'Picked ',
  trash: 'Trash ',
  pickrandom: 'Randomly Picked ',
  trashrandom: 'Randomly Trashed ',
});

const AutocardDiv = withAutocard('div');

const PickSelector = ({ picksList, curPickNumber, setPickNumberFromEvent }) => (
  <>
    <h4>Pick Order</h4>
    {picksList.map((list, listindex) => (
      <ListGroup key={/* eslint-disable-line react/no-array-index-key */ listindex} className="list-outline">
        <ListGroupItem className="list-group-heading">{`Pack ${listindex + 1}`}</ListGroupItem>
        {list.map(({ action, card, pickNumber }) => (
          <ListGroupItem
            key={pickNumber}
            className={`card-list-item d-flex flex-row ${getCardColorClass(card)}`}
            data-in-modal
          >
            <AutocardDiv card={card} onClick={setPickNumberFromEvent} data-pick-number={pickNumber}>
              {curPickNumber === pickNumber ? (
                <strong>{`${ACTION_LABELS[action]}: ${cardName(card)}`}</strong>
              ) : (
                `${ACTION_LABELS[action]}: ${cardName(card)}`
              )}
            </AutocardDiv>
          </ListGroupItem>
        ))}
      </ListGroup>
    ))}
  </>
);
PickSelector.propTypes = {
  picksList: PropTypes.arrayOf(PropTypes.arrayOf(CardPropType.isRequired).isRequired).isRequired,
  curPickNumber: PropTypes.number.isRequired,
  setPickNumberFromEvent: PropTypes.func.isRequired,
};
export default PickSelector;

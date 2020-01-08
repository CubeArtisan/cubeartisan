import React, { useCallback, useContext } from 'react';

import { Col, ListGroup, ListGroupItem, Row } from 'reactstrap';

import { sortDeep } from '../util/Sort';
import { alphaCompare } from '../util/Util';

import AutocardListItem from './AutocardListItem';
import GroupModalContext from './GroupModalContext';

const AutocardListGroup = ({ cards, heading, sort, rowTag, noGroupModal }) => {
  const RowTag = rowTag;
  const sorted = sortDeep(cards, sort);
  const { openGroupModal, setGroupModalCards } = useContext(GroupModalContext);
  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      setGroupModalCards(cards);
      openGroupModal();
    },
    [cards, openGroupModal, setGroupModalCards],
  );
  return (
    <ListGroup className="list-outline">
      <ListGroupItem
        tag="div"
        className={'list-group-heading' + (noGroupModal ? '' : ' clickable')}
        onClick={noGroupModal ? undefined : handleClick}
      >
        {heading}
      </ListGroupItem>
      {sorted.map(([label, group]) =>
        group.map((card, index) => (
          <RowTag
            key={typeof card.index === 'undefined' ? index : card.index}
            card={card}
            className={index === 0 ? 'cmc-group' : undefined}
          />
        )),
      )}
    </ListGroup>
  );
};

AutocardListGroup.defaultProps = {
  sort: 'CMC-Full',
  rowTag: AutocardListItem,
};

export default AutocardListGroup;

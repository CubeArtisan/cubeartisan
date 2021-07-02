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
import { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType';

import { ListGroup, ListGroupItem } from 'reactstrap';

import { sortDeep } from '@cubeartisan/client/utils/Sort';

import AutocardListItem from '@cubeartisan/client/components/AutocardListItem';
import CubeContext from '@cubeartisan/client/contexts/CubeContext';
import GroupModalContext from '@cubeartisan/client/contexts/GroupModalContext';

const AutocardListGroup = ({ cards, heading, sort, orderedSort, showOther, rowTag, noGroupModal }) => {
  const RowTag = rowTag;
  const sorted = sortDeep(cards, showOther, orderedSort, sort);
  const { canEdit } = useContext(CubeContext);
  const { openGroupModal, setGroupModalCards } = useContext(GroupModalContext);
  const canGroupModal = !noGroupModal && canEdit;
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
        className={`list-group-heading${canGroupModal ? ' clickable' : ''}`}
        onClick={canGroupModal ? handleClick : undefined}
      >
        {heading}
      </ListGroupItem>
      {sorted.map(([, group]) =>
        group.map((card, index) => (
          <RowTag
            key={card._id || (typeof card.index === 'undefined' ? index : card.index)}
            card={card}
            className={index === 0 ? 'cmc-group' : undefined}
          />
        )),
      )}
    </ListGroup>
  );
};

AutocardListGroup.propTypes = {
  cards: PropTypes.arrayOf(CardPropType).isRequired,
  rowTag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  noGroupModal: PropTypes.bool,
  heading: PropTypes.node.isRequired,
  sort: PropTypes.string,
  orderedSort: PropTypes.string,
  showOther: PropTypes.bool,
};

AutocardListGroup.defaultProps = {
  rowTag: AutocardListItem,
  noGroupModal: false,
  sort: 'Mana Value Full',
  orderedSort: 'Alphabetical',
  showOther: false,
};

export default AutocardListGroup;

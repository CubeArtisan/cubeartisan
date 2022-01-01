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
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import { Divider, List, ListSubheader, Typography } from '@mui/material';
import { useTheme } from '@mui/material/node/styles/index.js';

import { sortDeep } from '@cubeartisan/client/utils/Sort.js';

import AutocardListItem from '@cubeartisan/client/components/AutocardListItem.js';
import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import GroupModalContext from '@cubeartisan/client/components/contexts/GroupModalContext.js';
import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';

const AutocardListGroup = ({ cards, heading, sort, orderedSort, showOther, rowTag, noGroupModal }) => {
  const RowTag = rowTag;
  const sorted = sortDeep(cards, showOther, orderedSort, sort);
  const { canEdit } = useContext(CubeContext);
  const { openGroupModal, setGroupModalCards } = useContext(GroupModalContext);
  const { useSticky } = useContext(DisplayContext);
  const canGroupModal = !noGroupModal && canEdit;
  const theme = useTheme();
  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      setGroupModalCards(cards);
      openGroupModal();
    },
    [cards, openGroupModal, setGroupModalCards],
  );
  return (
    <List dense sx={{ border: `1px solid ${theme.palette.shadow.full}`, padding: '0px', marginY: 1 }}>
      <ListSubheader
        className={`list-group-heading${canGroupModal ? ' clickable' : ''}`}
        onClick={canGroupModal ? handleClick : undefined}
        sx={{ backgroundColor: 'background.darker', paddingLeft: 0.5, paddingRight: 0, paddingY: 1 }}
        disableSticky={!useSticky}
      >
        <Typography variant="subtitle2">{heading}</Typography>
      </ListSubheader>
      {sorted.map(([, group]) => (
        <>
          {group.map((card, index) => (
            <RowTag key={typeof card.index === 'undefined' ? `${card._id}-${index}` : card.index} card={card} />
          ))}
          <Divider />
        </>
      ))}
    </List>
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

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
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import { countGroup, sortDeep } from '@cubeartisan/client/utils/Sort.js';
import AutocardListGroup from '@cubeartisan/client/components/AutocardListGroup.js';
import AutocardListItem from '@cubeartisan/client/components/AutocardListItem.js';
import SortContext from '@cubeartisan/client/components/contexts/SortContext.js';

const TableView = ({ cards, rowTag, noGroupModal }) => {
  const { primary, secondary, tertiary, quaternary, showOther } = useContext(SortContext);

  const sorted = sortDeep(cards, showOther, quaternary, primary, secondary);
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
      {sorted.map(([columnLabel, column]) => (
        <Box
          key={columnLabel}
          sx={{
            minWidth: 100,
            flex: 1,
            marginX: 0.5,
          }}
        >
          <Typography variant="subtitle1" align="center">
            <>
              {columnLabel}
              :<br />
              {countGroup(column)}
            </>
          </Typography>
          {column.map(([label, row]) => (
            <AutocardListGroup
              key={label}
              heading={`${label} (${countGroup(row)})`}
              cards={row}
              rowTag={rowTag}
              noGroupModal={noGroupModal}
              sort={tertiary}
              orderedSort={quaternary}
              showOther={showOther}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};
TableView.propTypes = {
  cards: PropTypes.arrayOf(CardPropType).isRequired,
  rowTag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  noGroupModal: PropTypes.bool,
};
TableView.defaultProps = {
  rowTag: AutocardListItem,
  noGroupModal: false,
};

export default TableView;

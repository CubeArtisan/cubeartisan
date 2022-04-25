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
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Button, TableCell, Tooltip, Typography } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

const ICON_LOOKUP = {
  ascending: <ArrowDropUp />,
  descending: <ArrowDropDown />,
};

const HeaderCell = ({ label, fieldName, sortConfig, requestSort, tooltip, ...props }) => {
  const active = sortConfig && sortConfig.key === fieldName;
  const direction = active ? sortConfig.direction : 'nosort';

  return (
    <TableCell component="th" align="center" scope="col" {...props}>
      <Button onClick={() => requestSort(fieldName)} endIcon={ICON_LOOKUP[direction]}>
        {tooltip ? (
          <Tooltip title={tooltip}>
            <Typography sx={{ width: 'min-content' }}>{label}</Typography>
          </Tooltip>
        ) : (
          <Typography variant="body1" sx={{ width: 'min-content' }}>
            {label}
          </Typography>
        )}
      </Button>
    </TableCell>
  );
};

HeaderCell.propTypes = {
  label: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
  }),
  requestSort: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
};

HeaderCell.defaultProps = {
  tooltip: null,
  sortConfig: null,
};

export default HeaderCell;

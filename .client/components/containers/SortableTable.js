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
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { CSVLink } from 'react-csv';

import HeaderCell from '@cubeartisan/client/components/containers/HeaderCell.js';
import useSortableData from '@cubeartisan/client/hooks/UseSortableData.js';

export const roundNumber = (value) => {
  if (!Number.isFinite(value) || Number.isInteger(value)) {
    return value;
  }
  return value.toFixed(2);
};

export const valueRenderer = (value) => (
  <Typography variant="body1" sx={{ width: 'max-content' }}>
    {roundNumber(value)}
  </Typography>
);

export const percentRenderer = (value) => (
  <Typography variant="overline" sx={{ width: 'max-content' }}>
    {`(${roundNumber(value * 100)}%)`}
  </Typography>
);

export const compareStrings = (a, b) => a?.toString?.()?.localeCompare?.(b?.toString?.());

export const SortableTable = ({ data, defaultSortConfig, sortFns, columnProps, totalRow, totalCol, ...props }) => {
  const { items, requestSort, sortConfig } = useSortableData(data, defaultSortConfig, sortFns);

  const exportData = useMemo(
    () =>
      data.map((row) =>
        Object.fromEntries(
          Object.entries(row).map(([key, value]) => {
            if (value?.exportValue) {
              return [key, value?.exportValue];
            }
            return [key, value];
          }),
        ),
      ),
    [data],
  );

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CSVLink data={exportData} filename="export.csv">
        Download CSV
      </CSVLink>
      <Table stickyHeader sx={{ width: 'min-content', backgroundColor: 'background.darker' }} {...props}>
        <TableHead>
          <TableRow>
            {columnProps.map(({ title, key, sortable, heading, tooltip }) => {
              if (sortable) {
                return (
                  <HeaderCell
                    key={key}
                    fieldName={key}
                    label={title}
                    sortConfig={sortConfig}
                    requestSort={requestSort}
                    tooltip={tooltip}
                  />
                );
              }
              if (heading) {
                return (
                  <TableHead component="th" scope="col" key={key}>
                    {title}
                  </TableHead>
                );
              }
              return <TableCell key={key}>{title}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row, idx) => (
            <TableRow key={`row-${idx}` /* eslint-disable-line react/no-array-index-key */}>
              {columnProps.map(({ key, heading, renderFn }) =>
                heading ? (
                  <TableCell component="th" scope="row" key={key} sx={{ width: 'max-content' }}>
                    {(renderFn ?? valueRenderer)(row[key], row, key)}
                  </TableCell>
                ) : (
                  <TableCell key={key} sx={{ width: 'max-content' }}>
                    {(renderFn ?? valueRenderer)(row[key], row, key)}
                  </TableCell>
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

/**
 * @typedef ColumnProps
 * @property {string} title
 * @property {string} key
 * @property {boolean} [sortable]
 * @property {boolean} [heading]
 * @property {string?} [tooltip]
 * @property {(value: any, row?: object, key?: string) => React.ReactNode} [renderFn]
 */

/**
 * @template Data
 * @typedef SortableTableProps
 * @property {Data[]} data
 * @property {{[k in keyof Data]: 'ascending'|'descending'}} defaultSortConfig
 */

SortableTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  defaultSortConfig: PropTypes.shape({
    key: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['ascending', 'descending']).isRequired,
  }),
  sortFns: PropTypes.shape({}),
  columnProps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      heading: PropTypes.bool,
      tooltip: PropTypes.string,
      renderFunc: PropTypes.func,
    }).isRequired,
  ).isRequired,
  totalRow: PropTypes.bool,
  totalCol: PropTypes.bool,
};
SortableTable.defaultProps = {
  defaultSortConfig: null,
  sortFns: {},
  totalRow: false,
  totalCol: false,
};
export default SortableTable;

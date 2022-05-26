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
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';

import AsfanDropdown from '@cubeartisan/client/components/AsfanDropdown.js';
import ErrorBoundary from '@cubeartisan/client/components/containers/ErrorBoundary.js';
import {
  compareStrings,
  percentRenderer,
  SortableTable,
  valueRenderer,
} from '@cubeartisan/client/components/containers/SortableTable.js';
import LabeledSelect from '@cubeartisan/client/components/LabeledSelect.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import { cardCanBeSorted, sortGroupsOrdered, SORTS } from '@cubeartisan/client/utils/Sort.js';

const sortWithTotal = (pool, sort) =>
  [...sortGroupsOrdered(pool, sort), ['Total', pool]].map(([label, cards]) => [
    label,
    cards.reduce((acc, card) => acc + card.asfan, 0),
  ]);

const PERCENT_OF_VALUES = ['Table Total', 'Row Total', 'Column Total', 'No Percents'];

const AnalyticTable = ({ cards: allCards, cube, defaultFormatId, setAsfans }) => {
  const [column, setColumn] = useQueryParam('column', 'Color Identity');
  const [row, setRow] = useQueryParam('row', 'Type');
  const [percentOf, setPercentOf] = useQueryParam('percentOf', 'Table Total');

  // some criteria cannot be applied to some cards
  const cards = useMemo(
    () => allCards.filter((card) => cardCanBeSorted(card, column) && cardCanBeSorted(card, row)),
    [allCards, column, row],
  );
  const [columnCounts, columnLabels] = useMemo(() => {
    const counts = sortWithTotal(cards, column).filter(([label, count]) => label === 'Total' || count > 0);
    return [Object.fromEntries(counts), counts.map(([label]) => label)];
  }, [cards, column]);
  const rows = useMemo(
    () =>
      [...sortGroupsOrdered(cards, row), ['Total', cards]]
        .map(([label, groupCards]) => [label, Object.fromEntries(sortWithTotal(groupCards, column))])
        .map(([rowLabel, columnValues]) => ({
          rowLabel,
          ...Object.fromEntries(columnLabels.map((label) => [label, columnValues[label] ?? 0])),
        })),
    [cards, column, row, columnLabels],
  );

  const entryRenderer = useCallback(
    (value, { Total: rowTotal }, columnLabel) => {
      value = Number.isFinite(value) ? value : 0;
      let scalingFactor = null;
      if (percentOf === 'Table Total') scalingFactor = 1 / columnCounts.Total;
      else if (percentOf === 'Row Total') scalingFactor = 1 / rowTotal;
      else if (percentOf === 'Column Total') scalingFactor = 1 / columnCounts[columnLabel];
      return (
        <>
          {valueRenderer(value)}
          {scalingFactor && percentRenderer(value * scalingFactor)}
        </>
      );
    },
    [columnCounts, percentOf],
  );

  const columnProps = useMemo(
    () => [
      { key: 'rowLabel', title: row, heading: true, sortable: true },
      ...columnLabels.map((title) => ({ key: title, title, heading: false, sortable: true, renderFn: entryRenderer })),
    ],
    [entryRenderer, columnLabels, row],
  );

  return (
    <>
      <Typography variant="h4" key="header">
        Table
      </Typography>
      <Typography variant="subtitle1" key="subtitle">
        View card counts and percentages.
      </Typography>
      <LabeledSelect baseId="table-column-sort" label="Columns:" values={SORTS} setValue={setColumn} value={column} />
      <LabeledSelect baseId="table-row-sort" label="Rows:" values={SORTS} setValue={setRow} value={row} />
      <LabeledSelect
        baseId="table-percent"
        label="Show Percent Of:"
        values={PERCENT_OF_VALUES}
        value={percentOf}
        setValue={setPercentOf}
      />
      <AsfanDropdown cube={cube} defaultFormatId={defaultFormatId} setAsfans={setAsfans} />
      <ErrorBoundary>
        <SortableTable columnProps={columnProps} data={rows} sortFns={{ rowLabel: compareStrings }} />
      </ErrorBoundary>
    </>
  );
};

AnalyticTable.propTypes = {
  cards: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
  cube: CubePropType.isRequired,
  defaultFormatId: PropTypes.number,
  setAsfans: PropTypes.func.isRequired,
};
AnalyticTable.defaultProps = {
  defaultFormatId: null,
};

export default AnalyticTable;

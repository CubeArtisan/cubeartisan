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
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import AsfanDropdown from '@cubeartisan/client/components/AsfanDropdown.js';
import ErrorBoundary from '@cubeartisan/client/components/containers/ErrorBoundary.js';
import { compareStrings, SortableTable } from '@cubeartisan/client/components/containers/SortableTable.js';
import LabeledSelect from '@cubeartisan/client/components/LabeledSelect.js';
import { weightedAverage, weightedMedian, weightedStdDev } from '@cubeartisan/client/drafting/createdraft.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import { cardType } from '@cubeartisan/client/utils/Card.js';
import { sortIntoGroups, SORTS } from '@cubeartisan/client/utils/Sort.js';

const Averages = ({ cards, characteristics, defaultFormatId, cube, setAsfans }) => {
  const [sort, setSort] = useQueryParam('sort', 'Color');
  const [characteristic, setCharacteristic] = useQueryParam('field', 'Mana Value');

  const groups = useMemo(() => sortIntoGroups(cards, sort), [cards, sort]);

  const counts = useMemo(
    () =>
      Object.entries(groups)
        .map((tuple) => {
          const vals = tuple[1]
            .filter((card) => {
              if (characteristic === 'Mana Value') {
                /* If we are calculating the average cmc, we don't want to include lands in the average.
                   We can't just filter out 0 cmc cards, so we need to check the type here. */
                const type = cardType(card);
                if (type.toLowerCase().includes('land')) return false;
              }
              return true;
            })
            .map((card) => [card.asfan, characteristics[characteristic].get(card)])
            .filter(
              ([weight, x]) =>
                // Don't include null, undefined, or NaN values, but we still want to include 0 values.
                weight && weight > 0 && (x || x === 0),
            );
          const avg = weightedAverage(vals);
          return {
            label: tuple[0],
            mean: avg.toFixed(2),
            median: weightedMedian(vals).toFixed(2),
            stddev: weightedStdDev(vals, avg).toFixed(2),
            count: vals.length,
            sum: (vals.length * avg).toFixed(2),
          };
        })
        .filter((row) => row.count > 0),
    [characteristic, characteristics, groups],
  );

  return (
    <>
      <Grid container>
        <Grid item>
          <Typography variant="h4">Averages</Typography>
          <Typography variant="body1">
            View the averages of a characteristic for all the cards, grouped by category.
          </Typography>
          <LabeledSelect label="Order By:" baseId="averages-sort" values={SORTS} value={sort} setValue={setSort} />
          <LabeledSelect
            label="Characteristic:"
            baseId="averages-characteristic"
            values={Object.keys(characteristics)}
            value={characteristic}
            setValue={setCharacteristic}
          />
        </Grid>
      </Grid>
      <AsfanDropdown cube={cube} defaultFormatId={defaultFormatId} setAsfans={setAsfans} />
      <ErrorBoundary>
        <SortableTable
          columnProps={[
            { key: 'label', title: sort, heading: true, sortable: true },
            { key: 'mean', title: 'Average (Mean)', sortable: true, heading: false },
            { key: 'median', title: 'Median', sortable: true, heading: false },
            { key: 'stddev', title: 'Standard Deviation', sortable: true, heading: false },
            { key: 'count', title: 'Count', sortable: true, heading: false },
            { key: 'sum', title: 'Sum', sortable: true, heading: false },
          ]}
          data={counts}
          sortFns={{ label: compareStrings }}
        />
      </ErrorBoundary>
    </>
  );
};
Averages.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  characteristics: PropTypes.shape({}).isRequired,
  cube: PropTypes.shape({
    cards: PropTypes.arrayOf(PropTypes.shape({ cardID: PropTypes.string.isRequired })).isRequired,
    draft_formats: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    ).isRequired,
    defaultDraftFormat: PropTypes.number,
  }).isRequired,
  defaultFormatId: PropTypes.number,
  setAsfans: PropTypes.func.isRequired,
};
Averages.defaultProps = {
  defaultFormatId: null,
};

export default Averages;

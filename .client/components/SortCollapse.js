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
import { Alert, Button, Collapse, Grid, Stack, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import SortContext from '@cubeartisan/client/components/contexts/SortContext.js';
import LabeledSelect from '@cubeartisan/client/components/inputs/LabeledSelect.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';
import Query from '@cubeartisan/client/utils/Query.js';
import { ORDERED_SORTS, SORTS } from '@cubeartisan/client/utils/Sort.js';

const SortCollapse = ({
  defaultPrimarySort,
  defaultSecondarySort,
  defaultTertiarySort,
  defaultQuaternarySort,
  defaultShowUnsorted,
  defaultSorts,
  cubeDefaultShowUnsorted,
  setSorts,
  isOpen,
  ...props
}) => {
  const [alerts, setAlerts] = useState([]);
  const { canEdit, cubeID } = useContext(CubeContext);
  const { primary, secondary, tertiary, quaternary, showOther, changeSort } = useContext(SortContext);

  const normalizeSort = (sort) => {
    if (sort === 'CMC') return 'Mana Value';
    if (sort === 'CMC2') return 'Mana Value 2';
    if (sort === 'CMC-Full') return 'Mana Value Full';
    return sort;
  };
  const formSorts = (src) => {
    const sorts = ['Color Category', 'Types-Multicolor', 'Mana Value', 'Alphabetical'];
    for (let i = 0; i < 4; i++) {
      if (src[i]) sorts[i] = normalizeSort(src[i]);
    }
    return sorts;
  };

  const [defSorts, setDefSorts] = useState(formSorts(defaultSorts));
  const [defShow, setDefShow] = useState(cubeDefaultShowUnsorted.toString());

  const prevSorts = useRef(defSorts);
  const prevShow = useRef(defShow);
  useEffect(() => {
    let currentPrimarySort = normalizeSort(defaultPrimarySort) ?? '';
    let currentSecondarySort = normalizeSort(defaultSecondarySort) ?? '';
    let currentTertiarySort = normalizeSort(defaultTertiarySort) ?? '';
    let currentQuaternarySort = normalizeSort(defaultQuaternarySort) ?? '';
    let currentShowUnsorted = defaultShowUnsorted ?? '';
    if (!SORTS.includes(currentPrimarySort)) currentPrimarySort = '';
    if (!SORTS.includes(currentSecondarySort)) currentSecondarySort = '';
    if (!SORTS.includes(currentTertiarySort)) currentTertiarySort = '';
    if (!ORDERED_SORTS.includes(currentQuaternarySort)) currentQuaternarySort = '';

    if (
      prevSorts[0] !== currentPrimarySort ||
      prevSorts[1] !== currentSecondarySort ||
      prevSorts[2] !== currentTertiarySort ||
      prevSorts[3] !== currentQuaternarySort ||
      prevShow.current !== currentShowUnsorted
    ) {
      if (!currentPrimarySort || currentPrimarySort === defSorts[0]) {
        Query.del('s1');
        [currentPrimarySort] = defSorts;
      }
      if (!currentSecondarySort || currentSecondarySort === defSorts[1]) {
        Query.del('s2');
        [, currentSecondarySort] = defSorts;
      }
      if (!currentTertiarySort || currentTertiarySort === defSorts[2]) {
        Query.del('s3');
        [, , currentTertiarySort] = defSorts;
      }
      if (!currentQuaternarySort || currentQuaternarySort === defSorts[3]) {
        Query.del('s4');
        [, , , currentQuaternarySort] = defSorts;
      }
      if (!currentShowUnsorted || currentShowUnsorted === defShow) {
        Query.del('so');
        currentShowUnsorted = defShow;
      }

      prevSorts.current = [currentPrimarySort, currentSecondarySort, currentTertiarySort, currentQuaternarySort];
      prevShow.current = currentShowUnsorted;
      if (setSorts) {
        setSorts(prevSorts.current);
      }
      changeSort({
        primary: currentPrimarySort,
        secondary: currentSecondarySort,
        tertiary: currentTertiarySort,
        quaternary: currentQuaternarySort,
      });
      if (currentShowUnsorted) {
        changeSort({ showOther: currentShowUnsorted === 'true' });
      }
    }
  }, [
    defaultPrimarySort,
    defaultSecondarySort,
    defaultTertiarySort,
    defaultQuaternarySort,
    defaultShowUnsorted,
    setSorts,
    changeSort,
    defSorts,
    defShow,
  ]);

  const addAlert = useCallback((color, message) => setAlerts((alertsB) => [...alertsB, { color, message }]), []);

  const handleReset = useCallback(() => {
    Query.del('s1');
    Query.del('s2');
    Query.del('s3');
    Query.del('s4');
    changeSort({ primary: defSorts[0], secondary: defSorts[1], tertiary: defSorts[2], quaternary: defSorts[3] });
  }, [defSorts, changeSort]);

  const handleSave = useCallback(async () => {
    try {
      await csrfFetch(`/cube/${cubeID}/sorts`, {
        method: 'PUT',
        body: JSON.stringify({
          sorts: [primary, secondary, tertiary, quaternary],
          showOther,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      addAlert('danger', 'Error saving default sorts.');
      return;
    }
    Query.del('s1');
    Query.del('s2');
    Query.del('s3');
    Query.del('s4');
    Query.del('so');
    setDefSorts([primary, secondary, tertiary, quaternary]);
    setDefShow(showOther.toString());
    addAlert('success', 'Default sorts saved.');
  }, [addAlert, cubeID, primary, secondary, tertiary, quaternary, showOther]);

  return (
    <Collapse in={isOpen} {...props}>
      {alerts.map(({ color, message }, index) => (
        <Alert key={index /* eslint-disable-line react/no-array-index-key */} sx={{ marginBottom: 1 }} severity={color}>
          {message}
        </Alert>
      ))}
      <Grid container>
        <Grid item xs={12} sm={6} lg={3} sx={{ marginTop: 2 }} key="primary">
          <LabeledSelect
            label="Primary Sort"
            baseId="primary-sort"
            value={primary}
            values={SORTS}
            setValue={(newPrimary) => {
              if (!newPrimary || newPrimary === defSorts[0]) {
                Query.del('s1');
              } else {
                Query.set('s1', newPrimary);
              }
              changeSort({ primary: newPrimary });
            }}
          />
        </Grid>
        <Grid xs={12} sm={6} lg={3} sx={{ marginTop: 2 }} key="secondary">
          <LabeledSelect
            label="Secondary Sort"
            baseId="secondary-sort"
            value={secondary}
            values={SORTS}
            setValue={(newSecondary) => {
              if (!newSecondary || newSecondary === defSorts[1]) {
                Query.del('s2');
              } else {
                Query.set('s2', newSecondary);
              }
              changeSort({ secondary: newSecondary });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ marginTop: 2 }} key="tertiary">
          <LabeledSelect
            label="Tertiary Sort"
            baseId="tertiary-sort"
            value={tertiary}
            values={SORTS}
            setValue={(newTertiary) => {
              if (!newTertiary || newTertiary === defSorts[2]) {
                Query.del('s3');
              } else {
                Query.set('s3', newTertiary);
              }
              changeSort({ tertiary: newTertiary });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ marginTop: 2 }} key="quaternary">
          <LabeledSelect
            label="Ordered Sort"
            baseId="ordered-sort"
            value={quaternary}
            values={ORDERED_SORTS}
            setValue={(newQuaternary) => {
              if (!newQuaternary || newQuaternary === defSorts[3]) {
                Query.del('s4');
              } else {
                Query.set('s4', newQuaternary);
              }
              changeSort({ quaternary: newQuaternary });
            }}
          />
        </Grid>
      </Grid>
      <Typography component="p" variant="body1" sx={{ marginY: 2 }}>
        <em>
          Cards will be appear as duplicates if they fit in multiple categories. The counts will still only count each
          item once.
        </em>
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button variant="outlined" color="success" onClick={handleReset}>
          Reset Sort
        </Button>
        {!canEdit ? (
          false
        ) : (
          <Button variant="outlined" color="success" onClick={handleSave}>
            Save as Default Sort
          </Button>
        )}
        <Tooltip title="Creates a separate column for cards that would be hidden otherwise.">
          <Button
            variant="outlined"
            color={showOther ? 'warning' : 'primary'}
            onClick={() => {
              const newShowOther = !showOther;
              if (newShowOther.toString() === defShow) {
                Query.del('so');
              } else {
                Query.set('so', newShowOther);
              }
              console.info(newShowOther);
              changeSort({ showOther: newShowOther });
            }}
          >
            {showOther ? 'Hide' : 'Show'} Unsorted Cards
          </Button>
        </Tooltip>
      </Stack>
    </Collapse>
  );
};
SortCollapse.propTypes = {
  defaultPrimarySort: PropTypes.string,
  defaultSecondarySort: PropTypes.string,
  defaultTertiarySort: PropTypes.string,
  defaultQuaternarySort: PropTypes.string,
  defaultShowUnsorted: PropTypes.string,
  defaultSorts: PropTypes.arrayOf(PropTypes.string.isRequired),
  cubeDefaultShowUnsorted: PropTypes.bool,
  setSorts: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};
SortCollapse.defaultProps = {
  defaultPrimarySort: '',
  defaultSecondarySort: '',
  defaultTertiarySort: '',
  defaultQuaternarySort: '',
  defaultShowUnsorted: '',
  defaultSorts: ['Color Category', 'Types-Multicolor', 'Mana Value', 'Alphabetical'],
  cubeDefaultShowUnsorted: false,
  isOpen: false,
};
export default SortCollapse;

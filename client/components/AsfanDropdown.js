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
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from '@mui/material';

import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import { calculateAsfans } from '@cubeartisan/client/drafting/createdraft.js';

const AsfanDropdown = ({ cube, defaultFormatId, setAsfans }) => {
  const [draftFormat, setDraftFormat] = useQueryParam('formatId', null);

  const toggleUseAsfans = useCallback(
    ({ target }) => setDraftFormat(target.checked ? defaultFormatId : null),
    [setDraftFormat, defaultFormatId],
  );

  useEffect(() => {
    if (draftFormat !== null) {
      try {
        const asfans = calculateAsfans(cube, draftFormat);
        setAsfans(asfans);
      } catch (e) {
        console.error('Invalid Draft Format', draftFormat, cube.draft_formats[draftFormat], e);
        setAsfans(Object.fromEntries(cube.cards.map((card) => [card.cardID, 0])));
      }
    } else {
      setAsfans(Object.fromEntries(cube.cards.map((card) => [card.cardID, 1])));
    }
  }, [cube, draftFormat, setAsfans]);
  const changeDraftFormat = (event) => setDraftFormat(event.target.value);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <FormControlLabel
          control={<Checkbox checked={draftFormat !== null} onChange={toggleUseAsfans} />}
          label="Use expected count per player in a draft format instead of card count."
        />
      </Grid>
      {draftFormat !== null && (
        <Grid item xs="12" sm="6">
          <FormControl>
            <InputLabel id="draftformat-selector-label">Draft Format</InputLabel>
            <Select
              labelId="draftformat-selector-label"
              id="draftformat-selector"
              value={draftFormat}
              defaultValue={-1}
              label="Draft Format"
              onChange={changeDraftFormat}
            >
              <MenuItem value={-1}>Standard Draft Format</MenuItem>
              {cube.draft_formats.length > 0 && <ListSubheader>Custom Formats</ListSubheader>}
              {cube.draft_formats.map((format, index) => (
                <MenuItem key={format._id} value={index}>
                  {format.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
    </Grid>
  );
};

AsfanDropdown.propTypes = {
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
AsfanDropdown.defaultProps = {
  defaultFormatId: -1,
};

export default AsfanDropdown;

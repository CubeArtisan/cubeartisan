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
import { Box, Checkbox } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '@cubeartisan/client/utils/Util.js';

const ColorIcon = ({ short, checked, color }) => (
  <Box
    component="img"
    src={`/content/symbols/${short.toLowerCase()}.png`}
    alt={color}
    title={color}
    sx={{
      backgroundColor: checked ? 'background.darker' : 'background.paper',
      width: '2.5rem',
    }}
  />
);
ColorIcon.propTypes = {
  short: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
};

const ColorChecks = ({ prefix, values, onChange, colors }) => (
  <Box sx={{ display: 'flex', borderRadius: '1rem', border: '1px solid', borderColor: 'text.primary' }}>
    {colors.map(([color, short]) => (
      <Checkbox
        sx={{ paddingX: 0.5 }}
        key={short}
        icon={<ColorIcon short={short} color={color} checked={false} />}
        checkedIcon={<ColorIcon short={short} color={color} checked />}
        checked={values[`${prefix || 'color'}${short}`]}
        onChange={onChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    ))}
  </Box>
);
ColorChecks.propTypes = {
  prefix: PropTypes.string,
  values: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  colors: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired),
};
ColorChecks.defaultProps = {
  prefix: 'colors',
  colors: COLORS,
};

const ColorChecksControl = ({ colorless, prefix, values, onChange }) => {
  const colors = colorless ? [...COLORS, ['Colorless', 'C']] : COLORS;
  return <ColorChecks prefix={prefix} values={values} onChange={onChange} colors={colors} />;
};
ColorChecksControl.propTypes = {
  colorless: PropTypes.bool,
  prefix: PropTypes.string,
  values: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};
ColorChecksControl.defaultProps = {
  colorless: false,
  prefix: 'color',
};
export default ColorChecksControl;

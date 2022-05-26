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
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

/** 2020-11-17 struesdell:
 * - Added classnames dependency, allowing for terse classname construction
 * - Added style to props shape to allow partial style passthrough
 * - Added propTypes declaration to resolve ESLint errors (issue #1601)
 * - Added defaultProps to support partial prop application
 */
const AspectRatioBox = ({ ratio, ...props }) => (
  <Box sx={{ position: 'relative', width: '100%', paddingTop: `${(100 / ratio).toFixed(5)}%` }}>
    <Box sx={{ position: 'absolute', overflow: 'hidden', inset: '0 0 0 0' }} {...props} />
  </Box>
);
AspectRatioBox.propTypes = {
  ratio: PropTypes.number.isRequired,
};
export default AspectRatioBox;

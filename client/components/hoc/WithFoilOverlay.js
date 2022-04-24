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
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
// import Image from 'mui-image/lib/index.js';
import { Box } from '@mui/material';

import { cardFinish } from '@cubeartisan/client/utils/Card.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';

const withFoilOverlay = (Tag) => {
  const WithFoilOverlay = forwardRef(({ card, finish: finishOverride, sx, ...props }, ref) => {
    const finish = finishOverride ?? cardFinish(card) ?? 'Non-foil';
    return (
      <Box sx={{ position: 'relative' }}>
        {finish !== 'Foil' ? (
          ''
        ) : (
          <Box
            component="img"
            src="/content/foilOverlay.png"
            width="100%"
            alt="Foil overlay"
            sx={{ ...sx, position: 'absolute', top: 0, left: 0, mixBlendMode: 'color', pointerEvents: 'none' }}
          />
        )}
        <Tag card={card} ref={ref} sx={sx} {...props} />
      </Box>
    );
  });
  WithFoilOverlay.propTypes = {
    card: CardPropType.isRequired,
    finish: PropTypes.string,
    sx: PropTypes.shape({}),
  };
  WithFoilOverlay.defaultProps = {
    finish: null,
    sx: {},
  };
  if (typeof Tag === 'string') {
    WithFoilOverlay.displayName = `${Tag}WithFoilOverlay`;
  } else if (Tag.displayName) {
    WithFoilOverlay.displayName = `${Tag.displayName}WithFoilOverlay`;
  } else if (Tag.name) {
    WithFoilOverlay.displayName = `${Tag.name}WithFoilOverlay`;
  } else {
    WithFoilOverlay.displayName = 'WithFoilOverlay';
  }
  return WithFoilOverlay;
};
export default withFoilOverlay;

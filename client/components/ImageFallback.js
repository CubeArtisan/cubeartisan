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
import React, { forwardRef, useEffect, useState } from 'react';
// import Image from 'mui-image/lib/index.js';

const ImageFallback = forwardRef(({ src, fallbackSrc, alt, ...props }, ref) => {
  const [fallback, setFallback] = useState(false);

  const handleError = () => setFallback(true);

  useEffect(() => setFallback(false), [src]);

  // eslint-disable-next-line jsx-a11y/alt-text
  return (
    <Box
      component="img"
      alt={fallback ? 'fallback image' : alt}
      src={fallback ? fallbackSrc : src}
      draggable="false"
      onError={handleError}
      ref={ref}
      {...props}
    />
  );
});
ImageFallback.propTypes = {
  src: PropTypes.string.isRequired,
  fallbackSrc: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
ImageFallback.defaultProps = {
  alt: '',
};
ImageFallback.displayName = 'ImageFallback';

export default ImageFallback;

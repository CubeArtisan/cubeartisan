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
import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Link, Typography } from '@mui/material';

import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import { getCubeDescription, getCubeId } from '@cubeartisan/client/utils/Util.js';

const CubePreview = ({ cube }) => (
  <Card>
    <CardActionArea href={`/cube/${encodeURIComponent(getCubeId(cube))}`}>
      <CardMedia
        component="img"
        alt={`cube.image_name Art by ${cube.image_artist}`}
        src={cube.image_uri}
        sx={{ aspectRatio: 626 / 457 }}
      />
      <CardContent>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          Art by {cube.image_artist}
        </Typography>
        <Typography variant="h5" title={cube.name} noWrap>
          {cube.name}
        </Typography>
        <Typography variant="body1" noWrap>
          {getCubeDescription(cube)}
        </Typography>
        <Typography nowrap variant="caption">
          Designed by <Link href={`/user/${cube.owner}`}>{cube.owner_name}</Link>
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

CubePreview.propTypes = {
  cube: CubePropType.isRequired,
};

export default CubePreview;

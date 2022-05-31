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

import PreviewCard from '@cubeartisan/client/components/utils/PreviewCard.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import { getCubeDescription, getCubeId } from '@cubeartisan/client/utils/Util.js';

const CubePreview = ({ cube }) => (
  <PreviewCard
    href={`/cube/${encodeURIComponent(getCubeId(cube))}`}
    date={cube.date_updated}
    image={cube.image_uri}
    title={cube.name}
    subtitle={getCubeDescription(cube)}
    username={cube.owner_name}
  />
);
CubePreview.propTypes = {
  cube: CubePropType.isRequired,
};
export default CubePreview;

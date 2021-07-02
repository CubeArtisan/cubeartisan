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
import { useCallback, useState } from 'react';

import CubePropType from '@cubeartisan/client/proptypes/CubePropType';

import { Card } from 'reactstrap';

import AspectRatioBox from '@cubeartisan/client/components/AspectRatioBox';

import { getCubeDescription, getCubeId } from '@cubeartisan/client/utils/Util';

const CubePreview = ({ cube }) => {
  const [hover, setHover] = useState(false);
  const handleMouseOver = useCallback((event) => setHover(!event.target.getAttribute('data-sublink')), []);
  const handleMouseOut = useCallback(() => setHover(false), []);
  const handleClick = useCallback(
    (event) => {
      if (!event.target.getAttribute('data-sublink')) {
        window.location.href = `/cube/overview/${encodeURIComponent(getCubeId(cube))}`;
      }
    },
    [cube],
  );

  return (
    <Card
      className={hover ? 'cube-preview-card hover' : 'cube-preview-card'}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleMouseOut}
    >
      <AspectRatioBox ratio={626 / 457} className="text-ellipsis">
        <img className="w-100" alt={cube.image_name} src={cube.image_uri} />
        <em className="cube-preview-artist">Art by {cube.image_artist}</em>
      </AspectRatioBox>
      <div className="w-100 py-1 px-2">
        <h5 className="text-muted text-ellipsis my-0" title={cube.name}>
          {cube.name}
        </h5>
        <div className="text-muted text-ellipsis">{getCubeDescription(cube)}</div>
        <em className="text-muted text-ellipsis">
          Designed by{' '}
          <a data-sublink href={`/user/view/${cube.owner}`}>
            {cube.owner_name}
          </a>
        </em>
      </div>
    </Card>
  );
};

CubePreview.propTypes = {
  cube: CubePropType.isRequired,
};

export default CubePreview;

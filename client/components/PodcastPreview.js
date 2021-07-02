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
import { useState, useCallback } from 'react';
import PodcastPropType from '@cubeartisan/client/proptypes/PodcastPropType';

import { Card } from 'reactstrap';
import AspectRatioBox from '@cubeartisan/client/components/AspectRatioBox';

const PodcastPreview = ({ podcast }) => {
  const [hover, setHover] = useState(false);
  const handleMouseOver = useCallback((event) => setHover(!event.target.getAttribute('data-sublink')), []);
  const handleMouseOut = useCallback(() => setHover(false), []);
  const handleClick = useCallback(
    (event) => {
      if (!event.target.getAttribute('data-sublink')) {
        window.location.href = `/content/podcast/${podcast._id}`;
      }
    },
    [podcast],
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
      <AspectRatioBox ratio={1} className="text-ellipsis">
        <img className="w-100" alt={podcast.title} src={podcast.image} />
      </AspectRatioBox>
      <div className="w-100 py-1 px-2">
        <h5 className="text-muted text-ellipsis my-0">{podcast.title}</h5>
        <small>
          <em className="text-muted text-ellipsis">
            By{' '}
            <a data-sublink href={`/user/view/${podcast.owner}`}>
              {podcast.username}
            </a>
          </em>
        </small>
      </div>
    </Card>
  );
};

PodcastPreview.propTypes = {
  podcast: PodcastPropType.isRequired,
};

export default PodcastPreview;

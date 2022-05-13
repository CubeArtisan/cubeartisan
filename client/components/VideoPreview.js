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
import VideoPropType from '@cubeartisan/client/proptypes/VideoPropType.js';

import PreviewCard from '@cubeartisan/client/components/PreviewCard.js';

const VideoPreview = ({ video }) => (
  <PreviewCard
    href={`/creators/video/${video._id}`}
    date={video.date}
    image={video.image}
    title={video.title}
    subtitle={video.short}
    username={video.username}
  />
);
VideoPreview.propTypes = {
  video: VideoPropType.isRequired,
};
export default VideoPreview;

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
import React, { useContext } from 'react';
import { Card, CardHeader } from 'reactstrap';

import ButtonLink from '@cubeartisan/client/components/ButtonLink.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import Video from '@cubeartisan/client/components/Video.js';
import VideoPropType from '@cubeartisan/client/proptypes/VideoPropType.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

export const VideoPage = ({ loginCallback, video }) => {
  const user = useContext(UserContext);

  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <Card className="mb-3">
        {user && user._id === video.owner && (
          <CardHeader>
            <h5>
              {video.status !== 'published' && <em className="pr-3">*Draft*</em>}
              <ButtonLink color="success" href={`/creators/video/${video._id}/edit`}>
                Edit
              </ButtonLink>
            </h5>
          </CardHeader>
        )}
        <Video video={video} />
      </Card>
    </MainLayout>
  );
};

VideoPage.propTypes = {
  loginCallback: PropTypes.string,
  video: VideoPropType.isRequired,
};

VideoPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(VideoPage);

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
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { lazy, useContext } from 'react';

import { ContainerHeader, LayoutContainer } from '@cubeartisan/client/components/containers/LayoutContainer.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import VideoPropType from '@cubeartisan/client/proptypes/VideoPropType.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const Video = lazy(() => import('@cubeartisan/client/components/Video.js'));

export const VideoPage = ({ loginCallback, video }) => {
  const user = useContext(UserContext);

  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <LayoutContainer sx={{ marginBottom: 3 }}>
        {user && user._id === video.owner && (
          <ContainerHeader title={video.status !== 'published' ? '*Draft*' : null}>
            <Button color="success" href={`/creators/video/${video._id}/edit`}>
              Edit
            </Button>
          </ContainerHeader>
        )}
        <Suspense>
          <Video video={video} />
        </Suspense>
      </LayoutContainer>
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

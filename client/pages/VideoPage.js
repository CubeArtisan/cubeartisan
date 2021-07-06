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
import { useContext } from 'react';
import PropTypes from 'prop-types';
import VideoPropType from '@cubeartisan/client/proptypes/VideoPropType';

import { CardHeader, Card } from 'reactstrap';

import UserContext from '@cubeartisan/client/components/contexts/UserContext';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash';
import Video from '@cubeartisan/client/components/Video';
import ButtonLink from '@cubeartisan/client/components/ButtonLink';
import MainLayout from '@cubeartisan/client/layouts/MainLayout';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot';

const VideoPage = ({ loginCallback, video }) => {
  const user = useContext(UserContext);

  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <Card className="mb-3">
        {user && user.id === video.owner && video.status !== 'published' && (
          <CardHeader>
            <h5>
              <em className="pr-3">*Draft*</em>
              <ButtonLink color="success" outline href={`/content/video/edit/${video._id}`}>
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

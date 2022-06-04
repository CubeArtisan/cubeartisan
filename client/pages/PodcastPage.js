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
import PodcastPropType from '@cubeartisan/client/proptypes/PodcastPropType.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const Podcast = lazy(() => import('@cubeartisan/client/components/Podcast.js'));

export const PodcastPage = ({ loginCallback, podcast, episodes }) => {
  const user = useContext(UserContext);

  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <LayoutContainer sx={{ marginBottom: 3 }}>
        {user && user._id === podcast.owner && (
          <ContainerHeader title={podcast.status !== 'published' ? '*Draft*' : null}>
            <Button color="primary" href={`/creators/article/${podcast._id}/edit`}>
              Edit
            </Button>
            <Button color="primary" href={`/creators/podcast/${podcast._id}/fetch`}>
              Fetch Episodes
            </Button>
          </ContainerHeader>
        )}
        <Suspense>
          <Podcast podcast={podcast} episodes={episodes} />
        </Suspense>
      </LayoutContainer>
    </MainLayout>
  );
};
PodcastPage.propTypes = {
  loginCallback: PropTypes.string,
  podcast: PodcastPropType.isRequired,
  episodes: PropTypes.arrayOf(PodcastPropType.isRequired).isRequired,
};
PodcastPage.defaultProps = {
  loginCallback: '/',
};
export default RenderToRoot(PodcastPage);

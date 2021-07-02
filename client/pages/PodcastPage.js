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
import PodcastPropType from '@cubeartisan/client/proptypes/PodcastPropType';

import { CardHeader, Card } from 'reactstrap';

import UserContext from '@cubeartisan/client/contexts/UserContext';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash';
import Podcast from '@cubeartisan/client/components/Podcast';
import ButtonLink from '@cubeartisan/client/components/ButtonLink';
import MainLayout from '@cubeartisan/client/layouts/MainLayout';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot';

const PodcastPage = ({ loginCallback, podcast, episodes }) => {
  const user = useContext(UserContext);

  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <Card className="mb-3">
        {user && user.id === podcast.owner && (
          <CardHeader>
            <h5>
              {podcast.status !== 'published' && (
                <>
                  <em className="pr-3">*Draft*</em>
                  <ButtonLink color="success" outline href={`/content/podcast/edit/${podcast._id}`}>
                    Edit
                  </ButtonLink>
                </>
              )}
              <ButtonLink color="primary" outline href={`/content/podcast/update/${podcast._id}`}>
                Fetch Episodes
              </ButtonLink>
            </h5>
          </CardHeader>
        )}
        <Podcast podcast={podcast} episodes={episodes} />
      </Card>
    </MainLayout>
  );
};

PodcastPage.propTypes = {
  loginCallback: PropTypes.string,
  podcast: PodcastPropType.isRequired,
  episodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

PodcastPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(PodcastPage);

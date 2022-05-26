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
import React, { lazy } from 'react';
import { Card, CardHeader, Col, Row } from 'reactstrap';

import Paginate from '@cubeartisan/client/components/containers/Paginate.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const PodcastPreview = lazy(() => import('@cubeartisan/client/components/PodcastPreview.js'));
const PodcastEpisodePreview = lazy(() => import('@cubeartisan/client/components/PodcastEpisodePreview.js'));

const PAGE_SIZE = 24;

export const PodcastsPage = ({ loginCallback, podcasts, episodes, count, page }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Card className="my-3">
      <CardHeader>
        <h5>Podcasts</h5>
      </CardHeader>
      <Row>
        <Suspense>
          {podcasts.map((podcast) => (
            <Col xs="12" sm="6" lg="3">
              <PodcastPreview podcast={podcast} />
            </Col>
          ))}
        </Suspense>
      </Row>
    </Card>
    <h4>Podcast Episodes</h4>
    <DynamicFlash />
    <Row>
      <Suspense>
        {episodes.map((episode) => (
          <Col className="mb-3" xs="12" sm="6" lg="4">
            <PodcastEpisodePreview episode={episode} />
          </Col>
        ))}
      </Suspense>
    </Row>
    {count > PAGE_SIZE && (
      <Paginate count={Math.ceil(count / PAGE_SIZE)} active={parseInt(page, 10)} urlF={(i) => `/podcasts/${i}`} />
    )}
  </MainLayout>
);

PodcastsPage.propTypes = {
  loginCallback: PropTypes.string,
  podcasts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  episodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

PodcastsPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(PodcastsPage);

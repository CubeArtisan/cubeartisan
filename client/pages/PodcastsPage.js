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

import { CardHeader, Card, Row, Col } from 'reactstrap';

import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import PodcastPreview from '@cubeartisan/client/components/PodcastPreview.js';
import Paginate from '@cubeartisan/client/components/Paginate.js';
import PodcastEpisodePreview from '@cubeartisan/client/components/PodcastEpisodePreview.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const PAGE_SIZE = 24;

const PodcastsPage = ({ loginCallback, podcasts, episodes, count, page }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Card className="my-3">
      <CardHeader>
        <h5>Podcasts</h5>
      </CardHeader>
      <Row>
        {podcasts.map((podcast) => (
          <Col xs="12" sm="6" lg="3">
            <PodcastPreview podcast={podcast} />
          </Col>
        ))}
      </Row>
    </Card>
    <h4>Podcast Episodes</h4>
    <DynamicFlash />
    <Row>
      {episodes.map((episode) => (
        <Col className="mb-3" xs="12" sm="6" lg="4">
          <PodcastEpisodePreview episode={episode} />
        </Col>
      ))}
    </Row>
    {count > PAGE_SIZE && (
      <Paginate
        count={Math.ceil(count / PAGE_SIZE)}
        active={parseInt(page, 10)}
        urlF={(i) => `/content/podcasts/${i}`}
      />
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

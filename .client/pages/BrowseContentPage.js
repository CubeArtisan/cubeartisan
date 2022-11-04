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
import { Col, Row } from 'reactstrap';

import ArticlePreview from '@cubeartisan/client/components/ArticlePreview.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import PodcastEpisodePreview from '@cubeartisan/client/components/PodcastEpisodePreview.js';
import VideoPreview from '@cubeartisan/client/components/VideoPreview.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

export const BrowseContentPage = ({ loginCallback, content }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Row>
      <Col xs="12">
        <Row>
          <Col xs="6">
            <h4>Browse Content</h4>
          </Col>
        </Row>
      </Col>
      {content.map((item) => (
        <Col className="mb-3" xs="6" md="4">
          {item.type === 'article' && <ArticlePreview article={item.content} />}
          {item.type === 'video' && <VideoPreview video={item.content} />}
          {item.type === 'episode' && <PodcastEpisodePreview episode={item.content} />}
        </Col>
      ))}
    </Row>
  </MainLayout>
);

BrowseContentPage.propTypes = {
  loginCallback: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

BrowseContentPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(BrowseContentPage);

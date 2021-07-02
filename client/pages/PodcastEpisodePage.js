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
import PodcastPropType from '@cubeartisan/client/proptypes/PodcastPropType';

import { CardHeader, Card, Row, Col, CardBody } from 'reactstrap';

import DynamicFlash from '@cubeartisan/client/components/DynamicFlash';
import MainLayout from '@cubeartisan/client/layouts/MainLayout';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot';
import AspectRatioBox from '@cubeartisan/client/components/AspectRatioBox';
import CommentsSection from '@cubeartisan/client/components/CommentsSection';
import ReactAudioPlayer from 'react-audio-player';
import TimeAgo from 'react-timeago';

const PodcastEpisodePage = ({ loginCallback, episode }) => {
  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <Card className="mb-3">
        <CardHeader>
          <h1>{episode.title}</h1>
          <h6>
            From <a href={`/content/podcast/${episode.podcast}`}>{episode.podcastname}</a>
            {' - '}
            <TimeAgo date={episode.date} />
          </h6>
        </CardHeader>
        <Row noGutters>
          <Col xs="12" sm="4" className="pr-0">
            <AspectRatioBox ratio={1} className="text-ellipsis">
              <img className="w-100" alt={episode.title} src={episode.image} />
            </AspectRatioBox>
          </Col>
          <Col xs="12" sm="8" className="border-left pl-0">
            <CardBody>
              <ReactAudioPlayer src={episode.source} controls />
            </CardBody>
            <CardBody className="border-top" dangerouslySetInnerHTML={{ __html: episode.description }} />
          </Col>
        </Row>
        <div className="border-top">
          <CommentsSection parentType="episode" parent={episode._id} collapse={false} />
        </div>
      </Card>
    </MainLayout>
  );
};

PodcastEpisodePage.propTypes = {
  loginCallback: PropTypes.string,
  episode: PodcastPropType.isRequired,
};

PodcastEpisodePage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(PodcastEpisodePage);

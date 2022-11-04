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
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { CardBody, CardHeader, Col, Row } from 'reactstrap';

import CommentsSection from '@cubeartisan/client/components/CommentsSection.js';
import PodcastEpisodePreview from '@cubeartisan/client/components/PodcastEpisodePreview.js';
import PodcastPropType from '@cubeartisan/client/proptypes/PodcastPropType.js';

const Podcast = ({ podcast, episodes }) => (
  <>
    <CardHeader>
      <h1>{podcast.title}</h1>
      <h6>
        By <a href={`/user/${podcast.owner}`}>{podcast.username}</a>
      </h6>
    </CardHeader>
    <Row>
      <Col xs="12" sm="4">
        <Box sx={{ aspectRatio: 1 }}>
          <img className="w-100" alt={podcast.title} src={podcast.image} />
        </Box>
      </Col>
      <Col xs="12" sm="8">
        <CardBody dangerouslySetInnerHTML={{ __html: podcast.description }} />
      </Col>
    </Row>
    <CardBody className="border-top">
      {episodes.length <= 0 ? (
        <p>No episodes available. Check back later for new episodes!</p>
      ) : (
        <Row>
          {episodes.map((episode) => (
            <Col xs="12" sm="6" md="3" className="pb-3">
              <PodcastEpisodePreview episode={episode} />
            </Col>
          ))}
        </Row>
      )}
    </CardBody>
    <div className="border-top">
      <CommentsSection parentType="podcast" parent={podcast._id} collapse={false} />
    </div>
  </>
);
Podcast.propTypes = {
  podcast: PodcastPropType.isRequired,
  episodes: PropTypes.arrayOf(PodcastPropType.isRequired),
};
Podcast.defaultProps = {
  episodes: [],
};
export default Podcast;

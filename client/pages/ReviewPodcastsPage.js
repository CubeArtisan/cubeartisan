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
import PodcastPropType from '@cubeartisan/client/proptypes/PodcastPropType.js';

import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import Paginate from '@cubeartisan/client/components/Paginate.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';
import ButtonLink from '@cubeartisan/client/components/ButtonLink.js';
import PodcastPreview from '@cubeartisan/client/components/PodcastPreview.js';

const PAGE_SIZE = 24;

export const ReviewPodcastsPage = ({ loginCallback, podcasts, count, page }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Card className="my-3">
      <CardHeader>
        <h5>Podcasts in Review</h5>
        {count > PAGE_SIZE ? (
          <>
            <h6>
              {`Displaying ${PAGE_SIZE * page + 1}-${Math.min(count, PAGE_SIZE * (page + 1))} of ${count} Podcasts`}
            </h6>
            <Paginate
              count={Math.ceil(count / PAGE_SIZE)}
              active={parseInt(page, 10)}
              urlF={(i) => `/admin/reviewpodcasts/${i}`}
            />
          </>
        ) : (
          <h6>{`Displaying all ${count} Podcasts`}</h6>
        )}
      </CardHeader>
      {podcasts.map((podcast) => (
        <CardBody className="border-top">
          <Row>
            <Col xs="12" sm="4">
              <PodcastPreview podcast={podcast} />
            </Col>
            <Col xs="12" sm="4">
              <ButtonLink color="success" outline block href={`/admin/publishpodcast/${podcast._id}`}>
                Publish
              </ButtonLink>
            </Col>
            <Col xs="12" sm="4">
              <ButtonLink color="danger" outline block href={`/admin/removepodcastreview/${podcast._id}`}>
                Remove from Reviews
              </ButtonLink>
            </Col>
          </Row>
        </CardBody>
      ))}
    </Card>
  </MainLayout>
);

ReviewPodcastsPage.propTypes = {
  loginCallback: PropTypes.string,
  podcasts: PropTypes.arrayOf(PodcastPropType).isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

ReviewPodcastsPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(ReviewPodcastsPage);

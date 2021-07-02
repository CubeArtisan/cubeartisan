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
import VideoPropType from '@cubeartisan/client/proptypes/VideoPropType';

import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

import DynamicFlash from '@cubeartisan/client/components/DynamicFlash';
import Paginate from '@cubeartisan/client/components/Paginate';
import MainLayout from '@cubeartisan/client/layouts/MainLayout';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot';
import ButtonLink from '@cubeartisan/client/components/ButtonLink';
import VideoPreview from '@cubeartisan/client/components/VideoPreview';

const PAGE_SIZE = 24;

const ReviewVideosPage = ({ loginCallback, videos, count, page }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Card className="my-3">
      <CardHeader>
        <h5>Videos in Review</h5>
        {count > PAGE_SIZE ? (
          <>
            <h6>
              {`Displaying ${PAGE_SIZE * page + 1}-${Math.min(count, PAGE_SIZE * (page + 1))} of ${count} Videos`}
            </h6>
            <Paginate
              count={Math.ceil(count / PAGE_SIZE)}
              active={parseInt(page, 10)}
              urlF={(i) => `/admin/reviewvideos/${i}`}
            />
          </>
        ) : (
          <h6>{`Displaying all ${count} Videos`}</h6>
        )}
      </CardHeader>
      {videos.map((video) => (
        <CardBody className="border-top">
          <Row>
            <Col xs="12" sm="4">
              <VideoPreview video={video} />
            </Col>
            <Col xs="12" sm="4">
              <ButtonLink color="success" outline block href={`/admin/publishvideo/${video._id}`}>
                Publish
              </ButtonLink>
            </Col>
            <Col xs="12" sm="4">
              <ButtonLink color="danger" outline block href={`/admin/removevideoreview/${video._id}`}>
                Remove from Reviews
              </ButtonLink>
            </Col>
          </Row>
        </CardBody>
      ))}
    </Card>
  </MainLayout>
);

ReviewVideosPage.propTypes = {
  loginCallback: PropTypes.string,
  videos: PropTypes.arrayOf(VideoPropType).isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

ReviewVideosPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(ReviewVideosPage);

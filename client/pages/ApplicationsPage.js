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

import { Card, CardHeader, CardBody, Row, Col } from 'reactstrap';

import DynamicFlash from '@cubeartisan/client/components/DynamicFlash';
import Paginate from '@cubeartisan/client/components/Paginate';
import ButtonLink from '@cubeartisan/client/components/ButtonLink';
import MainLayout from '@cubeartisan/client/layouts/MainLayout';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot';
import TimeAgo from 'react-timeago';

const PAGE_SIZE = 24;

const AdminDashboardPage = ({ loginCallback, applications, count, page }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Card className="my-3">
      <CardHeader>
        <h5>Content Creator Applications</h5>
        {count > PAGE_SIZE ? (
          <>
            <h6>
              {`Displaying ${PAGE_SIZE * page + 1}-${Math.min(count, PAGE_SIZE * (page + 1))} of ${count} Applications`}
            </h6>
            <Paginate
              count={Math.ceil(count / PAGE_SIZE)}
              active={parseInt(page, 10)}
              urlF={(i) => `/admin/commentreports/${i}`}
            />
          </>
        ) : (
          <h6>{`Displaying all ${count} Applications`}</h6>
        )}
      </CardHeader>
      {applications.map((application) => (
        <Card>
          <CardBody>
            <p>
              Details:
              <Card>
                {application.info.split('\n').map((item) => (
                  <>
                    {item}
                    <br />
                  </>
                ))}
              </Card>
            </p>
            <p>
              Submitted by by:{' '}
              <a href={`/user/view/${application.userid}`} target="_blank" rel="noopener noreferrer">
                {application.userid}
              </a>
              - <TimeAgo date={application.timePosted} />
            </p>
            <Row>
              <Col xs="12" sm="6">
                <ButtonLink color="success" block outline href={`/admin/application/approve/${application._id}`}>
                  Approve
                </ButtonLink>
              </Col>
              <Col xs="12" sm="6">
                <ButtonLink color="danger" block outline href={`/admin/application/decline/${application._id}`}>
                  Decline
                </ButtonLink>
              </Col>
            </Row>
          </CardBody>
        </Card>
      ))}
    </Card>
  </MainLayout>
);

AdminDashboardPage.propTypes = {
  loginCallback: PropTypes.string,
  applications: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

AdminDashboardPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(AdminDashboardPage);

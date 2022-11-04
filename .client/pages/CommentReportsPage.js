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
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import Paginate from '@cubeartisan/client/components/containers/Paginate.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import TimeAgo from '@cubeartisan/client/components/wrappers/TimeAgo.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const PAGE_SIZE = 24;

export const CommentReportsPage = ({ loginCallback, reports, count, page }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Card className="my-3">
      <CardHeader>
        <h5>Recent Comments</h5>
        {count > PAGE_SIZE ? (
          <>
            <h6>
              {`Displaying ${PAGE_SIZE * page + 1}-${Math.min(count, PAGE_SIZE * (page + 1))} of ${count} Reports`}
            </h6>
            <Paginate
              count={Math.ceil(count / PAGE_SIZE)}
              active={parseInt(page, 10)}
              urlF={(i) => `/admin/commentreports/${i}`}
            />
          </>
        ) : (
          <h6>{`Displaying all ${count} Reports`}</h6>
        )}
      </CardHeader>
      {reports.map((report) => (
        <Card>
          <CardBody>
            <p>
              Comment:{' '}
              <a href={`/comment/${report.commentid}`} target="_blank" rel="noopener noreferrer">
                {report.commentid}
              </a>
            </p>
            <p>Reason: {report.reason}</p>
            <p>Details: {report.info}</p>
            <p>
              Reported by:{' '}
              <a href={`/user/${report.reportee}`} target="_blank" rel="noopener noreferrer">
                {report.reportee}
              </a>
              - <TimeAgo date={report.timePosted} />
            </p>
            <Row>
              <Col xs="12" sm="6">
                <Button color="success" variant="outlined" href={`/admin/ignorereport/${report._id}`}>
                  Ignore
                </Button>
              </Col>
              <Col xs="12" sm="6">
                <Button color="warning" variant="outlined" href={`/admin/removecomment/${report._id}`}>
                  Remove Comment
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      ))}
    </Card>
  </MainLayout>
);
CommentReportsPage.propTypes = {
  loginCallback: PropTypes.string,
  reports: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};
CommentReportsPage.defaultProps = {
  loginCallback: '/',
};
export default RenderToRoot(CommentReportsPage);

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

import { Card, CardHeader, CardBody } from 'reactstrap';

import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import ButtonLink from '@cubeartisan/client/components/ButtonLink.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

export const AdminDashboardPage = ({
  loginCallback,
  commentReportCount,
  applicationCount,
  articlesInReview,
  videosInReview,
  podcastsInReview,
}) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Card className="my-3 mx-4">
      <CardHeader>
        <h5>Admin Dashboard</h5>
      </CardHeader>
      <CardBody>
        <ButtonLink href="/admin/commentreports" block outline color="success">
          {`Comment Reports (${commentReportCount})`}
        </ButtonLink>
        <ButtonLink href="/admin/applications" block outline color="success">
          {`Content Creator Applications (${applicationCount})`}
        </ButtonLink>
        <ButtonLink href="/admin/comments" block outline color="success">
          Recent Comments
        </ButtonLink>
        <ButtonLink href="/admin/reviewarticles" block outline color="success">
          {`Review Articles (${articlesInReview})`}
        </ButtonLink>
        <ButtonLink href="/admin/reviewvideos" block outline color="success">
          {`Review Videos (${videosInReview})`}
        </ButtonLink>
        <ButtonLink href="/admin/reviewpodcasts" block outline color="success">
          {`Review Podcasts (${podcastsInReview})`}
        </ButtonLink>
      </CardBody>
    </Card>
  </MainLayout>
);

AdminDashboardPage.propTypes = {
  loginCallback: PropTypes.string,
  commentReportCount: PropTypes.number.isRequired,
  applicationCount: PropTypes.number.isRequired,
  articlesInReview: PropTypes.number.isRequired,
  videosInReview: PropTypes.number.isRequired,
  podcastsInReview: PropTypes.number.isRequired,
};

AdminDashboardPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(AdminDashboardPage);

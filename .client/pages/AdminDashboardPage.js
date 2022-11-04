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
import { Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';

import {
  ContainerBody,
  ContainerHeader,
  LayoutContainer,
} from '@cubeartisan/client/components/containers/LayoutContainer.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
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
    <LayoutContainer sx={{ marginX: 4, marginY: 3 }}>
      <ContainerHeader title="Admin Dashboard" />
      <ContainerBody>
        <Stack>
          <Button href="/admin/commentreports" variant="outlined" color="success">
            {`Comment Reports (${commentReportCount})`}
          </Button>
          <Button href="/admin/applications" variant="outlined" color="success">
            {`Content Creator Applications (${applicationCount})`}
          </Button>
          <Button href="/admin/comments" variant="outlined" color="success">
            Recent Comments
          </Button>
          <Button href="/admin/reviewarticles" variant="outlined" color="success">
            {`Review Articles (${articlesInReview})`}
          </Button>
          <Button href="/admin/reviewvideos" variant="outlined" color="success">
            {`Review Videos (${videosInReview})`}
          </Button>
          <Button href="/admin/reviewpodcasts" variant="outlined" color="success">
            {`Review Podcasts (${podcastsInReview})`}
          </Button>
        </Stack>
      </ContainerBody>
    </LayoutContainer>
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

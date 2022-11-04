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
import { lazy } from 'react';
import { Card, CardHeader, Nav, Spinner, TabContent, TabPane } from 'reactstrap';

import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import Tab from '@cubeartisan/client/components/Tab.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const CreatorArticles = lazy(() => import('@cubeartisan/client/components/CreatorArticles.js'));
const CreatorPodcasts = lazy(() => import('@cubeartisan/client/components/CreatorPodcasts.js'));
const CreatorVideos = lazy(() => import('@cubeartisan/client/components/CreatorVideos.js'));

export const CreatorsPage = ({ loginCallback }) => {
  const [tab, setTab] = useQueryParam('tab', '0');

  return (
    <MainLayout loginCallback={loginCallback}>
      <Card className="pb-3">
        <CardHeader>
          <h5>Content Creator Dashboard</h5>
        </CardHeader>
        <Nav className="mt-3" tabs justified>
          <Tab tab={tab} setTab={setTab} index="0">
            Articles
          </Tab>
          <Tab tab={tab} setTab={setTab} index="1">
            Podcasts
          </Tab>
          <Tab tab={tab} setTab={setTab} index="2">
            Videos
          </Tab>
        </Nav>
        <DynamicFlash />
        <TabContent activeTab={tab}>
          <TabPane tabId="0">
            <Suspense fallback={<Spinner />}>
              <CreatorArticles />
            </Suspense>
          </TabPane>
          <TabPane tabId="1">
            <Suspense fallback={<Spinner />}>
              <CreatorPodcasts />
            </Suspense>
          </TabPane>
          <TabPane tabId="2">
            <Suspense fallback={<Spinner />}>
              <CreatorVideos />
            </Suspense>
          </TabPane>
        </TabContent>
      </Card>
    </MainLayout>
  );
};

CreatorsPage.propTypes = {
  loginCallback: PropTypes.string,
};

CreatorsPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(CreatorsPage);

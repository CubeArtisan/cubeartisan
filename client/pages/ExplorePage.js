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
import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import CubeSearchNavBar from '@cubeartisan/client/components/CubeSearchNavBar.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';

const CubesCard = lazy(() => import('@cubeartisan/client/components/CubesCard.js'));

export const ExplorePage = ({ recents, featured, drafted, recentlyDrafted, loginCallback }) => (
  <MainLayout loginCallback={loginCallback}>
    <CubeSearchNavBar />
    <DynamicFlash />
    <Row>
      <Suspense>
        <Col lg={6} md={6} sm={12} xs={12}>
          <CubesCard title="Featured Cubes" className="mt-4" cubes={featured} />
          <CubesCard title="Recently Updated Cubes" className="mt-4" cubes={recents} />
        </Col>
        <Col lg={6} md={6} sm={12} xs={12}>
          <CubesCard title="Most Drafted Cubes" className="mt-4" cubes={drafted} />
          <CubesCard title="Recently Drafted Cubes" className="mt-4" cubes={recentlyDrafted} />
        </Col>
      </Suspense>
    </Row>
  </MainLayout>
);

const cubesListProp = PropTypes.arrayOf(CubePropType);

ExplorePage.propTypes = {
  recents: cubesListProp.isRequired,
  featured: cubesListProp.isRequired,
  drafted: cubesListProp.isRequired,
  recentlyDrafted: cubesListProp.isRequired,
  loginCallback: PropTypes.string,
};

ExplorePage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(ExplorePage);

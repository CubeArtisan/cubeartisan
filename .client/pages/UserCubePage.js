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
import { lazy, useContext } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import UserLayout from '@cubeartisan/client/components/layouts/UserLayout.js';
import Markdown from '@cubeartisan/client/components/markdown/Markdown.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const CubePreview = lazy(() => import('@cubeartisan/client/components/CubePreview.js'));

export const UserCubePage = ({ owner, followers, following, cubes, loginCallback }) => {
  const user = useContext(UserContext);

  return (
    <MainLayout loginCallback={loginCallback}>
      <UserLayout user={owner} followers={followers} following={following} activeLink="view">
        <DynamicFlash />
        <Card>
          <CardHeader>
            <h5 className="mb-0">About</h5>
          </CardHeader>
          <CardBody>
            <Row className="mb-3">
              {owner.image && (
                <Col xs={4} lg={3}>
                  <div className="position-relative">
                    <img width="100%" className="border" src={owner.image} alt={owner.image_name} />
                    <em className="cube-preview-artist">Art by {owner.artist}</em>
                  </div>
                </Col>
              )}
              <Col xs={owner.image ? 8 : 12} lg={owner.image ? 9 : 12}>
                <Markdown markdown={owner.about || '_This user has not yet filled out their about section._'} />
              </Col>
            </Row>
            {user && user._id === owner._id && (
              <Button color="success" fullWidth variant="outlined" href={`/user/${user._id}/account`}>
                Update
              </Button>
            )}
          </CardBody>
        </Card>
        <Row className="my-3">
          <Suspense>
            {cubes.map((cube) => (
              <Col key={cube._id} className="mt-3" xs={6} sm={4} md={3}>
                <CubePreview cube={cube} />
              </Col>
            ))}
          </Suspense>
        </Row>
      </UserLayout>
    </MainLayout>
  );
};

UserCubePage.propTypes = {
  owner: PropTypes.shape({
    about: PropTypes.string.isRequired,
    image_name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  followers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  following: PropTypes.bool.isRequired,
  cubes: PropTypes.arrayOf(CubePropType).isRequired,
  loginCallback: PropTypes.string,
};

UserCubePage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(UserCubePage);

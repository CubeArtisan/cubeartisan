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
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';

import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import CubePreview from '@cubeartisan/client/components/CubePreview.js';
import UserPreview from '@cubeartisan/client/components/UserPreview.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const UserSocialPage = ({ followedCubes, followedUsers, followers, loginCallback }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Row className="my-3">
      <Col xs={6}>
        <Card>
          <CardHeader>
            <h5 className="mb-0">Followed Cubes</h5>
          </CardHeader>
          {followedCubes.length > 0 ? (
            <CardBody className="p-0">
              <Row noGutters>
                {followedCubes.map((cube) => (
                  <Col key={cube._id} xs={12} sm={6}>
                    <CubePreview cube={cube} />
                  </Col>
                ))}
              </Row>
            </CardBody>
          ) : (
            <CardBody>You aren't following any cubes.</CardBody>
          )}
        </Card>
      </Col>
      <Col xs={6}>
        <Card>
          <CardHeader>
            <h5 className="mb-0">Followed Users</h5>
          </CardHeader>
          {followedUsers.length > 0 ? (
            <CardBody className="p-0">
              <Row noGutters>
                {followedUsers.map((item) => (
                  <Col key={item._id} xs={12} sm={6}>
                    <UserPreview user={item} />
                  </Col>
                ))}
              </Row>
            </CardBody>
          ) : (
            <CardBody>You aren't following any users.</CardBody>
          )}
        </Card>
      </Col>
      {followers.length > 0 && (
        <Col xs={12}>
          <Card className="mt-3">
            <CardHeader>
              <h5 className="mb-0">Followers</h5>
            </CardHeader>
            <CardBody className="p-0">
              <Row noGutters>
                {followers.map((item) => (
                  <Col key={item._id} xs={6} sm={3}>
                    <UserPreview user={item} />
                  </Col>
                ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
      )}
    </Row>
  </MainLayout>
);

UserSocialPage.propTypes = {
  followedCubes: PropTypes.arrayOf(CubePropType).isRequired,
  followedUsers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  followers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  loginCallback: PropTypes.string,
};

UserSocialPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(UserSocialPage);

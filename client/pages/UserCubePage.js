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
import { useContext } from 'react';
import PropTypes from 'prop-types';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType';

import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import UserContext from '@cubeartisan/client/contexts/UserContext';
import CubePreview from '@cubeartisan/client/components/CubePreview';
import UserLayout from '@cubeartisan/client/layouts/UserLayout';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash';
import MainLayout from '@cubeartisan/client/layouts/MainLayout';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot';
import Markdown from '@cubeartisan/client/components/Markdown';

const UserCubePage = ({ owner, followers, following, cubes, loginCallback }) => {
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
            {user && user.id === owner._id && (
              <Button color="success" block outline href="/user/account">
                Update
              </Button>
            )}
          </CardBody>
        </Card>
        <Row className="my-3">
          {cubes.map((cube) => (
            <Col key={cube._id} className="mt-3" xs={6} sm={4} md={3}>
              <CubePreview cube={cube} />
            </Col>
          ))}
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

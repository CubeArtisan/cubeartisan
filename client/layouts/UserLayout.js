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

import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';

import ErrorBoundary from '@cubeartisan/client/components/ErrorBoundary.js';
import FollowersModal from '@cubeartisan/client/components/modals/FollowersModal.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import CreateCubeModal from '@cubeartisan/client/components/modals/CreateCubeModal.js';

import { Nav, Navbar, NavItem, NavLink, Row } from 'reactstrap';

const FollowersModalLink = withModal('a', FollowersModal);
const CreateCubeModalLink = withModal(NavLink, CreateCubeModal);

const UserLayout = ({ user, followers, activeLink, children }) => {
  const activeUser = useContext(UserContext);
  const canEdit = activeUser && activeUser.id === user._id;

  const numFollowers = followers.length;
  const followersText = (
    <h6>
      {numFollowers} {numFollowers === 1 ? 'follower' : 'followers'}
    </h6>
  );
  return (
    <>
      <Nav tabs fill className="cubenav pt-2">
        <NavItem>
          <h5 href="#" style={{ color: '#218937' }}>
            {user.username}
          </h5>
          {numFollowers > 0 ? (
            <FollowersModalLink href="#" modalProps={{ followers }}>
              {followersText}
            </FollowersModalLink>
          ) : (
            followersText
          )}
          {/* TODO: Needs to be a POST method call. */}
          {/* {!following && !canEdit && ( */}
          {/*  <Button color="success" className="rounded-0 w-100" href={`/user/${user._id}/follow`}> */}
          {/*    Follow */}
          {/*  </Button> */}
          {/* )} */}
          {/* TODO: Needs to be a DELETE method call. */}
          {/* {following && !canEdit && ( */}
          {/*  <Button color="danger" outline className="rounded-0 w-100" href={`/user/${user._id}/follow`}> */}
          {/*    Unfollow */}
          {/*  </Button> */}
          {/* )} */}
        </NavItem>
        <NavItem className="px-2 align-self-end">
          <NavLink active={activeLink === 'view'} href={`/user/${user._id}`}>
            Cubes
          </NavLink>
        </NavItem>
        <NavItem className="px-2 align-self-end">
          <NavLink active={activeLink === 'decks'} href={`/user/${user._id}/decks`}>
            Decks
          </NavLink>
        </NavItem>
        <NavItem className="px-2 align-self-end">
          <NavLink active={activeLink === 'blog'} href={`/user/${user._id}/blog`}>
            Blog
          </NavLink>
        </NavItem>
      </Nav>
      {canEdit && (
        <Navbar light className="usercontrols">
          <Nav navbar>
            <NavItem>
              <CreateCubeModalLink>Create New Cube</CreateCubeModalLink>
            </NavItem>
          </Nav>
        </Navbar>
      )}
      <Row className="mb-3" />
      <ErrorBoundary>{children}</ErrorBoundary>
    </>
  );
};

UserLayout.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  followers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activeLink: PropTypes.string.isRequired,
  children: PropTypes.node,
};

UserLayout.defaultProps = {
  children: false,
};

export default UserLayout;

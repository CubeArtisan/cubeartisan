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
import { Box, Typography } from '@mui/material';
import { useCallback } from 'react';

import { ContainerBody, LayoutContainer } from '@cubeartisan/client/components/containers/LayoutContainer.js';
import UserPropType from '@cubeartisan/client/proptypes/UserPropType.js';

const UserPreview = ({ user }) => {
  const handleClick = useCallback((event) => {
    window.location.href = event.currentTarget.getAttribute('data-href');
  }, []);
  const followers = user.users_following.length;
  return (
    <LayoutContainer data-href={`/user/${user._id}`} onClick={handleClick}>
      <ContainerBody>
        <Box sx={{ aspectRatio: 626 / 457 }}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Box component="img" src={user.image} alt={user.username} sx={{ width: '100%' }} />
          <Typography component="em" variant="caption" sx={{ marginX: 2 }}>
            Art by {user.artist}
          </Typography>
        </Box>
        <Typography variant="h5">{user.username}</Typography>
        <Typography variant="body1">
          {' '}
          {followers} {followers === 1 ? 'follower' : 'followers'}
        </Typography>
      </ContainerBody>
    </LayoutContainer>
  );
};

UserPreview.propTypes = {
  user: UserPropType.isRequired,
};

export default UserPreview;

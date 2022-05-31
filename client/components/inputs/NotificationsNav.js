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
import { Notifications, NotificationsActive } from '@mui/icons-material';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useMemo, useState } from 'react';

import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import StyledButtonMenu from '@cubeartisan/client/components/inputs/StyledButtonMenu.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';

const NotificationsNav = ({ inMenu }) => {
  const user = useContext(UserContext);

  const [notifications, setNotifications] = useState(user.notifications);

  const clear = useCallback(async () => {
    await csrfFetch(`/user/${user._id}/notifications`, { method: 'DELETE' });
    setNotifications([]);
  }, [user._id]);

  // We're guaranteed to have a user if this is rendering.
  const notificationItems = useMemo(
    () => [
      { onClick: clear, text: 'Clear All' },
      ...notifications
        .slice(0, 100)
        .map((notification, index) => ({ text: notification.text, link: `/user/${user._id}/notifications/${index}` })),
    ],
    [user._id, notifications, clear],
  );
  const buttonText = notifications.length > 0 ? 'View your notifications' : 'No new notifications';
  const buttonIcon = notifications.length > 0 ? <NotificationsActive /> : <Notifications />;
  return (
    <StyledButtonMenu tooltip="Your notifications." menuItems={notificationItems} arrow={null}>
      {inMenu ? buttonText : buttonIcon}
    </StyledButtonMenu>
  );
};
NotificationsNav.propTypes = {
  inMenu: PropTypes.bool,
};
NotificationsNav.defaultProps = {
  inMenu: false,
};
export default NotificationsNav;

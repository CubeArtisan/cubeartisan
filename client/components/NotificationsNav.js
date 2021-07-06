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
import { useState, useContext } from 'react';

import UserContext from '@cubeartisan/client/components/contexts/UserContext';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, Badge, CardHeader, CardFooter } from 'reactstrap';

import { csrfFetch } from '@cubeartisan/client/utils/CSRF';
import LinkButton from '@cubeartisan/client/components/LinkButton';

const NotificationsNav = () => {
  const user = useContext(UserContext);

  const [notifications, setNotifications] = useState(user.notifications);

  const clear = async () => {
    await csrfFetch(`/user/${user._id}/notifications`, { method: 'DELETE' });
    setNotifications([]);
  };

  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        {notifications.length > 0 && (
          <Badge color="danger">{notifications.length > 100 ? '100+' : notifications.length}</Badge>
        )}
        <img className="notification-icon" src="/content/notification.png" alt="notifications" />
      </DropdownToggle>
      <DropdownMenu className="dropdown-no-green pb-0 mb-0" right>
        <CardHeader>
          <h6>
            Notifications
            {notifications.length > 0 && (
              <LinkButton className="card-subtitle float-right mt-0" onClick={clear}>
                Clear All
              </LinkButton>
            )}
          </h6>
        </CardHeader>
        <div className="sm-main-nav notification-scrollarea">
          {notifications.length > 0 ? (
            notifications.slice(0, 100).map((notification, index) => (
              <div className="user-notification py-3 px-2">
                <a className="no-underline-hover" href={`/user/${user._id}/notification/${index}`}>
                  <h6 className="card-subtitle">{notification.text}</h6>
                </a>
              </div>
            ))
          ) : (
            <div className="my-2">
              <em className="mx-4">You don't have any notifications to show.</em>
            </div>
          )}
        </div>
        <CardFooter className="pb-1 pt-1">
          <h6>
            <a className="my-0 card-subtitle" href={`/user/${user._id}/notifications`}>
              View Older Notifications
            </a>
          </h6>
        </CardFooter>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default NotificationsNav;

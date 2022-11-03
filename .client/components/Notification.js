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
import TimeAgo from '@cubeartisan/client/components/wrappers/TimeAgo.js';
import NotificationPropType from '@cubeartisan/client/proptypes/NotificationPropType.js';

const Notification = ({ notification }) => {
  const texts = notification.text.split(notification.user_from_name);
  return (
    <a className="no-underline-hover" href={notification.url}>
      <div className="border-top pb-2 pt-3 px-2 deck-preview">
        <h6 className="card-subtitle mb-2 text-muted">
          <a href={notification.url}>{texts[0]}</a>
          <a href={`/user/${notification.user_from}`}>{notification.user_from_name}</a>
          <a href={notification.url}>{texts[1]}</a>
          {' - '}
          <TimeAgo date={notification.date} />
        </h6>
      </div>
    </a>
  );
};
Notification.propTypes = {
  notification: NotificationPropType.isRequired,
};
export default Notification;

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
import DeckPropType from '@cubeartisan/client/proptypes/DeckPropType';

import { Card, CardBody, CardHeader } from 'reactstrap';

import DeckPreview from '@cubeartisan/client/components/DeckPreview';
import Paginate from '@cubeartisan/client/components/Paginate';
import UserLayout from '@cubeartisan/client/layouts/UserLayout';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash';
import MainLayout from '@cubeartisan/client/layouts/MainLayout';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot';

const UserDecksPage = ({ owner, followers, following, decks, pages, activePage, loginCallback }) => (
  <MainLayout loginCallback={loginCallback}>
    <UserLayout user={owner} followers={followers} following={following} activeLink="decks">
      <DynamicFlash />
      {pages > 1 && <Paginate count={pages} active={activePage} urlF={(i) => `/user/decks/${owner._id}/${i}`} />}
      <Card>
        <CardHeader>
          <h5 className="mb-0">All Decks</h5>
        </CardHeader>
        {decks.length > 0 ? (
          <CardBody className="p-0">
            {decks.map((deck) => (
              <DeckPreview key={deck._id} deck={deck} nextURL={`/user/decks/${owner._id}/${activePage}`} />
            ))}
          </CardBody>
        ) : (
          <CardBody>No decks to show.</CardBody>
        )}
      </Card>
      {pages > 1 && <Paginate count={pages} active={activePage} urlF={(i) => `/user/decks/${owner._id}/${i}`} />}
    </UserLayout>
  </MainLayout>
);

UserDecksPage.propTypes = {
  owner: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  followers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  following: PropTypes.bool.isRequired,
  decks: PropTypes.arrayOf(DeckPropType).isRequired,
  pages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  loginCallback: PropTypes.string,
};

UserDecksPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(UserDecksPage);

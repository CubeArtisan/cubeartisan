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
import { Card, CardBody, CardHeader } from 'reactstrap';

import Paginate from '@cubeartisan/client/components/containers/Paginate.js';
import DeckPreview from '@cubeartisan/client/components/DeckPreview.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import CubeLayout from '@cubeartisan/client/components/layouts/CubeLayout.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import DeckPropType from '@cubeartisan/client/proptypes/DeckPropType.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

export const CubeDecksPage = ({ cube, decks, pages, activePage, loginCallback }) => (
  <CubeLayout loginCallback={loginCallback} cube={cube} activeLink="playtest">
    <DynamicFlash />
    <div className="my-3">
      {pages > 1 && <Paginate count={pages} active={activePage} urlF={(i) => `/cube/${cube._id}/decks/${i}`} />}
      <Card>
        <CardHeader>
          <h5 className="mb-0">All Decks</h5>
        </CardHeader>
        <CardBody className="p-0">
          {decks.map((deck) => (
            <DeckPreview key={deck._id} deck={deck} nextURL={`/cube/${cube._id}/decks/${activePage}`} />
          ))}
        </CardBody>
      </Card>
      {pages > 1 && <Paginate count={pages} active={activePage} urlF={(i) => `/cube/${cube._id}/decks/${i}`} />}
    </div>
  </CubeLayout>
);
CubeDecksPage.propTypes = {
  cube: CubePropType.isRequired,
  decks: PropTypes.arrayOf(DeckPropType).isRequired,
  pages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  loginCallback: PropTypes.string,
};
CubeDecksPage.defaultProps = {
  loginCallback: '/',
};
export default RenderToRoot(CubeDecksPage);

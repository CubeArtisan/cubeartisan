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
import DeckPropType from '@hypercube/client/proptypes/DeckPropType';

import DeckPreview from '@hypercube/client/components/DeckPreview';
import Paginate from '@hypercube/client/components/Paginate';
import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';

import { Card, Col, Row, CardHeader, CardBody, CardFooter } from 'reactstrap';

const PER_PAGE = 30;

const RecentDraftsPage = ({ decks, currentPage, totalPages, count, loginCallback }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Row className="my-3">
      <Col xs="12">
        <Card>
          <CardHeader>
            {totalPages > 1 ? (
              <>
                <h5>
                  {`Displaying ${PER_PAGE * currentPage + 1}-${Math.min(
                    count,
                    PER_PAGE * (currentPage + 1),
                  )} of ${count} Drafts of Your Cubes`}
                </h5>
                <Paginate count={totalPages} active={currentPage} urlF={(i) => `/dashboard/decks/${i}`} />
              </>
            ) : (
              <h5>{`Displaying all ${count} Drafts of Your Cubes`}</h5>
            )}
          </CardHeader>
          <CardBody className="p-0">
            {decks.length > 0 ? (
              decks.map((deck) => <DeckPreview key={deck._id} deck={deck} nextURL="/dashboard" canEdit />)
            ) : (
              <p className="m-2">
                Nobody has drafted your cubes! Perhaps try reaching out on the{' '}
                <a href="https://discord.gg/Hn39bCU">Discord draft exchange?</a>
              </p>
            )}
          </CardBody>
          <CardFooter>
            <Paginate count={totalPages} active={currentPage} urlF={(i) => `/dashboard/decks/${i}`} />
          </CardFooter>
        </Card>
      </Col>
    </Row>
  </MainLayout>
);

RecentDraftsPage.propTypes = {
  decks: PropTypes.arrayOf(DeckPropType).isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  loginCallback: PropTypes.string,
};

RecentDraftsPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(RecentDraftsPage);

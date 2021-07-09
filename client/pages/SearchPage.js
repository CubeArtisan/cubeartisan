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

import { Card, CardHeader, Row, Col, CardBody } from 'reactstrap';

import CubeSearchNavBar from '@cubeartisan/client/components/CubeSearchNavBar.js';
import CubePreview from '@cubeartisan/client/components/CubePreview.js';
import Paginate from '@cubeartisan/client/components/Paginate.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

export const SearchPage = ({ cubes, query, count, perPage, page, order, loginCallback }) => {
  const pages = Math.ceil(count / perPage);

  return (
    <MainLayout loginCallback={loginCallback}>
      <CubeSearchNavBar query={query} order={order} title="Cube Search" />
      <br />
      <DynamicFlash />
      {(cubes && cubes.length) > 0 ? (
        <Card>
          <CardHeader>
            {pages > 1 ? (
              <>
                <h5>
                  {`Displaying ${perPage * page + 1}-${Math.min(count, perPage * (page + 1))} of ${count} Results`}
                </h5>
                <Paginate count={pages} active={page} urlF={(i) => `/search/${query}/${i}?order=${order}`} />
              </>
            ) : (
              <h5>{`Displaying all ${count} Results`}</h5>
            )}
          </CardHeader>
          <Row>
            {cubes.slice(0, 36).map((cube) => (
              <Col className="pb-4" xl={3} lg={3} md={4} sm={6} xs={12}>
                <CubePreview cube={cube} />
              </Col>
            ))}
          </Row>
          {pages > 1 && (
            <CardBody>
              <Paginate count={pages} active={page} urlF={(i) => `/search/${query}/${i}?order=${order}`} />
            </CardBody>
          )}
        </Card>
      ) : (
        <h4>No Results</h4>
      )}
    </MainLayout>
  );
};

SearchPage.propTypes = {
  cubes: PropTypes.arrayOf(CubePropType).isRequired,
  query: PropTypes.string,
  count: PropTypes.number,
  perPage: PropTypes.number,
  page: PropTypes.number,
  order: PropTypes.string,
  loginCallback: PropTypes.string,
};

SearchPage.defaultProps = {
  query: '',
  count: 0,
  perPage: 0,
  page: 0,
  order: 'date',
  loginCallback: '/',
};

export default RenderToRoot(SearchPage);

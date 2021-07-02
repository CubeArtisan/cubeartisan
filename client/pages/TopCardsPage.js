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
import { useState } from 'react';
import PropTypes from 'prop-types';
import CardDetailsPropType from '@cubeartisan/client/proptypes/CardDetailsPropType';

import DynamicFlash from '@cubeartisan/client/components/DynamicFlash';
import FilterCollapse from '@cubeartisan/client/components/FilterCollapse';
import TopCardsTable from '@cubeartisan/client/components/TopCardsTable';
import { Row, Col } from 'reactstrap';
import ButtonLink from '@cubeartisan/client/components/ButtonLink';
import MainLayout from '@cubeartisan/client/layouts/MainLayout';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam';

const TopCardsPage = ({ data, numResults, loginCallback }) => {
  const [filter, setFilter] = useQueryParam('f', '');
  const [count, setCount] = useState(numResults);

  const updateFilter = (_, filterInput) => {
    setFilter(filterInput);
  };

  return (
    <MainLayout loginCallback={loginCallback}>
      <div className="usercontrols pt-3 mb-3">
        <Row className="pb-3 mr-1">
          <Col xs="6">
            <h3 className="mx-3">Top Cards</h3>
          </Col>
          <Col xs="6">
            <div className="text-right">
              <ButtonLink outline color="success" href="/tool/searchcards">
                Search All Cards
              </ButtonLink>{' '}
              <ButtonLink outline color="success" href="/packages/browse">
                View Card Packages
              </ButtonLink>
            </div>
          </Col>
        </Row>
        <FilterCollapse
          isOpen
          defaultFilterText=""
          filter={filter}
          setFilter={updateFilter}
          numCards={count}
          numShown={Math.min(count, 100)}
        />
      </div>
      <DynamicFlash />
      <TopCardsTable filter={filter} setCount={setCount} count={count} cards={data} />
    </MainLayout>
  );
};

TopCardsPage.propTypes = {
  data: PropTypes.arrayOf(CardDetailsPropType).isRequired,
  numResults: PropTypes.number.isRequired,
  loginCallback: PropTypes.string,
};

TopCardsPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(TopCardsPage);

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
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Spinner,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  CustomInput,
} from 'reactstrap';

import Query from '@cubeartisan/client/utils/Query.js';
import Paginate from '@cubeartisan/client/components/Paginate.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import ButtonLink from '@cubeartisan/client/components/ButtonLink.js';
import CardGrid from '@cubeartisan/client/components/CardGrid.js';
import CardImage from '@cubeartisan/client/components/CardImage.js';
import FilterCollapse from '@cubeartisan/client/components/FilterCollapse.js';
import MainLayout from '@cubeartisan/client/layouts/MainLayout.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';
import { ORDERED_SORTS } from '@cubeartisan/client/utils/Sort.js';

export const CardSearchPage = ({ loginCallback }) => {
  const [page, setPage] = useState(parseInt(Query.get('p'), 10) ?? 0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(Query.get('f') || '');
  const [count, setCount] = useState(Query.get('m') || '');
  const [distinct, setDistinct] = useState(Query.get('di') || 'names');
  const [sort, setSort] = useState(Query.get('s') || 'Elo');
  const [direction, setDirection] = useState(Query.get('d') || 'descending');

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams([
        ['p', page],
        ['f', filter],
        ['s', sort],
        ['d', direction],
        ['di', distinct],
      ]);
      const response = await fetch(`cards/search/query?${params.toString()}`);
      if (!response.ok) {
        console.error(response);
      }

      Query.set('f', filter);
      Query.set('p', page);
      Query.set('s', sort);
      Query.set('d', direction);
      Query.set('di', distinct);

      const json = await response.json();

      setCards(json.data);
      setCount(json.numResults);
      setLoading(false);
    };
    if (filter && filter !== '') {
      fetchData();
    } else {
      setLoading(false);
      setCards([]);
    }
  }, [page, filter, direction, distinct, sort]);

  const updateFilter = (_, filterInput) => {
    setLoading(true);
    setPage(0);
    setCount(0);
    setFilter(filterInput);
  };

  const updatePage = (index) => {
    setLoading(true);
    setPage(index);
  };
  const updateSort = (index) => {
    setLoading(true);
    setSort(index);
  };
  const updateDirection = (index) => {
    setLoading(true);
    setDirection(index);
  };
  const updateDistinct = (index) => {
    setLoading(true);
    setDistinct(index);
  };

  return (
    <MainLayout loginCallback={loginCallback}>
      <div className="usercontrols pt-3">
        <Row className="pb-3 mr-1">
          <Col xs="6">
            <h3 className="mx-3">Search Cards</h3>
          </Col>
          <Col xs="6">
            <div className="text-right">
              <ButtonLink outline color="success" href="/packages">
                View Card Packages
              </ButtonLink>
            </div>
          </Col>
        </Row>
        <FilterCollapse
          defaultFilterText={filter.length > 0 ? filter : null}
          filter={filter}
          setFilter={updateFilter}
          numCards={count}
          isOpen
        />
        <Row className="px-3">
          <Col xs={12} sm={4}>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Sort: </InputGroupText>
              </InputGroupAddon>
              <CustomInput type="select" value={sort} onChange={(event) => updateSort(event.target.value)}>
                {ORDERED_SORTS.map((s) => (
                  <option value={s}>{s}</option>
                ))}
              </CustomInput>
            </InputGroup>
          </Col>
          <Col xs={12} sm={4}>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Direction: </InputGroupText>
              </InputGroupAddon>
              <CustomInput type="select" value={direction} onChange={(event) => updateDirection(event.target.value)}>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </CustomInput>
            </InputGroup>
          </Col>
          <Col xs={12} sm={4}>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Distinct: </InputGroupText>
              </InputGroupAddon>
              <CustomInput type="select" value={distinct} onChange={(event) => updateDistinct(event.target.value)}>
                <option value="names">Names</option>
                <option value="printings">Printings</option>
              </CustomInput>
            </InputGroup>
          </Col>
        </Row>
      </div>
      <br />
      <DynamicFlash />
      {(cards && cards.length) > 0 ? (
        <Card className="mb-3">
          {count / 96 > 1 && (
            <CardHeader>
              <Paginate count={Math.floor(count / 96)} active={page} onClick={(i) => updatePage(i)} />
            </CardHeader>
          )}

          {loading && (
            <CardBody>
              <div className="centered py-3">
                <Spinner className="position-absolute" />
              </div>
            </CardBody>
          )}
          {!loading && (
            <CardGrid
              cardList={cards.map((card) => ({ details: card }))}
              Tag={CardImage}
              colProps={{ xs: 4, sm: 3, md: 2 }}
              cardProps={{ autocard: true, 'data-in-modal': true, className: 'clickable' }}
              linkDetails
            />
          )}
          {count / 100 > 1 && (
            <CardFooter>
              <Paginate count={Math.floor(count / 96)} active={page} onClick={(i) => updatePage(i)} />
            </CardFooter>
          )}
        </Card>
      ) : (
        <h4>No Results</h4>
      )}
    </MainLayout>
  );
};

CardSearchPage.propTypes = {
  loginCallback: PropTypes.string,
};

CardSearchPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(CardSearchPage);

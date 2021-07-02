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

import { Spinner, Table } from 'reactstrap';

import Query from '@cubeartisan/client/utils/Query';
import withAutocard from '@cubeartisan/client/components/WithAutocard';
import Paginate from '@cubeartisan/client/components/Paginate';
import HeaderCell from '@cubeartisan/client/components/HeaderCell';

const AutocardA = withAutocard('a');

const TopCardsTable = ({ filter, setCount, count, cards }) => {
  const [page, setPage] = useState(parseInt(Query.get('p'), 10) || 0);
  const [data, setData] = useState(cards);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: Query.get('s') || 'Elo',
    direction: Query.get('d') || 'descending',
  });

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams([
        ['f', filter],
        ['s', sortConfig.key],
        ['p', page],
        ['d', sortConfig.direction],
      ]);
      const response = await fetch(`/tool/api/topcards/?${params.toString()}`);
      if (!response.ok) {
        console.error(response);
      }

      Query.set('f', filter);
      Query.set('p', page);
      Query.set('s', sortConfig.key);

      const json = await response.json();

      setData(json.data);
      setCount(json.numResults);
      setLoading(false);
    };
    fetchData();
  }, [page, filter, setCount, sortConfig]);

  const updatePage = (index) => {
    setLoading(true);
    setPage(index);
  };

  const updateSort = (key) => {
    setLoading(true);
    let direction = 'descending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  if (loading) {
    return (
      <>
        {count > 0 && <Paginate count={Math.floor(count / 100)} active={page} onClick={(i) => updatePage(i)} />}
        <div className="centered py-3">
          <Spinner className="position-absolute" />
        </div>
      </>
    );
  }

  console.log(data);
  return (
    <>
      <Paginate count={Math.floor(count / 100)} active={page} onClick={(i) => updatePage(i)} />
      <Table responsive className="mt-lg-3">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <HeaderCell label="Elo" fieldName="Elo" sortConfig={sortConfig} requestSort={updateSort} />
            <HeaderCell label="Total Picks" fieldName="Pick Count" sortConfig={sortConfig} requestSort={updateSort} />
            <HeaderCell label="Cubes" fieldName="Cube Count" sortConfig={sortConfig} requestSort={updateSort} />
          </tr>
        </thead>

        <tbody>
          {data.map((card) => (
            <tr key={card._id}>
              <td>
                <AutocardA
                  front={card.image_normal}
                  back={card.image_back || undefined}
                  href={`/tool/card/${card._id}`}
                >
                  {card.name}
                </AutocardA>
              </td>
              <td>{card.elo === null ? '' : card.elo.toFixed(0)}</td>
              <td>{card.pickCount === null ? '' : card.pickCount}</td>
              <td>{card.cubeCount === null ? '' : card.cubeCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginate count={Math.floor(count / 100)} active={page} onClick={(i) => updatePage(i)} />
    </>
  );
};

/*

<tbody className="breakdown">
  {secondaryLabels.map((label) => (
  ))}
</tbody>

*/

TopCardsTable.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  filter: PropTypes.string,
  setCount: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

TopCardsTable.defaultProps = {
  filter: '',
};

export default TopCardsTable;

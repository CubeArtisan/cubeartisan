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

import { Table } from 'reactstrap';

import Paginate from '@cubeartisan/client/components/Paginate.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';

const PagedTable = ({ pageSize, rows, children, ...props }) => {
  const [page, setPage] = useQueryParam('page', '0');

  const validPages = Array.from(Array(Math.ceil(rows.length / pageSize)).keys());
  const current = Math.min(parseInt(page, 10), validPages.length - 1);
  const displayRows = rows.slice(current * pageSize, (current + 1) * pageSize);

  return (
    <>
      {validPages.length > 1 && <Paginate count={validPages.length} active={current} onClick={(i) => setPage(i)} />}
      <div className="table-responsive">
        <Table {...props}>
          {children}
          <tbody>{displayRows}</tbody>
        </Table>
      </div>
      {validPages.length > 1 && <Paginate count={validPages.length} active={current} onClick={(i) => setPage(i)} />}
    </>
  );
};

PagedTable.propTypes = {
  children: PropTypes.element.isRequired,
  pageSize: PropTypes.number,
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

PagedTable.defaultProps = {
  pageSize: 60,
};

export default PagedTable;

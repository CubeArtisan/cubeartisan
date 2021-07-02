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
import { useCallback } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'reactstrap';
import Tooltip from '@hypercube/client/components/Tooltip';

const HeaderCell = ({ label, fieldName, sortConfig, requestSort, tooltip, ...props }) => {
  const active = sortConfig && sortConfig.key === fieldName;
  const direction = active ? sortConfig.direction : 'nosort';
  const icon = `/content/${direction}.png`;

  const Wrapper = useCallback(
    ({ children }) =>
      tooltip ? (
        <Tooltip text={tooltip}>
          <div style={{ width: 'min-content' }}>{children}</div>
        </Tooltip>
      ) : (
        <div style={{ width: 'min-content' }}>{children}</div>
      ),
    [tooltip],
  );

  return (
    <th scope="col" className="align-middle" {...props}>
      <NavLink
        className="p-0 d-flex align-items-center justify-content-start"
        href="#"
        onClick={() => requestSort(fieldName)}
        active
      >
        <Wrapper>{label}</Wrapper>
        <img src={icon} className="sortIcon mr-auto" alt="Toggle sort direction" />
      </NavLink>
    </th>
  );
};

HeaderCell.propTypes = {
  label: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
  }),
  requestSort: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
};

HeaderCell.defaultProps = {
  tooltip: null,
  sortConfig: null,
};

export default HeaderCell;

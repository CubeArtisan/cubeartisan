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
import { useState, useMemo } from 'react';

const useSortableData = (data, config = null, sortFns = {}) => {
  const [sortConfig, setSortConfig] = useState(config);

  const items = useMemo(() => {
    const sortableItems = Array.from(data);
    if (sortConfig) {
      const { key, direction } = sortConfig;
      const sortFn = sortFns[key] ?? ((a, b) => a - b);
      sortableItems.sort((a, b) => {
        const ordering = sortFn(a[key], b[key]);
        if (ordering < 0) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (ordering > 0) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig, sortFns]);

  const requestSort = (key) =>
    setSortConfig((current) => {
      if (current && current.key === key) {
        if (current.direction === 'descending') {
          return { key, direction: 'ascending' };
        }
        if (current.direction === 'ascending') {
          return null;
        }
      }
      return { key, direction: 'descending' };
    });

  return { items, requestSort, sortConfig };
};

export default useSortableData;

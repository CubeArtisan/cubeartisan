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
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import Query from '@cubeartisan/client/utils/Query.js';

/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef AddChange
 * @property {number} id
 * @property {Card} add
 * @typedef RemoveChange
 * @property {number} id
 * @property {Card} remove
 * @typedef ReplaceChange
 * @property {number} id
 * @property {Card[2]} replace
 * @typedef {AddChange | RemoveChange | ReplaceChange} Change
 * @typedef ChangelistContextValue
 * @property {Change[]} changes
 * @property {(changes: Change[]) => void} setChanges
 * @property {(changes: Change[]) => void} addChanges
 * @property {(change: Change) => void} addChange
 * @property {(changeId: number) => void} removeChange
 * @property {() => void} openEditCollapse
 * @type {React.Context<ChangelistContextValue>}
 */
const ChangelistContext = createContext({});

export const ChangelistContextProvider = ({ cubeID, setOpenCollapse, initialChanges, noSave, ...props }) => {
  const [changes, setChanges] = useState(initialChanges || []);

  useEffect(() => {
    if (noSave || !cubeID) {
      return;
    }

    if (Query.get('updated', false) === 'true') {
      Query.del('updated');
      setChanges([]);
      return;
    }

    let storedChanges = [];
    const storageKey = `changelist-${cubeID}`;
    try {
      storedChanges = JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch (e) {
      console.warn(e);
    }
    if (storedChanges.length > 0) {
      if (
        storedChanges.some(
          (update) =>
            (update.add && !update.add.details) ||
            (update.remove && !update.remove.details) ||
            (update.replace && !update.replace.every((card) => card.details)),
        )
      ) {
        // Old save format. Reset.
        storedChanges = [];
      } else {
        setOpenCollapse('edit');
      }
    }
    setChanges(storedChanges);
  }, [noSave, setOpenCollapse, cubeID]);

  useEffect(() => {
    if (!noSave && typeof localStorage !== 'undefined' && typeof cubeID !== 'undefined') {
      const storageKey = `changelist-${cubeID}`;
      localStorage.setItem(storageKey, JSON.stringify(changes));
    }
  }, [cubeID, noSave, changes]);

  const addChange = useCallback(
    (change) => {
      const highestId = Math.max(changes.map((changeB) => changeB.id));
      const newId = !Number.isNaN(highestId) ? highestId + 1 : Math.floor(Math.random() * 2 ** 20);
      setChanges([
        ...changes,
        {
          ...change,
          id: newId,
        },
      ]);
      setOpenCollapse('edit');
    },
    [setOpenCollapse, changes],
  );

  const addChanges = useCallback(
    (addedChanges) => {
      const highestId = Math.max(changes.map((change) => change.id));
      let newId = !Number.isNaN(highestId) ? highestId + 1 : Math.floor(Math.random() * 2 ** 20);
      const newChanges = Array.from(changes);
      for (const change of addedChanges) {
        newChanges.push({
          ...change,
          id: newId,
        });
        newId += 1;
      }
      setChanges(newChanges);
      setOpenCollapse('edit');
    },
    [setOpenCollapse, changes],
  );

  const removeChange = useCallback((changeId) => {
    setChanges((changesB) => changesB.filter((change) => change.id !== changeId));
  }, []);

  const openEditCollapse = useCallback(() => setOpenCollapse('edit'), [setOpenCollapse]);

  const value = useMemo(
    () => ({
      changes,
      setChanges,
      addChange,
      addChanges,
      removeChange,
      openEditCollapse,
    }),
    [changes, setChanges, addChange, addChanges, removeChange, openEditCollapse],
  );

  return <ChangelistContext.Provider value={value} {...props} />;
};
ChangelistContextProvider.propTypes = {
  cubeID: PropTypes.string.isRequired,
  setOpenCollapse: PropTypes.func.isRequired,
  initialChanges: PropTypes.arrayOf(PropTypes.shape({})),
  noSave: PropTypes.bool,
};
ChangelistContextProvider.defaultProps = {
  initialChanges: [],
  noSave: false,
};
export default ChangelistContext;

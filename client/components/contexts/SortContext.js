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
import { createContext, useCallback, useMemo, useState } from 'react';

const DEFAULT_SORTS = ['Color Category', 'Types-Multicolor', 'Mana Value', 'Alphabetical'];

/**
 * @typedef SortContextValuesNoSetter
 * @property {string} [primary]
 * @property {string} [secondary]
 * @property {string} [tertiary]
 * @property {string} [quaternary]
 * @property {boolean} [showOther]
 */

/**
 * @type SortContextValuesNoSetter
 */
const DEFAULT_VALUES = {
  primary: 'Color Category',
  secondary: 'Types-Multicolor',
  tertiary: 'Mana Value',
  quaternary: 'Alphabetical',
  showOther: false,
};
/**
 * @param {SortContextValuesNoSetter} newValues
 * @returns void
 */
const DEFAULT_CHANGE_SORT = (newValues) => newValues;

const SortContext = createContext({
  ...DEFAULT_VALUES,
  changeSort: DEFAULT_CHANGE_SORT,
});
export const SortContextProvider = ({ defaultSorts, defaultShowOther, ...props }) => {
  let {
    primary: defaultPrimary,
    secondary: defaultSecondary,
    tertiary: defaultTertiary,
    quaternary: defaultQuaternary,
  } = DEFAULT_VALUES;
  if (defaultSorts.length === 4) {
    [defaultPrimary, defaultSecondary, defaultTertiary, defaultQuaternary] = defaultSorts;
  }
  defaultShowOther = defaultShowOther ?? DEFAULT_VALUES.showOther;
  const [primary, setPrimary] = useState(defaultPrimary);
  const [secondary, setSecondary] = useState(defaultSecondary);
  const [tertiary, setTertiary] = useState(defaultTertiary);
  const [quaternary, setQuaternary] = useState(defaultQuaternary);
  const [showOther, setShowOther] = useState(defaultShowOther);
  const changeSort = useCallback((newValues) => {
    if (newValues.primary) setPrimary(newValues.primary);
    if (newValues.secondary) setSecondary(newValues.secondary);
    if (newValues.tertiary) setTertiary(newValues.tertiary);
    if (newValues.quaternary) setQuaternary(newValues.quaternary);
    if (newValues.showOther) setShowOther(newValues.showOther);
  }, []);
  const value = useMemo(
    () => ({
      primary,
      secondary,
      tertiary,
      quaternary,
      showOther,
      changeSort,
    }),
    [primary, secondary, tertiary, quaternary, showOther, changeSort],
  );
  return <SortContext.Provider value={value} {...props} />;
};
SortContextProvider.propTypes = {
  defaultSorts: PropTypes.arrayOf(PropTypes.string),
  defaultShowOther: PropTypes.bool,
};
SortContextProvider.defaultProps = {
  defaultSorts: DEFAULT_SORTS,
  defaultShowOther: false,
};
export default SortContext;

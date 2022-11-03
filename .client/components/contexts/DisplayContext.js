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
import { responsiveFontSizes, ThemeProvider } from '@mui/material/styles/index.js';
import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
// import useMediaQuery from '@mui/material/useMediaQuery/index.js';

import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';
import getTheme from '@cubeartisan/client/theming/theme.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';

/**
 * @typedef DisplayContextValue
 * @property {boolean} showCustomImages
 * @property {() => void} toggleShowCustomImages
 * @property {boolean} showMaybeboard
 * @property {() => void} toggleShowMaybeboard
 * @property {number} cardsInRow
 * @property {(cardsInRow: number) => void} setCardsInRow
 * @property {boolean} useSticky
 * @property {() => void} toggleUseSticky
 * @property {string} theme
 * @property {(theme?: string) => void} updateTheme
 * @property {number | string} autoCardSize
 * @property {(size: number | string) => void} setAutoCardSize
 */
/*
 * @type {React.Context<DisplayContextValue>}
 */
const DisplayContext = createContext({
  showCustomImages: true,
  toggleShowCustomImages: () => {},
  showMaybeboard: false,
  toggleShowMaybeboard: () => {},
  cardsInRow: 8,
  setCardsInRow: () => {},
  useSticky: false,
  toggleUseSticky: () => {},
  theme: 'default',
  updateTheme: () => {},
  autoCardSize: '24rem',
  setAutoCardSize: () => {},
});

export const DisplayContextProvider = ({ cubeID, defaultNumCols, ...props }) => {
  const user = useContext(UserContext);
  const userTheme = user.theme;
  const [showCustomImages, toggleShowCustomImages] = useToggle(true);

  const [showMaybeboard, setShowMaybeboard] = useState(
    () => typeof localStorage !== 'undefined' && cubeID && localStorage.getItem(`maybeboard-${cubeID}`) === 'true',
  );
  const toggleShowMaybeboard = useCallback(() => {
    setShowMaybeboard((oldValue) => {
      if (cubeID) localStorage.setItem(`maybeboard-${cubeID}`, oldValue ? 'false' : 'true');
      return !showMaybeboard;
    });
  }, [cubeID, showMaybeboard]);

  const [cardsInRow, setCardsInRow] = useState(
    () => (typeof localStorage !== 'undefined' && parseInt(localStorage.getItem('cardsInRow') ?? '', 10)) || 5,
  );
  const updateCardsInRow = useCallback((newCardsInRow) => {
    localStorage.setItem('cardsInRow', newCardsInRow);
    setCardsInRow(newCardsInRow);
  }, []);

  const [useSticky, setUseSticky] = useState(
    () => typeof localStorage !== 'undefined' && localStorage.getItem('useSticky') === 'true',
  );
  const toggleUseSticky = useCallback(() => {
    setUseSticky((oldSticky) => {
      if (oldSticky) {
        localStorage.setItem('useSticky', 'false');
        return false;
      }
      localStorage.setItem('useSticky', 'true');
      return true;
    });
  }, []);
  const prefersDarkMode = false; // useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(
    () =>
      userTheme ??
      ((typeof localStorage !== 'undefined' && localStorage.getItem('theme')) ||
        (prefersDarkMode ? 'dark' : 'default')),
  );
  const updateTheme = useCallback(
    (newTheme) => {
      setTheme((oldTheme) => {
        newTheme = newTheme ?? (oldTheme === 'dark' ? 'default' : 'dark');
        if (user._id) {
          user.theme = newTheme;
          const formData = new FormData();
          formData.append('hideFeatured', user.hide_featured || false ? 'on' : 'off');
          formData.append('theme', newTheme);
          csrfFetch(`/user/${user._id}/display`, {
            method: 'POST',
            body: formData,
          });
        }
        return newTheme;
      });
    },
    [user],
  );
  const [autoCardSize, setAutoCardSize] = useState(
    (typeof localStorage !== 'undefined' && localStorage.getItem('autocard-size')) || '18rem',
  );
  const updateAutoCardSize = useCallback((newSize) => {
    localStorage.setItem('autocard-size', newSize);
    setAutoCardSize(newSize);
  }, []);

  useEffect(() => {
    if (user._id && user.theme) setTheme(user.theme);
  }, [user._id, user.theme]);
  const muiTheme = useMemo(() => {
    const newTheme = responsiveFontSizes(getTheme(user.theme ?? theme));
    return newTheme;
  }, [user.theme, theme]);
  const value = useMemo(
    () => ({
      showCustomImages,
      toggleShowCustomImages,
      showMaybeboard,
      toggleShowMaybeboard,
      cardsInRow,
      setCardsInRow: updateCardsInRow,
      useSticky,
      toggleUseSticky,
      theme,
      updateTheme,
      autoCardSize,
      setAutoCardSize: updateAutoCardSize,
    }),
    [
      showCustomImages,
      toggleShowCustomImages,
      showMaybeboard,
      toggleShowMaybeboard,
      cardsInRow,
      updateCardsInRow,
      useSticky,
      toggleUseSticky,
      theme,
      updateTheme,
      autoCardSize,
      updateAutoCardSize,
    ],
  );
  return (
    <DisplayContext.Provider value={value}>
      <ThemeProvider theme={muiTheme} {...props} />
    </DisplayContext.Provider>
  );
};
DisplayContextProvider.propTypes = {
  cubeID: PropTypes.string,
  defaultNumCols: PropTypes.number,
};
DisplayContextProvider.defaultProps = {
  cubeID: 'nocube',
  defaultNumCols: 8,
};
export default DisplayContext;

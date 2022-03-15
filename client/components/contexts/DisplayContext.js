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
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// import useMediaQuery from '@mui/material/useMediaQuery/index.js';
import { ThemeProvider, responsiveFontSizes } from '@mui/material/node/styles/index.js';

import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import getTheme from '@cubeartisan/client/theming/theme.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';

/**
 * @typedef {'default' | 'dark'} ThemeType
 * @typedef DisplayContextValue
 * @property {boolean} showCustomImages
 * @property {() => void} toggleShowCustomImages
 * @property {boolean} showMaybeboard
 * @property {() => void} toggleShowMaybeboard
 * @property {number} cardsInRow
 * @property {(cardsInRow: number) => void} setCardsInRow
 * @property {boolean} useSticky
 * @property {() => void} toggleUseSticky
 * @property {ThemeType} theme
 * @property {(theme?: ThemeType) => void} updateTheme
 */

/**
 * @typedef {import('react').Context<DisplayContextValue>} ContextType
 * @type ContextType
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
});

export const DisplayContextProvider = ({ cubeID, defaultNumCols, ...props }) => {
  const user = useContext(UserContext);
  const userTheme = user.theme;
  const [showCustomImages, setShowCustomImages] = useState(true);
  const toggleShowCustomImages = useCallback(() => {
    setShowCustomImages(!showCustomImages);
  }, [showCustomImages]);

  const [showMaybeboard, setShowMaybeboard] = useState(
    () => typeof localStorage !== 'undefined' && cubeID && localStorage.getItem(`maybeboard-${cubeID}`) === 'true',
  );
  const toggleShowMaybeboard = useCallback(() => {
    if (cubeID) localStorage.setItem(`maybeboard-${cubeID}`, !showMaybeboard);
    setShowMaybeboard(!showMaybeboard);
  }, [cubeID, showMaybeboard]);

  const [cardsInRow, setCardsInRow] = useState(
    () => (typeof localStorage !== 'undefined' && parseInt(localStorage.getItem('cardsInRow'), 10)) || null,
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
  // console.log(useMediaQuery);
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
        console.log('Setting theme to', newTheme);
        return newTheme;
      });
    },
    [user],
  );
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

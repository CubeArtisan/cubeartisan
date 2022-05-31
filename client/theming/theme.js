import createTheme from '@mui/material/node/styles/createTheme.js';

import getBase from '@cubeartisan/client/theming/base.js';
import darkPalette from '@cubeartisan/client/theming/palettes/dark.js';
import lightPalette from '@cubeartisan/client/theming/palettes/light.js';
import typography from '@cubeartisan/client/theming/typography.js';

/**
 * @param {string} themeType
 */
const getTheme = (themeType) => {
  const palette = themeType === 'dark' ? darkPalette : lightPalette;
  return (typeof createTheme === 'function' ? createTheme : createTheme.default)({
    ...getBase(palette),
    typography,
    palette,
  });
};

export default getTheme;

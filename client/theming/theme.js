import createTheme from '@mui/material/node/styles/createTheme.js';

import themeBase from '@cubeartisan/client/theming/base.js';
import typography from '@cubeartisan/client/theming/typography.js';
import lightPalette from '@cubeartisan/client/theming/palettes/light.js';
import darkPalette from '@cubeartisan/client/theming/palettes/dark.js';

const getTheme = (themeType) =>
  (typeof createTheme === 'function' ? createTheme : createTheme.default)({
    ...themeBase,
    typography,
    palette: themeType === 'dark' ? darkPalette : lightPalette,
  });

export default getTheme;

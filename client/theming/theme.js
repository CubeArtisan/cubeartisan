import createTheme from '@mui/material/node/styles/createTheme.js';

import themeBase from '@cubeartisan/client/theming/base.js';
import typography from '@cubeartisan/client/theming/typography.js';
import palette from '@cubeartisan/client/theming/palettes/light.js';

console.log(createTheme);
const THEME = (typeof createTheme === 'function' ? createTheme : createTheme.default)({
  ...themeBase,
  typography,
  palette,
});

export default THEME;

import { createTheme } from '@mui/material/styles/index.js';

import themeBase from '@cubeartisan/client/theming/base.js';
import typography from '@cubeartisan/client/theming/typography.js';
import palette from '@cubeartisan/client/theming/palettes/light.js';

const THEME = createTheme({
  ...themeBase,
  typography,
  palette,
});

export default THEME;

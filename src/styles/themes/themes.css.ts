import { ColorPalette, createColorArray, createTheme } from '@cubeartisan/cubeartisan/styles/utils';

const darkThemePalette: ColorPalette = {
  primary: createColorArray('purpleDark'),
  primaryA: createColorArray('purpleDarkA'),
  secondary: createColorArray('cyanDark'),
  secondaryA: createColorArray('cyanDarkA'),
  neutral: createColorArray('mauveDark'),
  neutralA: createColorArray('mauveDarkA'),
  success: createColorArray('greenDark'),
  successA: createColorArray('greenDarkA'),
  info: createColorArray('blueDark'),
  infoA: createColorArray('blueDarkA'),
  warning: createColorArray('amberDark'),
  warningA: createColorArray('amberDarkA'),
  danger: createColorArray('tomatoDark'),
  dangerA: createColorArray('tomatoDarkA'),
  shadow: createColorArray('whiteA'),
};

export const darkTheme = createTheme(darkThemePalette);

const lightThemePalette: ColorPalette = {
  primary: createColorArray('purple'),
  primaryA: createColorArray('purpleA'),
  secondary: createColorArray('cyan'),
  secondaryA: createColorArray('cyanA'),
  neutral: createColorArray('mauve'),
  neutralA: createColorArray('mauveA'),
  success: createColorArray('green'),
  successA: createColorArray('greenA'),
  info: createColorArray('blue'),
  infoA: createColorArray('blueA'),
  warning: createColorArray('amber'),
  warningA: createColorArray('amberA'),
  danger: createColorArray('tomato'),
  dangerA: createColorArray('tomatoA'),
  shadow: createColorArray('whiteA'),
};

export const lightTheme = createTheme(lightThemePalette);

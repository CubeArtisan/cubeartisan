import { ColorPalette, radixToColorObject } from '@cubeartisan/cubeartisan/styles/utils';

export const darkTheme: ColorPalette = {
  primary: radixToColorObject('purpleDark'),
  primaryA: radixToColorObject('purpleDarkA'),
  secondary: radixToColorObject('cyanDark'),
  secondaryA: radixToColorObject('cyanDarkA'),
  neutral: radixToColorObject('mauveDark'),
  neutralA: radixToColorObject('mauveDarkA'),
  success: radixToColorObject('greenDark'),
  successA: radixToColorObject('greenDarkA'),
  info: radixToColorObject('blueDark'),
  infoA: radixToColorObject('blueDarkA'),
  warning: radixToColorObject('amberDark'),
  warningA: radixToColorObject('amberDarkA'),
  danger: radixToColorObject('tomatoDark'),
  dangerA: radixToColorObject('tomatoDarkA'),
  shadow: radixToColorObject('whiteA'),
} as const;

export const lightTheme: ColorPalette = {
  primary: radixToColorObject('purple'),
  primaryA: radixToColorObject('purpleA'),
  secondary: radixToColorObject('cyan'),
  secondaryA: radixToColorObject('cyanA'),
  neutral: radixToColorObject('mauve'),
  neutralA: radixToColorObject('mauveA'),
  success: radixToColorObject('green'),
  successA: radixToColorObject('greenA'),
  info: radixToColorObject('blue'),
  infoA: radixToColorObject('blueA'),
  warning: radixToColorObject('amber'),
  warningA: radixToColorObject('amberA'),
  danger: radixToColorObject('tomato'),
  dangerA: radixToColorObject('tomatoA'),
  shadow: radixToColorObject('whiteA'),
} as const;

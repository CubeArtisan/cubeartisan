import { amberDark, blueDark, cyanDark, greenDark, mauveDark, purpleDark, tomatoDark } from '@radix-ui/colors/src';
import type { CSSVarFunction } from '@vanilla-extract/private';

import { Colors, colors } from './base.css';

type ColorPalette = {
  primary: {
    [key: string]: string;
  };
  secondary: {
    [key: string]: string;
  };
  neutral: {
    [key: string]: string;
  };
  success: {
    [key: string]: string;
  };
  info: {
    [key: string]: string;
  };
  warning: {
    [key: string]: string;
  };
  danger: {
    [key: string]: string;
  };
};

const darkColors: ColorPalette = {
  primary: purpleDark,
  secondary: cyanDark,
  neutral: mauveDark,
  success: greenDark,
  info: blueDark,
  warning: amberDark,
  danger: tomatoDark,
};

type ColorCSSVar<T> = {
  [K in keyof T as CSSVarFunction]: T[K];
};

type ThemeCSSVar<T> = {
  [K in keyof T]: ColorCSSVar<T[K]>;
};

type Theme = ThemeCSSVar<ColorPalette>;

const testMakeTheme = (colorPalette: typeof darkColors) => {
  const themetest: typeof darkColors = {};

  for (const key of Object.keys(colorPalette)) {
    themetest[key] = zipObjectVals(colors[key], colorPalette[key]);
  }

  return themetest;
};

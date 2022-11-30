import * as radixColors from '@radix-ui/colors/src';

export type ColorObject = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
};

export const radixToColorObject = (color: keyof typeof radixColors): ColorObject => {
  const values = Object.values(radixColors[color]);
  return {
    1: values[1],
    2: values[2],
    3: values[3],
    4: values[4],
    5: values[5],
    6: values[6],
    7: values[7],
    8: values[8],
    9: values[9],
    10: values[10],
    11: values[11],
    12: values[12],
  } as const;
};

export type ColorPalette = {
  primary: ColorObject;
  primaryA: ColorObject;
  secondary: ColorObject;
  secondaryA: ColorObject;
  neutral: ColorObject;
  neutralA: ColorObject;
  success: ColorObject;
  successA: ColorObject;
  info: ColorObject;
  infoA: ColorObject;
  warning: ColorObject;
  warningA: ColorObject;
  danger: ColorObject;
  dangerA: ColorObject;
  shadow: ColorObject;
};

export const createTheme = (colorPalette: ColorPalette) =>
  ({
    primary: colorPalette.primary,
    primaryA: colorPalette.primaryA,
    secondary: colorPalette.secondary,
    secondaryA: colorPalette.secondaryA,
    neutral: colorPalette.neutral,
    neutralA: colorPalette.neutralA,
    success: colorPalette.success,
    successA: colorPalette.successA,
    info: colorPalette.info,
    infoA: colorPalette.infoA,
    warning: colorPalette.warning,
    warningA: colorPalette.warningA,
    danger: colorPalette.danger,
    dangerA: colorPalette.dangerA,
    shadow: colorPalette.shadow,
  } as const);

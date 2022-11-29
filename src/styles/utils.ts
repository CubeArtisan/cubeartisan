import * as radixColors from '@radix-ui/colors/src';

export type ColorArray = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

/**
 * @param color a radix shaped color object
 * @returns an ordered array of the color values
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const createColorArray = (color: keyof radixColors): ColorArray =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  new Array(12).map((_, i) => radixColors[color][`${color}${i}`]);

export type ColorPalette = {
  primary: ColorArray;
  primaryA: ColorArray;
  secondary: ColorArray;
  secondaryA: ColorArray;
  neutral: ColorArray;
  neutralA: ColorArray;
  success: ColorArray;
  successA: ColorArray;
  info: ColorArray;
  infoA: ColorArray;
  warning: ColorArray;
  warningA: ColorArray;
  danger: ColorArray;
  dangerA: ColorArray;
  shadow: ColorArray;
};

export const createTheme = (colorPalette: ColorPalette) => ({
  primary: {
    1: colorPalette.primary[0],
    2: colorPalette.primary[1],
    3: colorPalette.primary[2],
    4: colorPalette.primary[3],
    5: colorPalette.primary[4],
    6: colorPalette.primary[5],
    7: colorPalette.primary[6],
    8: colorPalette.primary[7],
    9: colorPalette.primary[8],
    10: colorPalette.primary[9],
    11: colorPalette.primary[10],
    12: colorPalette.primary[11],
  },
  primaryA: {
    1: colorPalette.primaryA[0],
    2: colorPalette.primaryA[1],
    3: colorPalette.primaryA[2],
    4: colorPalette.primaryA[3],
    5: colorPalette.primaryA[4],
    6: colorPalette.primaryA[5],
    7: colorPalette.primaryA[6],
    8: colorPalette.primaryA[7],
    9: colorPalette.primaryA[8],
    10: colorPalette.primaryA[9],
    11: colorPalette.primaryA[10],
    12: colorPalette.primaryA[11],
  },
  secondary: {
    1: colorPalette.secondary[0],
    2: colorPalette.secondary[1],
    3: colorPalette.secondary[2],
    4: colorPalette.secondary[3],
    5: colorPalette.secondary[4],
    6: colorPalette.secondary[5],
    7: colorPalette.secondary[6],
    8: colorPalette.secondary[7],
    9: colorPalette.secondary[8],
    10: colorPalette.secondary[9],
    11: colorPalette.secondary[10],
    12: colorPalette.secondary[11],
  },
  secondaryA: {
    1: colorPalette.secondaryA[0],
    2: colorPalette.secondaryA[1],
    3: colorPalette.secondaryA[2],
    4: colorPalette.secondaryA[3],
    5: colorPalette.secondaryA[4],
    6: colorPalette.secondaryA[5],
    7: colorPalette.secondaryA[6],
    8: colorPalette.secondaryA[7],
    9: colorPalette.secondaryA[8],
    10: colorPalette.secondaryA[9],
    11: colorPalette.secondaryA[10],
    12: colorPalette.secondaryA[11],
  },
  neutral: {
    1: colorPalette.neutral[0],
    2: colorPalette.neutral[1],
    3: colorPalette.neutral[2],
    4: colorPalette.neutral[3],
    5: colorPalette.neutral[4],
    6: colorPalette.neutral[5],
    7: colorPalette.neutral[6],
    8: colorPalette.neutral[7],
    9: colorPalette.neutral[8],
    10: colorPalette.neutral[9],
    11: colorPalette.neutral[10],
    12: colorPalette.neutral[11],
  },
  neutralA: {
    1: colorPalette.neutralA[0],
    2: colorPalette.neutralA[1],
    3: colorPalette.neutralA[2],
    4: colorPalette.neutralA[3],
    5: colorPalette.neutralA[4],
    6: colorPalette.neutralA[5],
    7: colorPalette.neutralA[6],
    8: colorPalette.neutralA[7],
    9: colorPalette.neutralA[8],
    10: colorPalette.neutralA[9],
    11: colorPalette.neutralA[10],
    12: colorPalette.neutralA[11],
  },
  success: {
    1: colorPalette.success[0],
    2: colorPalette.success[1],
    3: colorPalette.success[2],
    4: colorPalette.success[3],
    5: colorPalette.success[4],
    6: colorPalette.success[5],
    7: colorPalette.success[6],
    8: colorPalette.success[7],
    9: colorPalette.success[8],
    10: colorPalette.success[9],
    11: colorPalette.success[10],
    12: colorPalette.success[11],
  },
  successA: {
    1: colorPalette.successA[0],
    2: colorPalette.successA[1],
    3: colorPalette.successA[2],
    4: colorPalette.successA[3],
    5: colorPalette.successA[4],
    6: colorPalette.successA[5],
    7: colorPalette.successA[6],
    8: colorPalette.successA[7],
    9: colorPalette.successA[8],
    10: colorPalette.successA[9],
    11: colorPalette.successA[10],
    12: colorPalette.successA[11],
  },
  info: {
    1: colorPalette.info[0],
    2: colorPalette.info[1],
    3: colorPalette.info[2],
    4: colorPalette.info[3],
    5: colorPalette.info[4],
    6: colorPalette.info[5],
    7: colorPalette.info[6],
    8: colorPalette.info[7],
    9: colorPalette.info[8],
    10: colorPalette.info[9],
    11: colorPalette.info[10],
    12: colorPalette.info[11],
  },
  infoA: {
    1: colorPalette.infoA[0],
    2: colorPalette.infoA[1],
    3: colorPalette.infoA[2],
    4: colorPalette.infoA[3],
    5: colorPalette.infoA[4],
    6: colorPalette.infoA[5],
    7: colorPalette.infoA[6],
    8: colorPalette.infoA[7],
    9: colorPalette.infoA[8],
    10: colorPalette.infoA[9],
    11: colorPalette.infoA[10],
    12: colorPalette.infoA[11],
  },
  warning: {
    1: colorPalette.warning[0],
    2: colorPalette.warning[1],
    3: colorPalette.warning[2],
    4: colorPalette.warning[3],
    5: colorPalette.warning[4],
    6: colorPalette.warning[5],
    7: colorPalette.warning[6],
    8: colorPalette.warning[7],
    9: colorPalette.warning[8],
    10: colorPalette.warning[9],
    11: colorPalette.warning[10],
    12: colorPalette.warning[11],
  },
  warningA: {
    1: colorPalette.warningA[0],
    2: colorPalette.warningA[1],
    3: colorPalette.warningA[2],
    4: colorPalette.warningA[3],
    5: colorPalette.warningA[4],
    6: colorPalette.warningA[5],
    7: colorPalette.warningA[6],
    8: colorPalette.warningA[7],
    9: colorPalette.warningA[8],
    10: colorPalette.warningA[9],
    11: colorPalette.warningA[10],
    12: colorPalette.warningA[11],
  },
  danger: {
    1: colorPalette.danger[0],
    2: colorPalette.danger[1],
    3: colorPalette.danger[2],
    4: colorPalette.danger[3],
    5: colorPalette.danger[4],
    6: colorPalette.danger[5],
    7: colorPalette.danger[6],
    8: colorPalette.danger[7],
    9: colorPalette.danger[8],
    10: colorPalette.danger[9],
    11: colorPalette.danger[10],
    12: colorPalette.danger[11],
  },
  dangerA: {
    1: colorPalette.dangerA[0],
    2: colorPalette.dangerA[1],
    3: colorPalette.dangerA[2],
    4: colorPalette.dangerA[3],
    5: colorPalette.dangerA[4],
    6: colorPalette.dangerA[5],
    7: colorPalette.dangerA[6],
    8: colorPalette.dangerA[7],
    9: colorPalette.dangerA[8],
    10: colorPalette.dangerA[9],
    11: colorPalette.dangerA[10],
    12: colorPalette.dangerA[11],
  },
  shadow: {
    1: colorPalette.shadow[0],
    2: colorPalette.shadow[1],
    3: colorPalette.shadow[2],
    4: colorPalette.shadow[3],
    5: colorPalette.shadow[4],
    6: colorPalette.shadow[5],
    7: colorPalette.shadow[6],
    8: colorPalette.shadow[7],
    9: colorPalette.shadow[8],
    10: colorPalette.shadow[9],
    11: colorPalette.shadow[10],
    12: colorPalette.shadow[11],
  },
});

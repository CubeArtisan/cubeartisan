import { amberDark, blueDark, cyanDark, greenDark, mauveDark, purpleDark, tomatoDark } from '@radix-ui/colors/src';

import { Colors, colors } from './base.css';

// const dark: Colors['primary'] = Object.values(colors.primary).reduce(
//   (accumulator, value) => ({ ...accumulator, [value]: '' }),
//   {},
// );

// let dark: Colors['primary'];

// Object.values(colors.primary).forEach((key, i) => {
//   dark[key] = Object.values(purpleDark)[i];
// });
// const keys = Object.values(colors.primary);
// const values = Object.values(purpleDark);
// const dark: Colors['primary'] = Object.fromEntries(keys.map((_, i) => [keys[i], values[i]]));

const zipObjectVals = (toKeys: object, color: object) => {
  const keys = Object.values(toKeys);
  const values = Object.values(color);
  return Object.fromEntries(keys.map((_, i) => [keys[i], values[i]]));
};

// type ToString<T> = {
//   // eslint-disable-next-line no-unused-vars
//   [K in keyof T]: string;
// };

// type ColorToString = {
//   [K in keyof Colors]: ToString<Colors[K]>;
// };

// const darkColors: ColorToString = {
//   primary: purpleDark,
//   secondary: cyanDark,
//   neutral: mauveDark,
//   success: greenDark,
//   info: blueDark,
//   warning: amberDark,
//   danger: tomatoDark,
// };

// TODO: make one-liner or hook call
export const darkTheme: Colors = {
  primary: zipObjectVals(colors.primary, purpleDark),
  secondary: zipObjectVals(colors.secondary, cyanDark),
  neutral: zipObjectVals(colors.neutral, mauveDark),
  success: zipObjectVals(colors.success, greenDark),
  info: zipObjectVals(colors.info, blueDark),
  warning: zipObjectVals(colors.warning, amberDark),
  danger: zipObjectVals(colors.danger, tomatoDark),
};

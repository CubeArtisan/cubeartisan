import { style } from '@vanilla-extract/css';

import { atoms, vars } from '@cubeartisan/cubeartisan/styles';

export const radioGroupItemGroup = style([
  atoms({
    height: 10,
    backgroundColor: 'neutralComponent',
    borderRadius: 'md',
    boxShadow: 'borderNeutralInteractive',
    overflow: 'hidden',
  }),
]);

export const radioGroupItem = style([
  atoms({
    color: { default: 'neutralLowContrast', hover: 'neutralContrast' },
    paddingInline: 2,
    paddingBlock: 1,
    borderRadius: 'md',
    margin: 1,
  }),
  {
    selectors: {
      '&[data-checked]': {
        background: vars.backgroundColor.info.infoSolid,
        color: vars.textColor.info.infoContrast,
      },
    },
  },
]);

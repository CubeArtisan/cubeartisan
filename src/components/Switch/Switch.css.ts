import { style } from '@vanilla-extract/css';

import { atoms, vars } from '@cubeartisan/cubeartisan/styles';

export const switchLabel = atoms({
  marginRight: 2.5,
  fontSize: 'sm',
  userSelect: 'none',
});

export const switchControl = style([
  atoms({
    display: 'inlineFlex',
    alignItems: 'center',
    height: 6,
    width: 11,
    borderRadius: 'xl',
    paddingInline: 0.5,
    backgroundColor: 'neutralComponent',
    boxShadow: 'borderNeutralInteractive',
  }),
  {
    transition: '250ms background-color',

    selectors: {
      '&[data-hover]': {
        backgroundColor: vars.backgroundColor.neutral.neutralComponentHover,
        boxShadow: vars.boxShadow.neutral.borderNeutralInteractiveHover,
      },
      '&[data-checked]': {
        backgroundColor: vars.backgroundColor.info.infoSolid,
        boxShadow: vars.boxShadow.info.borderInfoInteractiveHover,
      },
    },
  },
]);

export const switchThumb = style([
  atoms({
    height: 5,
    width: 5,
    borderRadius: 'full',
    backgroundColor: 'grayDark12',
  }),
  {
    transition: '250ms transform',

    selectors: {
      '&[data-checked]': {
        transform: 'translateX(calc(100% - 1px))',
      },
    },
  },
]);

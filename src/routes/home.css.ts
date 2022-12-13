import { style } from '@vanilla-extract/css';

import { atoms, vars } from '@cubeartisan/cubeartisan/styles';

export const app = atoms({
  height: 'full',
});

export const hero = style([
  atoms({
    height: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  {
    backgroundImage: `linear-gradient(to right, transparent, ${vars.backgroundColor.primary.primarySolid}, transparent)`,
  },
]);

export const heroTitle = atoms({
  fontSize: '2xl',
  fontWeight: 'bold',
});

export const heroSub = atoms({
  fontSize: 'lg',
  fontWeight: 'light',
  color: 'neutralLowContrast',
});

export const pageContent = style({
  marginInline: 'auto',
  width: `min(80%, ${vars.screens.md})`,
});

export const cubeCardList = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(max(25% + 0.75rem, 13rem), 100%), 1fr))',
  gap: vars.space[4],
});

export const cubeCardContainer = style([
  atoms({
    overflow: 'hidden',
    borderRadius: 'sm',
  }),
  {
    display: 'grid',
    gridTemplateAreas: '"a"',
    aspectRatio: '4/3',
    transitionDuration: '150ms',
    ':hover': {
      scale: 1.02,
      filter: `drop-shadow(0 ${vars.space[2]} ${vars.space[3]} ${vars.backgroundColor.shadow[8]})`,
    },
  },
]);

export const cubeCardImage = style([
  atoms({
    height: 'full',
    width: 'full',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }),
  {
    gridArea: 'a',
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: `inset 0 -6rem 5rem -5rem ${vars.staticColor.black}`,
  },
]);

export const cubeCardListBlurb = style([
  atoms({
    marginBottom: 5,
    marginTop: 10,
    width: 'max',
    fontSize: 'lg',
    fontWeight: 'semibold',
  }),
  {
    gridArea: 'a',
  },
]);

export const cubeCardLink = style([
  atoms({
    height: 'full',
    width: 'full',
  }),
  {
    gridArea: 'a',
  },
]);

export const cubeCardCaption = style([
  atoms({
    paddingBottom: 3,
    paddingInline: 3,
    fontWeight: 'semibold',
  }),
  {
    gridArea: 'a',
    justifySelf: 'flex-start',
    alignSelf: 'flex-end',
    color: vars.staticColor.grayDark[12],
  },
]);

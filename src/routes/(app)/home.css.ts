import { style } from '@vanilla-extract/css';

import { atoms, vars } from '@cubeartisan/cubeartisan/styles';

export const cubeCardList = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(max(25% + 0.75rem, 13rem), 100%), 1fr))',
  gap: vars.space[4],
});

export const cubeCardContainer = style({
  display: 'grid',
  gridTemplateAreas: '"a"',
  aspectRatio: '4/3',
  transitionDuration: '150ms',
});

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

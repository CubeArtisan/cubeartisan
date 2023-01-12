import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

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
  overflow: 'hidden',
  borderRadius: vars.borderRadius.sm,
  boxShadow: vars.boxShadow['2xl'],

  ':hover': {
    scale: '1.02',
  },
});

export const cubeCardImage = style({
  height: '100%',
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  gridArea: 'a',
  boxShadow: `inset 0 -6rem 5rem -5rem ${vars.color.black}`,
});

export const cubeCardListBlurb = style({
  marginBottom: vars.space[5],
  marginTop: vars.space[10],
  width: vars.size.maxContent,
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.semibold,
  gridArea: 'a',
});

export const cubeCardLink = style({
  height: '100%',
  width: '100%',
  gridArea: 'a',
});

export const cubeCardCaption = style({
  paddingBottom: vars.space[3],
  paddingInline: vars.space[3],
  fontWeight: vars.fontWeight.semibold,
  gridArea: 'a',
  justifySelf: 'flex-start',
  alignSelf: 'flex-end',
  color: vars.color.white,
});

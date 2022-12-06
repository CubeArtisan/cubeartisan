import { style } from '@vanilla-extract/css';

import { colors, vars } from '@cubeartisan/cubeartisan/styles';

export const app = style({
  height: '100%',
  background: colors.neutral[1],
  color: colors.neutral[12],
});

export const hero = style({
  height: vars.space[40],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `linear-gradient(to right, transparent, ${colors.primary[6]}, transparent)`,
});

export const heroTitle = style({
  fontSize: vars.fontSize['2xl'],
  fontWeight: vars.fontWeight.bold,
});

export const heroSub = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.light,
  color: colors.neutral[11],
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

export const cubeCardContainer = style({
  display: 'grid',
  gridTemplateAreas: '"a"',
  aspectRatio: '4/3',
  overflow: 'clip',
  borderRadius: vars.radii.sm,
  transitionDuration: '150ms',
  ':hover': {
    scale: 1.02,
    filter: `drop-shadow(0 ${vars.space[2]} ${vars.space[3]} ${colors.shadow[8]})`,
  },
});

export const cubeCardImage = style({
  gridArea: 'a',
  height: '100%',
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  boxShadow: `inset 0 -6rem 5rem -5rem black`,
});

export const cubeCardListBlurb = style({
  gridArea: 'a',
  marginBottom: vars.space[5],
  marginTop: vars.space[10],
  width: 'max-content',
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.semibold,
});

export const cubeCardLink = style({
  gridArea: 'a',
  height: '100%',
  width: '100%',
});

export const cubeCardCaption = style({
  gridArea: 'a',
  justifySelf: 'flex-start',
  alignSelf: 'flex-end',
  paddingBottom: vars.space[3],
  paddingInline: vars.space[3],
  fontSize: vars.fontSize.base,
  fontWeight: vars.fontWeight.semibold,
  color: colors.neutral[12],
});

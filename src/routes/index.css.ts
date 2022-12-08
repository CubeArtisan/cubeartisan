import { style } from '@vanilla-extract/css';

import { colors, sprinkles, vars } from '@cubeartisan/cubeartisan/styles';

export const app = sprinkles({
  height: 'full',
});

export const hero = style([
  sprinkles({
    height: 40,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  {
    backgroundImage: `linear-gradient(to right, transparent, ${colors.primary[6]}, transparent)`,
  },
]);

export const heroTitle = sprinkles({
  fontSize: '2xl',
  fontWeight: 'bold',
});

export const heroSub = style([
  sprinkles({
    fontSize: 'lg',
    fontWeight: 'light',
  }),
  {
    color: colors.neutral[11],
  },
]);

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
  sprinkles({
    overflow: 'clip',
    borderRadius: 'sm',
  }),
  {
    display: 'grid',
    gridTemplateAreas: '"a"',
    aspectRatio: '4/3',
    transitionDuration: '150ms',
    ':hover': {
      scale: 1.02,
      filter: `drop-shadow(0 ${vars.space[2]} ${vars.space[3]} ${colors.shadow[8]})`,
    },
  },
]);

export const cubeCardImage = style([
  sprinkles({
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
    boxShadow: `inset 0 -6rem 5rem -5rem ${vars.colors.black}`,
  },
]);

export const cubeCardListBlurb = style([
  sprinkles({
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
  sprinkles({
    height: 'full',
    width: 'full',
  }),
  {
    gridArea: 'a',
  },
]);

export const cubeCardCaption = style([
  sprinkles({
    paddingBottom: 3,
    paddingX: 3,
    fontWeight: 'semibold',
  }),
  {
    gridArea: 'a',
    justifySelf: 'flex-start',
    alignSelf: 'flex-end',
    color: vars.colors.grayDark[12],
  },
]);

import { recipe } from '@vanilla-extract/recipes';

import { atoms, vars } from '@cubeartisan/cubeartisan/styles';

export const heroContentBlockRecipe = recipe({
  base: atoms({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }),
  variants: {
    textAlign: {
      center: atoms({ alignItems: 'center' }),
      right: atoms({ alignItems: 'flexEnd' }),
      left: atoms({ alignItems: 'flexStart' }),
    },
  },
});

export type HeroContentBlockVariants = Parameters<HeroContentBlockVariants>[0];

export const heroRootRecipe = recipe({
  base: atoms({
    display: 'flex',
    alignItems: 'center',
    paddingInline: 10,
  }),
  variants: {
    justify: {
      center: atoms({ justifyContent: 'center' }),
      left: atoms({ justifyContent: 'flexStart' }),
      right: atoms({ justifyContent: 'flexEnd' }),
      split: atoms({ justifyContent: 'spaceBetween' }),
    },
    background: {
      gradientLeft: {
        backgroundImage: `linear-gradient(to right, transparent, ${vars.backgroundColor.primary.primarySolid})`,
      },
      gradientRight: {
        backgroundImage: `linear-gradient(to left, transparent, ${vars.backgroundColor.primary.primarySolid})`,
      },
      gradientCenter: {
        backgroundImage: `linear-gradient(to right, transparent, ${vars.backgroundColor.primary.primarySolid}, transparent)`,
      },
      solid: { backgroundColor: vars.backgroundColor.primary.primarySolid },
    },
  },
});

export type HeroRootVariants = Parameters<typeof heroRootRecipe>[0];

import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { atoms, vars } from '@cubeartisan/cubeartisan/styles';

export const hero = recipe({
  base: atoms({
    display: 'flex',
    alignItems: 'center',
  }),

  variants: {
    layout: {
      center: atoms({ justifyContent: 'center' }),
      left: atoms({ justifyContent: 'flexStart' }),
      right: atoms({ justifyContent: 'flexEnd' }),
      split: atoms({ justifyContent: 'spaceBetween' }),
    },
    background: {
      gradient: {
        backgroundImage: `linear-gradient(to right, transparent, ${vars.backgroundColor.primary.primarySolid}, transparent)`,
      },
      solid: {
        backgroundColor: vars.backgroundColor.primary.primarySolid,
      },
    },
  },
});

export type HeroVariants = RecipeVariants<typeof hero>;

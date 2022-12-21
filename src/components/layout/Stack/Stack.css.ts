import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { atoms } from '@cubeartisan/cubeartisan/styles';

export const stackRecipe = recipe({
  base: atoms({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }),
  variants: {
    space: {
      xs: atoms({ gap: 1 }),
      sm: atoms({ gap: 2 }),
      md: atoms({ gap: 3 }),
      lg: atoms({ gap: 5 }),
      'space-between': atoms({ justifyContent: 'spaceBetween' }),
      'space-around': atoms({ justifyContent: 'spaceAround' }),
    },
    align: {
      left: atoms({ alignItems: 'flexStart' }),
      right: atoms({ alignItems: 'flexEnd' }),
      center: atoms({ alignItems: 'center' }),
    },
  },
});

export type StackVariants = RecipeVariants<typeof stackRecipe>;

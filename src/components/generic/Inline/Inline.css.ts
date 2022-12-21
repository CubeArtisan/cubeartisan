import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { atoms } from '@cubeartisan/cubeartisan/styles';

export const inlineRecipe = recipe({
  base: atoms({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});

export type InlineVariants = RecipeVariants<typeof inlineRecipe>;

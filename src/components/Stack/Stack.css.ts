import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { atoms } from '@cubeartisan/cubeartisan/styles';

export const hStackRecipe = recipe({
  base: atoms({
    display: 'flex',
    flexDirection: 'row',
  }),
  variants: {
    align: {
      normal: atoms({ alignItems: 'normal' }),
      center: atoms({ alignItems: 'center' }),
      start: atoms({ alignItems: 'flexStart' }),
      end: atoms({ alignItems: 'flexEnd' }),
    },
    justify: {
      normal: atoms({ justifyContent: 'normal' }),
      center: atoms({ justifyContent: 'center' }),
      start: atoms({ justifyContent: 'flexStart' }),
      end: atoms({ justifyContent: 'flexEnd' }),
      spaceAround: atoms({ justifyContent: 'spaceAround' }),
      spaceBetween: atoms({ justifyContent: 'spaceBetween' }),
      spaceEvenly: atoms({ justifyContent: 'spaceEvenly' }),
    },
  },
});

export type HStackVariants = RecipeVariants<typeof hStackRecipe>;

export const vStackRecipe = recipe({
  base: atoms({
    display: 'flex',
    flexDirection: 'column',
  }),
  variants: {
    align: {
      center: atoms({ alignItems: 'center' }),
      start: atoms({ alignItems: 'flexStart' }),
      end: atoms({ alignItems: 'flexEnd' }),
    },
    justify: {
      center: atoms({ justifyContent: 'center' }),
      start: atoms({ justifyContent: 'flexStart' }),
      end: atoms({ justifyContent: 'flexEnd' }),
      spaceAround: atoms({ justifyContent: 'spaceAround' }),
      spaceBetween: atoms({ justifyContent: 'spaceBetween' }),
      spaceEvenly: atoms({ justifyContent: 'spaceEvenly' }),
    },
  },
});

export type VStackVariants = RecipeVariants<typeof hStackRecipe>;

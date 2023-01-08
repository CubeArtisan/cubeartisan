import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { atoms } from '@cubeartisan/cubeartisan/styles';

export const hStackRecipe = recipe({
  base: atoms({
    display: 'flex',
    flexDirection: 'row',
    gap: '2',
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
  defaultVariants: {
    align: 'center',
    justify: 'center',
  },
});

export type HStackVariants = RecipeVariants<typeof hStackRecipe>;

export const vStackRecipe = recipe({
  base: atoms({
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
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
  defaultVariants: {
    align: 'center',
    justify: 'center',
  },
});

export type VStackVariants = RecipeVariants<typeof hStackRecipe>;

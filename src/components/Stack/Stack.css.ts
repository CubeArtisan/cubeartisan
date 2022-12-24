import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { atoms } from '@cubeartisan/cubeartisan/styles';

const spacing = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 5,
  xl: 8,
};

export const stackRecipe = recipe({
  base: atoms({
    display: 'flex',
  }),
  variants: {
    direction: {
      row: atoms({ flexDirection: 'row' }),
      column: atoms({ flexDirection: 'column' }),
    },
    spacing: {
      xs: atoms({ gap: spacing.xs }),
      sm: atoms({ gap: spacing.sm }),
      md: atoms({ gap: spacing.md }),
      lg: atoms({ gap: spacing.lg }),
      xl: atoms({ gap: spacing.xl }),
    },
    spacingX: {
      xs: atoms({ rowGap: spacing.xs }),
      sm: atoms({ rowGap: spacing.sm }),
      md: atoms({ rowGap: spacing.md }),
      lg: atoms({ rowGap: spacing.lg }),
      xl: atoms({ rowGap: spacing.xl }),
    },
    spacingY: {
      xs: atoms({ columnGap: spacing.xs }),
      sm: atoms({ columnGap: spacing.sm }),
      md: atoms({ columnGap: spacing.md }),
      lg: atoms({ columnGap: spacing.lg }),
      xl: atoms({ columnGap: spacing.xl }),
    },
    wrap: {
      nowrap: atoms({ flexWrap: 'nowrap' }),
      wrap: atoms({ flexWrap: 'wrap' }),
    },
    align: {
      start: atoms({ alignItems: 'flexStart' }),
      end: atoms({ alignItems: 'flexEnd' }),
      center: atoms({ alignItems: 'center' }),
    },
    justify: {
      start: atoms({ justifyContent: 'flexStart' }),
      end: atoms({ justifyContent: 'flexEnd' }),
      center: atoms({ justifyContent: 'center' }),
      'space-around': atoms({ justifyContent: 'spaceAround' }),
      'space-between': atoms({ justifyContent: 'spaceBetween' }),
      'space-evenly': atoms({ justifyContent: 'spaceEvenly' }),
    },
  },
  defaultVariants: {
    direction: 'column',
    spacing: 'md',
    spacingX: 'md',
    spacingY: 'md',
    wrap: 'nowrap',
    align: 'center',
    justify: 'center',
  },
});

export type StackVariants = RecipeVariants<typeof stackRecipe>;

export const hStackRecipe = recipe({
  base: atoms({
    display: 'flex',
    flexDirection: 'row',
  }),
  variants: {
    spacing: {
      xs: atoms({ gap: spacing.xs }),
      sm: atoms({ gap: spacing.sm }),
      md: atoms({ gap: spacing.md }),
      lg: atoms({ gap: spacing.lg }),
      xl: atoms({ gap: spacing.xl }),
    },
    spacingX: {
      xs: atoms({ rowGap: spacing.xs }),
      sm: atoms({ rowGap: spacing.sm }),
      md: atoms({ rowGap: spacing.md }),
      lg: atoms({ rowGap: spacing.lg }),
      xl: atoms({ rowGap: spacing.xl }),
    },
    spacingY: {
      xs: atoms({ columnGap: spacing.xs }),
      sm: atoms({ columnGap: spacing.sm }),
      md: atoms({ columnGap: spacing.md }),
      lg: atoms({ columnGap: spacing.lg }),
      xl: atoms({ columnGap: spacing.xl }),
    },
    wrap: {
      nowrap: atoms({ flexWrap: 'nowrap' }),
      wrap: atoms({ flexWrap: 'wrap' }),
    },
    align: {
      start: atoms({ alignItems: 'flexStart' }),
      end: atoms({ alignItems: 'flexEnd' }),
      center: atoms({ alignItems: 'center' }),
    },
    justify: {
      start: atoms({ justifyContent: 'flexStart' }),
      end: atoms({ justifyContent: 'flexEnd' }),
      center: atoms({ justifyContent: 'center' }),
      'space-around': atoms({ justifyContent: 'spaceAround' }),
      'space-between': atoms({ justifyContent: 'spaceBetween' }),
      'space-evenly': atoms({ justifyContent: 'spaceEvenly' }),
    },
  },
  defaultVariants: {
    spacing: 'md',
    spacingX: 'md',
    spacingY: 'md',
    wrap: 'nowrap',
    align: 'center',
    justify: 'center',
  },
});

export type HStackVariants = RecipeVariants<typeof hStackRecipe>;

export const vStackRecipe = recipe({
  base: atoms({
    display: 'flex',
    flexDirection: 'column',
  }),
  variants: {
    spacing: {
      xs: atoms({ gap: spacing.xs }),
      sm: atoms({ gap: spacing.sm }),
      md: atoms({ gap: spacing.md }),
      lg: atoms({ gap: spacing.lg }),
      xl: atoms({ gap: spacing.xl }),
    },
    spacingX: {
      xs: atoms({ rowGap: spacing.xs }),
      sm: atoms({ rowGap: spacing.sm }),
      md: atoms({ rowGap: spacing.md }),
      lg: atoms({ rowGap: spacing.lg }),
      xl: atoms({ rowGap: spacing.xl }),
    },
    spacingY: {
      xs: atoms({ columnGap: spacing.xs }),
      sm: atoms({ columnGap: spacing.sm }),
      md: atoms({ columnGap: spacing.md }),
      lg: atoms({ columnGap: spacing.lg }),
      xl: atoms({ columnGap: spacing.xl }),
    },
    wrap: {
      nowrap: atoms({ flexWrap: 'nowrap' }),
      wrap: atoms({ flexWrap: 'wrap' }),
    },
    align: {
      start: atoms({ alignItems: 'flexStart' }),
      end: atoms({ alignItems: 'flexEnd' }),
      center: atoms({ alignItems: 'center' }),
    },
    justify: {
      start: atoms({ justifyContent: 'flexStart' }),
      end: atoms({ justifyContent: 'flexEnd' }),
      center: atoms({ justifyContent: 'center' }),
      'space-around': atoms({ justifyContent: 'spaceAround' }),
      'space-between': atoms({ justifyContent: 'spaceBetween' }),
      'space-evenly': atoms({ justifyContent: 'spaceEvenly' }),
    },
  },
  defaultVariants: {
    spacing: 'md',
    spacingX: 'md',
    spacingY: 'md',
    wrap: 'nowrap',
    align: 'center',
    justify: 'center',
  },
});

export type VStackVariants = RecipeVariants<typeof vStackRecipe>;

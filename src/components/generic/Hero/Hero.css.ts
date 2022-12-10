import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { colors, sprinkles } from '@cubeartisan/cubeartisan/styles';

export const hero = recipe({
  base: sprinkles({
    display: 'flex',
    alignItems: 'center',
  }),

  variants: {
    layout: {
      center: sprinkles({ justifyContent: 'center' }),
      left: sprinkles({ justifyContent: 'flex-start' }),
      right: sprinkles({ justifyContent: 'flex-end' }),
      split: sprinkles({ justifyContent: 'space-between' }),
    },
    background: {
      gradient: {
        backgroundImage: `linear-gradient(to right, transparent, ${colors.primary[6]}, transparent)`,
      },
      solid: {
        backgroundColor: colors.primaryA[6],
      },
    },
  },
});

export type HeroVariants = RecipeVariants<typeof hero>;

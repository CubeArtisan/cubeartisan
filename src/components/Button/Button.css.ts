import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const buttonRecipe = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBlock: vars.relativeSpace[1],
    paddingInline: vars.relativeSpace[2],
    borderRadius: vars.borderRadius.md,
  },
  variants: {
    size: {
      xs: { fontSize: vars.fontSize.xs, lineHeight: vars.lineHeight.xs },
      sm: { fontSize: vars.fontSize.sm, lineHeight: vars.lineHeight.sm },
      md: { fontSize: vars.fontSize.md, lineHeight: vars.lineHeight.md },
      lg: { fontSize: vars.fontSize.lg, lineHeight: vars.lineHeight.lg },
      xl: { fontSize: vars.fontSize.xl, lineHeight: vars.lineHeight.xl },
      '2xl': { fontSize: vars.fontSize['2xl'], lineHeight: vars.lineHeight['2xl'] },
    },
    color: {
      neutral: {
        background: vars.color.neutral3,
        outline: `solid ${vars.borderSize.standard} ${vars.color.neutral6}`,

        ':hover': {
          background: vars.color.neutral4,
          outline: `solid ${vars.borderSize.standard} ${vars.color.neutral7}`,
        },

        ':active': {
          background: vars.color.neutral5,
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'neutral',
  },
});

export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;

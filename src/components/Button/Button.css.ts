import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from '@cubeartisan/cubeartisan/styles';

const buttonColor = createThemeContract({
  baseBgColor: null,
  baseOutlineColor: null,
  hoverBgColor: null,
  hoverOutlineColor: null,
  activeBgColor: null,
});

export const buttonRecipe = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vars.borderRadius.md,

    background: buttonColor.baseBgColor,
    outline: `solid ${vars.borderSize.standard} ${buttonColor.baseOutlineColor}`,

    selectors: {
      '&[data-hover]': {
        background: buttonColor.hoverBgColor,
        outline: `solid ${vars.borderSize.standard} ${buttonColor.hoverOutlineColor}`,
      },
      '&[data-active]': {
        background: buttonColor.activeBgColor,
      },
      '&[data-focus]': {
        outline: `solid ${vars.borderSize['focus-ring']} ${vars.color.neutral7}`,
      },
      '&[data-disabled]': {
        background: vars.color.neutral2,
        outline: `solid ${vars.borderSize.standard} ${vars.color.neutral5}`,
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    color: {
      neutral: {
        vars: assignVars(buttonColor, {
          baseBgColor: vars.color.neutral3,
          baseOutlineColor: vars.color.neutral6,
          hoverBgColor: vars.color.neutral4,
          hoverOutlineColor: vars.color.neutral7,
          activeBgColor: vars.color.neutral8,
        }),
      },
      primary: {
        vars: assignVars(buttonColor, {
          baseBgColor: vars.color.primary3,
          baseOutlineColor: vars.color.primary6,
          hoverBgColor: vars.color.primary4,
          hoverOutlineColor: vars.color.primary7,
          activeBgColor: vars.color.primary8,
        }),
      },
      success: {
        vars: assignVars(buttonColor, {
          baseBgColor: vars.color.success3,
          baseOutlineColor: vars.color.success6,
          hoverBgColor: vars.color.success4,
          hoverOutlineColor: vars.color.success7,
          activeBgColor: vars.color.success8,
        }),
      },
      info: {
        vars: assignVars(buttonColor, {
          baseBgColor: vars.color.info3,
          baseOutlineColor: vars.color.info6,
          hoverBgColor: vars.color.info4,
          hoverOutlineColor: vars.color.info7,
          activeBgColor: vars.color.info8,
        }),
      },
      warning: {
        vars: assignVars(buttonColor, {
          baseBgColor: vars.color.warning3,
          baseOutlineColor: vars.color.warning6,
          hoverBgColor: vars.color.warning4,
          hoverOutlineColor: vars.color.warning7,
          activeBgColor: vars.color.warning8,
        }),
      },
      danger: {
        vars: assignVars(buttonColor, {
          baseBgColor: vars.color.danger3,
          baseOutlineColor: vars.color.danger6,
          hoverBgColor: vars.color.danger4,
          hoverOutlineColor: vars.color.danger7,
          activeBgColor: vars.color.danger8,
        }),
      },
    },
    defaultVariants: {
      color: 'neutral',
    },
  },
});

export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;

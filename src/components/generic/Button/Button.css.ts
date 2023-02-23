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

    ':hover': {
      background: buttonColor.hoverBgColor,
      outlineColor: buttonColor.hoverOutlineColor,
    },
    ':active': {
      background: buttonColor.activeBgColor,
    },
    ':focus': {
      outline: `solid ${vars.borderSize['focus-ring']} ${vars.color.neutral7}`,
    },
    ':disabled': {
      background: vars.color.neutral2,
      outlineColor: vars.color.neutral5,
      cursor: 'not-allowed',
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
    padding: {
      baseText: {
        paddingInline: vars.space[2],
        paddingBlock: vars.space[1],
      },
    },
  },
  defaultVariants: {
    color: 'neutral',
  },
});

export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;

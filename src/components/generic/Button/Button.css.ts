import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from '@cubeartisan/cubeartisan/styles';

const buttonColor = createThemeContract({
  baseTextColor: null,
  hoverTextColor: null,
  baseBgColor: null,
  hoverBgColor: null,
  activeBgColor: null,
  baseOutlineColor: null,
  hoverOutlineColor: null,
  activeOutlineColor: null,
});

export const buttonRecipe = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vars.borderRadius.md,

    color: buttonColor.baseTextColor,
    backgroundColor: buttonColor.baseBgColor,
    outline: `solid ${vars.borderSize.standard} ${buttonColor.baseOutlineColor}`,

    ':hover': {
      color: buttonColor.hoverTextColor,
      backgroundColor: buttonColor.hoverBgColor,
      outlineColor: buttonColor.hoverOutlineColor,
    },
    ':active': {
      backgroundColor: buttonColor.activeBgColor,
      outlineColor: buttonColor.activeOutlineColor,
    },
    ':focus': {
      outline: `solid ${vars.borderSize['focus-ring']} ${vars.color.neutral7}`,
    },
    ':disabled': {
      backgroundColor: vars.color.neutral2,
      outlineColor: vars.color.neutral5,
      cursor: 'not-allowed',
    },
  },
  variants: {
    color: {
      neutral: {
        vars: assignVars(buttonColor, {
          baseTextColor: vars.color.neutral11,
          hoverTextColor: vars.color.neutral12,
          baseBgColor: vars.color.neutral3,
          hoverBgColor: vars.color.neutral4,
          activeBgColor: vars.color.neutral5,
          baseOutlineColor: vars.color.neutral6,
          hoverOutlineColor: vars.color.neutral7,
          activeOultineColor: vars.color.neutral8,
        }),
      },
      primary: {
        vars: assignVars(buttonColor, {
          baseTextColor: vars.color.primary11,
          hoverTextColor: vars.color.primary12,
          baseBgColor: vars.color.primary3,
          hoverBgColor: vars.color.primary4,
          activeBgColor: vars.color.primary5,
          baseOutlineColor: vars.color.primary6,
          hoverOutlineColor: vars.color.primary7,
          activeOultineColor: vars.color.primary8,
        }),
      },
      success: {
        vars: assignVars(buttonColor, {
          baseTextColor: vars.color.success11,
          hoverTextColor: vars.color.success12,
          baseBgColor: vars.color.success3,
          hoverBgColor: vars.color.success4,
          activeBgColor: vars.color.success5,
          baseOutlineColor: vars.color.success6,
          hoverOutlineColor: vars.color.success7,
          activeOultineColor: vars.color.success8,
        }),
      },
      info: {
        vars: assignVars(buttonColor, {
          baseTextColor: vars.color.info11,
          hoverTextColor: vars.color.info12,
          baseBgColor: vars.color.info3,
          hoverBgColor: vars.color.info4,
          activeBgColor: vars.color.info5,
          baseOutlineColor: vars.color.info6,
          hoverOutlineColor: vars.color.info7,
          activeOultineColor: vars.color.info8,
        }),
      },
      warning: {
        vars: assignVars(buttonColor, {
          baseTextColor: vars.color.warning11,
          hoverTextColor: vars.color.warning12,
          baseBgColor: vars.color.warning3,
          hoverBgColor: vars.color.warning4,
          activeBgColor: vars.color.warning5,
          baseOutlineColor: vars.color.warning6,
          hoverOutlineColor: vars.color.warning7,
          activeOultineColor: vars.color.warning8,
        }),
      },
      danger: {
        vars: assignVars(buttonColor, {
          baseTextColor: vars.color.danger11,
          hoverTextColor: vars.color.danger12,
          baseBgColor: vars.color.danger3,
          hoverBgColor: vars.color.danger4,
          activeBgColor: vars.color.danger5,
          baseOutlineColor: vars.color.danger6,
          hoverOutlineColor: vars.color.danger7,
          activeOultineColor: vars.color.danger8,
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

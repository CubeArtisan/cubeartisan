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

        selectors: {
          '&[data-hover]': {
            background: vars.color.neutral4,
            outline: `solid ${vars.borderSize.standard} ${vars.color.neutral7}`,
          },
          '&[data-active]': {
            background: vars.color.neutral5,
          },
          '&[focus-active]': {
            outline: `solid ${vars.borderSize['focus-ring']} ${vars.color.primary7}`,
          },
          '&[data-disabled]': {
            outline: `solid ${vars.borderSize.standard} ${vars.color.neutral5}`,
            background: vars.color.neutral2,
            cursor: 'not-allowed',
          },
        },
      },
      primary: {
        background: vars.color.primary3,
        outline: `solid ${vars.borderSize.standard} ${vars.color.primary6}`,

        selectors: {
          '&[data-hover]': {
            background: vars.color.primary4,
            outline: `solid ${vars.borderSize.standard} ${vars.color.primary7}`,
          },
          '&[data-active]': {
            background: vars.color.primary5,
          },
          '&[focus-active]': {
            outline: `solid ${vars.borderSize['focus-ring']} ${vars.color.primary7}`,
          },
          '&[data-disabled]': {
            outline: `solid ${vars.borderSize.standard} ${vars.color.neutral5}`,
            background: vars.color.neutral2,
            cursor: 'not-allowed',
          },
        },
      },
      success: {
        background: vars.color.success3,
        outline: `solid ${vars.borderSize.standard} ${vars.color.success6}`,

        selectors: {
          '&[data-hover]': {
            background: vars.color.success4,
            outline: `solid ${vars.borderSize.standard} ${vars.color.success7}`,
          },
          '&[data-active]': {
            background: vars.color.success5,
          },
          '&[focus-active]': {
            outline: `solid ${vars.borderSize['focus-ring']} ${vars.color.primary7}`,
          },
          '&[data-disabled]': {
            outline: `solid ${vars.borderSize.standard} ${vars.color.neutral5}`,
            background: vars.color.neutral2,
            cursor: 'not-allowed',
          },
        },
      },
      info: {
        background: vars.color.info3,
        outline: `solid ${vars.borderSize.standard} ${vars.color.info6}`,

        selectors: {
          '&[data-hover]': {
            background: vars.color.info4,
            outline: `solid ${vars.borderSize.standard} ${vars.color.info7}`,
          },
          '&[data-active]': {
            background: vars.color.info5,
          },
          '&[focus-active]': {
            outline: `solid ${vars.borderSize['focus-ring']} ${vars.color.primary7}`,
          },
          '&[data-disabled]': {
            outline: `solid ${vars.borderSize.standard} ${vars.color.neutral5}`,
            background: vars.color.neutral2,
            cursor: 'not-allowed',
          },
        },
      },
      warning: {
        background: vars.color.warning3,
        outline: `solid ${vars.borderSize.standard} ${vars.color.warning6}`,

        selectors: {
          '&[data-hover]': {
            background: vars.color.warning4,
            outline: `solid ${vars.borderSize.standard} ${vars.color.warning7}`,
          },
          '&[data-active]': {
            background: vars.color.warning5,
          },
          '&[focus-active]': {
            outline: `solid ${vars.borderSize['focus-ring']} ${vars.color.primary7}`,
          },
          '&[data-disabled]': {
            outline: `solid ${vars.borderSize.standard} ${vars.color.neutral5}`,
            background: vars.color.neutral2,
            cursor: 'not-allowed',
          },
        },
      },
      danger: {
        background: vars.color.danger3,
        outline: `solid ${vars.borderSize.standard} ${vars.color.danger6}`,

        selectors: {
          '&[data-hover]': {
            background: vars.color.danger4,
            outline: `solid ${vars.borderSize.standard} ${vars.color.danger7}`,
          },
          '&[data-active]': {
            background: vars.color.danger5,
          },
          '&[focus-active]': {
            outline: `solid ${vars.borderSize['focus-ring']} ${vars.color.primary7}`,
          },
          '&[data-disabled]': {
            outline: `solid ${vars.borderSize.standard} ${vars.color.neutral5}`,
            background: vars.color.neutral2,
            cursor: 'not-allowed',
          },
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

import { createVar, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const radioGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2.5'],
});

export const radioGroupItemsContainer = style({
  display: 'flex',
  justifyContent: 'space-evenly',
  minHeight: vars.space[10],
  backgroundColor: vars.color.neutral3,
  borderRadius: vars.borderRadius.md,
  outline: `solid ${vars.borderSize.standard} ${vars.color.neutral7}`,

  selectors: {
    '&:focus-within': {
      outline: `solid ${vars.borderSize['focus-ring']} ${vars.color.neutral7}`,
    },
  },
});

const radioCheckedColor = createVar();
export const radioGroupItem = recipe({
  base: {
    color: vars.color.neutral11,
    alignSelf: 'center',
    paddingInline: vars.space[2],
    paddingBlock: vars.space[1],
    borderRadius: vars.borderRadius.md,
    margin: vars.space[1],
    cursor: 'pointer',

    ':hover': {
      color: vars.color.neutral12,
      backgroundColor: vars.color.neutral4,
      outline: `solid ${vars.borderSize.standard} ${vars.color.neutral7}`,
    },
    ':active': {
      backgroundColor: vars.color.neutral5,
      outline: `solid ${vars.borderSize.standard} ${vars.color.neutral8}`,
    },
    selectors: {
      '&[data-checked]': {
        background: radioCheckedColor,
        color: vars.color.neutral12,
      },
    },
  },
  variants: {
    color: {
      info: {
        vars: {
          [radioCheckedColor]: vars.color.info9,
        },
      },
      primary: {
        vars: {
          [radioCheckedColor]: vars.color.primary8,
        },
      },
    },
  },
  defaultVariants: {
    color: 'info',
  },
});
export type RadioGroupItemRecipe = RecipeVariants<typeof radioGroupItem>;

export const vSeparator = style({
  height: 'auto',
  marginBlock: vars.space[1],
  width: '1px',
  backgroundColor: vars.color.neutral9,
});

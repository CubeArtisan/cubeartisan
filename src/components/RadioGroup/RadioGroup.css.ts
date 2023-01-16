import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const radioGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2.5'],
});

export const radioGroupItemsContainer = style({
  display: 'flex',
  alignItems: 'center',
  height: vars.space[10],
  backgroundColor: vars.color.neutral3,
  borderRadius: vars.borderRadius.md,
  outline: `solid ${vars.borderSize.standard} ${vars.color.neutral7}`,

  selectors: {
    '&:focus-within': {
      outline: `solid ${vars.borderSize['focus-ring']} ${vars.color.primary7}`,
    },
  },
});

export const radioGroupItem = style({
  color: vars.color.neutral11,
  paddingInline: vars.space[2],
  paddingBlock: vars.space[1],
  borderRadius: vars.borderRadius.md,
  margin: vars.space[1],
  cursor: 'pointer',

  selectors: {
    '&[data-hover]': {
      color: vars.color.neutral12,
      backgroundColor: vars.color.neutral4,
      outline: `solid ${vars.borderSize.standard} ${vars.color.neutral7}`,
    },
    '&[data-active]': {
      backgroundColor: vars.color.neutral5,
      outline: `solid ${vars.borderSize.standard} ${vars.color.neutral8}`,
    },
    '&[data-checked]': {
      background: vars.color.info9,
      color: vars.color.neutral12,
    },
  },
});

export const vSeparator = style({
  height: '80%',
  width: '1px',
  backgroundColor: vars.color.neutral9,
});

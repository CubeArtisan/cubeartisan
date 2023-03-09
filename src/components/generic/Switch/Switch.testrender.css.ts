import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const testContainer = style({
  display: 'flex',
  gap: vars.space['2.5'],
  alignItems: 'center',
  justifyContent: 'center',
});

export const toggleLabel = style({
  borderRadius: vars.borderRadius.md,
  paddingInline: vars.space[2],
  paddingBlock: vars.space[1],
  transition: 'background-color 200ms',
});

export const toggleChecked = style({
  backgroundColor: vars.color.success3,
  outline: `solid ${vars.borderSize.standard} ${vars.color.success6}`,
});

export const toggleUnchecked = style({
  backgroundColor: vars.color.danger3,
  outline: `solid ${vars.borderSize.standard} ${vars.color.danger6}`,
});

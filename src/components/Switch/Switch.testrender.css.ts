import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const toggleLabel = style({
  outline: `${vars.borderSize.standard} ${vars.color.neutral6}`,
  borderRadius: vars.borderRadius.md,
  paddingInline: vars.space[2],
  paddingBlock: vars.space[1],
  backgroundColor: vars.color.neutral9,
});

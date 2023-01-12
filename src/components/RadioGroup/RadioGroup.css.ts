import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const radioGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2.5'],
});

export const radioGroupItemsContainer = style({
  height: vars.space[10],
  backgroundColor: vars.color.neutral3,
  borderRadius: vars.borderRadius.md,
  outline: `${vars.borderSize.standard} ${vars.color.neutral7}`,
  overflow: 'hidden',
});

export const radioGroupItem = style({
  color: { default: 'neutralLowContrast', hover: 'neutralContrast' },
  paddingInline: 2,
  paddingBlock: 1,
  borderRadius: 'md',
  margin: 1,

  selectors: {
    '&[data-checked]': {
      background: vars.color.info9,
      color: vars.color.info12,
    },
  },
});

export const vSeparator = style({
  height: '80%',
  width: '1px',
  color: vars.color.neutral9,
});

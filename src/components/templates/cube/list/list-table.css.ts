import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const tableContainer = style({
  overflow: 'scroll',
  display: 'flex',
  flexDirection: 'column',
});

export const table = style({
  display: 'flex',
  gap: vars.space['2.5'],
  alignItems: 'start',
  marginInline: 'auto',
  padding: vars.space['2.5'],
});

export const tableColumn = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  minWidth: '8.5rem',
});

export const tableColumnTitle = style({
  alignSelf: 'center',
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.semibold,
  marginBottom: vars.space['2.5'],
});

export const tableColumnContent = style({
  paddingBlock: vars.space[1],
  paddingInline: vars.space['2.5'],
  borderRadius: vars.borderRadius.md,
  outline: `solid ${vars.borderSize.standard} ${vars.color.neutral11}`,
});

export const tableColumnItem = style({
  fontSize: vars.fontSize.base,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

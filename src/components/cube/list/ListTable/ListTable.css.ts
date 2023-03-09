import { createVar, style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const tableContainer = style({
  display: 'flex',
  justifyContent: 'center',
});

export const table = style({
  display: 'flex',
  justifyContent: 'start',
  gap: vars.space['2.5'],
  paddingInline: vars.space['2.5'],
  overflow: 'scroll',

  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const tableColumn = style({
  maxWidth: vars.space[40],
});

export const tableColumnTitle = style({
  textAlign: 'center',
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.semibold,
  marginBottom: vars.space['2.5'],
});

export const tableColumnContent = style({
  borderRadius: vars.borderRadius.md,
  color: vars.color.neutral11,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2.5'],
});

export const tableColumnSection = style({
  outline: `solid ${vars.borderSize.large} ${vars.color.neutral6}`,
  borderRadius: vars.borderRadius.md,
  overflow: 'hidden',
});

export const tableColumnSectionTitle = style({
  color: vars.color.neutral12,
  textAlign: 'center',
  textTransform: 'capitalize',
  fontSize: vars.fontSize.sm,
  lineHeight: vars.fontSize.sm,
  paddingBlock: vars.space[1],
  background: vars.color.neutral3,
});

export const tableColumnSectionDivider = style({
  height: '1px',
  backgroundColor: vars.color.neutral9,
  width: '100%',
});

export const cardBackground = createVar();
export const tableCardItemButton = style({
  position: 'relative',
  backgroundColor: cardBackground,

  paddingInline: vars.space['1.5'],
  paddingBlock: vars.space['0.5'],
  width: '100%',
  textAlign: 'left',

  ':hover': {
    color: vars.color.neutral12,
  },

  selectors: {
    '&:hover:after': {
      content: '',
      position: 'absolute',
      inset: 0,
      backgroundColor: vars.color.shadow4,
    },
  },
});

export const tableCardItemText = style({
  display: 'block',
  fontSize: vars.fontSize.sm,
  lineHeight: vars.lineHeight.sm,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

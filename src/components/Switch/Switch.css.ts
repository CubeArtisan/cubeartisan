import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const switchLabel = style({
  justifySelf: 'flex-start',
  fontSize: vars.fontSize.sm,
  userSelect: 'none',
});

export const switchControl = style({
  justifySelf: 'flex-end',
  display: 'inline-flex',
  alignItems: 'center',
  height: vars.space[6],
  width: vars.space[11],
  borderRadius: vars.borderRadius.xl,
  paddingInline: vars.space['0.5'],
  backgroundColor: vars.color.neutral3,
  outline: `solid ${vars.borderSize.standard} ${vars.color.neutral7}`,
  transition: '250ms background-color',

  selectors: {
    '&[data-hover]': {
      backgroundColor: vars.color.neutral4,
      outline: `solid ${vars.borderSize.standard} ${vars.color.neutral8}`,
    },
    '&[data-checked]': {
      backgroundColor: vars.color.info9,
      outline: `solid ${vars.borderSize.standard} ${vars.color.neutral9}`,
    },
  },
});

export const switchThumb = style({
  height: vars.space[5],
  width: vars.space[5],
  borderRadius: vars.borderRadius.full,
  backgroundColor: vars.color.neutral11,
  transition: '250ms transform',

  selectors: {
    '&[data-checked]': {
      transform: 'translateX(calc(100% - 1px))',
    },
  },
});

export const switchRoot = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space['2.5'],
});

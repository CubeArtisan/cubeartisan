import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const textfieldRoot = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['2.5'],
  width: vars.size.md,
});

export const textfieldInput = style({
  display: 'inline-flex',
  borderRadius: vars.borderRadius.md,
  paddingInline: vars.space[2],
  paddingBlock: vars.space[1],
  backgroundColor: vars.color.neutral3,
  outline: `solid ${vars.borderSize.standard} ${vars.color.neutral6}`,

  selectors: {
    '&[data-hover]': {
      backgroundColor: vars.color.neutral4,
      outline: `solid ${vars.borderSize.standard} ${vars.color.neutral7}`,
    },
    '&[data-focus]': {
      outline: `solid ${vars.borderSize['focus-ring']} ${vars.color.neutral7}`,
    },
    '&[data-invalid]': {
      outline: `solid ${vars.borderSize.standard} ${vars.color.danger7}`,
    },
    '&::placeholder': {
      color: vars.color.neutral11,
    },
  },
});

export const textfieldDescription = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.neutral11,
  display: 'none',

  selectors: {
    [`${textfieldRoot}[data-focus]  &`]: {
      display: 'contents',
    },
    '&[data-invalid]': {
      display: 'none',
    },
  },
});

export const textfieldErrorMessage = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.danger9,
});

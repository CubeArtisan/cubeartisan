import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const triggerIcon = style({
  height: vars.space[8],
  width: vars.space[8],
  color: vars.color.white,
});

export const inputLabel = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: vars.space['2.5'],
});

export const inputFieldset = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: vars.space[1],
  borderRadius: vars.borderRadius.md,
  outline: `solid ${vars.borderSize.large} ${vars.color.neutral9}`,
});

export const textInputField = style({
  borderRadius: vars.borderRadius.md,
});

export const buttonsContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

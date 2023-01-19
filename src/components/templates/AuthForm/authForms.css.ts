import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const formRoot = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['5'],
  margin: vars.space['2.5'],
});

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: vars.space['2.5'],
});

export const buttonLink = style({
  textDecoration: 'underline',
  color: vars.color.neutral11,

  ':hover': {
    color: vars.color.neutral12,
  },
});

export const submitButton = style({});

export const formTitle = style({
  display: 'flex',
  alignItems: 'center',
  fontSize: vars.fontSize['2xl'],
  fontWeight: vars.fontWeight.bold,
  cursor: 'default',
});

export const logo = style({
  height: vars.space[12],
});

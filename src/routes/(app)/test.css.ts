import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const testComponentBox = style({
  alignSelf: 'center',
  display: 'grid',
  placeItems: 'center',
  width: vars.size['2xl'],
  minHeight: vars.size.xl,
  borderRadius: vars.borderRadius['2xl'],
  background: vars.color.neutral2,
});

export const testPage = style({
  gap: vars.space['5'],
});

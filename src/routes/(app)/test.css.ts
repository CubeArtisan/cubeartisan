import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const testComponentBox = style({
  display: 'grid',
  placeItems: 'center',
  minWidth: vars.size.lg,
  minHegiht: vars.size.md,
  borderRadius: vars.borderRadius['2xl'],
  background: vars.color.neutral2,
});

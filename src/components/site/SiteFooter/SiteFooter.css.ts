import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

export const footerContainer = style({
  display: 'grid',
  placeItems: 'center',
});

export const footer = style({
  width: vars.size['content-80'],
  paddingBlock: vars.space[8],
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const sectionTitle = style({
  fontSize: vars.fontSize.lg,
  lineHeight: vars.lineHeight.lg,
  textAlign: 'center',
  marginBottom: vars.space[1],
});

export const sectionItems = style({
  textAlign: 'center',
  color: vars.color.neutral11,

  ':hover': {
    color: vars.color.neutral12,
  },
});

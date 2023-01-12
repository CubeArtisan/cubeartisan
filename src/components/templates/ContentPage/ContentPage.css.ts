import { style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';

// export const main = style({
//   width: vars.size['content-80'],
//   marginInline: 'auto',
//   display: 'grid',
//   gridTemplateColumns: `repeat(auto-fit, minmax(${vars.size.lg}, 1fr))`,
//   gap: vars.space.gutter,
// });

export const main = style({
  width: vars.size['content-80'],
  marginInline: 'auto',
  display: 'flex',
  flexDirection: 'column',
});

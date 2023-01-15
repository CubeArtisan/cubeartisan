import { style } from '@vanilla-extract/css';

export const appContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const appContent = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

import { atoms } from '@cubeartisan/cubeartisan/styles';

export const nav = atoms({
  height: 12,
  width: 'full',
  backgroundColor: 'neutralSubtleSecondary',
  color: 'neutralContrast',
});

export const navContainer = atoms({
  display: 'flex',
  justifyContent: 'spaceBetween',
  height: 'full',
  fontSize: 'base',
  marginInline: 'auto',
  width: 'content-80',
});

export const navList = atoms({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'spaceBetween',
  gap: 3,
});

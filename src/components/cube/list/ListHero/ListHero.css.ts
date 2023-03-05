import { createVar, style } from '@vanilla-extract/css';

import { vars } from '@cubeartisan/cubeartisan/styles';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

export const heroBannerSrc = createVar();

export const heroContainer = style({
  vars: {
    [heroBannerSrc]:
      "url('https://cards.scryfall.io/art_crop/front/5/9/593cbbd0-6ec3-4506-be0c-a229f070ce6d.jpg?1676227784')",
  },
  backgroundImage: `linear-gradient(to left, ${vars.color.neutral1}, ${vars.color.shadowInverse11}, ${vars.color.shadowInverse4}, ${vars.color.shadowInverse11}, ${vars.color.neutral1}), ${heroBannerSrc}`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

export const heroRoot = style({
  display: 'flex',
  justifyContent: 'center',
  gap: vars.space.gutter,

  width: vars.size['content-80'],
  minHeight: vars.space[40],
  marginInline: 'auto',
  marginBlock: vars.space.gutter,
  padding: vars.space.gutter,

  backgroundColor: vars.color.shadowInverse10,
  borderRadius: vars.borderRadius.lg,

  '@media': {
    [`screen and (min-width: ${tokens.screens.laptop})`]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      justifyItems: 'center',
      alignItems: 'center',
    },
  },
});

export const heroTitleSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const cubeTitle = style({
  fontSize: vars.fontSize['4xl'],
  lineHeight: vars.lineHeight['4xl'],
  fontWeight: vars.fontWeight.bold,
  marginBottom: vars.space['2.5'],
});

export const cubeSubtitle = style({
  display: 'flex',
  alignItems: 'center',
  fontSize: vars.fontSize.xl,
  lineHeight: vars.lineHeight.xl,
  fontWeight: vars.fontWeight.semibold,
  color: vars.color.neutral11,
  marginBottom: vars.space.gutter,
});

export const cubeOwner = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space['1.5'],
  marginLeft: vars.space['2.5'],
});

export const cubeOwnerAvatar = style({
  width: vars.space[6],
  height: vars.space[6],
});

export const heroActions = style({
  display: 'flex',
  gap: vars.space[8],
  alignItems: 'center',
});

export const heroActionButton = style({
  color: vars.color.neutral11,

  ':hover': {
    color: vars.color.neutral12,
  },
});

export const heroActionIcon = style({
  height: vars.space[6],
  width: vars.space[6],
});

export const cubeDescriptionHeader = style({
  fontSize: vars.fontSize['2xl'],
  fontWeight: vars.fontWeight.semibold,
});

export const cubeDescription = style({
  maxWidth: '40ch',
});

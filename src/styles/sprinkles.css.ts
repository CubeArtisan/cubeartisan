import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import * as tokens from '@cubeartisan/cubeartisan/styles/tokens';

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    landscapeMobile: { '@media': `screen and (min-width: ${tokens.screens.sm})` },
    tablet: { '@media': `screen and (min-width: ${tokens.screens.md})` },
    laptop: { '@media': `screen and (min-width: ${tokens.screens.lg})` },
    desktop: { '@media': `screen and (min-width: ${tokens.screens.xl})` },
    ultrawide: { '@media': `screen and (min-width: ${tokens.screens['2xl']})` },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'flex', 'block', 'inline', 'grid'],
    flexBasis: tokens.flexBasis,
    flexDirection: ['row', 'column'],
    flexWrap: ['wrap', 'wrap-reverse', 'nowrap'],
    justifyContent: ['stretch', 'flex-start', 'center', 'flex-end', 'space-around', 'space-between', 'space-evenly'],
    justifyItems: ['stretch', 'center', 'start', 'end', 'baseline'],
    alignContent: ['stretch', 'flex-start', 'center', 'flex-end', 'space-around', 'space-between', 'space-evenly'],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    objectFit: ['contain', 'cover', 'fill', 'none', 'scale-down'],
    objectPosition: [
      'bottom',
      'center',
      'left',
      'left bottom',
      'left top',
      'right',
      'right bottom',
      'right top',
      'top',
    ],
    overflow: ['auto', 'hidden', 'clip', 'visible', 'scroll'],
    overflowX: ['auto', 'hidden', 'clip', 'visible', 'scroll'],
    overflowY: ['auto', 'hidden', 'clip', 'visible', 'scroll'],
    overflowInline: ['auto', 'hidden', 'clip', 'visible', 'scroll'],
    overflowBlock: ['auto', 'hidden', 'clip', 'visible', 'scroll'],
    overscrollBehavior: ['auto', 'contain', 'none'],
    overscrollBehaviorX: ['auto', 'contain', 'none'],
    overscrollBehaviorY: ['auto', 'contain', 'none'],
    overscrollBehaviorInline: ['auto', 'contain', 'none'],
    overscrollBehaviorBlock: ['auto', 'contain', 'none'],
    position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
    top: tokens.space,
    right: tokens.space,
    bottom: tokens.space,
    left: tokens.space,
    visibility: ['visible', 'hidden', 'collapse'],
    zIndex: ['0', '1', '2', '3', '4', '5'],
    paddingTop: tokens.space,
    paddingBottom: tokens.space,
    paddingLeft: tokens.space,
    paddingRight: tokens.space,
    marginTop: tokens.space,
    marginBottom: tokens.space,
    marginLeft: tokens.space,
    marginRight: tokens.space,
    width: tokens.sizes,
    minWidth: tokens.sizes,
    maxWidth: tokens.sizes,
    height: tokens.sizes,
    minHeight: tokens.sizes,
    maxHeight: tokens.sizes,
    fontFamily: tokens.fontFamily,
    fontSize: tokens.fontSize,
    lineHeight: tokens.lineHeights,
    fontWeight: tokens.fontWeight,
    letterSpacing: tokens.letterSpacing,
    listStyleType: ['none', 'disc', 'decimal'],
    listStylePosition: ['inside', 'outside'],
    textAlign: ['left', 'center', 'right', 'justify', 'start', 'end'],
    textDecorationLine: ['none', 'underline', 'overline', 'line-through', 'blink'],
    textDecorationStyle: ['solid', 'double', 'dotted', 'dashed', 'wavy'],
    textDecorationThickness: {
      auto: 'auto',
      fromFont: 'from-font',
      0: '0px',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      8: '8px',
    },
    textUnderlineOffset: {
      auto: 'auto',
      0: '0px',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      8: '8px',
    },
    textTransform: ['uppercase', 'lowercase', 'capitalize', 'none'],
    textIndent: tokens.space,
    verticalAlign: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super'],
    whiteSpace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap'],
    backgroundAttachment: ['fixed', 'local', 'scroll'],
    backgroundClip: ['border-box', 'padding-box', 'content-box', 'text'],
    backgroundOrigin: ['border-box', 'padding-box', 'content-box'],
    backgroundPosition: [
      'bottom',
      'center',
      'left',
      'left bottom',
      'left top',
      'right',
      'right bottom',
      'right top',
      'top',
    ],
    backgroundRepeat: ['repeat', 'no-repeat', 'repeat-x', 'repeat-y', 'round', 'space'],
    backgroundSize: ['auto', 'cover', 'contain'],
    borderRadius: tokens.radii,
    borderWidth: tokens.space,
    borderLeftWidth: tokens.space,
    borderRightWidth: tokens.space,
    borderTopWidth: tokens.space,
    borderBottomWidth: tokens.space,
    borderStyle: ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none'],
    outlineWidth: {
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    outlineStyle: ['solid', 'dashed', 'dotted', 'double'],
    outlineOffset: {
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    boxShadow: tokens.shadow,
    opacity: [0, 0.05, 0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 0.95, 1],
  },
  shorthands: {
    inset: ['top', 'right', 'bottom', 'left'],
    insetX: ['right', 'left'],
    insetY: ['top', 'bottom'],
    placeItems: ['alignItems', 'justifyContent'],
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    text: ['fontSize', 'lineHeight'],
    borderX: ['borderLeftWidth', 'borderRightWidth'],
    borderY: ['borderTopWidth', 'borderBottomWidth'],
  },
});

export const sprinkles = createSprinkles(responsiveProperties);

// It's a good idea to export the Sprinkles type too
export type Sprinkles = Parameters<typeof sprinkles>[0];

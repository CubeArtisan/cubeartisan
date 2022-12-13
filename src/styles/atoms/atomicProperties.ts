import {
  backgroundColor,
  boxShadow,
  textColor,
  textDecoration,
} from '@cubeartisan/cubeartisan/styles/atoms/semanticColors';
import { vars } from '@cubeartisan/cubeartisan/styles/themes';

export const colorProperties = {
  backgroundColor,
  boxShadow: {
    ...vars.boxShadow,
    ...boxShadow,
  },
  textColor,
  textDecoration,
} as const;

// TODO if needed add z index properties here
// TODO maybe add custom cursor svgs in the future
export const unresponsiveProperties = {
  overflow: ['hidden', 'scroll', 'visible', 'auto'],
  overflowX: ['hidden', 'scroll', 'visible', 'auto'],
  overflowY: ['hidden', 'scroll', 'visible', 'auto'],
  overflowInline: ['hidden', 'scroll', 'visible', 'auto'],
  overflowBlock: ['hidden', 'scroll', 'visible', 'auto'],

  overscrollBehavior: ['auto', 'contain', 'none'],
  overscrollBehaviorX: ['auto', 'contain', 'none'],
  overscrollBehaviorY: ['auto', 'contain', 'none'],
  overscrollBehaviorInline: ['auto', 'contain', 'none'],
  overscrollBehaviorBlock: ['auto', 'contain', 'none'],

  userSelect: ['none'],

  outline: ['none'],

  opacity: [0],

  /**
   * [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)
   */
  cursor: [
    'default',
    'pointer',
    'none',
    'help',
    'context-menu',
    'progress',
    'wait',
    'crosshair',
    'copy',
    'move',
    'no-drop',
    'not-allowed',
    'grab',
    'grabbing',
    'col-resize',
    'row-resize',
    'n-resize',
    'e-resize',
    's-resize',
    'w-resize',
    'ne-resize',
    'nw-resize',
    'se-resize',
    'sw-resize',
    'ew-resize',
    'ns-resize',
    'nesw-resize',
    'nwse-resize',
    'zoom-in',
    'zoom-out',
  ],

  pointerEvents: ['none'],

  top: vars.space,
  bottom: vars.space,
  left: vars.space,
  right: vars.space,

  height: vars.size,
  minHeight: vars.size,
  maxHeight: vars.size,
  width: vars.size,
  minWidth: vars.size,
  maxWidth: vars.size,

  objectFit: {
    contain: 'contain',
    cover: 'cover',
    fill: 'fill',
    none: 'none',
    scaleDown: 'scale-down',
  },
  objectPosition: {
    bottom: 'bottom',
    center: 'center',
    left: 'left',
    leftBottom: 'left bottom',
    leftTop: 'left top',
    right: 'right',
    rightBottom: 'right bottom',
    rightTop: 'right top',
    top: 'top',
  },

  backgroundRepeat: ['repeat', 'no-repeat', 'repeat-x', 'repeat-y', 'round', 'space'],
  backgroundSize: ['auto', 'cover', 'contain'],
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

  visibility: ['visible', 'hidden', 'collapse'],

  listStyleType: ['none', 'disc', 'decimal'],

  // TODO add transitions (maybe whole style objects as values?)
} as const;

export const responsiveProperties = {
  display: {
    none: 'none',
    block: 'block',
    inline: 'inline',
    inlineBlock: 'inline-block',
    flex: 'flex',
  },
  position: ['relative', 'absolute', 'fixed'],

  borderRadius: vars.borderRadius,
  boxShadow: vars.boxShadow,

  paddingTop: vars.space,
  paddingBottom: vars.space,
  paddingRight: vars.space,
  paddingLeft: vars.space,
  marginTop: vars.space,
  marginBottom: vars.space,
  marginRight: vars.space,
  marginLeft: vars.space,

  alignItems: {
    flexStart: 'flex-start',
    center: 'center',
    flexEnd: 'flex-end',
  },
  justifyContent: {
    flexStart: 'flex-start',
    center: 'center',
    flexEnd: 'flex-end',
    spaceBetween: 'space-between',
    spaceAround: 'space-around',
    spaceEvenly: 'space-evenly',
  },
  flexDirection: {
    row: 'row',
    rowReverse: 'row-reverse',
    column: 'column',
    columnReverse: 'column-reverse',
  },
  flexWrap: {
    wrap: 'wrap',
    nowrap: 'nowrap',
  },
  flexShrink: [0],
  flexGrow: [0, 1],

  textAlign: ['left', 'center', 'right', 'justify', 'start', 'end'],
  verticalAlign: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super'],
  textIndent: vars.space,
  fontFamily: vars.fontFamily,
  fontSize: vars.fontSize,
  lineHeight: vars.lineHeight,
  fontWeight: vars.fontWeight,
  letterSpacing: vars.letterSpacing,
} as const;

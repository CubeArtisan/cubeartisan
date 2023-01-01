import { vars } from '@cubeartisan/cubeartisan/styles/themes';

const flattenedStaticColors = {
  black: vars.staticColor.black,
  white: vars.staticColor.white,
  grayDark1: vars.staticColor.grayDark[1],
  grayDark2: vars.staticColor.grayDark[2],
  grayDark3: vars.staticColor.grayDark[3],
  grayDark4: vars.staticColor.grayDark[4],
  grayDark5: vars.staticColor.grayDark[5],
  grayDark6: vars.staticColor.grayDark[6],
  grayDark7: vars.staticColor.grayDark[7],
  grayDark8: vars.staticColor.grayDark[8],
  grayDark9: vars.staticColor.grayDark[9],
  grayDark10: vars.staticColor.grayDark[10],
  grayDark11: vars.staticColor.grayDark[11],
  grayDark12: vars.staticColor.grayDark[12],
  grayLight1: vars.staticColor.grayLight[1],
  grayLight2: vars.staticColor.grayLight[2],
  grayLight3: vars.staticColor.grayLight[3],
  grayLight4: vars.staticColor.grayLight[4],
  grayLight5: vars.staticColor.grayLight[5],
  grayLight6: vars.staticColor.grayLight[6],
  grayLight7: vars.staticColor.grayLight[7],
  grayLight8: vars.staticColor.grayLight[8],
  grayLight9: vars.staticColor.grayLight[9],
  grayLight10: vars.staticColor.grayLight[10],
  grayLight11: vars.staticColor.grayLight[11],
  grayLight12: vars.staticColor.grayLight[12],
  shadowDark1: vars.staticColor.shadowDark[1],
  shadowDark2: vars.staticColor.shadowDark[2],
  shadowDark3: vars.staticColor.shadowDark[3],
  shadowDark4: vars.staticColor.shadowDark[4],
  shadowDark5: vars.staticColor.shadowDark[5],
  shadowDark6: vars.staticColor.shadowDark[6],
  shadowDark7: vars.staticColor.shadowDark[7],
  shadowDark8: vars.staticColor.shadowDark[8],
  shadowDark9: vars.staticColor.shadowDark[9],
  shadowDark10: vars.staticColor.shadowDark[10],
  shadowDark11: vars.staticColor.shadowDark[11],
  shadowDark12: vars.staticColor.shadowDark[12],
  shadowLight1: vars.staticColor.shadowLight[1],
  shadowLight2: vars.staticColor.shadowLight[2],
  shadowLight3: vars.staticColor.shadowLight[3],
  shadowLight4: vars.staticColor.shadowLight[4],
  shadowLight5: vars.staticColor.shadowLight[5],
  shadowLight6: vars.staticColor.shadowLight[6],
  shadowLight7: vars.staticColor.shadowLight[7],
  shadowLight8: vars.staticColor.shadowLight[8],
  shadowLight9: vars.staticColor.shadowLight[9],
  shadowLight10: vars.staticColor.shadowLight[10],
  shadowLight11: vars.staticColor.shadowLight[11],
  shadowLight12: vars.staticColor.shadowLight[12],
};

export const colorProperties = {
  backgroundColor: {
    ...vars.backgroundColor.neutral,
    ...vars.backgroundColor.neutralA,
    ...vars.backgroundColor.primary,
    ...vars.backgroundColor.primaryA,
    ...vars.backgroundColor.success,
    ...vars.backgroundColor.successA,
    ...vars.backgroundColor.info,
    ...vars.backgroundColor.infoA,
    ...vars.backgroundColor.warning,
    ...vars.backgroundColor.warningA,
    ...vars.backgroundColor.danger,
    ...vars.backgroundColor.dangerA,
    ...flattenedStaticColors,
  },
  boxShadow: {
    ...vars.boxShadow.shadow,
    ...vars.boxShadow.neutral,
    ...vars.boxShadow.neutralA,
    ...vars.boxShadow.primary,
    ...vars.boxShadow.primaryA,
    ...vars.boxShadow.success,
    ...vars.boxShadow.successA,
    ...vars.boxShadow.info,
    ...vars.boxShadow.infoA,
    ...vars.boxShadow.warning,
    ...vars.boxShadow.warningA,
    ...vars.boxShadow.danger,
    ...vars.boxShadow.dangerA,
  },
  color: {
    ...vars.textColor.neutral,
    ...vars.textColor.neutralA,
    ...vars.textColor.primary,
    ...vars.textColor.primaryA,
    ...vars.textColor.success,
    ...vars.textColor.successA,
    ...vars.textColor.info,
    ...vars.textColor.infoA,
    ...vars.textColor.warning,
    ...vars.textColor.warningA,
    ...vars.textColor.danger,
    ...vars.textColor.dangerA,
  },
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

  paddingTop: vars.space,
  paddingBottom: vars.space,
  paddingRight: vars.space,
  paddingLeft: vars.space,
  paddingInline: vars.space,
  paddingBlock: vars.space,
  marginTop: vars.space,
  marginBottom: vars.space,
  marginRight: vars.space,
  marginLeft: vars.space,
  marginInline: vars.space,
  marginBlock: vars.space,

  alignItems: {
    normal: 'normal',
    stretch: 'stretch',
    center: 'center',
    flexStart: 'flex-start',
    flexEnd: 'flex-end',
  },
  justifyContent: {
    normal: 'normal',
    center: 'center',
    flexStart: 'flex-start',
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
  gap: vars.space,
  rowGap: vars.space,
  columnGap: vars.space,

  textAlign: ['left', 'center', 'right', 'justify', 'start', 'end'],
  verticalAlign: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super'],

  textIndent: vars.space,
  fontFamily: vars.fontFamily,
  fontSize: vars.fontSize,
  lineHeight: vars.lineHeight,
  fontWeight: vars.fontWeight,
  letterSpacing: vars.letterSpacing,
} as const;

export const interactiveProperties = {
  textDecoration: ['underline solid', 'underline dotted'],
  transform: vars.transformScale,
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
} as const;

import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import {
  colorProperties,
  responsiveProperties,
  unresponsiveProperties,
} from '@cubeartisan/cubeartisan/styles/atoms/atomicProperties';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

const unresponsiveAtomicProperties = defineProperties({
  properties: unresponsiveProperties,
  shorthands: {
    inset: ['top', 'right', 'bottom', 'left'],
    insetX: ['right', 'left'],
    insetY: ['top', 'bottom'],
  },
});

const responsiveAtomicProperties = defineProperties({
  conditions: {
    mobile: {},
    landscapeMobile: { '@media': `screen and (min-width: ${tokens.screens.sm})` },
    tablet: { '@media': `screen and (min-width: ${tokens.screens.md})` },
    laptop: { '@media': `screen and (min-width: ${tokens.screens.lg})` },
    desktop: { '@media': `screen and (min-width: ${tokens.screens.xl})` },
    ultrawide: { '@media': `screen and (min-width: ${tokens.screens['2xl']})` },
  },
  defaultCondition: 'mobile',
  properties: responsiveProperties,
  shorthands: {
    placeItems: ['alignItems', 'justifyContent'],
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    text: ['fontSize', 'lineHeight'],
  },
});

const colorAtomicProperties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: '&:hover' },
    active: { selector: '&:active' },
    focus: { selector: '&:focus' },
  },
  defaultCondition: 'default',
  properties: colorProperties,
});

export const atoms = createSprinkles(unresponsiveAtomicProperties, responsiveAtomicProperties, colorAtomicProperties);

// It's a good idea to export the Sprinkles type too
export type Atoms = Parameters<typeof atoms>[0];

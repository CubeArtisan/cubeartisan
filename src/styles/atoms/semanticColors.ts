import { vars } from '@cubeartisan/cubeartisan/styles/themes';

// ----------------------------------------------------------------------------------------
// Semantic Colors
// ----------------------------------------------------------------------------------------

/**
 * (from [Radix Color docs](https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale#steps-910-solid-backgrounds))
 *
 * Steps 1 and 2 are designed for app backgrounds and subtle component backgrounds.
 * You can use them interchangeably, depending on the vibe you're going for.
 *
 * Appropriate applications include:
 * - Main app background
 * - Striped table background
 * - Code block background
 * - Card background
 * - Sidebar background
 * - Canvas area background
 *
 * Steps 3, 4, and 5 are designed for UI component backgrounds.
 * - Step 3 is for normal states.
 * - Step 4 is for hover states.
 * - Step 5 is for pressed or selected states.
 *
 * Even if your component has a transparent background in its default state, you should skip Step 3 and use Step 4 for its hover state.
 *
 * For call-to-action components that you want to draw particular attention to, you can bump each color one step higher to steps 4, 5, and 6.
 *
 * For complex components where you need many subtle colors to communicate different meanings, you can get creative and do something like:
 * - Step 3 for hovered backgrounds.
 * - Step 4 for selected / pressed backgrounds.
 * - Step 5 for "unread" backgrounds.
 * - Step 6 for hovered "unread" backgrounds.
 *
 * Steps 9 and 10 are designed for solid backgrounds.
 * Step 9 has the highest chroma of all steps in the scale. In other words, it's the purest step,
 * the step mixed with the least amount of white or black.
 *
 * Because 9 is the purest step, it has a wide range of applications:
 * - Website/App backgrounds
 * - Website section backgrounds
 * - Header backgrounds
 * - Component backgrounds
 * - Graphics/Logos
 * - Overlays
 * - Coloured shadows
 * - Accent borders
 *
 * Step 10 is designed for component hover states, where step 9 is the component's normal state background.
 */
export const backgroundColor = {
  neutralSubtle: vars.color.neutral[1],
  neutralSubtleSecondary: vars.color.neutral[2],
  neutralComponent: vars.color.neutral[2],
  neutralComonentHover: vars.color.neutral[2],
  neutralComonentActive: vars.color.neutral[2],
  neutralImportant: vars.color.neutral[2],
  neutralImportantHover: vars.color.neutral[2],
  neutralImportantActive: vars.color.neutral[2],
  neutralSolid: vars.color.neutral[2],
  neutralSolidActive: vars.color.neutral[2],

  neutralASubtle: vars.color.neutralA[1],
  neutralASubtleSecondary: vars.color.neutralA[2],
  neutralAComponent: vars.color.neutralA[2],
  neutralAComonentHover: vars.color.neutralA[2],
  neutralAComonentActive: vars.color.neutralA[2],
  neutralAImportant: vars.color.neutralA[2],
  neutralAImportantHover: vars.color.neutralA[2],
  neutralAImportantActive: vars.color.neutralA[2],
  neutralASolid: vars.color.neutralA[2],
  neutralASolidActive: vars.color.neutralA[2],

  primarySubtle: vars.color.primary[1],
  primarySubtleSecondary: vars.color.primary[2],
  primaryComponent: vars.color.primary[2],
  primaryComonentHover: vars.color.primary[2],
  primaryComonentActive: vars.color.primary[2],
  primaryImportant: vars.color.primary[2],
  primaryImportantHover: vars.color.primary[2],
  primaryImportantActive: vars.color.primary[2],
  primarySolid: vars.color.primary[2],
  primarySolidActive: vars.color.primary[2],

  primaryASubtle: vars.color.primaryA[1],
  primaryASubtleSecondary: vars.color.primaryA[2],
  primaryAComponent: vars.color.primaryA[2],
  primaryAComonentHover: vars.color.primaryA[2],
  primaryAComonentActive: vars.color.primaryA[2],
  primaryAImportant: vars.color.primaryA[2],
  primaryAImportantHover: vars.color.primaryA[2],
  primaryAImportantActive: vars.color.primaryA[2],
  primaryASolid: vars.color.primaryA[2],
  primaryASolidActive: vars.color.primaryA[2],

  successSubtle: vars.color.success[1],
  successSubtleSecondary: vars.color.success[2],
  successComponent: vars.color.success[2],
  successComonentHover: vars.color.success[2],
  successComonentActive: vars.color.success[2],
  successImportant: vars.color.success[2],
  successImportantHover: vars.color.success[2],
  successImportantActive: vars.color.success[2],
  successSolid: vars.color.success[2],
  successSolidActive: vars.color.success[2],

  successASubtle: vars.color.successA[1],
  successASubtleSecondary: vars.color.successA[2],
  successAComponent: vars.color.successA[2],
  successAComonentHover: vars.color.successA[2],
  successAComonentActive: vars.color.successA[2],
  successAImportant: vars.color.successA[2],
  successAImportantHover: vars.color.successA[2],
  successAImportantActive: vars.color.successA[2],
  successASolid: vars.color.successA[2],
  successASolidActive: vars.color.successA[2],

  infoSubtle: vars.color.info[1],
  infoSubtleSecondary: vars.color.info[2],
  infoComponent: vars.color.info[2],
  infoComonentHover: vars.color.info[2],
  infoComonentActive: vars.color.info[2],
  infoImportant: vars.color.info[2],
  infoImportantHover: vars.color.info[2],
  infoImportantActive: vars.color.info[2],
  infoSolid: vars.color.info[2],
  infoSolidActive: vars.color.info[2],

  infoASubtle: vars.color.infoA[1],
  infoASubtleSecondary: vars.color.infoA[2],
  infoAComponent: vars.color.infoA[2],
  infoAComonentHover: vars.color.infoA[2],
  infoAComonentActive: vars.color.infoA[2],
  infoAImportant: vars.color.infoA[2],
  infoAImportantHover: vars.color.infoA[2],
  infoAImportantActive: vars.color.infoA[2],
  infoASolid: vars.color.infoA[2],
  infoASolidActive: vars.color.infoA[2],

  warningSubtle: vars.color.warning[1],
  warningSubtleSecondary: vars.color.warning[2],
  warningComponent: vars.color.warning[2],
  warningComonentHover: vars.color.warning[2],
  warningComonentActive: vars.color.warning[2],
  warningImportant: vars.color.warning[2],
  warningImportantHover: vars.color.warning[2],
  warningImportantActive: vars.color.warning[2],
  warningSolid: vars.color.warning[2],
  warningSolidActive: vars.color.warning[2],

  warningASubtle: vars.color.warningA[1],
  warningASubtleSecondary: vars.color.warningA[2],
  warningAComponent: vars.color.warningA[2],
  warningAComonentHover: vars.color.warningA[2],
  warningAComonentActive: vars.color.warningA[2],
  warningAImportant: vars.color.warningA[2],
  warningAImportantHover: vars.color.warningA[2],
  warningAImportantActive: vars.color.warningA[2],
  warningASolid: vars.color.warningA[2],
  warningASolidActive: vars.color.warningA[2],

  dangerSubtle: vars.color.danger[1],
  dangerSubtleSecondary: vars.color.danger[2],
  dangerComponent: vars.color.danger[2],
  dangerComonentHover: vars.color.danger[2],
  dangerComonentActive: vars.color.danger[2],
  dangerImportant: vars.color.danger[2],
  dangerImportantHover: vars.color.danger[2],
  dangerImportantActive: vars.color.danger[2],
  dangerSolid: vars.color.danger[2],
  dangerSolidActive: vars.color.danger[2],

  dangerASubtle: vars.color.dangerA[1],
  dangerASubtleSecondary: vars.color.dangerA[2],
  dangerAComponent: vars.color.dangerA[2],
  dangerAComonentHover: vars.color.dangerA[2],
  dangerAComonentActive: vars.color.dangerA[2],
  dangerAImportant: vars.color.dangerA[2],
  dangerAImportantHover: vars.color.dangerA[2],
  dangerAImportantActive: vars.color.dangerA[2],
  dangerASolid: vars.color.dangerA[2],
  dangerASolidActive: vars.color.dangerA[2],
};

/**
 * (from [Radix Color docs](https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale#steps-910-solid-backgrounds))
 *
 * Steps 6, 7, and 8 are designed for borders.
 *
 * Step 6 is designed for subtle borders on components which are not interactive.
 * For example sidebars, headers, cards, alerts, and separators.
 *
 * Step 7 is designed for borders on interactive components, but can also be used for focus rings.
 * Step 8 is designed for borders on interactive components in their hover state.
 */
const borderColor = {
  neutral: vars.color.neutral[6],
  neutralInteractive: vars.color.neutral[7],
  neutralInteractiveHover: vars.color.neutral[8],
  neutralFocus: vars.color.neutral[7],

  neutralA: vars.color.neutralA[6],
  neutralAInteractive: vars.color.neutralA[7],
  neutralAInteractiveHover: vars.color.neutralA[8],
  neutralAFocus: vars.color.neutralA[7],

  primary: vars.color.primary[6],
  primaryInteractive: vars.color.primary[7],
  primaryInteractiveHover: vars.color.primary[8],
  primaryFocus: vars.color.primary[7],

  primaryA: vars.color.primaryA[6],
  primaryAInteractive: vars.color.primaryA[7],
  primaryAInteractiveHover: vars.color.primaryA[8],
  primaryAFocus: vars.color.primaryA[7],

  success: vars.color.success[6],
  successInteractive: vars.color.success[7],
  successInteractiveHover: vars.color.success[8],
  successFocus: vars.color.success[7],

  successA: vars.color.successA[6],
  successAInteractive: vars.color.successA[7],
  successAInteractiveHover: vars.color.successA[8],
  successAFocus: vars.color.successA[7],

  info: vars.color.info[6],
  infoInteractive: vars.color.info[7],
  infoInteractiveHover: vars.color.info[8],
  infoFocus: vars.color.info[7],

  infoA: vars.color.infoA[6],
  infoAInteractive: vars.color.infoA[7],
  infoAInteractiveHover: vars.color.infoA[8],
  infoAFocus: vars.color.infoA[7],

  warning: vars.color.warning[6],
  warningInteractive: vars.color.warning[7],
  warningInteractiveHover: vars.color.warning[8],
  warningFocus: vars.color.warning[7],

  warningA: vars.color.warningA[6],
  warningAInteractive: vars.color.warningA[7],
  warningAInteractiveHover: vars.color.warningA[8],
  warningAFocus: vars.color.warningA[7],

  danger: vars.color.danger[6],
  dangerInteractive: vars.color.danger[7],
  dangerInteractiveHover: vars.color.danger[8],
  dangerFocus: vars.color.danger[7],

  dangerA: vars.color.dangerA[6],
  dangerAInteractive: vars.color.dangerA[7],
  dangerAInteractiveHover: vars.color.dangerA[8],
  dangerAFocus: vars.color.dangerA[7],
};

// use box-shadow for borders
export const boxShadow = {
  borderNeutral: `0 0 0 ${vars.borderWidth.standard} ${borderColor.neutral}`,
  borderNeutralLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.neutral}`,
  borderNeutralInteractive: `0 0 0 ${vars.borderWidth.standard} ${borderColor.neutralInteractive}`,
  borderNeutralInteractiveLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.neutralInteractive}`,
  borderNeutralInteractiveHover: `0 0 0 ${vars.borderWidth.standard} ${borderColor.neutralInteractiveHover}`,
  borderNeutralInteractiveHoverLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.neutralInteractiveHover}`,
  borderNeutralFocus: `0 0 0 ${vars.borderWidth.large} ${borderColor.neutralFocus}`,

  borderNeutralA: `0 0 0 ${vars.borderWidth.standard} ${borderColor.neutralA}`,
  borderNeutralALarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.neutralA}`,
  borderNeutralAInteractive: `0 0 0 ${vars.borderWidth.standard} ${borderColor.neutralAInteractive}`,
  borderNeutralAInteractiveLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.neutralAInteractive}`,
  borderNeutralAInteractiveHover: `0 0 0 ${vars.borderWidth.standard} ${borderColor.neutralAInteractiveHover}`,
  borderNeutralAInteractiveHoverLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.neutralAInteractiveHover}`,
  borderNeutralAFocus: `0 0 0 ${vars.borderWidth.large} ${borderColor.neutralAFocus}`,

  borderPrimary: `0 0 0 ${vars.borderWidth.standard} ${borderColor.primary}`,
  borderPrimaryLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.primary}`,
  borderPrimaryInteractive: `0 0 0 ${vars.borderWidth.standard} ${borderColor.primaryInteractive}`,
  borderPrimaryInteractiveLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.primaryInteractive}`,
  borderPrimaryInteractiveHover: `0 0 0 ${vars.borderWidth.standard} ${borderColor.primaryInteractiveHover}`,
  borderPrimaryInteractiveHoverLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.primaryInteractiveHover}`,
  borderPrimaryFocus: `0 0 0 ${vars.borderWidth.large} ${borderColor.primaryFocus}`,

  borderPrimaryA: `0 0 0 ${vars.borderWidth.standard} ${borderColor.primaryA}`,
  borderPrimaryALarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.primaryA}`,
  borderPrimaryAInteractive: `0 0 0 ${vars.borderWidth.standard} ${borderColor.primaryAInteractive}`,
  borderPrimaryAInteractiveLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.primaryAInteractive}`,
  borderPrimaryAInteractiveHover: `0 0 0 ${vars.borderWidth.standard} ${borderColor.primaryAInteractiveHover}`,
  borderPrimaryAInteractiveHoverLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.primaryAInteractiveHover}`,
  borderPrimaryAFocus: `0 0 0 ${vars.borderWidth.large} ${borderColor.primaryAFocus}`,

  borderSuccess: `0 0 0 ${vars.borderWidth.standard} ${borderColor.success}`,
  borderSuccessLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.success}`,
  borderSuccessInteractive: `0 0 0 ${vars.borderWidth.standard} ${borderColor.successInteractive}`,
  borderSuccessInteractiveLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.successInteractive}`,
  borderSuccessInteractiveHover: `0 0 0 ${vars.borderWidth.standard} ${borderColor.successInteractiveHover}`,
  borderSuccessInteractiveHoverLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.successInteractiveHover}`,
  borderSuccessFocus: `0 0 0 ${vars.borderWidth.large} ${borderColor.successFocus}`,

  borderSuccessA: `0 0 0 ${vars.borderWidth.standard} ${borderColor.successA}`,
  borderSuccessALarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.successA}`,
  borderSuccessAInteractive: `0 0 0 ${vars.borderWidth.standard} ${borderColor.successAInteractive}`,
  borderSuccessAInteractiveLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.successAInteractive}`,
  borderSuccessAInteractiveHover: `0 0 0 ${vars.borderWidth.standard} ${borderColor.successAInteractiveHover}`,
  borderSuccessAInteractiveHoverLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.successAInteractiveHover}`,
  borderSuccessAFocus: `0 0 0 ${vars.borderWidth.large} ${borderColor.successFocus}`,

  borderInfo: `0 0 0 ${vars.borderWidth.standard} ${borderColor.info}`,
  borderInfoLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.info}`,
  borderInfoInteractive: `0 0 0 ${vars.borderWidth.standard} ${borderColor.infoInteractive}`,
  borderInfoInteractiveLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.infoInteractive}`,
  borderInfoInteractiveHover: `0 0 0 ${vars.borderWidth.standard} ${borderColor.infoInteractiveHover}`,
  borderInfoInteractiveHoverLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.infoInteractiveHover}`,
  borderInfoFocus: `0 0 0 ${vars.borderWidth.large} ${borderColor.infoFocus}`,

  borderInfoA: `0 0 0 ${vars.borderWidth.standard} ${borderColor.infoA}`,
  borderInfoALarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.infoA}`,
  borderInfoAInteractive: `0 0 0 ${vars.borderWidth.standard} ${borderColor.infoAInteractive}`,
  borderInfoAInteractiveLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.infoAInteractive}`,
  borderInfoAInteractiveHover: `0 0 0 ${vars.borderWidth.standard} ${borderColor.infoAInteractiveHover}`,
  borderInfoAInteractiveHoverLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.infoAInteractiveHover}`,
  borderInfoAFocus: `0 0 0 ${vars.borderWidth.large} ${borderColor.infoAFocus}`,

  borderWarning: `0 0 0 ${vars.borderWidth.standard} ${borderColor.warning}`,
  borderWarningLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.warning}`,
  borderWarningInteractive: `0 0 0 ${vars.borderWidth.standard} ${borderColor.warningInteractive}`,
  borderWarningInteractiveLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.warningInteractive}`,
  borderWarningInteractiveHover: `0 0 0 ${vars.borderWidth.standard} ${borderColor.warningInteractiveHover}`,
  borderWarningInteractiveHoverLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.warningInteractiveHover}`,
  borderWarningFocus: `0 0 0 ${vars.borderWidth.large} ${borderColor.warningFocus}`,

  borderWarningA: `0 0 0 ${vars.borderWidth.standard} ${borderColor.warningA}`,
  borderWarningALarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.warningA}`,
  borderWarningAInteractive: `0 0 0 ${vars.borderWidth.standard} ${borderColor.warningAInteractive}`,
  borderWarningAInteractiveLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.warningAInteractive}`,
  borderWarningAInteractiveHover: `0 0 0 ${vars.borderWidth.standard} ${borderColor.warningAInteractiveHover}`,
  borderWarningAInteractiveHoverLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.warningAInteractiveHover}`,
  borderWarningAFocus: `0 0 0 ${vars.borderWidth.large} ${borderColor.warningAFocus}`,

  borderDanger: `0 0 0 ${vars.borderWidth.standard} ${borderColor.danger}`,
  borderDangerLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.danger}`,
  borderDangerInteractive: `0 0 0 ${vars.borderWidth.standard} ${borderColor.dangerInteractive}`,
  borderDangerInteractiveLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.dangerInteractive}`,
  borderDangerInteractiveHover: `0 0 0 ${vars.borderWidth.standard} ${borderColor.dangerInteractiveHover}`,
  borderDangerInteractiveHoverLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.dangerInteractiveHover}`,
  borderDangerFocus: `0 0 0 ${vars.borderWidth.large} ${borderColor.dangerFocus}`,

  borderDangerA: `0 0 0 ${vars.borderWidth.standard} ${borderColor.dangerA}`,
  borderDangerALarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.dangerA}`,
  borderDangerAInteractive: `0 0 0 ${vars.borderWidth.standard} ${borderColor.dangerAInteractive}`,
  borderDangerAInteractiveLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.dangerAInteractive}`,
  borderDangerAInteractiveHover: `0 0 0 ${vars.borderWidth.standard} ${borderColor.dangerAInteractiveHover}`,
  borderDangerAInteractiveHoverLarge: `0 0 0 ${vars.borderWidth.large} ${borderColor.dangerAInteractiveHover}`,
  borderDangerAFocus: `0 0 0 ${vars.borderWidth.large} ${borderColor.dangerAFocus}`,
};

/**
 * (from [Radix Color docs](https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale#steps-910-solid-backgrounds))
 *
 * Steps 11 and 12 are designed for text.
 * - Step 11 is designed for low-contrast text.
 * - Step 12 is designed for high-contrast text.
 *
 * Steps 11 and 12 are guaranteed to pass 4.5:1 contrast ratio on top of a step 3 background from the same scale.
 */
export const textColor = {
  neutral: vars.color.neutral[12],
  neutralLowContrast: vars.color.neutral[11],

  neutralA: vars.color.neutralA[12],
  neutralALowContrast: vars.color.neutralA[11],

  primary: vars.color.primary[12],
  primaryLowContrast: vars.color.primary[11],

  primaryA: vars.color.primaryA[12],
  primaryALowContrast: vars.color.primaryA[11],

  success: vars.color.success[12],
  successLowContrast: vars.color.success[11],

  successA: vars.color.successA[12],
  successALowContrast: vars.color.successA[11],

  info: vars.color.info[12],
  infoLowContrast: vars.color.info[11],

  infoA: vars.color.infoA[12],
  infoALowContrast: vars.color.infoA[11],

  warning: vars.color.warning[12],
  warningLowContrast: vars.color.warning[11],

  warningA: vars.color.warningA[12],
  warningALowContrast: vars.color.warningA[11],

  danger: vars.color.danger[12],
  dangerLowContrast: vars.color.danger[11],

  dangerA: vars.color.dangerA[12],
  dangerALowContrast: vars.color.dangerA[11],
};

// TODO add useful text decorations
export const textDecoration = {};

import { merge } from 'lodash';
import type { DeepPartial } from 'utility-types';

import type { ColorPaletteType } from '@cubeartisan/cubeartisan/styles/themes/colorPaletteType';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

type BackgroundColor = {
  neutralSubtle: string;
  neutralSubtleSecondary: string;
  neutralComponent: string;
  neutralComonentHover: string;
  neutralComonentActive: string;
  neutralImportant: string;
  neutralImportantHover: string;
  neutralImportantActive: string;
  neutralSolid: string;
  neutralSolidActive: string;

  neutralASubtle: string;
  neutralASubtleSecondary: string;
  neutralAComponent: string;
  neutralAComonentHover: string;
  neutralAComonentActive: string;
  neutralAImportant: string;
  neutralAImportantHover: string;
  neutralAImportantActive: string;
  neutralASolid: string;
  neutralASolidActive: string;

  primarySubtle: string;
  primarySubtleSecondary: string;
  primaryComponent: string;
  primaryComonentHover: string;
  primaryComonentActive: string;
  primaryImportant: string;
  primaryImportantHover: string;
  primaryImportantActive: string;
  primarySolid: string;
  primarySolidActive: string;

  primaryASubtle: string;
  primaryASubtleSecondary: string;
  primaryAComponent: string;
  primaryAComonentHover: string;
  primaryAComonentActive: string;
  primaryAImportant: string;
  primaryAImportantHover: string;
  primaryAImportantActive: string;
  primaryASolid: string;
  primaryASolidActive: string;

  successSubtle: string;
  successSubtleSecondary: string;
  successComponent: string;
  successComonentHover: string;
  successComonentActive: string;
  successImportant: string;
  successImportantHover: string;
  successImportantActive: string;
  successSolid: string;
  successSolidActive: string;

  successASubtle: string;
  successASubtleSecondary: string;
  successAComponent: string;
  successAComonentHover: string;
  successAComonentActive: string;
  successAImportant: string;
  successAImportantHover: string;
  successAImportantActive: string;
  successASolid: string;
  successASolidActive: string;

  infoSubtle: string;
  infoSubtleSecondary: string;
  infoComponent: string;
  infoComonentHover: string;
  infoComonentActive: string;
  infoImportant: string;
  infoImportantHover: string;
  infoImportantActive: string;
  infoSolid: string;
  infoSolidActive: string;

  infoASubtle: string;
  infoASubtleSecondary: string;
  infoAComponent: string;
  infoAComonentHover: string;
  infoAComonentActive: string;
  infoAImportant: string;
  infoAImportantHover: string;
  infoAImportantActive: string;
  infoASolid: string;
  infoASolidActive: string;

  warningSubtle: string;
  warningSubtleSecondary: string;
  warningComponent: string;
  warningComonentHover: string;
  warningComonentActive: string;
  warningImportant: string;
  warningImportantHover: string;
  warningImportantActive: string;
  warningSolid: string;
  warningSolidActive: string;

  warningASubtle: string;
  warningASubtleSecondary: string;
  warningAComponent: string;
  warningAComonentHover: string;
  warningAComonentActive: string;
  warningAImportant: string;
  warningAImportantHover: string;
  warningAImportantActive: string;
  warningASolid: string;
  warningASolidActive: string;

  dangerSubtle: string;
  dangerSubtleSecondary: string;
  dangerComponent: string;
  dangerComonentHover: string;
  dangerComonentActive: string;
  dangerImportant: string;
  dangerImportantHover: string;
  dangerImportantActive: string;
  dangerSolid: string;
  dangerSolidActive: string;

  dangerASubtle: string;
  dangerASubtleSecondary: string;
  dangerAComponent: string;
  dangerAComonentHover: string;
  dangerAComonentActive: string;
  dangerAImportant: string;
  dangerAImportantHover: string;
  dangerAImportantActive: string;
  dangerASolid: string;
  dangerASolidActive: string;
};

// type BorderColor = {
//   neutral: string;
//   neutralInteractive: string;
//   neutralInteractiveHover: string;
//   neutralFocus: string;

//   neutralA: string;
//   neutralAInteractive: string;
//   neutralAInteractiveHover: string;
//   neutralAFocus: string;

//   primary: string;
//   primaryInteractive: string;
//   primaryInteractiveHover: string;
//   primaryFocus: string;

//   primaryA: string;
//   primaryAInteractive: string;
//   primaryAInteractiveHover: string;
//   primaryAFocus: string;

//   success: string;
//   successInteractive: string;
//   successInteractiveHover: string;
//   successFocus: string;

//   successA: string;
//   successAInteractive: string;
//   successAInteractiveHover: string;
//   successAFocus: string;

//   info: string;
//   infoInteractive: string;
//   infoInteractiveHover: string;
//   infoFocus: string;

//   infoA: string;
//   infoAInteractive: string;
//   infoAInteractiveHover: string;
//   infoAFocus: string;

//   warning: string;
//   warningInteractive: string;
//   warningInteractiveHover: string;
//   warningFocus: string;

//   warningA: string;
//   warningAInteractive: string;
//   warningAInteractiveHover: string;
//   warningAFocus: string;

//   danger: string;
//   dangerInteractive: string;
//   dangerInteractiveHover: string;
//   dangerFocus: string;

//   dangerA: string;
//   dangerAInteractive: string;
//   dangerAInteractiveHover: string;
//   dangerAFocus: string;
// };

type BoxShadow = {
  borderNeutral: string;
  borderNeutralLarge: string;
  borderNeutralInteractive: string;
  borderNeutralInteractiveLarge: string;
  borderNeutralInteractiveHover: string;
  borderNeutralInteractiveHoverLarge: string;
  borderNeutralFocus: string;

  borderNeutralA: string;
  borderNeutralALarge: string;
  borderNeutralAInteractive: string;
  borderNeutralAInteractiveLarge: string;
  borderNeutralAInteractiveHover: string;
  borderNeutralAInteractiveHoverLarge: string;
  borderNeutralAFocus: string;

  borderPrimary: string;
  borderPrimaryLarge: string;
  borderPrimaryInteractive: string;
  borderPrimaryInteractiveLarge: string;
  borderPrimaryInteractiveHover: string;
  borderPrimaryInteractiveHoverLarge: string;
  borderPrimaryFocus: string;

  borderPrimaryA: string;
  borderPrimaryALarge: string;
  borderPrimaryAInteractive: string;
  borderPrimaryAInteractiveLarge: string;
  borderPrimaryAInteractiveHover: string;
  borderPrimaryAInteractiveHoverLarge: string;
  borderPrimaryAFocus: string;

  borderSuccess: string;
  borderSuccessLarge: string;
  borderSuccessInteractive: string;
  borderSuccessInteractiveLarge: string;
  borderSuccessInteractiveHover: string;
  borderSuccessInteractiveHoverLarge: string;
  borderSuccessFocus: string;

  borderSuccessA: string;
  borderSuccessALarge: string;
  borderSuccessAInteractive: string;
  borderSuccessAInteractiveLarge: string;
  borderSuccessAInteractiveHover: string;
  borderSuccessAInteractiveHoverLarge: string;
  borderSuccessAFocus: string;

  borderInfo: string;
  borderInfoLarge: string;
  borderInfoInteractive: string;
  borderInfoInteractiveLarge: string;
  borderInfoInteractiveHover: string;
  borderInfoInteractiveHoverLarge: string;
  borderInfoFocus: string;

  borderInfoA: string;
  borderInfoALarge: string;
  borderInfoAInteractive: string;
  borderInfoAInteractiveLarge: string;
  borderInfoAInteractiveHover: string;
  borderInfoAInteractiveHoverLarge: string;
  borderInfoAFocus: string;

  borderWarning: string;
  borderWarningLarge: string;
  borderWarningInteractive: string;
  borderWarningInteractiveLarge: string;
  borderWarningInteractiveHover: string;
  borderWarningInteractiveHoverLarge: string;
  borderWarningFocus: string;

  borderWarningA: string;
  borderWarningALarge: string;
  borderWarningAInteractive: string;
  borderWarningAInteractiveLarge: string;
  borderWarningAInteractiveHover: string;
  borderWarningAInteractiveHoverLarge: string;
  borderWarningAFocus: string;

  borderDanger: string;
  borderDangerLarge: string;
  borderDangerInteractive: string;
  borderDangerInteractiveLarge: string;
  borderDangerInteractiveHover: string;
  borderDangerInteractiveHoverLarge: string;
  borderDangerFocus: string;

  borderDangerA: string;
  borderDangerALarge: string;
  borderDangerAInteractive: string;
  borderDangerAInteractiveLarge: string;
  borderDangerAInteractiveHover: string;
  borderDangerAInteractiveHoverLarge: string;
  borderDangerAFocus: string;
};

type TextColor = {
  neutral: string;
  neutralLowContrast: string;

  neutralA: string;
  neutralALowContrast: string;

  primary: string;
  primaryLowContrast: string;

  primaryA: string;
  primaryALowContrast: string;

  success: string;
  successLowContrast: string;

  successA: string;
  successALowContrast: string;

  info: string;
  infoLowContrast: string;

  infoA: string;
  infoALowContrast: string;

  warning: string;
  warningLowContrast: string;

  warningA: string;
  warningALowContrast: string;

  danger: string;
  dangerLowContrast: string;

  dangerA: string;
  dangerALowContrast: string;
};

export type SemanticColors = {
  backgroundColor: BackgroundColor;
  boxShadow: BoxShadow;
  textColor: TextColor;
};

export type MakeSemanticColorsProps = {
  colorPalette: ColorPaletteType;
  overrides?: DeepPartial<SemanticColors>;
};

export const makeSemanticColors = ({ colorPalette, overrides = {} }: MakeSemanticColorsProps): SemanticColors => {
  /**
   * (from [Radix Color docs](https://www.radix-ui.com/docs/colorPalette/palette-composition/understanding-the-scale#steps-910-solid-backgrounds))
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
   * For complex components where you need many subtle colorPalette to communicate different meanings, you can get creative and do something like:
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
  const backgroundColor = {
    neutralSubtle: colorPalette.neutral[1],
    neutralSubtleSecondary: colorPalette.neutral[2],
    neutralComponent: colorPalette.neutral[2],
    neutralComonentHover: colorPalette.neutral[2],
    neutralComonentActive: colorPalette.neutral[2],
    neutralImportant: colorPalette.neutral[2],
    neutralImportantHover: colorPalette.neutral[2],
    neutralImportantActive: colorPalette.neutral[2],
    neutralSolid: colorPalette.neutral[2],
    neutralSolidActive: colorPalette.neutral[2],

    neutralASubtle: colorPalette.neutralA[1],
    neutralASubtleSecondary: colorPalette.neutralA[2],
    neutralAComponent: colorPalette.neutralA[2],
    neutralAComonentHover: colorPalette.neutralA[2],
    neutralAComonentActive: colorPalette.neutralA[2],
    neutralAImportant: colorPalette.neutralA[2],
    neutralAImportantHover: colorPalette.neutralA[2],
    neutralAImportantActive: colorPalette.neutralA[2],
    neutralASolid: colorPalette.neutralA[2],
    neutralASolidActive: colorPalette.neutralA[2],

    primarySubtle: colorPalette.primary[1],
    primarySubtleSecondary: colorPalette.primary[2],
    primaryComponent: colorPalette.primary[2],
    primaryComonentHover: colorPalette.primary[2],
    primaryComonentActive: colorPalette.primary[2],
    primaryImportant: colorPalette.primary[2],
    primaryImportantHover: colorPalette.primary[2],
    primaryImportantActive: colorPalette.primary[2],
    primarySolid: colorPalette.primary[2],
    primarySolidActive: colorPalette.primary[2],

    primaryASubtle: colorPalette.primaryA[1],
    primaryASubtleSecondary: colorPalette.primaryA[2],
    primaryAComponent: colorPalette.primaryA[2],
    primaryAComonentHover: colorPalette.primaryA[2],
    primaryAComonentActive: colorPalette.primaryA[2],
    primaryAImportant: colorPalette.primaryA[2],
    primaryAImportantHover: colorPalette.primaryA[2],
    primaryAImportantActive: colorPalette.primaryA[2],
    primaryASolid: colorPalette.primaryA[2],
    primaryASolidActive: colorPalette.primaryA[2],

    successSubtle: colorPalette.success[1],
    successSubtleSecondary: colorPalette.success[2],
    successComponent: colorPalette.success[2],
    successComonentHover: colorPalette.success[2],
    successComonentActive: colorPalette.success[2],
    successImportant: colorPalette.success[2],
    successImportantHover: colorPalette.success[2],
    successImportantActive: colorPalette.success[2],
    successSolid: colorPalette.success[2],
    successSolidActive: colorPalette.success[2],

    successASubtle: colorPalette.successA[1],
    successASubtleSecondary: colorPalette.successA[2],
    successAComponent: colorPalette.successA[2],
    successAComonentHover: colorPalette.successA[2],
    successAComonentActive: colorPalette.successA[2],
    successAImportant: colorPalette.successA[2],
    successAImportantHover: colorPalette.successA[2],
    successAImportantActive: colorPalette.successA[2],
    successASolid: colorPalette.successA[2],
    successASolidActive: colorPalette.successA[2],

    infoSubtle: colorPalette.info[1],
    infoSubtleSecondary: colorPalette.info[2],
    infoComponent: colorPalette.info[2],
    infoComonentHover: colorPalette.info[2],
    infoComonentActive: colorPalette.info[2],
    infoImportant: colorPalette.info[2],
    infoImportantHover: colorPalette.info[2],
    infoImportantActive: colorPalette.info[2],
    infoSolid: colorPalette.info[2],
    infoSolidActive: colorPalette.info[2],

    infoASubtle: colorPalette.infoA[1],
    infoASubtleSecondary: colorPalette.infoA[2],
    infoAComponent: colorPalette.infoA[2],
    infoAComonentHover: colorPalette.infoA[2],
    infoAComonentActive: colorPalette.infoA[2],
    infoAImportant: colorPalette.infoA[2],
    infoAImportantHover: colorPalette.infoA[2],
    infoAImportantActive: colorPalette.infoA[2],
    infoASolid: colorPalette.infoA[2],
    infoASolidActive: colorPalette.infoA[2],

    warningSubtle: colorPalette.warning[1],
    warningSubtleSecondary: colorPalette.warning[2],
    warningComponent: colorPalette.warning[2],
    warningComonentHover: colorPalette.warning[2],
    warningComonentActive: colorPalette.warning[2],
    warningImportant: colorPalette.warning[2],
    warningImportantHover: colorPalette.warning[2],
    warningImportantActive: colorPalette.warning[2],
    warningSolid: colorPalette.warning[2],
    warningSolidActive: colorPalette.warning[2],

    warningASubtle: colorPalette.warningA[1],
    warningASubtleSecondary: colorPalette.warningA[2],
    warningAComponent: colorPalette.warningA[2],
    warningAComonentHover: colorPalette.warningA[2],
    warningAComonentActive: colorPalette.warningA[2],
    warningAImportant: colorPalette.warningA[2],
    warningAImportantHover: colorPalette.warningA[2],
    warningAImportantActive: colorPalette.warningA[2],
    warningASolid: colorPalette.warningA[2],
    warningASolidActive: colorPalette.warningA[2],

    dangerSubtle: colorPalette.danger[1],
    dangerSubtleSecondary: colorPalette.danger[2],
    dangerComponent: colorPalette.danger[2],
    dangerComonentHover: colorPalette.danger[2],
    dangerComonentActive: colorPalette.danger[2],
    dangerImportant: colorPalette.danger[2],
    dangerImportantHover: colorPalette.danger[2],
    dangerImportantActive: colorPalette.danger[2],
    dangerSolid: colorPalette.danger[2],
    dangerSolidActive: colorPalette.danger[2],

    dangerASubtle: colorPalette.dangerA[1],
    dangerASubtleSecondary: colorPalette.dangerA[2],
    dangerAComponent: colorPalette.dangerA[2],
    dangerAComonentHover: colorPalette.dangerA[2],
    dangerAComonentActive: colorPalette.dangerA[2],
    dangerAImportant: colorPalette.dangerA[2],
    dangerAImportantHover: colorPalette.dangerA[2],
    dangerAImportantActive: colorPalette.dangerA[2],
    dangerASolid: colorPalette.dangerA[2],
    dangerASolidActive: colorPalette.dangerA[2],
  };

  /**
   * (from [Radix Color docs](https://www.radix-ui.com/docs/colorPalette/palette-composition/understanding-the-scale#steps-910-solid-backgrounds))
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
    neutral: colorPalette.neutral[6],
    neutralInteractive: colorPalette.neutral[7],
    neutralInteractiveHover: colorPalette.neutral[8],
    neutralFocus: colorPalette.neutral[7],

    neutralA: colorPalette.neutralA[6],
    neutralAInteractive: colorPalette.neutralA[7],
    neutralAInteractiveHover: colorPalette.neutralA[8],
    neutralAFocus: colorPalette.neutralA[7],

    primary: colorPalette.primary[6],
    primaryInteractive: colorPalette.primary[7],
    primaryInteractiveHover: colorPalette.primary[8],
    primaryFocus: colorPalette.primary[7],

    primaryA: colorPalette.primaryA[6],
    primaryAInteractive: colorPalette.primaryA[7],
    primaryAInteractiveHover: colorPalette.primaryA[8],
    primaryAFocus: colorPalette.primaryA[7],

    success: colorPalette.success[6],
    successInteractive: colorPalette.success[7],
    successInteractiveHover: colorPalette.success[8],
    successFocus: colorPalette.success[7],

    successA: colorPalette.successA[6],
    successAInteractive: colorPalette.successA[7],
    successAInteractiveHover: colorPalette.successA[8],
    successAFocus: colorPalette.successA[7],

    info: colorPalette.info[6],
    infoInteractive: colorPalette.info[7],
    infoInteractiveHover: colorPalette.info[8],
    infoFocus: colorPalette.info[7],

    infoA: colorPalette.infoA[6],
    infoAInteractive: colorPalette.infoA[7],
    infoAInteractiveHover: colorPalette.infoA[8],
    infoAFocus: colorPalette.infoA[7],

    warning: colorPalette.warning[6],
    warningInteractive: colorPalette.warning[7],
    warningInteractiveHover: colorPalette.warning[8],
    warningFocus: colorPalette.warning[7],

    warningA: colorPalette.warningA[6],
    warningAInteractive: colorPalette.warningA[7],
    warningAInteractiveHover: colorPalette.warningA[8],
    warningAFocus: colorPalette.warningA[7],

    danger: colorPalette.danger[6],
    dangerInteractive: colorPalette.danger[7],
    dangerInteractiveHover: colorPalette.danger[8],
    dangerFocus: colorPalette.danger[7],

    dangerA: colorPalette.dangerA[6],
    dangerAInteractive: colorPalette.dangerA[7],
    dangerAInteractiveHover: colorPalette.dangerA[8],
    dangerAFocus: colorPalette.dangerA[7],
  };

  // use box-shadow for borders
  const boxShadow = {
    borderNeutral: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutral}`,
    borderNeutralLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutral}`,
    borderNeutralInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutralInteractive}`,
    borderNeutralInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutralInteractive}`,
    borderNeutralInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutralInteractiveHover}`,
    borderNeutralInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutralInteractiveHover}`,
    borderNeutralFocus: `0 0 0 ${tokens.border.width.large} ${borderColor.neutralFocus}`,

    borderNeutralA: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutralA}`,
    borderNeutralALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutralA}`,
    borderNeutralAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutralAInteractive}`,
    borderNeutralAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutralAInteractive}`,
    borderNeutralAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutralAInteractiveHover}`,
    borderNeutralAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutralAInteractiveHover}`,
    borderNeutralAFocus: `0 0 0 ${tokens.border.width.large} ${borderColor.neutralAFocus}`,

    borderPrimary: `0 0 0 ${tokens.border.width.standard} ${borderColor.primary}`,
    borderPrimaryLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primary}`,
    borderPrimaryInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.primaryInteractive}`,
    borderPrimaryInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primaryInteractive}`,
    borderPrimaryInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.primaryInteractiveHover}`,
    borderPrimaryInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primaryInteractiveHover}`,
    borderPrimaryFocus: `0 0 0 ${tokens.border.width.large} ${borderColor.primaryFocus}`,

    borderPrimaryA: `0 0 0 ${tokens.border.width.standard} ${borderColor.primaryA}`,
    borderPrimaryALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primaryA}`,
    borderPrimaryAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.primaryAInteractive}`,
    borderPrimaryAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primaryAInteractive}`,
    borderPrimaryAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.primaryAInteractiveHover}`,
    borderPrimaryAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primaryAInteractiveHover}`,
    borderPrimaryAFocus: `0 0 0 ${tokens.border.width.large} ${borderColor.primaryAFocus}`,

    borderSuccess: `0 0 0 ${tokens.border.width.standard} ${borderColor.success}`,
    borderSuccessLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.success}`,
    borderSuccessInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.successInteractive}`,
    borderSuccessInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.successInteractive}`,
    borderSuccessInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.successInteractiveHover}`,
    borderSuccessInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.successInteractiveHover}`,
    borderSuccessFocus: `0 0 0 ${tokens.border.width.large} ${borderColor.successFocus}`,

    borderSuccessA: `0 0 0 ${tokens.border.width.standard} ${borderColor.successA}`,
    borderSuccessALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.successA}`,
    borderSuccessAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.successAInteractive}`,
    borderSuccessAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.successAInteractive}`,
    borderSuccessAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.successAInteractiveHover}`,
    borderSuccessAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.successAInteractiveHover}`,
    borderSuccessAFocus: `0 0 0 ${tokens.border.width.large} ${borderColor.successFocus}`,

    borderInfo: `0 0 0 ${tokens.border.width.standard} ${borderColor.info}`,
    borderInfoLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.info}`,
    borderInfoInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.infoInteractive}`,
    borderInfoInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.infoInteractive}`,
    borderInfoInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.infoInteractiveHover}`,
    borderInfoInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.infoInteractiveHover}`,
    borderInfoFocus: `0 0 0 ${tokens.border.width.large} ${borderColor.infoFocus}`,

    borderInfoA: `0 0 0 ${tokens.border.width.standard} ${borderColor.infoA}`,
    borderInfoALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.infoA}`,
    borderInfoAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.infoAInteractive}`,
    borderInfoAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.infoAInteractive}`,
    borderInfoAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.infoAInteractiveHover}`,
    borderInfoAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.infoAInteractiveHover}`,
    borderInfoAFocus: `0 0 0 ${tokens.border.width.large} ${borderColor.infoAFocus}`,

    borderWarning: `0 0 0 ${tokens.border.width.standard} ${borderColor.warning}`,
    borderWarningLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warning}`,
    borderWarningInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.warningInteractive}`,
    borderWarningInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warningInteractive}`,
    borderWarningInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.warningInteractiveHover}`,
    borderWarningInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warningInteractiveHover}`,
    borderWarningFocus: `0 0 0 ${tokens.border.width.large} ${borderColor.warningFocus}`,

    borderWarningA: `0 0 0 ${tokens.border.width.standard} ${borderColor.warningA}`,
    borderWarningALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warningA}`,
    borderWarningAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.warningAInteractive}`,
    borderWarningAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warningAInteractive}`,
    borderWarningAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.warningAInteractiveHover}`,
    borderWarningAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warningAInteractiveHover}`,
    borderWarningAFocus: `0 0 0 ${tokens.border.width.large} ${borderColor.warningAFocus}`,

    borderDanger: `0 0 0 ${tokens.border.width.standard} ${borderColor.danger}`,
    borderDangerLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.danger}`,
    borderDangerInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.dangerInteractive}`,
    borderDangerInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.dangerInteractive}`,
    borderDangerInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.dangerInteractiveHover}`,
    borderDangerInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.dangerInteractiveHover}`,
    borderDangerFocus: `0 0 0 ${tokens.border.width.large} ${borderColor.dangerFocus}`,

    borderDangerA: `0 0 0 ${tokens.border.width.standard} ${borderColor.dangerA}`,
    borderDangerALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.dangerA}`,
    borderDangerAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.dangerAInteractive}`,
    borderDangerAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.dangerAInteractive}`,
    borderDangerAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.dangerAInteractiveHover}`,
    borderDangerAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.dangerAInteractiveHover}`,
    borderDangerAFocus: `0 0 0 ${tokens.border.width.large} ${borderColor.dangerAFocus}`,
  };

  /**
   * (from [Radix Color docs](https://www.radix-ui.com/docs/colorPalette/palette-composition/understanding-the-scale#steps-910-solid-backgrounds))
   *
   * Steps 11 and 12 are designed for text.
   * - Step 11 is designed for low-contrast text.
   * - Step 12 is designed for high-contrast text.
   *
   * Steps 11 and 12 are guaranteed to pass 4.5:1 contrast ratio on top of a step 3 background from the same scale.
   */
  const textColor = {
    neutral: colorPalette.neutral[12],
    neutralLowContrast: colorPalette.neutral[11],

    neutralA: colorPalette.neutralA[12],
    neutralALowContrast: colorPalette.neutralA[11],

    primary: colorPalette.primary[12],
    primaryLowContrast: colorPalette.primary[11],

    primaryA: colorPalette.primaryA[12],
    primaryALowContrast: colorPalette.primaryA[11],

    success: colorPalette.success[12],
    successLowContrast: colorPalette.success[11],

    successA: colorPalette.successA[12],
    successALowContrast: colorPalette.successA[11],

    info: colorPalette.info[12],
    infoLowContrast: colorPalette.info[11],

    infoA: colorPalette.infoA[12],
    infoALowContrast: colorPalette.infoA[11],

    warning: colorPalette.warning[12],
    warningLowContrast: colorPalette.warning[11],

    warningA: colorPalette.warningA[12],
    warningALowContrast: colorPalette.warningA[11],

    danger: colorPalette.danger[12],
    dangerLowContrast: colorPalette.danger[11],

    dangerA: colorPalette.dangerA[12],
    dangerALowContrast: colorPalette.dangerA[11],
  };

  return merge(
    {
      backgroundColor,
      boxShadow,
      textColor,
    },
    overrides,
  );
};

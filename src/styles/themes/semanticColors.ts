import { merge } from 'lodash';
import type { DeepPartial } from 'utility-types';

import type { ColorPaletteType } from '@cubeartisan/cubeartisan/styles/themes/colorPaletteType';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

type BackgroundColor = {
  neutral: {
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
  };
  neutralA: {
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
  };
  primary: {
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
  };
  primaryA: {
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
  };
  success: {
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
  };
  successA: {
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
  };
  info: {
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
  };
  infoA: {
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
  };
  warning: {
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
  };
  warningA: {
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
  };
  danger: {
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
  };
  dangerA: {
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
  neutral: {
    borderNeutral: string;
    borderNeutralLarge: string;
    borderNeutralInteractive: string;
    borderNeutralInteractiveLarge: string;
    borderNeutralInteractiveHover: string;
    borderNeutralInteractiveHoverLarge: string;
    borderNeutralFocus: string;
  };
  neutralA: {
    borderNeutralA: string;
    borderNeutralALarge: string;
    borderNeutralAInteractive: string;
    borderNeutralAInteractiveLarge: string;
    borderNeutralAInteractiveHover: string;
    borderNeutralAInteractiveHoverLarge: string;
    borderNeutralAFocus: string;
  };
  primary: {
    borderPrimary: string;
    borderPrimaryLarge: string;
    borderPrimaryInteractive: string;
    borderPrimaryInteractiveLarge: string;
    borderPrimaryInteractiveHover: string;
    borderPrimaryInteractiveHoverLarge: string;
    borderPrimaryFocus: string;
  };
  primaryA: {
    borderPrimaryA: string;
    borderPrimaryALarge: string;
    borderPrimaryAInteractive: string;
    borderPrimaryAInteractiveLarge: string;
    borderPrimaryAInteractiveHover: string;
    borderPrimaryAInteractiveHoverLarge: string;
    borderPrimaryAFocus: string;
  };
  success: {
    borderSuccess: string;
    borderSuccessLarge: string;
    borderSuccessInteractive: string;
    borderSuccessInteractiveLarge: string;
    borderSuccessInteractiveHover: string;
    borderSuccessInteractiveHoverLarge: string;
    borderSuccessFocus: string;
  };
  successA: {
    borderSuccessA: string;
    borderSuccessALarge: string;
    borderSuccessAInteractive: string;
    borderSuccessAInteractiveLarge: string;
    borderSuccessAInteractiveHover: string;
    borderSuccessAInteractiveHoverLarge: string;
    borderSuccessAFocus: string;
  };
  info: {
    borderInfo: string;
    borderInfoLarge: string;
    borderInfoInteractive: string;
    borderInfoInteractiveLarge: string;
    borderInfoInteractiveHover: string;
    borderInfoInteractiveHoverLarge: string;
    borderInfoFocus: string;
  };
  infoA: {
    borderInfoA: string;
    borderInfoALarge: string;
    borderInfoAInteractive: string;
    borderInfoAInteractiveLarge: string;
    borderInfoAInteractiveHover: string;
    borderInfoAInteractiveHoverLarge: string;
    borderInfoAFocus: string;
  };
  warning: {
    borderWarning: string;
    borderWarningLarge: string;
    borderWarningInteractive: string;
    borderWarningInteractiveLarge: string;
    borderWarningInteractiveHover: string;
    borderWarningInteractiveHoverLarge: string;
    borderWarningFocus: string;
  };
  warningA: {
    borderWarningA: string;
    borderWarningALarge: string;
    borderWarningAInteractive: string;
    borderWarningAInteractiveLarge: string;
    borderWarningAInteractiveHover: string;
    borderWarningAInteractiveHoverLarge: string;
    borderWarningAFocus: string;
  };
  danger: {
    borderDanger: string;
    borderDangerLarge: string;
    borderDangerInteractive: string;
    borderDangerInteractiveLarge: string;
    borderDangerInteractiveHover: string;
    borderDangerInteractiveHoverLarge: string;
    borderDangerFocus: string;
  };
  dangerA: {
    borderDangerA: string;
    borderDangerALarge: string;
    borderDangerAInteractive: string;
    borderDangerAInteractiveLarge: string;
    borderDangerAInteractiveHover: string;
    borderDangerAInteractiveHoverLarge: string;
    borderDangerAFocus: string;
  };
};

type TextColor = {
  neutral: {
    neutralContrast: string;
    neutralLowContrast: string;
  };
  neutralA: {
    neutralAContrast: string;
    neutralALowContrast: string;
  };
  primary: {
    primaryContrast: string;
    primaryLowContrast: string;
  };
  primaryA: {
    primaryAContrast: string;
    primaryALowContrast: string;
  };
  success: {
    successContrast: string;
    successLowContrast: string;
  };
  successA: {
    successAContrast: string;
    successALowContrast: string;
  };
  info: {
    infoContrast: string;
    infoLowContrast: string;
  };
  infoA: {
    infoAContrast: string;
    infoALowContrast: string;
  };
  warning: {
    warningContrast: string;
    warningLowContrast: string;
  };
  warningA: {
    warningAContrast: string;
    warningALowContrast: string;
  };
  danger: {
    dangerContrast: string;
    dangerLowContrast: string;
  };
  dangerA: {
    dangerAContrast: string;
    dangerALowContrast: string;
  };
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
    neutral: {
      neutralSubtle: colorPalette.neutral[1],
      neutralSubtleSecondary: colorPalette.neutral[2],
      neutralComponent: colorPalette.neutral[3],
      neutralComonentHover: colorPalette.neutral[4],
      neutralComonentActive: colorPalette.neutral[5],
      neutralImportant: colorPalette.neutral[4],
      neutralImportantHover: colorPalette.neutral[5],
      neutralImportantActive: colorPalette.neutral[6],
      neutralSolid: colorPalette.neutral[9],
      neutralSolidActive: colorPalette.neutral[10],
    },
    neutralA: {
      neutralASubtle: colorPalette.neutralA[1],
      neutralASubtleSecondary: colorPalette.neutralA[2],
      neutralAComponent: colorPalette.neutralA[3],
      neutralAComonentHover: colorPalette.neutralA[4],
      neutralAComonentActive: colorPalette.neutralA[5],
      neutralAImportant: colorPalette.neutralA[4],
      neutralAImportantHover: colorPalette.neutralA[5],
      neutralAImportantActive: colorPalette.neutralA[6],
      neutralASolid: colorPalette.neutralA[9],
      neutralASolidActive: colorPalette.neutralA[10],
    },
    primary: {
      primarySubtle: colorPalette.primary[1],
      primarySubtleSecondary: colorPalette.primary[2],
      primaryComponent: colorPalette.primary[3],
      primaryComonentHover: colorPalette.primary[4],
      primaryComonentActive: colorPalette.primary[5],
      primaryImportant: colorPalette.primary[4],
      primaryImportantHover: colorPalette.primary[5],
      primaryImportantActive: colorPalette.primary[6],
      primarySolid: colorPalette.primary[9],
      primarySolidActive: colorPalette.primary[10],
    },
    primaryA: {
      primaryASubtle: colorPalette.primaryA[1],
      primaryASubtleSecondary: colorPalette.primaryA[2],
      primaryAComponent: colorPalette.primaryA[3],
      primaryAComonentHover: colorPalette.primaryA[4],
      primaryAComonentActive: colorPalette.primaryA[5],
      primaryAImportant: colorPalette.primaryA[4],
      primaryAImportantHover: colorPalette.primaryA[5],
      primaryAImportantActive: colorPalette.primaryA[6],
      primaryASolid: colorPalette.primaryA[9],
      primaryASolidActive: colorPalette.primaryA[10],
    },
    success: {
      successSubtle: colorPalette.success[1],
      successSubtleSecondary: colorPalette.success[2],
      successComponent: colorPalette.success[3],
      successComonentHover: colorPalette.success[4],
      successComonentActive: colorPalette.success[5],
      successImportant: colorPalette.success[4],
      successImportantHover: colorPalette.success[5],
      successImportantActive: colorPalette.success[6],
      successSolid: colorPalette.success[9],
      successSolidActive: colorPalette.success[10],
    },
    successA: {
      successASubtle: colorPalette.successA[1],
      successASubtleSecondary: colorPalette.successA[2],
      successAComponent: colorPalette.successA[3],
      successAComonentHover: colorPalette.successA[4],
      successAComonentActive: colorPalette.successA[5],
      successAImportant: colorPalette.successA[4],
      successAImportantHover: colorPalette.successA[5],
      successAImportantActive: colorPalette.successA[6],
      successASolid: colorPalette.successA[9],
      successASolidActive: colorPalette.successA[10],
    },
    info: {
      infoSubtle: colorPalette.info[1],
      infoSubtleSecondary: colorPalette.info[2],
      infoComponent: colorPalette.info[3],
      infoComonentHover: colorPalette.info[4],
      infoComonentActive: colorPalette.info[5],
      infoImportant: colorPalette.info[4],
      infoImportantHover: colorPalette.info[5],
      infoImportantActive: colorPalette.info[6],
      infoSolid: colorPalette.info[9],
      infoSolidActive: colorPalette.info[10],
    },
    infoA: {
      infoASubtle: colorPalette.infoA[1],
      infoASubtleSecondary: colorPalette.infoA[2],
      infoAComponent: colorPalette.infoA[3],
      infoAComonentHover: colorPalette.infoA[4],
      infoAComonentActive: colorPalette.infoA[5],
      infoAImportant: colorPalette.infoA[4],
      infoAImportantHover: colorPalette.infoA[5],
      infoAImportantActive: colorPalette.infoA[6],
      infoASolid: colorPalette.infoA[9],
      infoASolidActive: colorPalette.infoA[10],
    },
    warning: {
      warningSubtle: colorPalette.warning[1],
      warningSubtleSecondary: colorPalette.warning[2],
      warningComponent: colorPalette.warning[3],
      warningComonentHover: colorPalette.warning[4],
      warningComonentActive: colorPalette.warning[5],
      warningImportant: colorPalette.warning[4],
      warningImportantHover: colorPalette.warning[5],
      warningImportantActive: colorPalette.warning[6],
      warningSolid: colorPalette.warning[9],
      warningSolidActive: colorPalette.warning[10],
    },
    warningA: {
      warningASubtle: colorPalette.warningA[1],
      warningASubtleSecondary: colorPalette.warningA[2],
      warningAComponent: colorPalette.warningA[3],
      warningAComonentHover: colorPalette.warningA[4],
      warningAComonentActive: colorPalette.warningA[5],
      warningAImportant: colorPalette.warningA[4],
      warningAImportantHover: colorPalette.warningA[5],
      warningAImportantActive: colorPalette.warningA[6],
      warningASolid: colorPalette.warningA[9],
      warningASolidActive: colorPalette.warningA[10],
    },
    danger: {
      dangerSubtle: colorPalette.danger[1],
      dangerSubtleSecondary: colorPalette.danger[2],
      dangerComponent: colorPalette.danger[3],
      dangerComonentHover: colorPalette.danger[4],
      dangerComonentActive: colorPalette.danger[5],
      dangerImportant: colorPalette.danger[4],
      dangerImportantHover: colorPalette.danger[5],
      dangerImportantActive: colorPalette.danger[6],
      dangerSolid: colorPalette.danger[9],
      dangerSolidActive: colorPalette.danger[10],
    },
    dangerA: {
      dangerASubtle: colorPalette.dangerA[1],
      dangerASubtleSecondary: colorPalette.dangerA[2],
      dangerAComponent: colorPalette.dangerA[3],
      dangerAComonentHover: colorPalette.dangerA[4],
      dangerAComonentActive: colorPalette.dangerA[5],
      dangerAImportant: colorPalette.dangerA[4],
      dangerAImportantHover: colorPalette.dangerA[5],
      dangerAImportantActive: colorPalette.dangerA[6],
      dangerASolid: colorPalette.dangerA[9],
      dangerASolidActive: colorPalette.dangerA[10],
    },
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
    neutral: {
      neutral: colorPalette.neutral[6],
      neutralInteractive: colorPalette.neutral[7],
      neutralInteractiveHover: colorPalette.neutral[8],
      neutralFocus: colorPalette.neutral[7],
    },
    neutralA: {
      neutralA: colorPalette.neutralA[6],
      neutralAInteractive: colorPalette.neutralA[7],
      neutralAInteractiveHover: colorPalette.neutralA[8],
      neutralAFocus: colorPalette.neutralA[7],
    },
    primary: {
      primary: colorPalette.primary[6],
      primaryInteractive: colorPalette.primary[7],
      primaryInteractiveHover: colorPalette.primary[8],
      primaryFocus: colorPalette.primary[7],
    },
    primaryA: {
      primaryA: colorPalette.primaryA[6],
      primaryAInteractive: colorPalette.primaryA[7],
      primaryAInteractiveHover: colorPalette.primaryA[8],
      primaryAFocus: colorPalette.primaryA[7],
    },
    success: {
      success: colorPalette.success[6],
      successInteractive: colorPalette.success[7],
      successInteractiveHover: colorPalette.success[8],
      successFocus: colorPalette.success[7],
    },
    sucessA: {
      successA: colorPalette.successA[6],
      successAInteractive: colorPalette.successA[7],
      successAInteractiveHover: colorPalette.successA[8],
      successAFocus: colorPalette.successA[7],
    },
    info: {
      info: colorPalette.info[6],
      infoInteractive: colorPalette.info[7],
      infoInteractiveHover: colorPalette.info[8],
      infoFocus: colorPalette.info[7],
    },
    infoA: {
      infoA: colorPalette.infoA[6],
      infoAInteractive: colorPalette.infoA[7],
      infoAInteractiveHover: colorPalette.infoA[8],
      infoAFocus: colorPalette.infoA[7],
    },
    warning: {
      warning: colorPalette.warning[6],
      warningInteractive: colorPalette.warning[7],
      warningInteractiveHover: colorPalette.warning[8],
      warningFocus: colorPalette.warning[7],
    },
    warningA: {
      warningA: colorPalette.warningA[6],
      warningAInteractive: colorPalette.warningA[7],
      warningAInteractiveHover: colorPalette.warningA[8],
      warningAFocus: colorPalette.warningA[7],
    },
    danger: {
      danger: colorPalette.danger[6],
      dangerInteractive: colorPalette.danger[7],
      dangerInteractiveHover: colorPalette.danger[8],
      dangerFocus: colorPalette.danger[7],
    },
    dangerA: {
      dangerA: colorPalette.dangerA[6],
      dangerAInteractive: colorPalette.dangerA[7],
      dangerAInteractiveHover: colorPalette.dangerA[8],
      dangerAFocus: colorPalette.dangerA[7],
    },
  };

  // use box-shadow for borders
  const boxShadow = {
    neutral: {
      borderNeutral: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutral.neutral}`,
      borderNeutralLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutral.neutral}`,
      borderNeutralInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutral.neutralInteractive}`,
      borderNeutralInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutral.neutralInteractive}`,
      borderNeutralInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutral.neutralInteractiveHover}`,
      borderNeutralInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutral.neutralInteractiveHover}`,
      borderNeutralFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.neutral.neutralFocus}`,
    },
    neutralA: {
      borderNeutralA: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutralA.neutralA}`,
      borderNeutralALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutralA.neutralA}`,
      borderNeutralAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutralA.neutralAInteractive}`,
      borderNeutralAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutralA.neutralAInteractive}`,
      borderNeutralAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutralA.neutralAInteractiveHover}`,
      borderNeutralAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutralA.neutralAInteractiveHover}`,
      borderNeutralAFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.neutralA.neutralAFocus}`,
    },
    primary: {
      borderPrimary: `0 0 0 ${tokens.border.width.standard} ${borderColor.primary.primary}`,
      borderPrimaryLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primary.primary}`,
      borderPrimaryInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.primary.primaryInteractive}`,
      borderPrimaryInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primary.primaryInteractive}`,
      borderPrimaryInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.primary.primaryInteractiveHover}`,
      borderPrimaryInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primary.primaryInteractiveHover}`,
      borderPrimaryFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.primary.primaryFocus}`,
    },
    primaryA: {
      borderPrimaryA: `0 0 0 ${tokens.border.width.standard} ${borderColor.primaryA.primaryA}`,
      borderPrimaryALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primaryA.primaryA}`,
      borderPrimaryAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.primaryA.primaryAInteractive}`,
      borderPrimaryAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primaryA.primaryAInteractive}`,
      borderPrimaryAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.primaryA.primaryAInteractiveHover}`,
      borderPrimaryAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primaryA.primaryAInteractiveHover}`,
      borderPrimaryAFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.primaryA.primaryAFocus}`,
    },
    success: {
      borderSuccess: `0 0 0 ${tokens.border.width.standard} ${borderColor.success.success}`,
      borderSuccessLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.success.success}`,
      borderSuccessInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.success.successInteractive}`,
      borderSuccessInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.success.successInteractive}`,
      borderSuccessInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.success.successInteractiveHover}`,
      borderSuccessInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.success.successInteractiveHover}`,
      borderSuccessFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.success.successFocus}`,
    },
    successA: {
      borderSuccessA: `0 0 0 ${tokens.border.width.standard} ${borderColor.sucessA.successA}`,
      borderSuccessALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.sucessA.successA}`,
      borderSuccessAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.sucessA.successAInteractive}`,
      borderSuccessAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.sucessA.successAInteractive}`,
      borderSuccessAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.sucessA.successAInteractiveHover}`,
      borderSuccessAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.sucessA.successAInteractiveHover}`,
      borderSuccessAFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.sucessA.successAFocus}`,
    },
    info: {
      borderInfo: `0 0 0 ${tokens.border.width.standard} ${borderColor.info.info}`,
      borderInfoLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.info.info}`,
      borderInfoInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.info.infoInteractive}`,
      borderInfoInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.info.infoInteractive}`,
      borderInfoInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.info.infoInteractiveHover}`,
      borderInfoInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.info.infoInteractiveHover}`,
      borderInfoFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.info.infoFocus}`,
    },
    infoA: {
      borderInfoA: `0 0 0 ${tokens.border.width.standard} ${borderColor.infoA.infoA}`,
      borderInfoALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.infoA.infoA}`,
      borderInfoAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.infoA.infoAInteractive}`,
      borderInfoAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.infoA.infoAInteractive}`,
      borderInfoAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.infoA.infoAInteractiveHover}`,
      borderInfoAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.infoA.infoAInteractiveHover}`,
      borderInfoAFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.infoA.infoAFocus}`,
    },
    warning: {
      borderWarning: `0 0 0 ${tokens.border.width.standard} ${borderColor.warning.warning}`,
      borderWarningLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warning.warning}`,
      borderWarningInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.warning.warningInteractive}`,
      borderWarningInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warning.warningInteractive}`,
      borderWarningInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.warning.warningInteractiveHover}`,
      borderWarningInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warning.warningInteractiveHover}`,
      borderWarningFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.warning.warningFocus}`,
    },
    warningA: {
      borderWarningA: `0 0 0 ${tokens.border.width.standard} ${borderColor.warningA.warningA}`,
      borderWarningALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warningA.warningA}`,
      borderWarningAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.warningA.warningAInteractive}`,
      borderWarningAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warningA.warningAInteractive}`,
      borderWarningAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.warningA.warningAInteractiveHover}`,
      borderWarningAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warningA.warningAInteractiveHover}`,
      borderWarningAFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.warningA.warningAFocus}`,
    },
    danger: {
      borderDanger: `0 0 0 ${tokens.border.width.standard} ${borderColor.danger.danger}`,
      borderDangerLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.danger.danger}`,
      borderDangerInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.danger.dangerInteractive}`,
      borderDangerInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.danger.dangerInteractive}`,
      borderDangerInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.danger.dangerInteractiveHover}`,
      borderDangerInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.danger.dangerInteractiveHover}`,
      borderDangerFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.danger.dangerFocus}`,
    },
    dangerA: {
      borderDangerA: `0 0 0 ${tokens.border.width.standard} ${borderColor.dangerA.dangerA}`,
      borderDangerALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.dangerA.dangerA}`,
      borderDangerAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.dangerA.dangerAInteractive}`,
      borderDangerAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.dangerA.dangerAInteractive}`,
      borderDangerAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.dangerA.dangerAInteractiveHover}`,
      borderDangerAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.dangerA.dangerAInteractiveHover}`,
      borderDangerAFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.dangerA.dangerAFocus}`,
    },
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
    neutral: {
      neutralContrast: colorPalette.neutral[12],
      neutralLowContrast: colorPalette.neutral[11],
    },
    neutralA: {
      neutralAContrast: colorPalette.neutralA[12],
      neutralALowContrast: colorPalette.neutralA[11],
    },
    primary: {
      primaryContrast: colorPalette.primary[12],
      primaryLowContrast: colorPalette.primary[11],
    },
    primaryA: {
      primaryAContrast: colorPalette.primaryA[12],
      primaryALowContrast: colorPalette.primaryA[11],
    },
    success: {
      successContrast: colorPalette.success[12],
      successLowContrast: colorPalette.success[11],
    },
    successA: {
      successAContrast: colorPalette.successA[12],
      successALowContrast: colorPalette.successA[11],
    },
    info: {
      infoContrast: colorPalette.info[12],
      infoLowContrast: colorPalette.info[11],
    },
    infoA: {
      infoAContrast: colorPalette.infoA[12],
      infoALowContrast: colorPalette.infoA[11],
    },
    warning: {
      warningContrast: colorPalette.warning[12],
      warningLowContrast: colorPalette.warning[11],
    },
    warningA: {
      warningAContrast: colorPalette.warningA[12],
      warningALowContrast: colorPalette.warningA[11],
    },
    danger: {
      dangerContrast: colorPalette.danger[12],
      dangerLowContrast: colorPalette.danger[11],
    },
    dangerA: {
      dangerAContrast: colorPalette.dangerA[12],
      dangerALowContrast: colorPalette.dangerA[11],
    },
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

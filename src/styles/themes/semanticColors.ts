import { merge } from 'lodash';
import type { DeepPartial } from 'utility-types';

import type { ColorPaletteType } from '@cubeartisan/cubeartisan/styles/themes/colorPaletteType';
import { tokens } from '@cubeartisan/cubeartisan/styles/tokens';

type BackgroundColor = {
  neutral: {
    neutralSubtle: string;
    neutralSubtleSecondary: string;
    neutralComponent: string;
    neutralComponentHover: string;
    neutralComponentActive: string;
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
    neutralAComponentHover: string;
    neutralAComponentActive: string;
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
    primaryComponentHover: string;
    primaryComponentActive: string;
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
    primaryAComponentHover: string;
    primaryAComponentActive: string;
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
    successComponentHover: string;
    successComponentActive: string;
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
    successAComponentHover: string;
    successAComponentActive: string;
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
    infoComponentHover: string;
    infoComponentActive: string;
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
    infoAComponentHover: string;
    infoAComponentActive: string;
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
    warningComponentHover: string;
    warningComponentActive: string;
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
    warningAComponentHover: string;
    warningAComponentActive: string;
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
    dangerComponentHover: string;
    dangerComponentActive: string;
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
    dangerAComponentHover: string;
    dangerAComponentActive: string;
    dangerAImportant: string;
    dangerAImportantHover: string;
    dangerAImportantActive: string;
    dangerASolid: string;
    dangerASolidActive: string;
  };
};

type BoxShadow = {
  neutral: {
    borderNeutral: string;
    borderNeutralLarge: string;
    borderNeutralInteractive: string;
    borderNeutralInteractiveLarge: string;
    borderNeutralInteractiveHover: string;
    borderNeutralInteractiveHoverLarge: string;
    borderNeutralFocus: string;
    borderNeutralSolid: string;
    borderNeutralSolidLarge: string;
  };
  neutralA: {
    borderNeutralA: string;
    borderNeutralALarge: string;
    borderNeutralAInteractive: string;
    borderNeutralAInteractiveLarge: string;
    borderNeutralAInteractiveHover: string;
    borderNeutralAInteractiveHoverLarge: string;
    borderNeutralAFocus: string;
    borderNeutralASolid: string;
    borderNeutralASolidLarge: string;
  };
  primary: {
    borderPrimary: string;
    borderPrimaryLarge: string;
    borderPrimaryInteractive: string;
    borderPrimaryInteractiveLarge: string;
    borderPrimaryInteractiveHover: string;
    borderPrimaryInteractiveHoverLarge: string;
    borderPrimaryFocus: string;
    borderPrimarySolid: string;
    borderPrimarySolidLarge: string;
  };
  primaryA: {
    borderPrimaryA: string;
    borderPrimaryALarge: string;
    borderPrimaryAInteractive: string;
    borderPrimaryAInteractiveLarge: string;
    borderPrimaryAInteractiveHover: string;
    borderPrimaryAInteractiveHoverLarge: string;
    borderPrimaryAFocus: string;
    borderPrimaryASolid: string;
    borderPrimaryASolidLarge: string;
  };
  success: {
    borderSuccess: string;
    borderSuccessLarge: string;
    borderSuccessInteractive: string;
    borderSuccessInteractiveLarge: string;
    borderSuccessInteractiveHover: string;
    borderSuccessInteractiveHoverLarge: string;
    borderSuccessFocus: string;
    borderSuccessSolid: string;
    borderSuccessSolidLarge: string;
  };
  successA: {
    borderSuccessA: string;
    borderSuccessALarge: string;
    borderSuccessAInteractive: string;
    borderSuccessAInteractiveLarge: string;
    borderSuccessAInteractiveHover: string;
    borderSuccessAInteractiveHoverLarge: string;
    borderSuccessAFocus: string;
    borderSuccessASolid: string;
    borderSuccessASolidLarge: string;
  };
  info: {
    borderInfo: string;
    borderInfoLarge: string;
    borderInfoInteractive: string;
    borderInfoInteractiveLarge: string;
    borderInfoInteractiveHover: string;
    borderInfoInteractiveHoverLarge: string;
    borderInfoFocus: string;
    borderInfoSolid: string;
    borderInfoSolidLarge: string;
  };
  infoA: {
    borderInfoA: string;
    borderInfoALarge: string;
    borderInfoAInteractive: string;
    borderInfoAInteractiveLarge: string;
    borderInfoAInteractiveHover: string;
    borderInfoAInteractiveHoverLarge: string;
    borderInfoAFocus: string;
    borderInfoASolid: string;
    borderInfoASolidLarge: string;
  };
  warning: {
    borderWarning: string;
    borderWarningLarge: string;
    borderWarningInteractive: string;
    borderWarningInteractiveLarge: string;
    borderWarningInteractiveHover: string;
    borderWarningInteractiveHoverLarge: string;
    borderWarningFocus: string;
    borderWarningSolid: string;
    borderWarningSolidLarge: string;
  };
  warningA: {
    borderWarningA: string;
    borderWarningALarge: string;
    borderWarningAInteractive: string;
    borderWarningAInteractiveLarge: string;
    borderWarningAInteractiveHover: string;
    borderWarningAInteractiveHoverLarge: string;
    borderWarningAFocus: string;
    borderWarningASolid: string;
    borderWarningASolidLarge: string;
  };
  danger: {
    borderDanger: string;
    borderDangerLarge: string;
    borderDangerInteractive: string;
    borderDangerInteractiveLarge: string;
    borderDangerInteractiveHover: string;
    borderDangerInteractiveHoverLarge: string;
    borderDangerFocus: string;
    borderDangerSolid: string;
    borderDangerSolidLarge: string;
  };
  dangerA: {
    borderDangerA: string;
    borderDangerALarge: string;
    borderDangerAInteractive: string;
    borderDangerAInteractiveLarge: string;
    borderDangerAInteractiveHover: string;
    borderDangerAInteractiveHoverLarge: string;
    borderDangerAFocus: string;
    borderDangerASolid: string;
    borderDangerASolidLarge: string;
  };
  shadow: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
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
  const backgroundColor = {
    neutral: {
      neutralSubtle: colorPalette.neutral[1],
      neutralSubtleSecondary: colorPalette.neutral[2],
      neutralComponent: colorPalette.neutral[3],
      neutralComponentHover: colorPalette.neutral[4],
      neutralComponentActive: colorPalette.neutral[5],
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
      neutralAComponentHover: colorPalette.neutralA[4],
      neutralAComponentActive: colorPalette.neutralA[5],
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
      primaryComponentHover: colorPalette.primary[4],
      primaryComponentActive: colorPalette.primary[5],
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
      primaryAComponentHover: colorPalette.primaryA[4],
      primaryAComponentActive: colorPalette.primaryA[5],
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
      successComponentHover: colorPalette.success[4],
      successComponentActive: colorPalette.success[5],
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
      successAComponentHover: colorPalette.successA[4],
      successAComponentActive: colorPalette.successA[5],
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
      infoComponentHover: colorPalette.info[4],
      infoComponentActive: colorPalette.info[5],
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
      infoAComponentHover: colorPalette.infoA[4],
      infoAComponentActive: colorPalette.infoA[5],
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
      warningComponentHover: colorPalette.warning[4],
      warningComponentActive: colorPalette.warning[5],
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
      warningAComponentHover: colorPalette.warningA[4],
      warningAComponentActive: colorPalette.warningA[5],
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
      dangerComponentHover: colorPalette.danger[4],
      dangerComponentActive: colorPalette.danger[5],
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
      dangerAComponentHover: colorPalette.dangerA[4],
      dangerAComponentActive: colorPalette.dangerA[5],
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
      neutralSolid: colorPalette.neutral[9],
    },
    neutralA: {
      neutralA: colorPalette.neutralA[6],
      neutralAInteractive: colorPalette.neutralA[7],
      neutralAInteractiveHover: colorPalette.neutralA[8],
      neutralAFocus: colorPalette.neutralA[7],
      neutralASolid: colorPalette.neutralA[9],
    },
    primary: {
      primary: colorPalette.primary[6],
      primaryInteractive: colorPalette.primary[7],
      primaryInteractiveHover: colorPalette.primary[8],
      primaryFocus: colorPalette.primary[7],
      primarySolid: colorPalette.primary[9],
    },
    primaryA: {
      primaryA: colorPalette.primaryA[6],
      primaryAInteractive: colorPalette.primaryA[7],
      primaryAInteractiveHover: colorPalette.primaryA[8],
      primaryAFocus: colorPalette.primaryA[7],
      primaryASolid: colorPalette.primaryA[9],
    },
    success: {
      success: colorPalette.success[6],
      successInteractive: colorPalette.success[7],
      successInteractiveHover: colorPalette.success[8],
      successFocus: colorPalette.success[7],
      successSolid: colorPalette.success[9],
    },
    sucessA: {
      successA: colorPalette.successA[6],
      successAInteractive: colorPalette.successA[7],
      successAInteractiveHover: colorPalette.successA[8],
      successAFocus: colorPalette.successA[7],
      successASolid: colorPalette.successA[9],
    },
    info: {
      info: colorPalette.info[6],
      infoInteractive: colorPalette.info[7],
      infoInteractiveHover: colorPalette.info[8],
      infoFocus: colorPalette.info[7],
      infoSolid: colorPalette.info[9],
    },
    infoA: {
      infoA: colorPalette.infoA[6],
      infoAInteractive: colorPalette.infoA[7],
      infoAInteractiveHover: colorPalette.infoA[8],
      infoAFocus: colorPalette.infoA[7],
      infoASolid: colorPalette.infoA[9],
    },
    warning: {
      warning: colorPalette.warning[6],
      warningInteractive: colorPalette.warning[7],
      warningInteractiveHover: colorPalette.warning[8],
      warningFocus: colorPalette.warning[7],
      warningSolid: colorPalette.warning[9],
    },
    warningA: {
      warningA: colorPalette.warningA[6],
      warningAInteractive: colorPalette.warningA[7],
      warningAInteractiveHover: colorPalette.warningA[8],
      warningAFocus: colorPalette.warningA[7],
      warningASolid: colorPalette.warningA[9],
    },
    danger: {
      danger: colorPalette.danger[6],
      dangerInteractive: colorPalette.danger[7],
      dangerInteractiveHover: colorPalette.danger[8],
      dangerFocus: colorPalette.danger[7],
      dangerSolid: colorPalette.danger[9],
    },
    dangerA: {
      dangerA: colorPalette.dangerA[6],
      dangerAInteractive: colorPalette.dangerA[7],
      dangerAInteractiveHover: colorPalette.dangerA[8],
      dangerAFocus: colorPalette.dangerA[7],
      dangerASolid: colorPalette.dangerA[9],
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
      borderNeutralSolid: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutral.neutralSolid}`,
      borderNeutralSolidLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutral.neutralSolid}`,
    },
    neutralA: {
      borderNeutralA: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutralA.neutralA}`,
      borderNeutralALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutralA.neutralA}`,
      borderNeutralAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutralA.neutralAInteractive}`,
      borderNeutralAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutralA.neutralAInteractive}`,
      borderNeutralAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutralA.neutralAInteractiveHover}`,
      borderNeutralAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutralA.neutralAInteractiveHover}`,
      borderNeutralAFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.neutralA.neutralAFocus}`,
      borderNeutralASolid: `0 0 0 ${tokens.border.width.standard} ${borderColor.neutralA.neutralASolid}`,
      borderNeutralASolidLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.neutralA.neutralASolid}`,
    },
    primary: {
      borderPrimary: `0 0 0 ${tokens.border.width.standard} ${borderColor.primary.primary}`,
      borderPrimaryLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primary.primary}`,
      borderPrimaryInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.primary.primaryInteractive}`,
      borderPrimaryInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primary.primaryInteractive}`,
      borderPrimaryInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.primary.primaryInteractiveHover}`,
      borderPrimaryInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primary.primaryInteractiveHover}`,
      borderPrimaryFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.primary.primaryFocus}`,
      borderPrimarySolid: `0 0 0 ${tokens.border.width.standard} ${borderColor.primary.primarySolid}`,
      borderPrimarySolidLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primary.primarySolid}`,
    },
    primaryA: {
      borderPrimaryA: `0 0 0 ${tokens.border.width.standard} ${borderColor.primaryA.primaryA}`,
      borderPrimaryALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primaryA.primaryA}`,
      borderPrimaryAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.primaryA.primaryAInteractive}`,
      borderPrimaryAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primaryA.primaryAInteractive}`,
      borderPrimaryAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.primaryA.primaryAInteractiveHover}`,
      borderPrimaryAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primaryA.primaryAInteractiveHover}`,
      borderPrimaryAFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.primaryA.primaryAFocus}`,
      borderPrimaryASolid: `0 0 0 ${tokens.border.width.standard} ${borderColor.primaryA.primaryASolid}`,
      borderPrimaryASolidLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.primaryA.primaryASolid}`,
    },
    success: {
      borderSuccess: `0 0 0 ${tokens.border.width.standard} ${borderColor.success.success}`,
      borderSuccessLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.success.success}`,
      borderSuccessInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.success.successInteractive}`,
      borderSuccessInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.success.successInteractive}`,
      borderSuccessInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.success.successInteractiveHover}`,
      borderSuccessInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.success.successInteractiveHover}`,
      borderSuccessFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.success.successFocus}`,
      borderSuccessSolid: `0 0 0 ${tokens.border.width.standard} ${borderColor.success.successSolid}`,
      borderSuccessSolidLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.success.successSolid}`,
    },
    successA: {
      borderSuccessA: `0 0 0 ${tokens.border.width.standard} ${borderColor.sucessA.successA}`,
      borderSuccessALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.sucessA.successA}`,
      borderSuccessAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.sucessA.successAInteractive}`,
      borderSuccessAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.sucessA.successAInteractive}`,
      borderSuccessAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.sucessA.successAInteractiveHover}`,
      borderSuccessAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.sucessA.successAInteractiveHover}`,
      borderSuccessAFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.sucessA.successAFocus}`,
      borderSuccessASolid: `0 0 0 ${tokens.border.width.standard} ${borderColor.sucessA.successASolid}`,
      borderSuccessASolidLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.sucessA.successASolid}`,
    },
    info: {
      borderInfo: `0 0 0 ${tokens.border.width.standard} ${borderColor.info.info}`,
      borderInfoLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.info.info}`,
      borderInfoInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.info.infoInteractive}`,
      borderInfoInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.info.infoInteractive}`,
      borderInfoInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.info.infoInteractiveHover}`,
      borderInfoInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.info.infoInteractiveHover}`,
      borderInfoFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.info.infoFocus}`,
      borderInfoSolid: `0 0 0 ${tokens.border.width.standard} ${borderColor.info.infoSolid}`,
      borderInfoSolidLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.info.infoSolid}`,
    },
    infoA: {
      borderInfoA: `0 0 0 ${tokens.border.width.standard} ${borderColor.infoA.infoA}`,
      borderInfoALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.infoA.infoA}`,
      borderInfoAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.infoA.infoAInteractive}`,
      borderInfoAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.infoA.infoAInteractive}`,
      borderInfoAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.infoA.infoAInteractiveHover}`,
      borderInfoAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.infoA.infoAInteractiveHover}`,
      borderInfoAFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.infoA.infoAFocus}`,
      borderInfoASolid: `0 0 0 ${tokens.border.width.standard} ${borderColor.infoA.infoASolid}`,
      borderInfoASolidLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.infoA.infoASolid}`,
    },
    warning: {
      borderWarning: `0 0 0 ${tokens.border.width.standard} ${borderColor.warning.warning}`,
      borderWarningLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warning.warning}`,
      borderWarningInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.warning.warningInteractive}`,
      borderWarningInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warning.warningInteractive}`,
      borderWarningInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.warning.warningInteractiveHover}`,
      borderWarningInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warning.warningInteractiveHover}`,
      borderWarningFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.warning.warningFocus}`,
      borderWarningSolid: `0 0 0 ${tokens.border.width.standard} ${borderColor.warning.warningSolid}`,
      borderWarningSolidLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warning.warningSolid}`,
    },
    warningA: {
      borderWarningA: `0 0 0 ${tokens.border.width.standard} ${borderColor.warningA.warningA}`,
      borderWarningALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warningA.warningA}`,
      borderWarningAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.warningA.warningAInteractive}`,
      borderWarningAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warningA.warningAInteractive}`,
      borderWarningAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.warningA.warningAInteractiveHover}`,
      borderWarningAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warningA.warningAInteractiveHover}`,
      borderWarningAFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.warningA.warningAFocus}`,
      borderWarningASolid: `0 0 0 ${tokens.border.width.standard} ${borderColor.warningA.warningASolid}`,
      borderWarningASolidLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.warningA.warningASolid}`,
    },
    danger: {
      borderDanger: `0 0 0 ${tokens.border.width.standard} ${borderColor.danger.danger}`,
      borderDangerLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.danger.danger}`,
      borderDangerInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.danger.dangerInteractive}`,
      borderDangerInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.danger.dangerInteractive}`,
      borderDangerInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.danger.dangerInteractiveHover}`,
      borderDangerInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.danger.dangerInteractiveHover}`,
      borderDangerFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.danger.dangerFocus}`,
      borderDangerSolid: `0 0 0 ${tokens.border.width.standard} ${borderColor.danger.dangerSolid}`,
      borderDangerSolidLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.danger.dangerSolid}`,
    },
    dangerA: {
      borderDangerA: `0 0 0 ${tokens.border.width.standard} ${borderColor.dangerA.dangerA}`,
      borderDangerALarge: `0 0 0 ${tokens.border.width.large} ${borderColor.dangerA.dangerA}`,
      borderDangerAInteractive: `0 0 0 ${tokens.border.width.standard} ${borderColor.dangerA.dangerAInteractive}`,
      borderDangerAInteractiveLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.dangerA.dangerAInteractive}`,
      borderDangerAInteractiveHover: `0 0 0 ${tokens.border.width.standard} ${borderColor.dangerA.dangerAInteractiveHover}`,
      borderDangerAInteractiveHoverLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.dangerA.dangerAInteractiveHover}`,
      borderDangerAFocus: `0 0 0 ${tokens.focusRingSize} ${borderColor.dangerA.dangerAFocus}`,
      borderDangerASolid: `0 0 0 ${tokens.border.width.standard} ${borderColor.dangerA.dangerASolid}`,
      borderDangerASolidLarge: `0 0 0 ${tokens.border.width.large} ${borderColor.dangerA.dangerASolid}`,
    },
    shadow: {
      none: '0 0 #0000',
      xs: `0 1px 2px 0 ${colorPalette.shadow[4]}`,
      sm: `0 1px 3px 0 ${colorPalette.shadow[5]}, 0 1px 2px -1px ${colorPalette.shadow[6]}`,
      md: `0 4px 6px -1px ${colorPalette.shadow[5]}, 0 2px 4px -2px ${colorPalette.shadow[6]}`,
      lg: `0 10px 15px -3px ${colorPalette.shadow[5]}, 0 4px 6px -4px ${colorPalette.shadow[6]}`,
      xl: `0 20px 25px -5px ${colorPalette.shadow[5]}, 0 8px 10px -6px ${colorPalette.shadow[6]}`,
      '2xl': `0 25px 50px -12px ${colorPalette.shadow[8]}`,
      inner: `inset 0 2px 4px 0 ${colorPalette.shadow[4]}`,
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

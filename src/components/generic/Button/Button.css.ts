import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { atoms, vars } from '@cubeartisan/cubeartisan/styles';

export const buttonRecipe = recipe({
  base: atoms({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBlock: 1,
    paddingInline: 2,
    borderRadius: 'md',
  }),
  variants: {
    size: {
      xs: atoms({ text: 'xs' }),
      sm: atoms({ text: 'sm' }),
      md: atoms({ text: 'base' }),
      lg: atoms({ text: 'lg' }),
      xl: atoms({ text: 'xl' }),
    },
    color: {
      neutral: atoms({
        backgroundColor: {
          default: 'neutralComponent',
          hover: 'neutralComonentHover',
          active: 'neutralComonentActive',
        },
        boxShadow: {
          default: 'borderNeutralInteractive',
          hover: 'borderNeutralInteractiveHover',
        },
      }),
      neutralSolid: atoms({
        backgroundColor: {
          default: 'neutralSolid',
          hover: 'neutralSolidActive',
          active: 'neutralSolidActive',
        },
      }),
      primary: atoms({
        backgroundColor: {
          default: 'primaryComponent',
          hover: 'primaryComonentHover',
          active: 'primaryComonentActive',
        },
        boxShadow: {
          default: 'borderPrimaryInteractive',
          hover: 'borderPrimaryInteractiveHover',
        },
      }),
      primarySolid: atoms({
        backgroundColor: {
          default: 'primarySolid',
          hover: 'primarySolidActive',
          active: 'primarySolidActive',
        },
      }),
      info: atoms({
        backgroundColor: {
          default: 'infoComponent',
          hover: 'infoComonentHover',
          active: 'infoComonentActive',
        },
        boxShadow: {
          default: 'borderInfoInteractive',
          hover: 'borderInfoInteractiveHover',
        },
      }),
      infoSolid: atoms({
        backgroundColor: {
          default: 'infoSolid',
          hover: 'infoSolidActive',
          active: 'infoSolidActive',
        },
      }),
      success: atoms({
        backgroundColor: {
          default: 'successComponent',
          hover: 'successComonentHover',
          active: 'successComonentActive',
        },
        boxShadow: {
          default: 'borderSuccessInteractive',
          hover: 'borderSuccessInteractiveHover',
        },
      }),
      successSolid: atoms({
        backgroundColor: {
          default: 'successSolid',
          hover: 'successSolidActive',
          active: 'successSolidActive',
        },
      }),
      warning: atoms({
        backgroundColor: {
          default: 'warningComponent',
          hover: 'warningComonentHover',
          active: 'warningComonentActive',
        },
        boxShadow: {
          default: 'borderWarningInteractive',
          hover: 'borderWarningInteractiveHover',
        },
      }),
      warningSolid: [
        atoms({
          backgroundColor: {
            default: 'warningSolid',
            hover: 'warningSolidActive',
            active: 'warningSolidActive',
          },
        }),
        { color: vars.staticColor.grayLight[12] },
      ],
      danger: atoms({
        backgroundColor: {
          default: 'dangerComponent',
          hover: 'dangerComonentHover',
          active: 'dangerComonentActive',
        },
        boxShadow: {
          default: 'borderDangerInteractive',
          hover: 'borderDangerInteractiveHover',
        },
      }),
      dangerSolid: atoms({
        backgroundColor: {
          default: 'dangerSolid',
          hover: 'dangerSolidActive',
          active: 'dangerSolidActive',
        },
      }),
    },
  },
});

export type ButtonVariants = RecipeVariants<typeof buttonRecipe>;

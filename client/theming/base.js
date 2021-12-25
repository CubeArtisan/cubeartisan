const defaultTheme = (palette) => ({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
    unit: 'px',
  },
  direction: 'ltr',
  components: {},
  shape: {
    borderRadius: 10,
  },
  props: {
    MuiTooltip: {
      arrow: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 56,
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: 48,
      },
      '@media (min-width:600px)': {
        minHeight: 64,
      },
    },
  },
  shadows: [
    'none',
    `0px 2px 1px -1px ${palette.shadow.full},0px 1px 1px 0px ${palette.shadow.partial},0px 1px 3px 0px ${palette.shadow.low}`,
    `0px 3px 1px -2px ${palette.shadow.full},0px 2px 2px 0px ${palette.shadow.partial},0px 1px 5px 0px ${palette.shadow.low}`,
    `0px 3px 3px -2px ${palette.shadow.full},0px 3px 4px 0px ${palette.shadow.partial},0px 1px 8px 0px ${palette.shadow.low}`,
    `0px 2px 4px -1px ${palette.shadow.full},0px 4px 5px 0px ${palette.shadow.partial},0px 1px 10px 0px ${palette.shadow.low}`,
    `0px 3px 5px -1px ${palette.shadow.full},0px 5px 8px 0px ${palette.shadow.partial},0px 1px 14px 0px ${palette.shadow.low}`,
    `0px 3px 5px -1px ${palette.shadow.full},0px 6px 10px 0px ${palette.shadow.partial},0px 1px 18px 0px ${palette.shadow.low}`,
    `0px 4px 5px -2px ${palette.shadow.full},0px 7px 10px 1px ${palette.shadow.partial},0px 2px 16px 1px ${palette.shadow.low}`,
    `0px 5px 5px -3px ${palette.shadow.full},0px 8px 10px 1px ${palette.shadow.partial},0px 3px 14px 2px ${palette.shadow.low}`,
    `0px 5px 6px -3px ${palette.shadow.full},0px 9px 12px 1px ${palette.shadow.partial},0px 3px 16px 2px ${palette.shadow.low}`,
    `0px 6px 6px -3px ${palette.shadow.full},0px 10px 14px 1px ${palette.shadow.partial},0px 4px 18px 3px ${palette.shadow.low}`,
    `0px 6px 7px -4px ${palette.shadow.full},0px 11px 15px 1px ${palette.shadow.partial},0px 4px 20px 3px ${palette.shadow.low}`,
    `0px 7px 8px -4px ${palette.shadow.full},0px 12px 17px 2px ${palette.shadow.partial},0px 5px 22px 4px ${palette.shadow.low}`,
    `0px 7px 8px -4px ${palette.shadow.full},0px 13px 19px 2px ${palette.shadow.partial},0px 5px 24px 4px ${palette.shadow.low}`,
    `0px 7px 9px -4px ${palette.shadow.full},0px 14px 21px 2px ${palette.shadow.partial},0px 5px 26px 4px ${palette.shadow.low}`,
    `0px 8px 9px -5px ${palette.shadow.full},0px 15px 22px 2px ${palette.shadow.partial},0px 6px 28px 5px ${palette.shadow.low}`,
    `0px 8px 10px -5px ${palette.shadow.full},0px 16px 24px 2px ${palette.shadow.partial},0px 6px 30px 5px ${palette.shadow.low}`,
    `0px 8px 11px -5px ${palette.shadow.full},0px 17px 26px 2px ${palette.shadow.partial},0px 6px 32px 5px ${palette.shadow.low}`,
    `0px 9px 11px -5px ${palette.shadow.full},0px 18px 28px 2px ${palette.shadow.partial},0px 7px 34px 6px ${palette.shadow.low}`,
    `0px 9px 12px -6px ${palette.shadow.full},0px 19px 29px 2px ${palette.shadow.partial},0px 7px 36px 6px ${palette.shadow.low}`,
    `0px 10px 13px -6px ${palette.shadow.full},0px 20px 31px 3px ${palette.shadow.partial},0px 8px 38px 7px ${palette.shadow.low}`,
    `0px 10px 13px -6px ${palette.shadow.full},0px 21px 33px 3px ${palette.shadow.partial},0px 8px 40px 7px ${palette.shadow.low}`,
    `0px 10px 14px -6px ${palette.shadow.full},0px 22px 35px 3px ${palette.shadow.partial},0px 8px 42px 7px ${palette.shadow.low}`,
    `0px 11px 14px -7px ${palette.shadow.full},0px 23px 36px 3px ${palette.shadow.partial},0px 9px 44px 8px ${palette.shadow.low}`,
    `0px 11px 15px -7px ${palette.shadow.full},0px 24px 38px 3px ${palette.shadow.partial},0px 9px 46px 8px ${palette.shadow.low}`,
  ],
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
});

export default defaultTheme;

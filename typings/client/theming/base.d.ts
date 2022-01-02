export default defaultTheme;
declare function defaultTheme(palette: any): {
    breakpoints: {
        keys: string[];
        values: {
            xs: number;
            sm: number;
            md: number;
            lg: number;
            xl: number;
        };
        unit: string;
    };
    direction: string;
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: any;
                };
            };
        };
    };
    shape: {
        borderRadius: number;
    };
    props: {
        MuiTooltip: {
            arrow: boolean;
        };
    };
    mixins: {
        toolbar: {
            minHeight: number;
            '@media (min-width:0px) and (orientation: landscape)': {
                minHeight: number;
            };
            '@media (min-width:600px)': {
                minHeight: number;
            };
        };
    };
    shadows: string[];
    zIndex: {
        mobileStepper: number;
        speedDial: number;
        appBar: number;
        drawer: number;
        modal: number;
        snackbar: number;
        tooltip: number;
    };
};
//# sourceMappingURL=base.d.ts.map
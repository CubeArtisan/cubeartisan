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
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: string;
                };
            };
        };
        MuiSelect: {
            styleOverrides: {
                select: {
                    padding: string;
                    marginTop: number;
                };
            };
        };
    };
    spacing: number;
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
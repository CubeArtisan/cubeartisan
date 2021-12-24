export default defaultTheme;
declare namespace defaultTheme {
    namespace breakpoints {
        const keys: string[];
        namespace values {
            const xs: number;
            const sm: number;
            const md: number;
            const lg: number;
            const xl: number;
        }
        const unit: string;
    }
    const direction: string;
    const components: {};
    namespace shape {
        const borderRadius: number;
    }
    namespace props {
        namespace MuiTooltip {
            const arrow: boolean;
        }
    }
    namespace mixins {
        const toolbar: {
            minHeight: number;
            '@media (min-width:0px) and (orientation: landscape)': {
                minHeight: number;
            };
            '@media (min-width:600px)': {
                minHeight: number;
            };
        };
    }
    const shadows: string[];
    namespace zIndex {
        const mobileStepper: number;
        const speedDial: number;
        const appBar: number;
        const drawer: number;
        const modal: number;
        const snackbar: number;
        const tooltip: number;
    }
}
//# sourceMappingURL=base.d.ts.map
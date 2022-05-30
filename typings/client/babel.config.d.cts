declare function _exports(api: any): {
    presets: ((string | {
        targets: {
            esmodules: boolean;
        };
        loose: boolean;
        useBuiltIns: string;
        corejs: {
            version: string;
            proposals: boolean;
        };
        shippedProposals: boolean;
        modules: string | boolean;
    })[] | (string | {
        runtime: string;
    })[])[];
    plugins: (string | (string | {
        modules: string[];
    })[])[];
};
export = _exports;
//# sourceMappingURL=babel.config.d.cts.map
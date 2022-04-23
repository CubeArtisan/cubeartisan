declare function _exports(api: any): {
    presets: (string | (string | {
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
        modules: string;
    })[])[];
    plugins: (string | (string | {
        modules: string[];
    })[])[];
};
export = _exports;
//# sourceMappingURL=babel.config.d.cts.map
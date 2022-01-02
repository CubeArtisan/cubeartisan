declare function _exports(api: any): {
    presets: (string | (string | {
        targets: {
            node: string;
        };
        useBuiltIns: string;
        corejs: {
            version: string;
            proposals: boolean;
        };
        shippedProposals: boolean;
        modules: string;
    })[])[];
    plugins: string[];
    sourceMaps: string;
};
export = _exports;
//# sourceMappingURL=babel.config.d.cts.map
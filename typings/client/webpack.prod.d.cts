export = clientConfig;
declare const clientConfig: {
    optimization: {
        splitChunks: {
            chunks: string;
        };
        runtimeChunk: string;
        usedExports: boolean;
    };
    experiments: {
        asyncWebAssembly: boolean;
    };
    module: {
        rules: ({
            test: RegExp;
            type: string;
            exclude: RegExp;
            use: {
                loader: string;
                options: {
                    configFile: string;
                };
            };
            sideEffects?: never;
        } | {
            test: RegExp;
            type: string;
            exclude?: never;
            use?: never;
            sideEffects?: never;
        } | {
            test: RegExp;
            sideEffects: boolean;
            use: string[];
            type?: never;
            exclude?: never;
        })[];
    };
    resolve: {
        alias: {
            '@cubeartisan/client': string;
            '@cubeartisan/server': string;
            'react/jsx-dev-runtime': string;
            'react/jsx-runtime': string;
        };
    };
};
//# sourceMappingURL=webpack.prod.d.cts.map
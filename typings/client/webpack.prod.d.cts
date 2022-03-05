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
            sideEffects?: undefined;
        } | {
            test: RegExp;
            type: string;
            exclude?: undefined;
            use?: undefined;
            sideEffects?: undefined;
        } | {
            test: RegExp;
            sideEffects: boolean;
            use: string[];
            type?: undefined;
            exclude?: undefined;
        })[];
    };
    resolve: {
        alias: {
            '@cubeartisan/client': string;
            '@cubeartisan/server': string;
        };
    };
};
//# sourceMappingURL=webpack.prod.d.cts.map
export namespace clientConfig {
    namespace optimization {
        namespace splitChunks {
            const chunks: string;
        }
        const runtimeChunk: string;
        const usedExports: boolean;
    }
    namespace experiments {
        const asyncWebAssembly: boolean;
    }
    namespace module {
        const rules: ({
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
    }
    namespace resolve {
        const alias: {
            '@cubeartisan/client': string;
            '@cubeartisan/server': string;
            'react/jsx-dev-runtime': string;
            'react/jsx-runtime': string;
        };
    }
}
//# sourceMappingURL=webpack.common.d.cts.map
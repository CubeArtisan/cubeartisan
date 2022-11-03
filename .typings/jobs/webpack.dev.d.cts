export namespace serverConfig {
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
        } | {
            test: RegExp;
            use: string[];
            type?: never;
            exclude?: never;
        })[];
    }
    const devtool: string;
    namespace resolve {
        const alias: {
            '@cubeartisan/client': string;
            '@cubeartisan/server': string;
            '@cubeartisan/jobs': string;
        };
    }
    namespace performance {
        const hints: string;
    }
}
//# sourceMappingURL=webpack.dev.d.cts.map
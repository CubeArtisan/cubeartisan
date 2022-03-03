export default withLoading;
declare function withLoading(Tag: any, handlers: any): {
    ({ loading, spinnerSize, opacity, ...props }: {
        [x: string]: any;
        loading: any;
        spinnerSize: any;
        opacity: any;
    }): JSX.Element;
    propTypes: {
        loading: any;
        opacity: any;
        spinnerSize: any;
    };
    defaultProps: {
        loading: any;
        spinnerSize: any;
        opacity: number;
    };
    displayName: string;
};
//# sourceMappingURL=WithLoading.d.ts.map
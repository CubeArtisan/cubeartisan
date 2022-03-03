export default ErrorBoundary;
declare class ErrorBoundary {
    static getDerivedStateFromError(error: any): {
        hasError: boolean;
        error: any;
        stack: any;
    };
    constructor(props: any);
    state: {
        hasError: boolean;
        error: string;
        stack: string;
    };
    componentDidCatch(error: any, errorInfo: any): void;
    render(): any;
}
declare namespace ErrorBoundary {
    namespace propTypes {
        const children: any;
        const className: any;
    }
    namespace defaultProps {
        const className_1: any;
        export { className_1 as className };
    }
}
//# sourceMappingURL=ErrorBoundary.d.ts.map
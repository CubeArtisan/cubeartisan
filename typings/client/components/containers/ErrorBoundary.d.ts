export default ErrorBoundary;
declare class ErrorBoundary extends Component<any, any, any> {
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
}
declare namespace ErrorBoundary {
    namespace propTypes {
        const children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        const className: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const className_1: null;
        export { className_1 as className };
    }
}
import { Component } from "react";
import PropTypes from "prop-types";
//# sourceMappingURL=ErrorBoundary.d.ts.map
export default withLoading;
declare function withLoading(Tag: any, handlers: any): {
    ({ loading, spinnerSize, opacity, ...props }: {
        [x: string]: any;
        loading: any;
        spinnerSize: any;
        opacity: any;
    }): JSX.Element;
    propTypes: {
        loading: PropTypes.Requireable<boolean>;
        opacity: PropTypes.Requireable<number>;
        spinnerSize: PropTypes.Requireable<string>;
    };
    defaultProps: {
        loading: null;
        spinnerSize: undefined;
        opacity: number;
    };
    displayName: string;
};
import PropTypes from "prop-types";
//# sourceMappingURL=WithLoading.d.ts.map
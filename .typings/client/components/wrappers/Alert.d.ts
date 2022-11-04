export default Alert;
declare function Alert({ color, ...props }: {
    [x: string]: any;
    color: any;
}): JSX.Element;
declare namespace Alert {
    namespace propTypes {
        const color: PropTypes.Validator<string>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Alert.d.ts.map
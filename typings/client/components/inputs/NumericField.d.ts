export default NumericField;
declare function NumericField({ name, humanName, placeholder, valueOp, value, onChange, ...props }: {
    [x: string]: any;
    name: any;
    humanName: any;
    placeholder: any;
    valueOp: any;
    value: any;
    onChange: any;
}): JSX.Element;
declare namespace NumericField {
    namespace propTypes {
        const name: PropTypes.Validator<string>;
        const humanName: PropTypes.Validator<string>;
        const placeholder: PropTypes.Validator<string>;
        const valueOp: PropTypes.Validator<string>;
        const value: PropTypes.Validator<string>;
        const onChange: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=NumericField.d.ts.map
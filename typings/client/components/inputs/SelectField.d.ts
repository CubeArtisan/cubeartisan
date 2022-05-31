export default SelectField;
declare function SelectField({ name, humanName, value, onChange, options, ...props }: {
    [x: string]: any;
    name: any;
    humanName: any;
    value: any;
    onChange: any;
    options: any;
}): JSX.Element;
declare namespace SelectField {
    namespace propTypes {
        const name: PropTypes.Validator<string>;
        const humanName: PropTypes.Validator<string>;
        const value: PropTypes.Validator<string>;
        const onChange: PropTypes.Validator<(...args: any[]) => any>;
        const options: PropTypes.Validator<(string | null | undefined)[]>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=SelectField.d.ts.map
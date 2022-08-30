export default ColorChecksControl;
declare function ColorChecksControl({ colorless, prefix, values, onChange }: {
    colorless: any;
    prefix: any;
    values: any;
    onChange: any;
}): JSX.Element;
declare namespace ColorChecksControl {
    namespace propTypes {
        const colorless: PropTypes.Requireable<boolean>;
        const prefix: PropTypes.Requireable<string>;
        const values: PropTypes.Validator<NonNullable<PropTypes.InferProps<{}>>>;
        const onChange: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const colorless_1: boolean;
        export { colorless_1 as colorless };
        const prefix_1: string;
        export { prefix_1 as prefix };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=ColorCheck.d.ts.map
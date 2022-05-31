export default TextEntry;
declare function TextEntry({ name, value, onChange, maxLength }: {
    name: any;
    value: any;
    onChange: any;
    maxLength: any;
}): JSX.Element;
declare namespace TextEntry {
    namespace propTypes {
        const name: PropTypes.Requireable<string>;
        const value: PropTypes.Validator<string>;
        const onChange: PropTypes.Validator<(...args: any[]) => any>;
        const maxLength: PropTypes.Requireable<number>;
    }
    namespace defaultProps {
        const name_1: string;
        export { name_1 as name };
        const maxLength_1: number;
        export { maxLength_1 as maxLength };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=TextEntry.d.ts.map
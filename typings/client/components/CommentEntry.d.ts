export default CommentEntry;
declare function CommentEntry({ submit, expanded, toggle, defaultValue }: {
    submit: any;
    expanded: any;
    toggle: any;
    defaultValue: any;
}): JSX.Element;
declare namespace CommentEntry {
    namespace propTypes {
        const submit: PropTypes.Validator<(...args: any[]) => any>;
        const expanded: PropTypes.Validator<boolean>;
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
        const defaultValue: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const defaultValue_1: string;
        export { defaultValue_1 as defaultValue };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CommentEntry.d.ts.map
export default TextBadge;
declare function TextBadge({ name, children, sx }: {
    name: any;
    children: any;
    sx: any;
}): JSX.Element;
declare namespace TextBadge {
    namespace propTypes {
        const name: PropTypes.Validator<string>;
        const children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        const sx: PropTypes.Requireable<PropTypes.InferProps<{}>>;
    }
    namespace defaultProps {
        const sx_1: {};
        export { sx_1 as sx };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=TextBadge.d.ts.map
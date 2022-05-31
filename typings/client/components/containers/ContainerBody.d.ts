export default ContainerBody;
declare function ContainerBody({ children, sx }: {
    children: any;
    sx: any;
}): JSX.Element;
declare namespace ContainerBody {
    namespace propTypes {
        const children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        const sx: PropTypes.Requireable<PropTypes.InferProps<{}>>;
    }
    namespace defaultProps {
        const sx_1: {};
        export { sx_1 as sx };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=ContainerBody.d.ts.map
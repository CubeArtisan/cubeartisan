export default ButtonLink;
declare function ButtonLink({ children, outline, color, block, ...props }: {
    [x: string]: any;
    children: any;
    outline: any;
    color: any;
    block: any;
}): JSX.Element;
declare namespace ButtonLink {
    namespace propTypes {
        const children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        const outline: PropTypes.Requireable<boolean>;
        const color: PropTypes.Requireable<string>;
        const block: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const outline_1: boolean;
        export { outline_1 as outline };
        const color_1: string;
        export { color_1 as color };
        const block_1: boolean;
        export { block_1 as block };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=ButtonLink.d.ts.map
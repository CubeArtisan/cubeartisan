export default TextBadge;
declare function TextBadge({ name, className, children, fill }: {
    name: any;
    className: any;
    children: any;
    fill: any;
}): JSX.Element;
declare namespace TextBadge {
    namespace propTypes {
        const name: PropTypes.Requireable<string>;
        const className: PropTypes.Requireable<string>;
        const children: PropTypes.Validator<PropTypes.ReactNodeLike>;
        const fill: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const name_1: string;
        export { name_1 as name };
        const className_1: any;
        export { className_1 as className };
        const fill_1: boolean;
        export { fill_1 as fill };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=TextBadge.d.ts.map
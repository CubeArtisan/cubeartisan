export default Accordion;
declare function Accordion({ defaultExpand, children, title }: {
    defaultExpand: any;
    children: any;
    title: any;
}): JSX.Element;
declare namespace Accordion {
    namespace propTypes {
        const defaultExpand: PropTypes.Requireable<boolean>;
        const children: PropTypes.Validator<PropTypes.ReactNodeLike>;
        const title: PropTypes.Validator<string>;
    }
    namespace defaultProps {
        const defaultExpand_1: boolean;
        export { defaultExpand_1 as defaultExpand };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Accordion.d.ts.map
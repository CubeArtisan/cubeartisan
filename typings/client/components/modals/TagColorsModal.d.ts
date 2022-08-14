export default TagColorsModal;
export type TagColor = import('@cubeartisan/client/components/contexts/TagContext.js').TagColor;
declare function TagColorsModal({ canEdit, isOpen, toggle }: {
    canEdit: any;
    isOpen: any;
    toggle: any;
}): JSX.Element;
declare namespace TagColorsModal {
    namespace propTypes {
        const canEdit: PropTypes.Requireable<boolean>;
        const isOpen: PropTypes.Requireable<boolean>;
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const canEdit_1: boolean;
        export { canEdit_1 as canEdit };
        const isOpen_1: boolean;
        export { isOpen_1 as isOpen };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=TagColorsModal.d.ts.map
export default GroupModal;
declare function GroupModal({ cubeID, canEdit, children, ...props }: {
    [x: string]: any;
    cubeID: any;
    canEdit: any;
    children: any;
}): JSX.Element;
declare namespace GroupModal {
    namespace propTypes {
        const cubeID: PropTypes.Validator<string>;
        const canEdit: PropTypes.Requireable<boolean>;
        const children: PropTypes.Validator<PropTypes.ReactNodeLike>;
    }
    namespace defaultProps {
        const canEdit_1: boolean;
        export { canEdit_1 as canEdit };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=GroupModal.d.ts.map
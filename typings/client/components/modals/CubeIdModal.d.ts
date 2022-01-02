export default CubeIdModal;
declare function CubeIdModal({ toggle, isOpen, shortID, fullID, alert }: {
    toggle: any;
    isOpen: any;
    shortID: any;
    fullID: any;
    alert: any;
}): JSX.Element;
declare namespace CubeIdModal {
    namespace propTypes {
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
        const isOpen: PropTypes.Validator<boolean>;
        const shortID: PropTypes.Validator<string>;
        const fullID: PropTypes.Validator<string>;
        const alert: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CubeIdModal.d.ts.map
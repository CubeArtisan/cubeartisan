export default CubeSettingsModal;
declare function CubeSettingsModal({ addAlert, onCubeUpdate, isOpen, toggle }: {
    addAlert: any;
    onCubeUpdate: any;
    isOpen: any;
    toggle: any;
}): JSX.Element;
declare namespace CubeSettingsModal {
    namespace propTypes {
        const addAlert: PropTypes.Validator<(...args: any[]) => any>;
        const onCubeUpdate: PropTypes.Validator<(...args: any[]) => any>;
        const isOpen: PropTypes.Validator<boolean>;
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CubeSettingsModal.d.ts.map
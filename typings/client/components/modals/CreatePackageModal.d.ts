export default CreatePackageModal;
declare function CreatePackageModal({ isOpen, toggle, onError, onSuccess }: {
    isOpen: any;
    toggle: any;
    onError: any;
    onSuccess: any;
}): JSX.Element;
declare namespace CreatePackageModal {
    namespace propTypes {
        const isOpen: PropTypes.Validator<boolean>;
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
        const onError: PropTypes.Validator<(...args: any[]) => any>;
        const onSuccess: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CreatePackageModal.d.ts.map
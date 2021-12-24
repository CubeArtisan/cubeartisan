export default ConfirmDeleteModal;
declare function ConfirmDeleteModal({ isOpen, toggle, text, submitDelete }: {
    isOpen: any;
    toggle: any;
    text: any;
    submitDelete: any;
}): JSX.Element;
declare namespace ConfirmDeleteModal {
    namespace propTypes {
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
        const submitDelete: PropTypes.Validator<(...args: any[]) => any>;
        const isOpen: PropTypes.Validator<boolean>;
        const text: PropTypes.Validator<string>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=ConfirmDeleteModal.d.ts.map
export default LinkModal;
declare function LinkModal({ link, isOpen, toggle }: {
    link: any;
    isOpen: any;
    toggle: any;
}): JSX.Element;
declare namespace LinkModal {
    namespace propTypes {
        const link: PropTypes.Validator<string>;
        const isOpen: PropTypes.Validator<boolean>;
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=LinkModal.d.ts.map
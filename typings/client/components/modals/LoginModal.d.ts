export default LoginModal;
declare function LoginModal({ isOpen, toggle, loginCallback }: {
    isOpen: any;
    toggle: any;
    loginCallback: any;
}): JSX.Element;
declare namespace LoginModal {
    namespace propTypes {
        const isOpen: PropTypes.Validator<boolean>;
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
        const loginCallback: PropTypes.Validator<string>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=LoginModal.d.ts.map
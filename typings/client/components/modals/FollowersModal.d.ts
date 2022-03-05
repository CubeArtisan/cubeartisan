export default FollowersModal;
declare function FollowersModal({ followers, isOpen, toggle }: {
    followers: any;
    isOpen: any;
    toggle: any;
}): JSX.Element;
declare namespace FollowersModal {
    namespace propTypes {
        const followers: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
        }>[]>;
        const isOpen: PropTypes.Validator<boolean>;
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=FollowersModal.d.ts.map
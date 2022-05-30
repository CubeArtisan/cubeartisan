export default CardModal;
declare function CardModal({ card, maybe, versions, versionsLoading, toggle, disabled, values, onChange, saveChanges, queueRemoveCard, updateTags, ...props }: {
    [x: string]: any;
    card: any;
    maybe: any;
    versions: any;
    versionsLoading: any;
    toggle: any;
    disabled: any;
    values: any;
    onChange: any;
    saveChanges: any;
    queueRemoveCard: any;
    updateTags: any;
}): JSX.Element;
declare namespace CardModal {
    namespace propTypes {
        const card: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            index: PropTypes.Requireable<number>;
            imgUrl: PropTypes.Requireable<string>;
            imgBackUrl: PropTypes.Requireable<string>;
            cardID: PropTypes.Validator<string>;
            colors: PropTypes.Requireable<string[]>;
            tags: PropTypes.Requireable<string[]>;
            details: PropTypes.Requireable<PropTypes.InferProps<{
                _id: PropTypes.Validator<string>;
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }>>;
        }>>;
        const maybe: PropTypes.Requireable<boolean>;
        const versions: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            index: PropTypes.Requireable<number>;
            imgUrl: PropTypes.Requireable<string>;
            imgBackUrl: PropTypes.Requireable<string>;
            cardID: PropTypes.Validator<string>;
            colors: PropTypes.Requireable<string[]>;
            tags: PropTypes.Requireable<string[]>;
            details: PropTypes.Requireable<PropTypes.InferProps<{
                _id: PropTypes.Validator<string>;
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }>>;
        }>[]>;
        const versionsLoading: PropTypes.Requireable<boolean>;
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
        const disabled: PropTypes.Requireable<boolean>;
        const values: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            index: PropTypes.Requireable<number>;
            imgUrl: PropTypes.Requireable<string>;
            imgBackUrl: PropTypes.Requireable<string>;
            cardID: PropTypes.Validator<string>;
            colors: PropTypes.Requireable<string[]>;
            tags: PropTypes.Requireable<string[]>;
            details: PropTypes.Requireable<PropTypes.InferProps<{
                _id: PropTypes.Validator<string>;
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }>>;
        }>>;
        const onChange: PropTypes.Validator<(...args: any[]) => any>;
        const saveChanges: PropTypes.Validator<(...args: any[]) => any>;
        const queueRemoveCard: PropTypes.Validator<(...args: any[]) => any>;
        const updateTags: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const disabled_1: boolean;
        export { disabled_1 as disabled };
        const maybe_1: boolean;
        export { maybe_1 as maybe };
        const versionsLoading_1: boolean;
        export { versionsLoading_1 as versionsLoading };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CardModal.d.ts.map
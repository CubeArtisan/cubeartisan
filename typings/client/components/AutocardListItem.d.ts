export default AutocardListItem;
declare function AutocardListItem({ card, noCardModal, inModal }: {
    card: any;
    noCardModal: any;
    inModal: any;
}): JSX.Element;
declare namespace AutocardListItem {
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
        const noCardModal: PropTypes.Requireable<boolean>;
        const inModal: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const noCardModal_1: boolean;
        export { noCardModal_1 as noCardModal };
        const inModal_1: boolean;
        export { inModal_1 as inModal };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=AutocardListItem.d.ts.map
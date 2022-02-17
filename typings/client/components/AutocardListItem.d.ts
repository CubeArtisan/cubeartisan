export default AutocardListItem;
declare function AutocardListItem({ card, noCardModal }: {
    card: any;
    noCardModal: any;
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
    }
    namespace defaultProps {
        const noCardModal_1: boolean;
        export { noCardModal_1 as noCardModal };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=AutocardListItem.d.ts.map
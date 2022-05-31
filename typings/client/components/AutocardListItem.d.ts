export default AutocardListItem;
declare function AutocardListItem({ card, noCardModal, children }: {
    card: any;
    noCardModal: any;
    children: any;
}): JSX.Element;
declare namespace AutocardListItem {
    namespace propTypes {
        const card: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            index: PropTypes.Requireable<number>;
            imgUrl: PropTypes.Requireable<string>;
            imgBackUrl: PropTypes.Requireable<string>;
            cardID: PropTypes.Validator<string>;
            colors: PropTypes.Requireable<(string | null | undefined)[]>;
            tags: PropTypes.Requireable<(string | null | undefined)[]>;
            details: PropTypes.Requireable<PropTypes.InferProps<{
                _id: PropTypes.Validator<string>;
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
                image_flip: PropTypes.Requireable<string>;
                image_small: PropTypes.Requireable<string>;
            }>>;
            addedTmsp: PropTypes.Requireable<string>;
        }>>;
        const noCardModal: PropTypes.Requireable<boolean>;
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    }
    namespace defaultProps {
        const noCardModal_1: boolean;
        export { noCardModal_1 as noCardModal };
        const children_1: null;
        export { children_1 as children };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=AutocardListItem.d.ts.map
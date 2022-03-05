export default TableView;
declare function TableView({ cards, rowTag, noGroupModal }: {
    cards: any;
    rowTag: any;
    noGroupModal: any;
}): JSX.Element;
declare namespace TableView {
    namespace propTypes {
        const cards: PropTypes.Validator<PropTypes.InferProps<{
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
        const rowTag: PropTypes.Requireable<string | ((...args: any[]) => any)>;
        const noGroupModal: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        export { AutocardListItem as rowTag };
        const noGroupModal_1: boolean;
        export { noGroupModal_1 as noGroupModal };
    }
}
import PropTypes from "prop-types";
import AutocardListItem from "@cubeartisan/client/components/AutocardListItem.js";
//# sourceMappingURL=TableView.d.ts.map
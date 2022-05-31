export default AutocardListGroup;
declare function AutocardListGroup({ cards, heading, sort, orderedSort, showOther, rowTag, noGroupModal }: {
    cards: any;
    heading: any;
    sort: any;
    orderedSort: any;
    showOther: any;
    rowTag: any;
    noGroupModal: any;
}): JSX.Element;
declare namespace AutocardListGroup {
    namespace propTypes {
        const cards: PropTypes.Validator<(PropTypes.InferProps<{
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
            }>>;
        }> | null | undefined)[]>;
        const rowTag: PropTypes.Requireable<string | ((...args: any[]) => any)>;
        const noGroupModal: PropTypes.Requireable<boolean>;
        const heading: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        const sort: PropTypes.Requireable<string>;
        const orderedSort: PropTypes.Requireable<string>;
        const showOther: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        export { AutocardListItem as rowTag };
        const noGroupModal_1: boolean;
        export { noGroupModal_1 as noGroupModal };
        const sort_1: string;
        export { sort_1 as sort };
        const orderedSort_1: string;
        export { orderedSort_1 as orderedSort };
        const showOther_1: boolean;
        export { showOther_1 as showOther };
    }
}
import PropTypes from "prop-types";
import AutocardListItem from "@cubeartisan/client/components/AutocardListItem.js";
//# sourceMappingURL=AutocardListGroup.d.ts.map
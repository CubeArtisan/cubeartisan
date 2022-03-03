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
        const cards: any;
        const rowTag: any;
        const noGroupModal: any;
        const heading: any;
        const sort: any;
        const orderedSort: any;
        const showOther: any;
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
import AutocardListItem from "@cubeartisan/client/components/AutocardListItem.js";
//# sourceMappingURL=AutocardListGroup.d.ts.map
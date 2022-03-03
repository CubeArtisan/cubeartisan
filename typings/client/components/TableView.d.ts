export default TableView;
declare function TableView({ cards, rowTag, noGroupModal }: {
    cards: any;
    rowTag: any;
    noGroupModal: any;
}): JSX.Element;
declare namespace TableView {
    namespace propTypes {
        const cards: any;
        const rowTag: any;
        const noGroupModal: any;
    }
    namespace defaultProps {
        export { AutocardListItem as rowTag };
        const noGroupModal_1: boolean;
        export { noGroupModal_1 as noGroupModal };
    }
}
import AutocardListItem from "@cubeartisan/client/components/AutocardListItem.js";
//# sourceMappingURL=TableView.d.ts.map
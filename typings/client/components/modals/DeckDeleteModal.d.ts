export default DeckDeleteModal;
declare function DeckDeleteModal({ deckID, cubeID, nextURL, isOpen, toggle }: {
    deckID: any;
    cubeID: any;
    nextURL: any;
    isOpen: any;
    toggle: any;
}): JSX.Element;
declare namespace DeckDeleteModal {
    namespace propTypes {
        const toggle: PropTypes.Validator<(...args: any[]) => any>;
        const deckID: PropTypes.Validator<string>;
        const cubeID: PropTypes.Validator<string>;
        const isOpen: PropTypes.Validator<boolean>;
        const nextURL: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const nextURL_1: null;
        export { nextURL_1 as nextURL };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=DeckDeleteModal.d.ts.map
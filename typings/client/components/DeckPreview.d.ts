export default DeckPreview;
declare function DeckPreview({ deck, nextURL }: {
    deck: any;
    nextURL: any;
}): JSX.Element;
declare namespace DeckPreview {
    namespace propTypes {
        const deck: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            cube: PropTypes.Requireable<string>;
            owner: PropTypes.Requireable<string>;
            cubeOwner: PropTypes.Requireable<string>;
            seats: PropTypes.Requireable<PropTypes.InferProps<{
                description: PropTypes.Validator<string>;
                deck: PropTypes.Validator<number[][][]>;
                sideboard: PropTypes.Validator<number[][][]>;
                username: PropTypes.Validator<string>;
                userid: PropTypes.Requireable<string>;
                bot: PropTypes.Requireable<string[]>;
                name: PropTypes.Validator<string>;
            }>[]>;
            date: PropTypes.Requireable<string | Date>;
            comments: PropTypes.Requireable<object[]>;
            basics: PropTypes.Validator<number[]>;
        }>>;
        const nextURL: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const nextURL_1: any;
        export { nextURL_1 as nextURL };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=DeckPreview.d.ts.map
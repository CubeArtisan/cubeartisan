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
            seats: PropTypes.Requireable<(PropTypes.InferProps<{
                description: PropTypes.Validator<string>;
                deck: PropTypes.Validator<(number | null | undefined)[][][]>;
                sideboard: PropTypes.Validator<(number | null | undefined)[][][]>;
                username: PropTypes.Validator<string>;
                userid: PropTypes.Requireable<string>;
                bot: PropTypes.Requireable<(string | null | undefined)[]>;
                name: PropTypes.Validator<string>;
            }> | null | undefined)[]>;
            date: PropTypes.Requireable<string | Date>;
            comments: PropTypes.Requireable<(PropTypes.InferProps<{}> | null | undefined)[]>;
            basics: PropTypes.Validator<number[]>;
        }>>;
        const nextURL: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const nextURL_1: null;
        export { nextURL_1 as nextURL };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=DeckPreview.d.ts.map
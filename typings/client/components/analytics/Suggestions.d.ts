export default Suggestions;
declare function Suggestions({ adds, cuts, loadState, cube, filter }: {
    adds: any;
    cuts: any;
    loadState: any;
    cube: any;
    filter: any;
}): JSX.Element;
declare namespace Suggestions {
    namespace propTypes {
        const adds: PropTypes.Validator<PropTypes.InferProps<{
            card: PropTypes.Validator<PropTypes.InferProps<{
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
            }>>;
            score: PropTypes.Validator<number>;
        }>[]>;
        const cuts: PropTypes.Validator<PropTypes.InferProps<{
            card: PropTypes.Validator<PropTypes.InferProps<{
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
            }>>;
            score: PropTypes.Validator<number>;
        }>[]>;
        const loadState: PropTypes.Validator<string>;
        const cube: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<(PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }> | null | undefined)[]>;
            useCubeElo: PropTypes.Requireable<boolean>;
        }>>;
        const filter: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const filter_1: null;
        export { filter_1 as filter };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Suggestions.d.ts.map
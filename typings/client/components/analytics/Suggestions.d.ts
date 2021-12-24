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
        const adds: PropTypes.Validator<PropTypes.InferProps<{}>[]>;
        const cuts: PropTypes.Validator<PropTypes.InferProps<{}>[]>;
        const loadState: PropTypes.Validator<string>;
        const cube: PropTypes.Validator<PropTypes.InferProps<{
            maybe: PropTypes.Requireable<PropTypes.InferProps<{
                details: PropTypes.Requireable<PropTypes.InferProps<{
                    name_lower: PropTypes.Validator<string>;
                }>>;
            }>[]>;
        }>>;
        const filter: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const filter_1: any;
        export { filter_1 as filter };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Suggestions.d.ts.map
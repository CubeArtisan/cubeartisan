export default Tokens;
declare function Tokens({ cube }: {
    cube: any;
}): JSX.Element;
declare namespace Tokens {
    namespace propTypes {
        const cube: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<PropTypes.InferProps<{
                details: PropTypes.Validator<PropTypes.InferProps<{
                    _id: PropTypes.Validator<string>;
                    name: PropTypes.Validator<string>;
                }>>;
            }>[]>;
            draft_formats: PropTypes.Requireable<PropTypes.InferProps<{}>[]>;
        }>>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Tokens.d.ts.map
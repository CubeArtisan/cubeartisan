export default Tokens;
declare function Tokens({ cube }: {
    cube: any;
}): JSX.Element;
declare namespace Tokens {
    namespace propTypes {
        const cube: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            cards: PropTypes.Requireable<(PropTypes.InferProps<{
                details: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
                    _id: PropTypes.Validator<string>;
                    name: PropTypes.Validator<string>;
                }>>>;
            }> | null | undefined)[]>;
            draft_formats: PropTypes.Requireable<(PropTypes.InferProps<{}> | null | undefined)[]>;
        }>>>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Tokens.d.ts.map
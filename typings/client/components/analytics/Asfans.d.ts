export default Asfans;
declare function Asfans({ cards: cardsNoAsfan, cube }: {
    cards: any;
    cube: any;
}): JSX.Element;
declare namespace Asfans {
    namespace propTypes {
        const cube: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<PropTypes.InferProps<{}>[]>;
            draft_formats: PropTypes.Requireable<PropTypes.InferProps<{}>[]>;
        }>>;
        const cards: PropTypes.Validator<PropTypes.InferProps<{}>[]>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Asfans.d.ts.map
export default Asfans;
declare function Asfans({ cards: cardsNoAsfan, cube, defaultFormatId }: {
    cards: any;
    cube: any;
    defaultFormatId: any;
}): JSX.Element;
declare namespace Asfans {
    namespace propTypes {
        const cube: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<PropTypes.InferProps<{}>[]>;
            draft_formats: PropTypes.Requireable<PropTypes.InferProps<{}>[]>;
        }>>;
        const cards: PropTypes.Validator<PropTypes.InferProps<{}>[]>;
        const defaultFormatId: PropTypes.Requireable<number>;
    }
    namespace defaultProps {
        const defaultFormatId_1: number;
        export { defaultFormatId_1 as defaultFormatId };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Asfans.d.ts.map
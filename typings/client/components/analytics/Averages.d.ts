export default Averages;
declare function Averages({ cards, characteristics, defaultFormatId, cube, setAsfans }: {
    cards: any;
    characteristics: any;
    defaultFormatId: any;
    cube: any;
    setAsfans: any;
}): JSX.Element;
declare namespace Averages {
    namespace propTypes {
        const cards: PropTypes.Validator<(PropTypes.InferProps<{}> | null | undefined)[]>;
        const characteristics: PropTypes.Validator<PropTypes.InferProps<{}>>;
        const cube: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Validator<(PropTypes.InferProps<{
                cardID: PropTypes.Validator<string>;
            }> | null | undefined)[]>;
            draft_formats: PropTypes.Validator<(PropTypes.InferProps<{
                title: PropTypes.Validator<string>;
                _id: PropTypes.Validator<string>;
            }> | null | undefined)[]>;
            defaultDraftFormat: PropTypes.Requireable<number>;
        }>>;
        const defaultFormatId: PropTypes.Requireable<number>;
        const setAsfans: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const defaultFormatId_1: null;
        export { defaultFormatId_1 as defaultFormatId };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Averages.d.ts.map
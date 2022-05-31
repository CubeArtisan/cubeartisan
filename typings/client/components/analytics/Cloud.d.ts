export default Cloud;
declare function Cloud({ cards, cube, setAsfans, defaultFormatId }: {
    cards: any;
    cube: any;
    setAsfans: any;
    defaultFormatId: any;
}): JSX.Element;
declare namespace Cloud {
    namespace propTypes {
        const cards: PropTypes.Validator<(PropTypes.InferProps<{}> | null | undefined)[]>;
        const cube: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<(PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }> | null | undefined)[]>;
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
//# sourceMappingURL=Cloud.d.ts.map
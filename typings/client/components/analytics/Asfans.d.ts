export default Asfans;
declare function Asfans({ cards, cube, defaultFormatId }: {
    cards: any;
    cube: any;
    defaultFormatId: any;
}): JSX.Element;
declare namespace Asfans {
    namespace propTypes {
        const cube: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            cards: PropTypes.Requireable<(PropTypes.InferProps<{}> | null | undefined)[]>;
            draft_formats: PropTypes.Requireable<(PropTypes.InferProps<{}> | null | undefined)[]>;
        }>>>;
        const cards: PropTypes.Validator<(PropTypes.InferProps<{}> | null | undefined)[]>;
        const defaultFormatId: PropTypes.Requireable<number>;
    }
    namespace defaultProps {
        const defaultFormatId_1: number;
        export { defaultFormatId_1 as defaultFormatId };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Asfans.d.ts.map
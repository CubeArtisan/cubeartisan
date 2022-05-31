export default AsfanDropdown;
declare function AsfanDropdown({ cube, defaultFormatId, setAsfans }: {
    cube: any;
    defaultFormatId: any;
    setAsfans: any;
}): JSX.Element;
declare namespace AsfanDropdown {
    namespace propTypes {
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
        const defaultFormatId_1: number;
        export { defaultFormatId_1 as defaultFormatId };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=AsfanDropdown.d.ts.map
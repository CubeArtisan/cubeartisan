export default PivotTable;
declare function PivotTable({ cards, characteristics }: {
    cards: any;
    characteristics: any;
}): JSX.Element;
declare namespace PivotTable {
    namespace propTypes {
        const cards: PropTypes.Validator<(PropTypes.InferProps<{}> | null | undefined)[]>;
        const characteristics: PropTypes.Validator<PropTypes.InferProps<{
            'Cube Elo': PropTypes.Validator<(...args: any[]) => any>;
            'Mainboard Rate': PropTypes.Validator<(...args: any[]) => any>;
            'Mainboard Count': PropTypes.Validator<(...args: any[]) => any>;
            'Pick Rate': PropTypes.Validator<(...args: any[]) => any>;
            'Pick Count': PropTypes.Validator<(...args: any[]) => any>;
        }>>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=PivotTable.d.ts.map
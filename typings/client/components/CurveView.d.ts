export default CurveView;
export type TypeRowProps = {
    cardType: string;
    group: import("@mui/material/OverridableComponent.js").OverridableComponent<import("@mui/material").CardTypeMap<{}, "div">>[];
};
declare function CurveView({ cards, ...props }: {
    [x: string]: any;
    cards: any;
}): JSX.Element;
declare namespace CurveView {
    namespace propTypes {
        const cards: PropTypes.Validator<(PropTypes.InferProps<{}> | null | undefined)[]>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CurveView.d.ts.map
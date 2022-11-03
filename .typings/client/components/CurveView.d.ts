export default CurveView;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type TypeRowProps = {
    cardType: string;
    group: Card[];
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
import { Card } from "@mui/material";
import PropTypes from "prop-types";
//# sourceMappingURL=CurveView.d.ts.map
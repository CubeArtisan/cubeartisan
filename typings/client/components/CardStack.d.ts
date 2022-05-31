export default CardStack;
declare function CardStack({ location, children, ...props }: {
    [x: string]: any;
    location: any;
    children: any;
}): JSX.Element;
declare namespace CardStack {
    namespace propTypes {
        const location: PropTypes.Validator<PropTypes.InferProps<{
            type: PropTypes.Validator<string>;
            data: PropTypes.Requireable<(number | null | undefined)[]>;
        }>>;
        const children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CardStack.d.ts.map
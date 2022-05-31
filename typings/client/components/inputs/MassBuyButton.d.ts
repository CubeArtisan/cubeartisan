export default MassBuyButton;
declare function MassBuyButton({ cards, ...props }: {
    [x: string]: any;
    cards: any;
}): JSX.Element;
declare namespace MassBuyButton {
    namespace propTypes {
        const cards: PropTypes.Validator<(PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            index: PropTypes.Requireable<number>;
            imgUrl: PropTypes.Requireable<string>;
            imgBackUrl: PropTypes.Requireable<string>;
            cardID: PropTypes.Validator<string>;
            colors: PropTypes.Requireable<(string | null | undefined)[]>;
            tags: PropTypes.Requireable<(string | null | undefined)[]>;
            details: PropTypes.Requireable<PropTypes.InferProps<{
                _id: PropTypes.Validator<string>;
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
                image_flip: PropTypes.Requireable<string>;
                image_small: PropTypes.Requireable<string>;
            }>>;
            addedTmsp: PropTypes.Requireable<string>;
        }> | null | undefined)[]>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=MassBuyButton.d.ts.map
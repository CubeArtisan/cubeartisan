export default VisualSpoiler;
declare function VisualSpoiler({ cards }: {
    cards: any;
}): JSX.Element;
declare namespace VisualSpoiler {
    namespace propTypes {
        const cards: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            index: PropTypes.Requireable<number>;
            imgUrl: PropTypes.Requireable<string>;
            imgBackUrl: PropTypes.Requireable<string>;
            cardID: PropTypes.Validator<string>;
            colors: PropTypes.Requireable<string[]>;
            tags: PropTypes.Requireable<string[]>;
            details: PropTypes.Requireable<PropTypes.InferProps<{
                _id: PropTypes.Validator<string>;
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }>>;
        }>[]>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=VisualSpoiler.d.ts.map
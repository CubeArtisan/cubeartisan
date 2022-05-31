export default CompareView;
declare function CompareView({ cards, both, onlyA, onlyB, ...props }: {
    [x: string]: any;
    cards: any;
    both: any;
    onlyA: any;
    onlyB: any;
}): JSX.Element;
declare namespace CompareView {
    namespace propTypes {
        const both: PropTypes.Validator<PropTypes.InferProps<{
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
        }>[]>;
        const onlyA: PropTypes.Validator<PropTypes.InferProps<{
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
        }>[]>;
        const onlyB: PropTypes.Validator<PropTypes.InferProps<{
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
        }>[]>;
        const cards: PropTypes.Validator<PropTypes.InferProps<{
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
        }>[]>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CompareView.d.ts.map
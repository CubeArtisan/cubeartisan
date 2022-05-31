export default CardGrid;
declare function CardGrid({ cardList, Tag, cardProps, linkDetails }: {
    cardList: any;
    Tag: any;
    cardProps: any;
    linkDetails: any;
}): JSX.Element;
declare namespace CardGrid {
    namespace propTypes {
        const cardList: PropTypes.Validator<(PropTypes.InferProps<{
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
            }>>;
        }> | null | undefined)[]>;
        const Tag: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        const cardProps: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        const linkDetails: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const cardProps_1: null;
        export { cardProps_1 as cardProps };
        const linkDetails_1: boolean;
        export { linkDetails_1 as linkDetails };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CardGrid.d.ts.map
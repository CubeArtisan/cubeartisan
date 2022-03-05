export default PlaytestData;
declare function PlaytestData({ cards: allCards, cubeAnalytics }: {
    cards: any;
    cubeAnalytics: any;
}): JSX.Element;
declare namespace PlaytestData {
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
        const cubeAnalytics: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            shortID: PropTypes.Requireable<string>;
            name: PropTypes.Requireable<string>;
            card_count: PropTypes.Requireable<number>;
            cards: PropTypes.Requireable<PropTypes.InferProps<{
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
            type: PropTypes.Requireable<string>;
            overrideCategory: PropTypes.Requireable<boolean>;
            categoryOverride: PropTypes.Requireable<string>;
            categoryPrefixes: PropTypes.Requireable<string[]>;
            image_name: PropTypes.Requireable<string>;
            image_artist: PropTypes.Requireable<string>;
            image_uri: PropTypes.Requireable<string>;
            owner: PropTypes.Requireable<string>;
            owner_name: PropTypes.Requireable<string>;
            disableNotifications: PropTypes.Requireable<boolean>;
        }>>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=PlaytestData.d.ts.map
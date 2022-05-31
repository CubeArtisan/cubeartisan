export default CubePropType;
declare const CubePropType: PropTypes.Requireable<PropTypes.InferProps<{
    _id: PropTypes.Validator<string>;
    shortID: PropTypes.Requireable<string>;
    name: PropTypes.Requireable<string>;
    card_count: PropTypes.Requireable<number>;
    cards: PropTypes.Requireable<(PropTypes.InferProps<{
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
    type: PropTypes.Requireable<string>;
    overrideCategory: PropTypes.Requireable<boolean>;
    categoryOverride: PropTypes.Requireable<string>;
    categoryPrefixes: PropTypes.Requireable<(string | null | undefined)[]>;
    image_name: PropTypes.Requireable<string>;
    image_artist: PropTypes.Requireable<string>;
    image_uri: PropTypes.Requireable<string>;
    owner: PropTypes.Requireable<string>;
    owner_name: PropTypes.Requireable<string>;
    disableNotifications: PropTypes.Requireable<boolean>;
}>>;
import PropTypes from "prop-types";
//# sourceMappingURL=CubeAnalyticPropType.d.ts.map
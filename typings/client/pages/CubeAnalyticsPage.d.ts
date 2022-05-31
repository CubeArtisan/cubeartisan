export function CubeAnalyticsPage({ cube, cubeID, defaultFilterText, defaultTab, defaultFormatId, defaultShowTagColors, loginCallback, cubeAnalytics, }: {
    cube: any;
    cubeID: any;
    defaultFilterText: any;
    defaultTab: any;
    defaultFormatId: any;
    defaultShowTagColors: any;
    loginCallback: any;
    cubeAnalytics: any;
}): JSX.Element;
export namespace CubeAnalyticsPage {
    namespace propTypes {
        const cube: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<(PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }> | null | undefined)[]>;
            useCubeElo: PropTypes.Requireable<boolean>;
        }>>;
        const cubeID: PropTypes.Validator<string>;
        const defaultFilterText: PropTypes.Requireable<string>;
        const defaultTab: PropTypes.Requireable<number>;
        const defaultFormatId: PropTypes.Requireable<number>;
        const defaultShowTagColors: PropTypes.Requireable<boolean>;
        const loginCallback: PropTypes.Requireable<string>;
        const cubeAnalytics: PropTypes.Validator<PropTypes.InferProps<{
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
    }
    namespace defaultProps {
        const defaultFilterText_1: string;
        export { defaultFilterText_1 as defaultFilterText };
        const defaultTab_1: number;
        export { defaultTab_1 as defaultTab };
        const defaultFormatId_1: null;
        export { defaultFormatId_1 as defaultFormatId };
        const defaultShowTagColors_1: boolean;
        export { defaultShowTagColors_1 as defaultShowTagColors };
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=CubeAnalyticsPage.d.ts.map
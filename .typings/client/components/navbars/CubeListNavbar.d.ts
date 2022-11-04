export default CubeListNavbar;
export type Cube = import('@cubeartisan/client/proptypes/CubePropType.js').Cube;
export type CompareCollapseProps = {
    open: boolean;
};
declare function CubeListNavbar({ cards, cubeView, setCubeView, openCollapse, setOpenCollapse, defaultPrimarySort, defaultSecondarySort, defaultTertiarySort, defaultQuaternarySort, defaultShowUnsorted, sorts, setSorts, defaultSorts, cubeDefaultShowUnsorted, defaultFilterText, filter, setFilter, alerts, setAlerts, }: {
    cards: any;
    cubeView: any;
    setCubeView: any;
    openCollapse: any;
    setOpenCollapse: any;
    defaultPrimarySort: any;
    defaultSecondarySort: any;
    defaultTertiarySort: any;
    defaultQuaternarySort: any;
    defaultShowUnsorted: any;
    sorts: any;
    setSorts: any;
    defaultSorts: any;
    cubeDefaultShowUnsorted: any;
    defaultFilterText: any;
    filter: any;
    setFilter: any;
    alerts: any;
    setAlerts: any;
}): JSX.Element;
declare namespace CubeListNavbar {
    namespace propTypes {
        const cards: PropTypes.Validator<(PropTypes.InferProps<{
            addedTmsp: PropTypes.Requireable<NonNullable<string | Date | null | undefined>>;
            cardID: PropTypes.Validator<string>;
            cmc: PropTypes.Requireable<number>;
            colorCategory: PropTypes.Requireable<string>;
            colors: PropTypes.Requireable<(string | null | undefined)[]>;
            finish: PropTypes.Validator<string>;
            imgBackUrl: PropTypes.Requireable<string>;
            imgUrl: PropTypes.Requireable<string>;
            index: PropTypes.Requireable<number>;
            name: PropTypes.Requireable<string>;
            notes: PropTypes.Requireable<string>;
            rarity: PropTypes.Requireable<string>;
            status: PropTypes.Validator<string>;
            tags: PropTypes.Validator<(string | null | undefined)[]>;
            type_line: PropTypes.Requireable<string>;
            details: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
                color_identity: PropTypes.Validator<string[]>;
                set: PropTypes.Validator<string>;
                set_name: PropTypes.Validator<string>;
                foil: PropTypes.Validator<boolean>;
                nonfoil: PropTypes.Validator<boolean>;
                collector_number: PropTypes.Validator<string>;
                released_at: PropTypes.Validator<string>;
                reprint: PropTypes.Validator<boolean>;
                promo: PropTypes.Validator<boolean>;
                prices: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
                    usd: PropTypes.Requireable<number>;
                    usd_foil: PropTypes.Requireable<number>;
                    eur: PropTypes.Requireable<number>;
                    tix: PropTypes.Requireable<number>;
                }>>>;
                elo: PropTypes.Validator<number>;
                digital: PropTypes.Validator<boolean>;
                isToken: PropTypes.Validator<boolean>;
                border_color: PropTypes.Validator<string>;
                name: PropTypes.Validator<string>;
                name_lower: PropTypes.Validator<string>;
                full_name: PropTypes.Validator<string>;
                artist: PropTypes.Requireable<string>;
                scryfall_uri: PropTypes.Validator<string>;
                rarity: PropTypes.Validator<string>;
                oracle_text: PropTypes.Requireable<string>;
                _id: PropTypes.Validator<string>;
                oracle_id: PropTypes.Validator<string>;
                cmc: PropTypes.Validator<number>;
                legalities: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
                    Legacy: PropTypes.Requireable<string>;
                    Modern: PropTypes.Requireable<string>;
                    Standard: PropTypes.Requireable<string>;
                    Pauper: PropTypes.Requireable<string>;
                    Pioneer: PropTypes.Requireable<string>;
                    Brawl: PropTypes.Requireable<string>;
                    Historic: PropTypes.Requireable<string>;
                    Commander: PropTypes.Requireable<string>;
                    Penny: PropTypes.Requireable<string>;
                    Vintage: PropTypes.Requireable<string>;
                }>>>;
                parsed_cost: PropTypes.Validator<string[]>;
                colors: PropTypes.Requireable<string[]>;
                type: PropTypes.Requireable<string>;
                full_art: PropTypes.Validator<boolean>;
                language: PropTypes.Validator<string>;
                mtgo_id: PropTypes.Requireable<number>;
                layout: PropTypes.Validator<string>;
                tcgplayer_id: PropTypes.Requireable<number>;
                loyalty: PropTypes.Requireable<string>;
                power: PropTypes.Requireable<string>;
                toughness: PropTypes.Requireable<string>;
                image_small: PropTypes.Requireable<string>;
                image_normal: PropTypes.Requireable<string>;
                art_crop: PropTypes.Requireable<string>;
                image_flip: PropTypes.Requireable<string>;
                color_category: PropTypes.Validator<string>;
                tokens: PropTypes.Requireable<string[]>;
                popularity: PropTypes.Validator<number>;
                cubeCount: PropTypes.Validator<number>;
                pickCount: PropTypes.Validator<number>;
            }>>>;
            isUnlimited: PropTypes.Validator<boolean>;
        }> | null | undefined)[]>;
        const cubeView: PropTypes.Validator<string>;
        const setCubeView: PropTypes.Validator<(...args: any[]) => any>;
        const openCollapse: PropTypes.Requireable<string>;
        const setOpenCollapse: PropTypes.Validator<(...args: any[]) => any>;
        const defaultPrimarySort: PropTypes.Validator<string>;
        const defaultSecondarySort: PropTypes.Validator<string>;
        const defaultTertiarySort: PropTypes.Validator<string>;
        const defaultQuaternarySort: PropTypes.Validator<string>;
        const defaultShowUnsorted: PropTypes.Validator<string>;
        const sorts: PropTypes.Requireable<(string | null | undefined)[]>;
        const setSorts: PropTypes.Validator<(...args: any[]) => any>;
        const defaultSorts: PropTypes.Validator<(string | null | undefined)[]>;
        const cubeDefaultShowUnsorted: PropTypes.Requireable<boolean>;
        const defaultFilterText: PropTypes.Validator<string>;
        const filter: PropTypes.Requireable<(...args: any[]) => any>;
        const setFilter: PropTypes.Validator<(...args: any[]) => any>;
        const alerts: PropTypes.Validator<(PropTypes.InferProps<{
            color: PropTypes.Requireable<string>;
            message: PropTypes.Validator<string>;
        }> | null | undefined)[]>;
        const setAlerts: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const openCollapse_1: null;
        export { openCollapse_1 as openCollapse };
        const sorts_1: null;
        export { sorts_1 as sorts };
        const filter_1: null;
        export { filter_1 as filter };
        const cubeDefaultShowUnsorted_1: boolean;
        export { cubeDefaultShowUnsorted_1 as cubeDefaultShowUnsorted };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CubeListNavbar.d.ts.map
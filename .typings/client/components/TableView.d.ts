export default TableView;
declare function TableView({ cards, rowTag, noGroupModal }: {
    cards: any;
    rowTag: any;
    noGroupModal: any;
}): JSX.Element;
declare namespace TableView {
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
        const rowTag: PropTypes.Requireable<NonNullable<string | ((...args: any[]) => any) | null | undefined>>;
        const noGroupModal: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        export { AutocardListItem as rowTag };
        const noGroupModal_1: boolean;
        export { noGroupModal_1 as noGroupModal };
    }
}
import PropTypes from "prop-types";
import AutocardListItem from "@cubeartisan/client/components/AutocardListItem.js";
//# sourceMappingURL=TableView.d.ts.map
export function CardPage({ card, data, versions, related, loginCallback }: {
    card: any;
    data: any;
    versions: any;
    related: any;
    loginCallback: any;
}): JSX.Element;
export namespace CardPage {
    namespace propTypes {
        const card: PropTypes.Validator<PropTypes.InferProps<{
            color_identity: PropTypes.Validator<string>;
            set: PropTypes.Validator<string>;
            set_name: PropTypes.Validator<string>;
            foil: PropTypes.Validator<boolean>;
            nonfoil: PropTypes.Validator<boolean>;
            collector_number: PropTypes.Validator<string>;
            released_at: PropTypes.Validator<string>;
            reprint: PropTypes.Validator<boolean>;
            promo: PropTypes.Validator<boolean>;
            prices: PropTypes.Validator<PropTypes.InferProps<{
                usd: PropTypes.Requireable<number>;
                usd_foil: PropTypes.Requireable<number>;
                eur: PropTypes.Requireable<number>;
                tix: PropTypes.Requireable<number>;
            }>>;
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
            legalities: PropTypes.Validator<PropTypes.InferProps<{
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
            }>>;
            parsed_cast: PropTypes.Validator<string[]>;
            colors: PropTypes.Requireable<string[]>;
            type: PropTypes.Requireable<string>;
            full_art: PropTypes.Validator<boolean>;
            language: PropTypes.Validator<string>;
            mtgo_id: PropTypes.Requireable<number>;
            layout: PropTypes.Validator<string>;
            tcgplayer_id: PropTypes.Requireable<string>;
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
        }>>;
        const data: PropTypes.Validator<PropTypes.InferProps<{
            history: PropTypes.Validator<(PropTypes.InferProps<{
                prices: PropTypes.Validator<(PropTypes.InferProps<{
                    usd: PropTypes.Requireable<number>;
                    usd_foil: PropTypes.Requireable<number>;
                    eur: PropTypes.Requireable<number>;
                    tix: PropTypes.Requireable<number>;
                }> | null | undefined)[]>;
                vintage: PropTypes.Validator<boolean>;
                legacy: PropTypes.Validator<boolean>;
                modern: PropTypes.Validator<boolean>;
                standard: PropTypes.Validator<boolean>;
                pauper: PropTypes.Validator<boolean>;
                peasant: PropTypes.Validator<boolean>;
                size180: PropTypes.Validator<number>;
                size360: PropTypes.Validator<number>;
                size450: PropTypes.Validator<number>;
                size540: PropTypes.Validator<number>;
                size720: PropTypes.Validator<number>;
                total: PropTypes.Validator<(number | null | undefined)[]>;
            }> | null | undefined)[]>;
            current: PropTypes.Requireable<PropTypes.InferProps<{
                prices: PropTypes.Validator<(PropTypes.InferProps<{
                    usd: PropTypes.Requireable<number>;
                    usd_foil: PropTypes.Requireable<number>;
                    eur: PropTypes.Requireable<number>;
                    tix: PropTypes.Requireable<number>;
                }> | null | undefined)[]>;
                vintage: PropTypes.Validator<boolean>;
                legacy: PropTypes.Validator<boolean>;
                modern: PropTypes.Validator<boolean>;
                standard: PropTypes.Validator<boolean>;
                pauper: PropTypes.Validator<boolean>;
                peasant: PropTypes.Validator<boolean>;
                size180: PropTypes.Validator<number>;
                size360: PropTypes.Validator<number>;
                size450: PropTypes.Validator<number>;
                size540: PropTypes.Validator<number>;
                size720: PropTypes.Validator<number>;
                total: PropTypes.Validator<(number | null | undefined)[]>;
            }>>;
        }>>;
        const related: PropTypes.Validator<PropTypes.InferProps<{
            top: PropTypes.Validator<(PropTypes.InferProps<{
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }> | null | undefined)[]>;
            synergistic: PropTypes.Validator<(PropTypes.InferProps<{
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }> | null | undefined)[]>;
            creatures: PropTypes.Validator<(PropTypes.InferProps<{
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }> | null | undefined)[]>;
            spells: PropTypes.Validator<(PropTypes.InferProps<{
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }> | null | undefined)[]>;
            other: PropTypes.Validator<(PropTypes.InferProps<{
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }> | null | undefined)[]>;
        }>>;
        const versions: PropTypes.Validator<PropTypes.InferProps<{
            color_identity: PropTypes.Validator<string>;
            set: PropTypes.Validator<string>;
            set_name: PropTypes.Validator<string>;
            foil: PropTypes.Validator<boolean>;
            nonfoil: PropTypes.Validator<boolean>;
            collector_number: PropTypes.Validator<string>;
            released_at: PropTypes.Validator<string>;
            reprint: PropTypes.Validator<boolean>;
            promo: PropTypes.Validator<boolean>;
            prices: PropTypes.Validator<PropTypes.InferProps<{
                usd: PropTypes.Requireable<number>;
                usd_foil: PropTypes.Requireable<number>;
                eur: PropTypes.Requireable<number>;
                tix: PropTypes.Requireable<number>;
            }>>;
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
            legalities: PropTypes.Validator<PropTypes.InferProps<{
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
            }>>;
            parsed_cast: PropTypes.Validator<string[]>;
            colors: PropTypes.Requireable<string[]>;
            type: PropTypes.Requireable<string>;
            full_art: PropTypes.Validator<boolean>;
            language: PropTypes.Validator<string>;
            mtgo_id: PropTypes.Requireable<number>;
            layout: PropTypes.Validator<string>;
            tcgplayer_id: PropTypes.Requireable<string>;
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
        }>[]>;
        const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=CardPage.d.ts.map
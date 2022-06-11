export function DraftbotBreakdownTable({ drafterState }: {
    drafterState: any;
}): JSX.Element;
export namespace DraftbotBreakdownTable {
    namespace propTypes {
        const drafterState: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Validator<(PropTypes.InferProps<{
                addedTmsp: PropTypes.Requireable<string | Date>;
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
                details: PropTypes.Validator<PropTypes.InferProps<{
                    color_identity: PropTypes.Validator<string[]>;
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
                    colorcategory: PropTypes.Validator<string>;
                    tokens: PropTypes.Requireable<string[]>;
                    popularity: PropTypes.Validator<number>;
                    cubeCount: PropTypes.Validator<number>;
                    pickCount: PropTypes.Validator<number>;
                }>>;
                isUnlimited: PropTypes.Validator<boolean>;
            }> | null | undefined)[]>;
            picked: PropTypes.Validator<number[]>;
            trashed: PropTypes.Validator<number[]>;
            seen: PropTypes.Validator<PropTypes.InferProps<{
                pack: PropTypes.Validator<number[]>;
                pickNum: PropTypes.Validator<number>;
                packNum: PropTypes.Validator<number>;
                numPicks: PropTypes.Validator<number>;
                numPacks: PropTypes.Validator<number>;
            }>[]>;
            cardsInPack: PropTypes.Validator<number[]>;
            packNum: PropTypes.Validator<number>;
            pickNum: PropTypes.Validator<number>;
            numPacks: PropTypes.Validator<number>;
            packSize: PropTypes.Validator<number>;
            pickedNum: PropTypes.Validator<number>;
            trashedNum: PropTypes.Validator<number>;
            stepNumber: PropTypes.Validator<number>;
            pickNumber: PropTypes.Validator<number>;
            step: PropTypes.Requireable<PropTypes.InferProps<{
                action: PropTypes.Validator<string>;
                amount: PropTypes.Requireable<number>;
            }>>;
        }>>;
    }
}
export default DraftbotBreakdown;
import PropTypes from "prop-types";
declare function DraftbotBreakdown(props: any): JSX.Element;
declare namespace DraftbotBreakdown {
    export namespace propTypes_1 {
        const draft: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            basics: PropTypes.Validator<number[]>;
            cards: PropTypes.Validator<PropTypes.InferProps<{
                addedTmsp: PropTypes.Requireable<string | Date>;
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
                details: PropTypes.Validator<PropTypes.InferProps<{
                    color_identity: PropTypes.Validator<string[]>;
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
                    colorcategory: PropTypes.Validator<string>;
                    tokens: PropTypes.Requireable<string[]>;
                    popularity: PropTypes.Validator<number>;
                    cubeCount: PropTypes.Validator<number>;
                    pickCount: PropTypes.Validator<number>;
                }>>;
                isUnlimited: PropTypes.Validator<boolean>;
            }>[]>;
            cube: PropTypes.Validator<string>;
            initial_state: PropTypes.Validator<PropTypes.InferProps<{
                cards: PropTypes.Validator<number[]>;
                steps: PropTypes.Requireable<PropTypes.InferProps<{
                    action: PropTypes.Validator<string>;
                    amount: PropTypes.Requireable<number>;
                }>[]>;
            }>[][]>;
            seats: PropTypes.Validator<PropTypes.InferProps<{
                bot: PropTypes.Requireable<boolean>;
                name: PropTypes.Validator<string>;
                userid: PropTypes.Requireable<string>;
                drafted: PropTypes.Validator<number[][][]>;
                sideboard: PropTypes.Validator<number[][][]>;
                pickorder: PropTypes.Validator<number[]>;
                trashorder: PropTypes.Validator<number[]>;
            }>[]>;
        }>>;
        const seatIndex: PropTypes.Validator<string | number>;
        const defaultIndex: PropTypes.Requireable<number>;
    }
    export { propTypes_1 as propTypes };
    export namespace defaultProps {
        const defaultIndex_1: number;
        export { defaultIndex_1 as defaultIndex };
    }
}
//# sourceMappingURL=DraftbotBreakdown.d.ts.map
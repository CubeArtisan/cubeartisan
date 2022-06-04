export function usePickListAndDrafterState({ draft, seatIndex, defaultIndex }: {
    draft: any;
    seatIndex: any;
    defaultIndex: any;
}): {
    picksList: never[][];
    drafterState: {
        step: {
            action: any;
            amount: number;
        };
        cards: any;
        picked: never[];
        trashed: never[];
        drafted: any;
        sideboard: any;
        seatNum: number;
        seen: never[];
        cardsInPack: never[];
        basics: any;
        packNum: number;
        pickNum: number;
        numPacks: any;
        packSize: number;
        pickedNum: number;
        trashedNum: number;
        stepNumber: number;
        pickNumber: number;
        seed: number;
        timeout: any;
    };
    setPickNumberFromEvent: (event: any) => void;
};
export default DecksPickBreakdown;
declare function DecksPickBreakdown({ draft, ...props }: {
    [x: string]: any;
    draft: any;
}): JSX.Element;
declare namespace DecksPickBreakdown {
    namespace propTypes {
        const draft: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            basics: PropTypes.Validator<number[]>;
            cards: PropTypes.Validator<PropTypes.InferProps<{
                addedTmsp: PropTypes.Requireable<string>;
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
        const seatIndex: PropTypes.Validator<number>;
        const defaultIndex: PropTypes.Requireable<number>;
    }
    namespace defaultProps {
        const defaultIndex_1: number;
        export { defaultIndex_1 as defaultIndex };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=DecksPickBreakdown.d.ts.map
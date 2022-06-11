export default DeckStacks;
declare function DeckStacks({ cards, title, subtitle, locationType, canDrop, onMoveCard, onClickCard, cardsInRow, ...props }: {
    [x: string]: any;
    cards: any;
    title: any;
    subtitle: any;
    locationType: any;
    canDrop: any;
    onMoveCard: any;
    onClickCard: any;
    cardsInRow: any;
}): JSX.Element;
declare namespace DeckStacks {
    namespace propTypes {
        const cards: PropTypes.Validator<PropTypes.InferProps<{
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
        }>[][][]>;
        const title: PropTypes.Validator<string>;
        const subtitle: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const locationType: PropTypes.Validator<string>;
        const onMoveCard: PropTypes.Requireable<(...args: any[]) => any>;
        const onClickCard: PropTypes.Requireable<(...args: any[]) => any>;
        const canDrop: PropTypes.Requireable<(...args: any[]) => any>;
        const cardsInRow: PropTypes.Requireable<number>;
    }
    namespace defaultProps {
        const subtitle_1: boolean;
        export { subtitle_1 as subtitle };
        export function onMoveCard_1(): void;
        export { onMoveCard_1 as onMoveCard };
        export function onClickCard_1(): void;
        export { onClickCard_1 as onClickCard };
        export function canDrop_1(): boolean;
        export { canDrop_1 as canDrop };
        const cardsInRow_1: number;
        export { cardsInRow_1 as cardsInRow };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=DeckStacks.d.ts.map
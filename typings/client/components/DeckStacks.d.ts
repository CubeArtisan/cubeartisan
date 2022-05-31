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
                image_flip: PropTypes.Requireable<string>;
                image_small: PropTypes.Requireable<string>;
            }>>;
            addedTmsp: PropTypes.Requireable<string>;
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
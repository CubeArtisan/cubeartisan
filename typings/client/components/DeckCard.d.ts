export default DeckCard;
declare function DeckCard({ seat, deck, seatIndex, draft, view }: {
    seat: any;
    deck: any;
    seatIndex: any;
    draft: any;
    view: any;
}): JSX.Element;
declare namespace DeckCard {
    namespace propTypes {
        const seat: PropTypes.Validator<PropTypes.InferProps<{
            description: PropTypes.Validator<string>;
            deck: PropTypes.Validator<(number | null | undefined)[][][]>;
            sideboard: PropTypes.Validator<(number | null | undefined)[][][]>;
            username: PropTypes.Validator<string>;
            userid: PropTypes.Requireable<string>;
            bot: PropTypes.Requireable<(string | null | undefined)[]>;
            name: PropTypes.Validator<string>;
        }>>;
        const view: PropTypes.Requireable<string>;
        const draft: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Validator<(PropTypes.InferProps<{
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
            seats: PropTypes.Validator<PropTypes.InferProps<{
                name: PropTypes.Validator<string>;
            }>[]>;
        }>>;
        const deck: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            cube: PropTypes.Requireable<string>;
            owner: PropTypes.Requireable<string>;
            cubeOwner: PropTypes.Requireable<string>;
            seats: PropTypes.Requireable<(PropTypes.InferProps<{
                description: PropTypes.Validator<string>;
                deck: PropTypes.Validator<(number | null | undefined)[][][]>;
                sideboard: PropTypes.Validator<(number | null | undefined)[][][]>;
                username: PropTypes.Validator<string>;
                userid: PropTypes.Requireable<string>;
                bot: PropTypes.Requireable<(string | null | undefined)[]>;
                name: PropTypes.Validator<string>;
            }> | null | undefined)[]>;
            date: PropTypes.Requireable<string | Date>;
            comments: PropTypes.Requireable<(PropTypes.InferProps<{}> | null | undefined)[]>;
            basics: PropTypes.Validator<number[]>;
        }>>;
        const seatIndex: PropTypes.Validator<string>;
    }
    namespace defaultProps {
        const view_1: string;
        export { view_1 as view };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=DeckCard.d.ts.map
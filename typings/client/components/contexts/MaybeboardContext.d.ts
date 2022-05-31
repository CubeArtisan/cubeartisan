export function MaybeboardContextProvider({ initialCards, ...props }: {
    [x: string]: any;
    initialCards: any;
}): JSX.Element;
export namespace MaybeboardContextProvider {
    namespace propTypes {
        const initialCards: PropTypes.Validator<(PropTypes.InferProps<{
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
        }> | null | undefined)[]>;
    }
}
export default MaybeboardContext;
export type Card = import('@cubeartisan/client/proptypes/CardPropType.js').Card;
export type MaybeboardContextValue = React.Context<import("react").Context<MaybeboardContextValue>>;
import PropTypes from "prop-types";
/**
 * @typedef {import('@cubeartisan/client/proptypes/CardPropType.js').Card} Card
 * @typedef MaybeboardContextValue
 * @property {(card: Card) => void} addMaybeboardCard
 * @property {(cardIdx: number) => void} removeMaybeboardCard
 * @property {(card: Card) => void} updateMaybeboardCard
 * @property {Card[]} maybeboard
 * @type {React.Context<MaybeboardContextValue>}
 */
declare const MaybeboardContext: import("react").Context<{
    maybeboard: never[];
    addMaybeboardCard: () => void;
    removeMaybeboardCard: () => void;
    updateMaybeboardCard: () => void;
}>;
//# sourceMappingURL=MaybeboardContext.d.ts.map
export function MaybeboardContextProvider({ initialCards, ...props }: {
    [x: string]: any;
    initialCards: any;
}): JSX.Element;
export namespace MaybeboardContextProvider {
    namespace propTypes {
        const initialCards: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            index: PropTypes.Requireable<number>;
            imgUrl: PropTypes.Requireable<string>;
            imgBackUrl: PropTypes.Requireable<string>;
            cardID: PropTypes.Validator<string>;
            colors: PropTypes.Requireable<string[]>;
            tags: PropTypes.Requireable<string[]>;
            details: PropTypes.Requireable<PropTypes.InferProps<{
                _id: PropTypes.Validator<string>;
                name: PropTypes.Validator<string>;
                image_normal: PropTypes.Validator<string>;
            }>>;
        }>[]>;
    }
}
export default MaybeboardContext;
import PropTypes from "prop-types";
declare const MaybeboardContext: React.Context<{
    maybeboard: any[];
    addCard: () => void;
    removeCard: () => void;
    updateCard: () => void;
}>;
import React from "react";
//# sourceMappingURL=MaybeboardContext.d.ts.map
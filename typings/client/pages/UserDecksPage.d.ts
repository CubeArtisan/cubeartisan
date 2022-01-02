export function UserDecksPage({ owner, followers, following, decks, pages, activePage, loginCallback }: {
    owner: any;
    followers: any;
    following: any;
    decks: any;
    pages: any;
    activePage: any;
    loginCallback: any;
}): JSX.Element;
export namespace UserDecksPage {
    namespace propTypes {
        const owner: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            username: PropTypes.Validator<string>;
        }>>;
        const followers: PropTypes.Validator<PropTypes.InferProps<{}>[]>;
        const following: PropTypes.Validator<boolean>;
        const decks: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Requireable<string>;
            cube: PropTypes.Requireable<string>;
            owner: PropTypes.Requireable<string>;
            cubeOwner: PropTypes.Requireable<string>;
            seats: PropTypes.Requireable<PropTypes.InferProps<{
                description: PropTypes.Validator<string>;
                deck: PropTypes.Validator<number[][][]>;
                sideboard: PropTypes.Validator<number[][][]>;
                username: PropTypes.Validator<string>;
                userid: PropTypes.Requireable<string>;
                bot: PropTypes.Requireable<string[]>;
                name: PropTypes.Validator<string>;
            }>[]>;
            date: PropTypes.Requireable<string | Date>;
            comments: PropTypes.Requireable<object[]>;
            basics: PropTypes.Validator<number[]>;
        }>[]>;
        const pages: PropTypes.Validator<number>;
        const activePage: PropTypes.Validator<number>;
        const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=UserDecksPage.d.ts.map
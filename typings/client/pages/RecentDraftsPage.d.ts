export function RecentDraftsPage({ decks, currentPage, totalPages, count, loginCallback }: {
    decks: any;
    currentPage: any;
    totalPages: any;
    count: any;
    loginCallback: any;
}): JSX.Element;
export namespace RecentDraftsPage {
    namespace propTypes {
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
        const currentPage: PropTypes.Validator<number>;
        const totalPages: PropTypes.Validator<number>;
        const count: PropTypes.Validator<number>;
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
//# sourceMappingURL=RecentDraftsPage.d.ts.map
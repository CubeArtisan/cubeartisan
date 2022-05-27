export function UserSocialPage({ followedCubes, followedUsers, followers, loginCallback }: {
    followedCubes: any;
    followedUsers: any;
    followers: any;
    loginCallback: any;
}): JSX.Element;
export namespace UserSocialPage {
    namespace propTypes {
        const followedCubes: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }>[]>;
            useCubeElo: PropTypes.Requireable<boolean>;
        }>[]>;
        const followedUsers: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
        }>[]>;
        const followers: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
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
//# sourceMappingURL=UserSocialPage.d.ts.map
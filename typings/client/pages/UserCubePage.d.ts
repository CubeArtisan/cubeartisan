export function UserCubePage({ owner, followers, following, cubes, loginCallback }: {
    owner: any;
    followers: any;
    following: any;
    cubes: any;
    loginCallback: any;
}): JSX.Element;
export namespace UserCubePage {
    namespace propTypes {
        const owner: PropTypes.Validator<PropTypes.InferProps<{
            about: PropTypes.Validator<string>;
            image_name: PropTypes.Validator<string>;
            image: PropTypes.Validator<string>;
            artist: PropTypes.Validator<string>;
            _id: PropTypes.Validator<string>;
        }>>;
        const followers: PropTypes.Validator<PropTypes.InferProps<{}>[]>;
        const following: PropTypes.Validator<boolean>;
        const cubes: PropTypes.Validator<PropTypes.InferProps<{
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
//# sourceMappingURL=UserCubePage.d.ts.map
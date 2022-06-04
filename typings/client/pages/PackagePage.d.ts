export function PackagePage({ pack, loginCallback }: {
    pack: any;
    loginCallback: any;
}): JSX.Element;
export namespace PackagePage {
    namespace propTypes {
        const pack: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            title: PropTypes.Validator<string>;
            date: PropTypes.Validator<string>;
            userid: PropTypes.Validator<string>;
            username: PropTypes.Validator<string>;
            approved: PropTypes.Validator<boolean>;
            cards: PropTypes.Validator<(string | null | undefined)[]>;
            votes: PropTypes.Validator<number>;
            voters: PropTypes.Validator<(string | null | undefined)[]>;
        }>>;
        const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: () => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=PackagePage.d.ts.map
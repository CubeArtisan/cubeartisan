export function BrowseContentPage({ loginCallback, content }: {
    loginCallback: any;
    content: any;
}): JSX.Element;
export namespace BrowseContentPage {
    namespace propTypes {
        const loginCallback: PropTypes.Requireable<string>;
        const content: PropTypes.Validator<(PropTypes.InferProps<{}> | null | undefined)[]>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: () => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=BrowseContentPage.d.ts.map
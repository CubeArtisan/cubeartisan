export function CardSearchPage({ loginCallback }: {
    loginCallback: any;
}): JSX.Element;
export namespace CardSearchPage {
    namespace propTypes {
        const loginCallback: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: () => JSX.Element;
export default _default;
export type Filter = import('@cubeartisan/client/filtering/FilterCards.js').Filter;
export type CardDetails = import('@cubeartisan/client/proptypes/CardDetailsPropType.js').CardDetails;
import PropTypes from "prop-types";
//# sourceMappingURL=CardSearchPage.d.ts.map
export function CubeDeckPage({ cube, deck, draft, loginCallback }: {
    cube: any;
    deck: any;
    draft: any;
    loginCallback: any;
}): JSX.Element;
export namespace CubeDeckPage {
    namespace propTypes {
        export const cube: any;
        export const deck: any;
        export { DraftPropType as draft };
        export const loginCallback: any;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
        export const draft: any;
    }
}
declare var _default: (providedReactProps: any) => JSX.Element;
export default _default;
import { DraftPropType } from "@cubeartisan/client/proptypes/DraftbotPropTypes.js";
//# sourceMappingURL=CubeDeckPage.d.ts.map
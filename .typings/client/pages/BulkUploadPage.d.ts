export function BulkUploadPage({ cubeID, added, loginCallback, ...props }: {
    [x: string]: any;
    cubeID: any;
    added: any;
    loginCallback: any;
}): JSX.Element;
export namespace BulkUploadPage {
    namespace propTypes {
        const loginCallback: PropTypes.Requireable<string>;
        const cubeID: PropTypes.Validator<string>;
        const missing: PropTypes.Validator<string[]>;
        const blogpost: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            title: PropTypes.Validator<string>;
            html: PropTypes.Validator<string>;
        }>>>;
        const added: PropTypes.Validator<(PropTypes.InferProps<{
            name: PropTypes.Validator<string>;
            image_normal: PropTypes.Validator<string>;
        }> | null | undefined)[]>;
    }
    namespace defaultProps {
        const loginCallback_1: string;
        export { loginCallback_1 as loginCallback };
    }
}
declare const _default: () => JSX.Element;
export default _default;
import PropTypes from "prop-types";
//# sourceMappingURL=BulkUploadPage.d.ts.map
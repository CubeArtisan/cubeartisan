export const StretchedDiv: any;
export default AspectRatioBox;
/** 2020-11-17 struesdell:
 * - Added classnames dependency, allowing for terse classname construction
 * - Added style to props shape to allow partial style passthrough
 * - Added propTypes declaration to resolve ESLint errors (issue #1601)
 * - Added defaultProps to support partial prop application
 */
declare function AspectRatioBox({ ratio, className, ...props }: {
    [x: string]: any;
    ratio: any;
    className: any;
}): JSX.Element;
declare namespace AspectRatioBox {
    namespace propTypes {
        const ratio: PropTypes.Validator<number>;
        const className: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const className_1: string;
        export { className_1 as className };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=AspectRatioBox.d.ts.map
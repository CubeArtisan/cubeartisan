export default AspectRatioBox;
/** 2020-11-17 struesdell:
 * - Added classnames dependency, allowing for terse classname construction
 * - Added style to props shape to allow partial style passthrough
 * - Added propTypes declaration to resolve ESLint errors (issue #1601)
 * - Added defaultProps to support partial prop application
 */
declare function AspectRatioBox({ ratio, ...props }: {
    [x: string]: any;
    ratio: any;
}): JSX.Element;
declare namespace AspectRatioBox {
    namespace propTypes {
        const ratio: PropTypes.Validator<number>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=AspectRatioBox.d.ts.map
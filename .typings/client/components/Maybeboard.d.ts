export default Maybeboard;
declare function Maybeboard({ filter, ...props }: {
    [x: string]: any;
    filter: any;
}): JSX.Element;
declare namespace Maybeboard {
    namespace propTypes {
        const filter: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        export function filter_1(): void;
        export { filter_1 as filter };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Maybeboard.d.ts.map
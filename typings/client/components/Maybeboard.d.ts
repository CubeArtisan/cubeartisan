export default Maybeboard;
declare function Maybeboard({ filter, ...props }: {
    [x: string]: any;
    filter: any;
}): JSX.Element;
declare namespace Maybeboard {
    namespace propTypes {
        const filter: PropTypes.Validator<any[][]>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Maybeboard.d.ts.map
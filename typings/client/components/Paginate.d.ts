export default Paginate;
declare function Paginate({ count, active, urlF, onClick }: {
    count: any;
    active: any;
    urlF: any;
    onClick: any;
}): JSX.Element;
declare namespace Paginate {
    namespace propTypes {
        const count: PropTypes.Validator<number>;
        const active: PropTypes.Validator<number>;
        const urlF: PropTypes.Requireable<(...args: any[]) => any>;
        const onClick: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        const urlF_1: any;
        export { urlF_1 as urlF };
        export function onClick_1(): void;
        export { onClick_1 as onClick };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Paginate.d.ts.map
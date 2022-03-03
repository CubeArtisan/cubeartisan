export default Paginate;
declare function Paginate({ count, active, urlF, onClick }: {
    count: any;
    active: any;
    urlF: any;
    onClick: any;
}): JSX.Element;
declare namespace Paginate {
    namespace propTypes {
        const count: any;
        const active: any;
        const urlF: any;
        const onClick: any;
    }
    namespace defaultProps {
        const urlF_1: any;
        export { urlF_1 as urlF };
        export function onClick_1(): void;
        export { onClick_1 as onClick };
    }
}
//# sourceMappingURL=Paginate.d.ts.map
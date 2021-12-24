export default CubesCard;
declare function CubesCard({ cubes, title, header, lean, ...props }: {
    [x: string]: any;
    cubes: any;
    title: any;
    header: any;
    lean: any;
}): JSX.Element;
declare namespace CubesCard {
    namespace propTypes {
        const cubes: PropTypes.Validator<PropTypes.InferProps<{
            cards: PropTypes.Requireable<PropTypes.InferProps<{
                cardName: PropTypes.Requireable<string>;
                picks: PropTypes.Requireable<number>;
                passes: PropTypes.Requireable<number>;
                elo: PropTypes.Requireable<number>;
                mainboards: PropTypes.Requireable<number>;
                sideboards: PropTypes.Requireable<number>;
            }>[]>;
            useCubeElo: PropTypes.Requireable<boolean>;
        }>[]>;
        const title: PropTypes.Validator<string>;
        const header: PropTypes.Requireable<PropTypes.InferProps<{
            sideLink: PropTypes.Requireable<string>;
            sideText: PropTypes.Requireable<string>;
            hLevel: PropTypes.Requireable<number>;
        }>>;
        const lean: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const header_1: any;
        export { header_1 as header };
        const lean_1: boolean;
        export { lean_1 as lean };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CubesCard.d.ts.map
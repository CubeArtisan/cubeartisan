export default CardPackage;
declare function CardPackage({ cardPackage, refresh }: {
    cardPackage: any;
    refresh: any;
}): JSX.Element;
declare namespace CardPackage {
    namespace propTypes {
        const cardPackage: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            title: PropTypes.Validator<string>;
            date: PropTypes.Validator<string>;
            userid: PropTypes.Validator<string>;
            username: PropTypes.Validator<string>;
            approved: PropTypes.Validator<boolean>;
            cards: PropTypes.Validator<string[]>;
            votes: PropTypes.Validator<number>;
            voters: PropTypes.Validator<string[]>;
        }>>;
        const refresh: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        export function refresh_1(): void;
        export { refresh_1 as refresh };
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=CardPackage.d.ts.map
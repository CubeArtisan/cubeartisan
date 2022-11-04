export default ListView;
declare function ListView({ cards }: {
    cards: any;
}): JSX.Element;
declare namespace ListView {
    namespace propTypes {
        const cards: PropTypes.Validator<(PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
        }> | null | undefined)[]>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=ListView.d.ts.map
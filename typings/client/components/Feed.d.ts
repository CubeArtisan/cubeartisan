export default Feed;
declare function Feed({ items }: {
    items: any;
}): JSX.Element;
declare namespace Feed {
    namespace propTypes {
        const items: PropTypes.Validator<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            title: PropTypes.Validator<string>;
            owner: PropTypes.Validator<string>;
            date: PropTypes.Validator<Date>;
            cube: PropTypes.Validator<string>;
            markdown: PropTypes.Validator<string>;
            dev: PropTypes.Validator<string>;
            date_formatted: PropTypes.Validator<string>;
            username: PropTypes.Validator<string>;
            cubename: PropTypes.Validator<string>;
        }>[]>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=Feed.d.ts.map
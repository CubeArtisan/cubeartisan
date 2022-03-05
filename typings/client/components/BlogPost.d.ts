export default BlogPost;
declare function BlogPost({ post, onEdit }: {
    post: any;
    onEdit: any;
}): JSX.Element;
declare namespace BlogPost {
    namespace propTypes {
        const post: PropTypes.Validator<PropTypes.InferProps<{
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
        }>>;
        const onEdit: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from "prop-types";
//# sourceMappingURL=BlogPost.d.ts.map
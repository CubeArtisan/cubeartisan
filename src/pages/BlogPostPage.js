import PropTypes from 'prop-types';

import BlogPost from 'components/BlogPost';
import DynamicFlash from 'components/DynamicFlash';
import MainLayout from 'layouts/MainLayout';
import RenderToRoot from 'utils/RenderToRoot';
import BlogPostPropType from 'proptypes/BlogPostPropType';

const BlogPostPage = ({ post, loginCallback }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <BlogPost key={post._id} post={post} noScroll />
  </MainLayout>
);

BlogPostPage.propTypes = {
  post: BlogPostPropType.isRequired,
  loginCallback: PropTypes.string,
};

BlogPostPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(BlogPostPage);

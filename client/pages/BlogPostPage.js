import PropTypes from 'prop-types';

import BlogPost from '@hypercube/client/components/BlogPost';
import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';
import BlogPostPropType from '@hypercube/client/proptypes/BlogPostPropType';

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

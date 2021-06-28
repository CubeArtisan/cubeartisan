import { useContext } from 'react';
import PropTypes from 'prop-types';
import ArticlePropType from '@hypercube/client/proptypes/ArticlePropType';

import { CardHeader, Card } from 'reactstrap';

import UserContext from '@hypercube/client/contexts/UserContext';
import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import Article from '@hypercube/client/components/Article';
import ButtonLink from '@hypercube/client/components/ButtonLink';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';

const ArticlePage = ({ loginCallback, article }) => {
  const user = useContext(UserContext);

  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <Card className="mb-3">
        {user && user.id === article.owner && article.status !== 'published' && (
          <CardHeader>
            <h5>
              <em className="pr-3">*Draft*</em>
              <ButtonLink color="success" outline href={`/content/article/edit/${article._id}`}>
                Edit
              </ButtonLink>
            </h5>
          </CardHeader>
        )}
        <Article article={article} />
      </Card>
    </MainLayout>
  );
};

ArticlePage.propTypes = {
  loginCallback: PropTypes.string,
  article: ArticlePropType.isRequired,
};

ArticlePage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(ArticlePage);

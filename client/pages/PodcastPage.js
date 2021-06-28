import { useContext } from 'react';
import PropTypes from 'prop-types';
import PodcastPropType from '@hypercube/client/proptypes/PodcastPropType';

import { CardHeader, Card } from 'reactstrap';

import UserContext from '@hypercube/client/contexts/UserContext';
import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import Podcast from '@hypercube/client/components/Podcast';
import ButtonLink from '@hypercube/client/components/ButtonLink';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';

const PodcastPage = ({ loginCallback, podcast, episodes }) => {
  const user = useContext(UserContext);

  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <Card className="mb-3">
        {user && user.id === podcast.owner && (
          <CardHeader>
            <h5>
              {podcast.status !== 'published' && (
                <>
                  <em className="pr-3">*Draft*</em>
                  <ButtonLink color="success" outline href={`/content/podcast/edit/${podcast._id}`}>
                    Edit
                  </ButtonLink>
                </>
              )}
              <ButtonLink color="primary" outline href={`/content/podcast/update/${podcast._id}`}>
                Fetch Episodes
              </ButtonLink>
            </h5>
          </CardHeader>
        )}
        <Podcast podcast={podcast} episodes={episodes} />
      </Card>
    </MainLayout>
  );
};

PodcastPage.propTypes = {
  loginCallback: PropTypes.string,
  podcast: PodcastPropType.isRequired,
  episodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

PodcastPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(PodcastPage);

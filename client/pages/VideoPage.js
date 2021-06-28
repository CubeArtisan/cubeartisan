import { useContext } from 'react';
import PropTypes from 'prop-types';
import VideoPropType from '@hypercube/client/proptypes/VideoPropType';

import { CardHeader, Card } from 'reactstrap';

import UserContext from '@hypercube/client/contexts/UserContext';
import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import Video from '@hypercube/client/components/Video';
import ButtonLink from '@hypercube/client/components/ButtonLink';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';

const VideoPage = ({ loginCallback, video }) => {
  const user = useContext(UserContext);

  return (
    <MainLayout loginCallback={loginCallback}>
      <DynamicFlash />
      <Card className="mb-3">
        {user && user.id === video.owner && video.status !== 'published' && (
          <CardHeader>
            <h5>
              <em className="pr-3">*Draft*</em>
              <ButtonLink color="success" outline href={`/content/video/edit/${video._id}`}>
                Edit
              </ButtonLink>
            </h5>
          </CardHeader>
        )}
        <Video video={video} />
      </Card>
    </MainLayout>
  );
};

VideoPage.propTypes = {
  loginCallback: PropTypes.string,
  video: VideoPropType.isRequired,
};

VideoPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(VideoPage);

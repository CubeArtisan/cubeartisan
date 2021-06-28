import PropTypes from 'prop-types';
import VideoPropType from '@hypercube/client/proptypes/VideoPropType';

import { Row, Col } from 'reactstrap';

import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import VideoPreview from '@hypercube/client/components/VideoPreview';
import Paginate from '@hypercube/client/components/Paginate';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';

const PAGE_SIZE = 24;

const VideosPage = ({ loginCallback, videos, count, page }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <h4>Videos</h4>
    <Row>
      {videos.map((video) => (
        <Col className="mb-3" xs="12" sm="6" lg="4">
          <VideoPreview video={video} />
        </Col>
      ))}
    </Row>
    {count > PAGE_SIZE && (
      <Paginate count={Math.ceil(count / PAGE_SIZE)} active={parseInt(page, 10)} urlF={(i) => `/content/videos/${i}`} />
    )}
  </MainLayout>
);

VideosPage.propTypes = {
  loginCallback: PropTypes.string,
  videos: PropTypes.arrayOf(VideoPropType).isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

VideosPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(VideosPage);

import PropTypes from 'prop-types';

import { Card, CardHeader, CardBody, Button, CardFooter } from 'reactstrap';
import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import ButtonLink from '@hypercube/client/components/ButtonLink';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';

const back = () => (window.history.length > 1 ? window.history.back() : window.close());

const LeaveWarningPage = ({ url, loginCallback, siteCustomizations: { siteName } }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <Card className="my-3">
      <CardHeader>
        <h4>You are about to leave {siteName}</h4>
      </CardHeader>
      <CardBody>
        <p>
          This link leads to: <code>{url}</code>
        </p>
        <p>Are you sure you want to proceed?</p>
      </CardBody>
      <CardFooter>
        <ButtonLink href={url} color="danger">
          Yes, continue
        </ButtonLink>
        <Button className="ml-2" color="secondary" onClick={back}>
          Go back
        </Button>
      </CardFooter>
    </Card>
  </MainLayout>
);

LeaveWarningPage.propTypes = {
  url: PropTypes.string.isRequired,
  loginCallback: PropTypes.string,
  siteCustomizations: PropTypes.shape({
    siteName: PropTypes.string.isRequired,
  }).isRequired,
};

LeaveWarningPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(LeaveWarningPage);

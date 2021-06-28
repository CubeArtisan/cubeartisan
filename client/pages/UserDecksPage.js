import PropTypes from 'prop-types';
import DeckPropType from '@hypercube/client/proptypes/DeckPropType';

import { Card, CardBody, CardHeader } from 'reactstrap';

import DeckPreview from '@hypercube/client/components/DeckPreview';
import Paginate from '@hypercube/client/components/Paginate';
import UserLayout from '@hypercube/client/layouts/UserLayout';
import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';

const UserDecksPage = ({ owner, followers, following, decks, pages, activePage, loginCallback }) => (
  <MainLayout loginCallback={loginCallback}>
    <UserLayout user={owner} followers={followers} following={following} activeLink="decks">
      <DynamicFlash />
      {pages > 1 && <Paginate count={pages} active={activePage} urlF={(i) => `/user/decks/${owner._id}/${i}`} />}
      <Card>
        <CardHeader>
          <h5 className="mb-0">All Decks</h5>
        </CardHeader>
        {decks.length > 0 ? (
          <CardBody className="p-0">
            {decks.map((deck) => (
              <DeckPreview key={deck._id} deck={deck} nextURL={`/user/decks/${owner._id}/${activePage}`} />
            ))}
          </CardBody>
        ) : (
          <CardBody>No decks to show.</CardBody>
        )}
      </Card>
      {pages > 1 && <Paginate count={pages} active={activePage} urlF={(i) => `/user/decks/${owner._id}/${i}`} />}
    </UserLayout>
  </MainLayout>
);

UserDecksPage.propTypes = {
  owner: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  followers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  following: PropTypes.bool.isRequired,
  decks: PropTypes.arrayOf(DeckPropType).isRequired,
  pages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  loginCallback: PropTypes.string,
};

UserDecksPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(UserDecksPage);

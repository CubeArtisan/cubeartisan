import PropTypes from 'prop-types';
import CubePropType from '@hypercube/client/proptypes/CubePropType';
import DeckPropType from '@hypercube/client/proptypes/DeckPropType';

import { Card, CardBody, CardHeader } from 'reactstrap';

import DeckPreview from '@hypercube/client/components/DeckPreview';
import Paginate from '@hypercube/client/components/Paginate';
import CubeLayout from '@hypercube/client/layouts/CubeLayout';
import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';

const CubeDecksPage = ({ cube, decks, pages, activePage, loginCallback }) => (
  <MainLayout loginCallback={loginCallback}>
    <DynamicFlash />
    <CubeLayout cube={cube} activeLink="playtest">
      <div className="my-3">
        {pages > 1 && <Paginate count={pages} active={activePage} urlF={(i) => `/cube/deck/decks/${cube._id}/${i}`} />}
        <Card>
          <CardHeader>
            <h5 className="mb-0">All Decks</h5>
          </CardHeader>
          <CardBody className="p-0">
            {decks.map((deck) => (
              <DeckPreview key={deck._id} deck={deck} nextURL={`/cube/deck/decks/${cube._id}/${activePage}`} />
            ))}
          </CardBody>
        </Card>
        {pages > 1 && <Paginate count={pages} active={activePage} urlF={(i) => `/cube/deck/decks/${cube._id}/${i}`} />}
      </div>
    </CubeLayout>
  </MainLayout>
);

CubeDecksPage.propTypes = {
  cube: CubePropType.isRequired,
  decks: PropTypes.arrayOf(DeckPropType).isRequired,
  pages: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  loginCallback: PropTypes.string,
};

CubeDecksPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(CubeDecksPage);

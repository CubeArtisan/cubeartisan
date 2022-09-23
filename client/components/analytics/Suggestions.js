/**
 * This file is part of CubeArtisan.
 *
 * CubeArtisan is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CubeArtisan is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with CubeArtisan.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Modified from the original version in CubeCobra. See LICENSE.CubeCobra for more information.
 */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import AddToCubeModal from '@cubeartisan/client/components/modals/AddToCubeModal.js';
import PagedList from '@cubeartisan/client/components/PagedList.js';
import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import SiteCustomizationContext from '@cubeartisan/client/components/contexts/SiteCustomizationContext.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import { cardName, cardNameLower, encodeName } from '@cubeartisan/client/utils/Card.js';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Label,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Row,
  Spinner,
} from 'reactstrap';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';

const AutocardA = withAutocard('a');
const AddModal = withModal(AutocardA, AddToCubeModal);

const Suggestion = ({ card, score, index, cube }) => {
  return (
    <ListGroupItem>
      <h6>
        {index + 1}
        {'. '}
        <AddModal
          front={card.details.image_normal}
          back={card.details.image_flip ?? undefined}
          href={`/card/${encodeName(card.cardID)}`}
          modalProps={{ card: card.details, hideAnalytics: false, cubeContext: cube._id }}
        >
          {cardName(card)}
        </AddModal>
        {` (${(score * 100).toFixed(2)}%)`}
      </h6>
    </ListGroupItem>
  );
};

Suggestion.propTypes = {
  card: CardPropType.isRequired,
  score: PropTypes.number.isRequired,
  cube: CubePropType.isRequired,
  index: PropTypes.number.isRequired,
};

const Suggestions = ({ adds, cuts, loadState, cube, filter }) => {
  const { siteName } = useContext(SiteCustomizationContext);
  const [maybeOnly, toggleMaybeOnly] = useToggle(false);

  const filteredCuts = useMemo(() => {
    const withIndex = cuts?.map((cut, index) => [cut, index]) ?? [];
    return filter ? withIndex.filter(([{ card }]) => filter(card)) : withIndex;
  }, [cuts, filter]);

  const filteredAdds = useMemo(() => {
    let withIndex = adds?.map((add, index) => [add, index]) ?? [];
    if (maybeOnly) {
      withIndex = withIndex.filter(([{ card }]) =>
        cube.maybe.some((maybe) => cardNameLower(maybe) === cardNameLower(card)),
      );
    }
    return filter ? withIndex.filter(([{ card }]) => filter(card)) : withIndex;
  }, [adds, maybeOnly, filter, cube.maybe]);

  return (
    <>
      <h4 className="d-lg-block d-none">Recommender</h4>
      <p>
        View recommended additions and cuts. This data is generated using a machine learning algorithm trained over all
        cubes on {siteName}.
      </p>
      {loadState === 'error' ? (
        <Card>
          <CardHeader>
            <h5>Service Unavailable</h5>
          </CardHeader>
          <CardBody>
            <p>We encountered an unexpected error while connecting to the recommender. Please try again later.</p>
          </CardBody>
        </Card>
      ) : (
        <Row>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <ListGroupItemHeading>Recommended Additions</ListGroupItemHeading>
                <input className="mr-2" type="checkbox" checked={maybeOnly} onClick={toggleMaybeOnly} />
                <Label for="toggleMaybeboard">Show cards from my Maybeboard only.</Label>
              </CardHeader>
              <ListGroup className="pb-3">
                {loadState === 'loading' && (
                  <CardBody>
                    <div className="centered py-3">
                      <Spinner className="position-absolute" />
                    </div>
                  </CardBody>
                )}
                {loadState === 'loaded' &&
                  (filteredAdds.length > 0 ? (
                    <PagedList
                      pageSize={20}
                      showBottom
                      pageWrap={(element) => <CardBody>{element}</CardBody>}
                      rows={filteredAdds.slice(0).map(([add, index]) => (
                        <Suggestion key={add.card.cardID} index={index} card={add.card} score={add.score} cube={cube} />
                      ))}
                    />
                  ) : (
                    <CardBody>
                      <em>No results with the given filter.</em>
                    </CardBody>
                  ))}
              </ListGroup>
            </Card>
          </Col>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <ListGroupItemHeading>Recommended Cuts</ListGroupItemHeading>
              </CardHeader>
              <ListGroup className="pb-3">
                {loadState === 'loading' && (
                  <CardBody>
                    <div className="centered py-3">
                      <Spinner className="position-absolute" />
                    </div>
                  </CardBody>
                )}
                {loadState === 'loaded' &&
                  (filteredCuts.length > 0 ? (
                    <PagedList
                      pageSize={20}
                      showBottom
                      pageWrap={(element) => <CardBody>{element}</CardBody>}
                      rows={filteredCuts.slice(0).map(([cut, index]) => (
                        <Suggestion key={cut.card.cardID} index={index} card={cut.card} score={cut.score} cube={cube} />
                      ))}
                    />
                  ) : (
                    <CardBody>
                      <em>No results with the given filter.</em>
                    </CardBody>
                  ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

Suggestions.propTypes = {
  adds: PropTypes.arrayOf(
    PropTypes.shape({ card: CardPropType.isRequired, score: PropTypes.number.isRequired }).isRequired,
  ).isRequired,
  cuts: PropTypes.arrayOf(
    PropTypes.shape({ card: CardPropType.isRequired, score: PropTypes.number.isRequired }).isRequired,
  ).isRequired,
  loadState: PropTypes.oneOf(['loading', 'loaded', 'error']).isRequired,
  cube: CubePropType.isRequired,
  filter: PropTypes.func,
};

Suggestions.defaultProps = {
  filter: null,
};

export default Suggestions;

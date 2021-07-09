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
import { useContext } from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';

import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import CardPackagePropType from '@cubeartisan/client/proptypes/CardPackagePropType.js';
import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';
import AddGroupToCubeModal from '@cubeartisan/client/components/modals/AddGroupToCubeModal.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import TextBadge from '@cubeartisan/client/components/TextBadge.js';
import Tooltip from '@cubeartisan/client/components/Tooltip.js';
import CommentsSection from '@cubeartisan/client/components/CommentsSection.js';

import { CardHeader, Card, CardBody, Row, Col, Button } from 'reactstrap';

import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';

const AddGroupToCubeModalLink = withModal(Button, AddGroupToCubeModal);
const AutocardA = withAutocard('a');

const CardPackage = ({ cardPackage, refresh }) => {
  const user = useContext(UserContext);

  const voted = user ? cardPackage.voters.includes(user.id) : false;

  const toggleVote = async () => {
    if (voted) {
      // downvote
      const response = await csrfFetch(`/package/${cardPackage._id}/vote`, { method: 'DELETE' });
      if (response.ok) {
        const json = await response.json();
        if (json.success === 'true') {
          refresh();
        }
      }
    } else {
      // upvote
      const response = await csrfFetch(`/package/${cardPackage._id}/vote`, { method: 'POST' });
      if (response.ok) {
        const json = await response.json();
        if (json.success === 'true') {
          refresh();
        }
      }
    }
  };

  const approve = async () => {
    const response = await csrfFetch(`/package/${cardPackage._id}/approve`, { method: 'POST' });
    if (response.ok) {
      refresh();
    }
  };

  const unapprove = async () => {
    const response = await csrfFetch(`/package/${cardPackage._id}/approve`, { method: 'DELETE' });
    if (response.ok) {
      refresh();
    }
  };

  const remove = async () => {
    const response = await csrfFetch(`/package/${cardPackage._id}`, { method: 'DELETE' });
    if (response.ok) {
      refresh();
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pl-4 pr-0 pt-2 pb-0">
        <Row>
          <Col xs="12" sm="6">
            <h5 className="card-title">
              <a href={`/package/${cardPackage._id}`}>{cardPackage.title}</a>
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              <a href={`/user/${cardPackage.userid}`}>{cardPackage.username}</a>
              {' submitted '}
              <TimeAgo date={cardPackage.date} />
            </h6>
          </Col>

          {user ? (
            <Col xs="12" sm="6" className="pb-2">
              <div className="flex-container flex-row-reverse">
                <TextBadge name="Votes" className="mx-2">
                  <Tooltip text={voted ? 'Click to remove your upvote' : 'Click to upvote this package'}>
                    <button
                      type="button"
                      className="cube-id-btn"
                      onKeyDown={() => {}}
                      onClick={() => {
                        toggleVote();
                      }}
                    >
                      {voted ? <b>{cardPackage.votes}</b> : cardPackage.votes}
                    </button>
                  </Tooltip>
                </TextBadge>

                <AddGroupToCubeModalLink
                  outline
                  color="success"
                  modalProps={{ cards: cardPackage.cards, cubes: user ? user.cubes : [], packid: cardPackage._id }}
                >
                  Add To Cube
                </AddGroupToCubeModalLink>
                {user.roles.includes('Admin') && (
                  <>
                    {cardPackage.approved ? (
                      <Button outline color="danger" className="mx-2" onClick={unapprove}>
                        Remove Approval
                      </Button>
                    ) : (
                      <Button outline color="success" className="mx-2" onClick={approve}>
                        Approve
                      </Button>
                    )}
                    <Button outline color="danger" onClick={remove}>
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </Col>
          ) : (
            <Col xs="6">
              <div className="float-right">
                <TextBadge name="Votes" className="mr-2">
                  <Tooltip text="Login to upvote">{cardPackage.votes}</Tooltip>
                </TextBadge>
              </div>
            </Col>
          )}
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          {cardPackage.cards.map((cardId) => (
            <Col key={`${cardPackage._id}-${cardId}`} className="col-6 col-md-2-4 col-lg-2-4 col-xl-2-4">
              <Card className="mb-3">
                <AutocardA href={`/card/${cardId}`} front={`/card/${cardId}/image`} target="_blank">
                  <img className="w-100" src={`/card/${cardId}/image`} alt={cardId} />
                </AutocardA>
              </Card>
            </Col>
          ))}
        </Row>
      </CardBody>
      <div className="border-top">
        <CommentsSection parentType="package" parent={cardPackage._id} collapse />
      </div>
    </Card>
  );
};

CardPackage.propTypes = {
  cardPackage: CardPackagePropType.isRequired,
  refresh: PropTypes.func,
};

CardPackage.defaultProps = {
  refresh: () => {},
};

export default CardPackage;

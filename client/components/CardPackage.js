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
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Container, Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material';

import TimeAgo from '@cubeartisan/client/components/TimeAgo.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import CardPackagePropType from '@cubeartisan/client/proptypes/CardPackagePropType.js';
import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';
import AddGroupToCubeModal from '@cubeartisan/client/components/modals/AddGroupToCubeModal.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import TextBadge from '@cubeartisan/client/components/TextBadge.js';
import Tooltip from '@cubeartisan/client/components/Tooltip.js';
import CommentsSection from '@cubeartisan/client/components/CommentsSection.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';
import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';

const AddGroupToCubeModalLink = withModal(Button, AddGroupToCubeModal);
const AutocardA = withAutocard('a');

const CardPackage = ({ cardPackage, refresh }) => {
  const user = useContext(UserContext);

  const voted = user ? cardPackage.voters.includes(user._id) : false;

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
  const { cardsInRow } = useContext(DisplayContext);

  return (
    <Container>
      <Stack divider={<Divider orientation="horizontal" flexItem />} spacing={1}>
        <Box sx={{ backgroundColor: 'var(--bg-darker)' }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Link variant="h5" href={`/package/${cardPackage._id}`}>
                {cardPackage.title}
              </Link>
              <Typography variant="h6">
                <Link href={`/user/${cardPackage.userid}`}>{cardPackage.username}</Link>
                {' submitted '}
                <TimeAgo date={cardPackage.date} />
              </Typography>
            </Grid>

            {user ? (
              <Grid item xs={12} sm={6}>
                <TextBadge name="Votes" className="mx-2">
                  <Tooltip title={voted ? 'Click to remove your upvote' : 'Click to upvote this package'}>
                    <Button
                      type="button"
                      className="cube-id-btn"
                      onClick={() => {
                        toggleVote();
                      }}
                    >
                      {voted ? <b>{cardPackage.votes}</b> : cardPackage.votes}
                    </Button>
                  </Tooltip>
                </TextBadge>

                <AddGroupToCubeModalLink
                  variant="outlined"
                  color="success"
                  modalProps={{ cards: cardPackage.cards, cubes: user ? user.cubes : [], packid: cardPackage._id }}
                >
                  <Button>Add To Cube</Button>
                </AddGroupToCubeModalLink>
                {user.roles.includes('Admin') && (
                  <>
                    {cardPackage.approved ? (
                      <Button variant="outlined" color="danger" className="mx-2" onClick={unapprove}>
                        Remove Approval
                      </Button>
                    ) : (
                      <Button variant="outlined" color="success" className="mx-2" onClick={approve}>
                        Approve
                      </Button>
                    )}
                    <Button variant="outlined" color="danger" onClick={remove}>
                      Delete
                    </Button>
                  </>
                )}
              </Grid>
            ) : (
              <Grid item xs={6}>
                <TextBadge name="Votes" className="mr-2">
                  <Tooltip text="Login to upvote">
                    <Typography variant="button">{cardPackage.votes}</Typography>
                  </Tooltip>
                </TextBadge>
              </Grid>
            )}
          </Grid>
        </Box>
        <Grid container spacing={2} columns={cardsInRow}>
          {cardPackage.cards.map((cardId) => (
            <Grid item key={`${cardPackage._id}-${cardId}`} xs={1}>
              <Paper elevation={1}>
                <AutocardA href={`/card/${cardId}`} front={`/card/${cardId}/image/redirect`} target="_blank">
                  <img className="w-100" src={`/card/${cardId}/image/redirect`} alt={cardId} />
                </AutocardA>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <CommentsSection parentType="package" parent={cardPackage._id} collapse />
      </Stack>
    </Container>
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

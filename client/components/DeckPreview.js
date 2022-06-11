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
import { Box, Button, Link, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext, useMemo, useState } from 'react';

import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DeckDeleteModal from '@cubeartisan/client/components/modals/DeckDeleteModal.js';
import TimeAgo from '@cubeartisan/client/components/wrappers/TimeAgo.js';
import DeckPropType from '@cubeartisan/client/proptypes/DeckPropType.js';

/**
 * @typedef {import('@cubeartisan/client/proptypes/DeckPropType.js').Deck} Deck
 */

/* 2020-11-17 struesdell:
 *  Pulled constants out of component render so that they are defined only once
 */
const MAX_LENGTH = 35;
const DEFAULT_DECK_NAME = 'Untitled Deck.js';

/* 2020-11-17 struesdell:
 *  Pulled string truncation logic out of component render and made it more
 *  abstract and reusable. Consider refactoring into shared utilities.
 */
/**
 * @param {number} len
 * @param {string?} s
 */
const truncateToLength = (len, s) => {
  if (!s) {
    return '';
  }
  return s.length > len ? `${s.slice(0, len - 3)}...` : s;
};

/**
 * @typedef DeckPreviewProps
 * @property {Deck} deck
 * @property {string?} [nextURL]
 */

/** @type {React.FC<DeckPreviewProps>} */
const DeckPreview = ({ deck, nextURL }) => {
  const user = useContext(UserContext);
  const canEdit = user && (user._id === deck.owner || user._id === deck.cubeOwner);

  const { date } = deck;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  /** 2020-11-17 struesdell:
   *  Refactored name derivation to take advantage of react.useMemo
   */
  const [fullName, name] = useMemo(
    () =>
      deck && deck.seats && deck.seats[0].name
        ? [deck.seats[0].name, truncateToLength(MAX_LENGTH, deck.seats[0].name)]
        : [DEFAULT_DECK_NAME, DEFAULT_DECK_NAME],
    [deck],
  );

  /** @param {any} event */
  const openDeleteModal = (event) => {
    event.stopPropagation();
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <Box sx={{ marginY: 0.5, display: 'flex' }}>
      <Typography variant="body1">
        <Link href={`/deck/${deck._id}`} title={fullName}>
          {name}
        </Link>
        {' by '}
        {deck.seats[0].userid && deck.seats[0].username ? (
          <Link href={`/user/${deck.seats[0].userid}`}>{deck.seats[0].username}</Link>
        ) : (
          'Anonymous'
        )}
        {' — '}
        <TimeAgo date={date} />
      </Typography>
      {canEdit && (
        <Button
          type="button"
          className="close"
          onClick={openDeleteModal}
          sx={{
            marginLeft: 'auto',
            fontSize: '0.8rem',
            textAlign: 'center',
            width: 19,
            height: 19,
            paddingBottom: 2,
            lineHeight: 17,
            border: '1px solid',
          }}
        >
          X
          <DeckDeleteModal
            toggle={closeDeleteModal}
            isOpen={deleteModalOpen}
            deckID={deck._id}
            cubeID={deck.cube}
            nextURL={nextURL}
          />
        </Button>
      )}
    </Box>
  );
};
DeckPreview.propTypes = {
  // @ts-ignore
  deck: DeckPropType.isRequired,
  nextURL: PropTypes.string,
};
DeckPreview.defaultProps = {
  nextURL: null,
};
export default DeckPreview;

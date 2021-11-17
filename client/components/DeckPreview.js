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
import React, { useCallback, useMemo, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button.js';

import DeckPropType from '@cubeartisan/client/proptypes/DeckPropType.js';
import TimeAgo from '@cubeartisan/client/components/TimeAgo.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import useKeyHandlers from '@cubeartisan/client/hooks/UseKeyHandlers.js';
import DeckDeleteModal from '@cubeartisan/client/components/modals/DeckDeleteModal.js';
import styled from '@cubeartisan/client/utils/styledHelper.js';

/** 2020-11-17 struesdell:
 *  Pulled constants out of component render so that they are defined only once
 */
const MAX_LENGTH = 35;
const DEFAULT_DECK_NAME = 'Untitled Deck.js';

const DeleteButton = styled(Button)`
  font-size: 0.8rem;
  text-align: center;
  width: 19px;
  height: 19px;
  padding-bottom: 2px;
  line-height: 17px;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;

/** 2020-11-17 struesdell:
 *  Pulled string truncation logic out of component render and made it more
 *  abstract and reusable. Consider refactoring into shared utilities.
 */
const truncateToLength = (len, s) => {
  if (!s) {
    return '';
  }
  return s.length > len ? `${s.slice(0, len - 3)}...` : s;
};

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

  const handleClick = useKeyHandlers(
    useCallback(() => {
      window.location.href = `/deck/${deck._id}`;
    }, [deck._id]),
  );

  const openDeleteModal = (event) => {
    event.stopPropagation();
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className="deck-preview" {...handleClick}>
      {canEdit && (
        <>
          <DeleteButton type="button" className="close" onClick={openDeleteModal}>
            X
            <DeckDeleteModal
              toggle={closeDeleteModal}
              isOpen={deleteModalOpen}
              deckID={deck._id}
              cubeID={deck.cube}
              nextURL={nextURL}
            />
          </DeleteButton>
        </>
      )}
      <h6 className="mb-0 text-muted">
        <a href={`/deck/${deck._id}`} title={fullName}>
          {name}
        </a>{' '}
        by{' '}
        {deck.seats[0].userid && deck.seats[0].username ? (
          <a href={`/user/${deck.seats[0].userid}`}>{deck.seats[0].username}</a>
        ) : (
          'Anonymous'
        )}{' '}
        - <TimeAgo date={date} />
      </h6>
    </div>
  );
};
DeckPreview.propTypes = {
  deck: DeckPropType.isRequired,
  nextURL: PropTypes.string,
};
DeckPreview.defaultProps = {
  nextURL: null,
};

export default DeckPreview;

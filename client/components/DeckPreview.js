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
import { useCallback, useMemo, useState, useContext } from 'react';

import PropTypes from 'prop-types';
import DeckPropType from '@cubeartisan/client/proptypes/DeckPropType';

import TimeAgo from 'react-timeago';

import UserContext from '@cubeartisan/client/components/contexts/UserContext';
import useKeyHandlers from '@cubeartisan/client/hooks/UseKeyHandlers';
import DeckDeleteModal from '@cubeartisan/client/components/modals/DeckDeleteModal';

/** 2020-11-17 struesdell:
 *  Pulled constants out of component render so that they are defined only once
 */
const MAX_LENGTH = 35;
const DEFAULT_DECK_NAME = 'Untitled Deck';

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
  const canEdit = user && (user.id === deck.owner || user.id === deck.cubeOwner);

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
          <button
            type="button"
            className="close"
            style={{
              fontSize: '.8rem',
              textAlign: 'center',
              width: '19px',
              height: '19px',
              paddingBottom: '2px',
              lineHeight: '17px',
              border: '1px solid rgba(0,0,0,.5)',
            }}
            onClick={openDeleteModal}
          >
            X
            <DeckDeleteModal
              toggle={closeDeleteModal}
              isOpen={deleteModalOpen}
              deckID={deck._id}
              cubeID={deck.cube}
              nextURL={nextURL}
            />
          </button>
        </>
      )}
      <h6 className="mb-0 text-muted">
        <a href={`/deck/${deck._id}`} title={fullName}>
          {name}
        </a>{' '}
        by {deck.seats[0].userid ? <a href={`/user/${deck.seats[0].userid}`}>{deck.seats[0].username}</a> : 'Anonymous'}{' '}
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

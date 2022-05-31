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
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useContext, useMemo, useState } from 'react';

import AutocardListItem from '@cubeartisan/client/components/AutocardListItem.js';
import ChangelistContext from '@cubeartisan/client/components/contexts/ChangelistContext.js';
import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';
import MaybeboardContext from '@cubeartisan/client/components/contexts/MaybeboardContext.js';
import { getCard } from '@cubeartisan/client/components/EditCollapse.js';
import { AutocompleteCardField } from '@cubeartisan/client/components/inputs/AutocompleteInput.js';
import TableView from '@cubeartisan/client/components/TableView.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';

const MaybeboardListItem = ({ card }) => {
  const { canEdit, cubeID } = useContext(CubeContext);
  const { removeMaybeboardCard } = useContext(MaybeboardContext);
  const { removeInputRef, setAddValue, openEditCollapse } = useContext(ChangelistContext);
  const [loading, setLoading] = useState(false);

  const handleRemove = useCallback(
    async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const index = parseInt(event.currentTarget.getAttribute('data-index'), 10);
      if (!Number.isInteger(index)) {
        console.error('Bad index');
        return;
      }

      setLoading(true);
      const response = await csrfFetch(`/cube/${cubeID}/maybe`, {
        method: 'PUT',
        body: JSON.stringify({
          remove: [index],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const json = await response.json();
        if (json.success === 'true') {
          removeMaybeboardCard(index);
        } else {
          console.error(json.message);
        }
      }
      setLoading(false);
    },
    [removeMaybeboardCard, cubeID],
  );

  const handleAdd = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setAddValue(card.details.name);
      openEditCollapse();
      if (removeInputRef.current) {
        removeInputRef.current.focus();
      }
    },
    [card, setAddValue, openEditCollapse, removeInputRef],
  );

  return (
    <AutocardListItem card={card} noCardModal>
      {canEdit && (
        <Box sx={{ display: 'flex', marginLeft: 'auto', width: 'min-content' }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Button
                color="primary"
                data-index={card.index}
                onClick={handleAdd}
                aria-label="Add"
                sx={{ minWidth: 0 }}
                size="small"
                disableRipple
              >
                +
              </Button>
              <Button
                color="warning"
                data-index={card.index}
                onClick={handleRemove}
                aria-label="Remove"
                size="small"
                sx={{ minWidth: 0 }}
              >
                X
              </Button>
            </>
          )}
        </Box>
      )}
    </AutocardListItem>
  );
};
MaybeboardListItem.propTypes = {
  card: CardPropType.isRequired,
};

const Maybeboard = ({ filter, ...props }) => {
  const { canEdit, cubeID } = useContext(CubeContext);
  const { toggleShowMaybeboard } = useContext(DisplayContext);
  const { maybeboard, addMaybeboardCard } = useContext(MaybeboardContext);
  const [loading, setLoading] = useState(false);

  const maybeboardIndex = useMemo(() => maybeboard.map((card, index) => ({ ...card, index })), [maybeboard]);

  const filteredMaybeboard = useMemo(
    () => (filter ? maybeboardIndex.filter(filter) : maybeboardIndex),
    [filter, maybeboardIndex],
  );

  const handleAdd = useCallback(
    async (addValue) => {
      try {
        setLoading(true);
        const card = await getCard(cubeID, addValue);
        if (!card) {
          setLoading(false);
          return;
        }

        const response = await csrfFetch(`/cube/${cubeID}/maybe`, {
          method: 'PUT',
          body: JSON.stringify({
            add: [{ details: card }],
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const json = await response.json();
          if (json.success === 'true') {
            addMaybeboardCard({ _id: json.added[card._id], cardID: card._id, details: card, tags: [] });
          } else {
            console.error(json.message);
          }
        }
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    },
    [addMaybeboardCard, cubeID, setLoading],
  );

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Maybeboard
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        {canEdit && (
          <AutocompleteCardField
            disabled={loading}
            InputProps={{ placeholder: 'Card to Add' }}
            submitButtonProps={{ color: 'success', loading, size: 'large' }}
            submitButtonText="Add"
            onSubmit={handleAdd}
            sx={{ marginRight: 1 }}
          />
        )}
        <Button color="primary" onClick={toggleShowMaybeboard} sx={{ marginLeft: 2 }}>
          Hide Maybeboard
        </Button>
      </Box>
      {maybeboard.length === 0 ? (
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          No cards in maybeboard
          {filter && filter.length > 0 ? ' matching filter.' : '.'}
        </Typography>
      ) : (
        <TableView cards={filteredMaybeboard} rowTag={MaybeboardListItem} noGroupModal {...props} />
      )}
    </>
  );
};
Maybeboard.propTypes = {
  filter: PropTypes.func,
};
Maybeboard.defaultProps = {
  filter: () => {},
};
export default Maybeboard;

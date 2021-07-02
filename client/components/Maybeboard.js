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
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType';

import { Button, Col, Form, ListGroupItem, Row, Spinner } from 'reactstrap';

import { csrfFetch } from '@cubeartisan/client/utils/CSRF';

import AutocompleteInput from '@cubeartisan/client/components/AutocompleteInput';
import CardModalContext from '@cubeartisan/client/contexts/CardModalContext';
import CardModalForm from '@cubeartisan/client/components/CardModalForm';
import ChangelistContext from '@cubeartisan/client/contexts/ChangelistContext';
import CubeContext from '@cubeartisan/client/contexts/CubeContext';
import DisplayContext from '@cubeartisan/client/contexts/DisplayContext';
import { getCard } from '@cubeartisan/client/components/EditCollapse';
import LoadingButton from '@cubeartisan/client/components/LoadingButton';
import MaybeboardContext from '@cubeartisan/client/contexts/MaybeboardContext';
import TableView from '@cubeartisan/client/components/TableView';
import { getCardColorClass } from '@cubeartisan/client/contexts/TagContext';
import withAutocard from '@cubeartisan/client/components/WithAutocard';

const AutocardItem = withAutocard(ListGroupItem);

const MaybeboardListItem = ({ card, className }) => {
  const { canEdit, cubeID } = useContext(CubeContext);
  const { removeMaybeboardCard } = useContext(MaybeboardContext);
  const { removeInputRef, setAddValue, openEditCollapse } = useContext(ChangelistContext);
  const openCardModal = useContext(CardModalContext);
  const [loading, setLoading] = useState(false);

  const handleEdit = useCallback(() => {
    openCardModal(card, true);
  }, [card, openCardModal]);

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
      const response = await csrfFetch(`/cube/api/maybe/${cubeID}`, {
        method: 'POST',
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
          /* eslint-disable-line no-undef */ autocard_hide_card();
        } else {
          setLoading(false);
          console.error(json.message);
        }
      }
    },
    [removeMaybeboardCard, cubeID],
  );

  return (
    <AutocardItem
      className={`d-flex card-list-item ${getCardColorClass(card)} ${className || ''}`}
      card={card}
      data-index={card.index}
      onClick={handleEdit}
      role="button"
    >
      <div className="name">{card.details.name}</div>
      {canEdit &&
        (loading ? (
          <Spinner size="sm" className="ml-auto" />
        ) : (
          <>
            <button
              type="button"
              className="icon-button ml-auto"
              data-index={card.index}
              onClick={handleAdd}
              aria-label="Add"
            >
              <span aria-hidden="true">+</span>
            </button>
            <Button
              size="sm"
              close
              className="float-none"
              data-index={card.index}
              onClick={handleRemove}
              aria-label="Remove"
            />
          </>
        ))}
    </AutocardItem>
  );
};

MaybeboardListItem.propTypes = {
  card: CardPropType.isRequired,
  className: PropTypes.string,
};

MaybeboardListItem.defaultProps = {
  className: null,
};

const Maybeboard = ({ filter, ...props }) => {
  const { canEdit, cubeID } = useContext(CubeContext);
  const { toggleShowMaybeboard } = useContext(DisplayContext);
  const { maybeboard, addMaybeboardCard } = useContext(MaybeboardContext);
  const addInput = useRef();
  const [loading, setLoading] = useState(false);

  const handleAdd = useCallback(
    async (event, newValue) => {
      event.preventDefault();
      if (!addInput.current) return;
      try {
        setLoading(true);
        const card = await getCard(cubeID, newValue || addInput.current.value);
        if (!card) {
          setLoading(false);
          return;
        }

        const response = await csrfFetch(`/cube/api/maybe/${cubeID}`, {
          method: 'POST',
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

        addInput.current.value = '';
        addInput.current.focus();
      } catch (e) {
        console.error(e);
      }
    },
    [addMaybeboardCard, addInput, cubeID],
  );

  const maybeboardIndex = useMemo(() => maybeboard.map((card, index) => ({ ...card, index })), [maybeboard]);

  const filteredMaybeboard = useMemo(() => {
    return filter ? maybeboardIndex.filter(filter) : maybeboardIndex;
  }, [filter, maybeboardIndex]);

  return (
    <CardModalForm>
      <Row>
        <Col className="mr-auto">
          <h4>Maybeboard</h4>
        </Col>
        <Col xs="auto">
          <Button color="primary" size="sm" onClick={toggleShowMaybeboard}>
            Hide <span className="d-none d-sm-inline">Maybeboard</span>
          </Button>
        </Col>
      </Row>
      {canEdit && (
        <Form className="mt-2 w-100" onSubmit={handleAdd}>
          <Row noGutters>
            <Col xs="9" sm="auto" className="pr-2">
              <AutocompleteInput
                treeUrl="/cube/api/cardnames"
                treePath="cardnames"
                type="text"
                className="w-100"
                disabled={loading}
                innerRef={addInput}
                onSubmit={handleAdd}
                placeholder="Card to Add"
                autoComplete="off"
                data-lpignore
              />
            </Col>
            <Col xs="3" sm="auto">
              <LoadingButton color="success" type="submit" className="w-100" loading={loading}>
                Add
              </LoadingButton>
            </Col>
          </Row>
        </Form>
      )}
      {maybeboard.length === 0 ? (
        <h5 className="mt-3">
          No cards in maybeboard
          {filter && filter.length > 0 ? ' matching filter.' : '.'}
        </h5>
      ) : (
        <TableView className="mt-3" cards={filteredMaybeboard} rowTag={MaybeboardListItem} noGroupModal {...props} />
      )}
      <hr />
    </CardModalForm>
  );
};

Maybeboard.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Maybeboard;

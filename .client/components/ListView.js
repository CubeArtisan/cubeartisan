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

import { TableCell } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Form, Input } from 'reactstrap';

import PagedTable from '@cubeartisan/client/components/containers/PagedTable.js';
import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import GroupModalContext from '@cubeartisan/client/components/contexts/GroupModalContext.js';
import SortContext from '@cubeartisan/client/components/contexts/SortContext.js';
import TagContext from '@cubeartisan/client/components/contexts/TagContext.js';
import withAutocard from '@cubeartisan/client/components/hoc/WithAutocard.js';
import withLoading from '@cubeartisan/client/components/hoc/WithLoading.js';
import { AutocompleteTagField } from '@cubeartisan/client/components/inputs/AutocompleteInput.js';
import useAlerts, { Alerts } from '@cubeartisan/client/hooks/UseAlerts.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import { cardName, cardsAreEquivalent, normalizeName } from '@cubeartisan/client/utils/Card.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';
import { getLabels, sortDeep } from '@cubeartisan/client/utils/Sort.js';

const colorCombos = [
  'C',
  'W',
  'U',
  'B',
  'R',
  'G',
  'WU',
  'WB',
  'WR',
  'WG',
  'UB',
  'UR',
  'UG',
  'BR',
  'BG',
  'RG',
  'WUB',
  'WUR',
  'WUG',
  'WBR',
  'WBG',
  'WRG',
  'UBR',
  'UBG',
  'URG',
  'BRG',
  'WUBR',
  'WUBG',
  'WURG',
  'WBRG',
  'UBRG',
  'WUBRG',
];

const AutocardTd = withAutocard(TableCell);

const LoadingInput = withLoading(Input, ['onBlur']);
const LoadingInputChange = withLoading(Input, ['onChange']);

const defaultVersions = (card) => {
  const fullName = card.details.full_name;
  return [
    {
      ...card.details,
      version: fullName.toUpperCase().substring(fullName.indexOf('[') + 1, fullName.indexOf(']')),
    },
  ];
};

const ListViewRow = ({ card, versions, versionsLoading, checked, onCheck, addAlert }) => {
  // FIXME: This state should just be managed in the card object.
  const [tags, setTags] = useState(card.tags.map((tag) => ({ id: tag, text: tag })));
  const [values, setValues] = useState({
    ...card,
    colors: (card.colors || []).join('') || 'C',
  });

  const { cubeID, updateCubeCard } = useContext(CubeContext);
  const { cardColorClass } = useContext(TagContext);

  const { index } = card;

  const syncCard = useCallback(
    async (updated) => {
      updated = { ...card, ...updated };
      delete updated.details;

      if (cardsAreEquivalent(card, updated)) {
        // no need to sync
        return;
      }

      try {
        const response = await csrfFetch(`/cube/${cubeID}/card/${card.index}`, {
          method: 'PUT',
          body: JSON.stringify({
            src: card,
            updated,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          let message;
          try {
            const json = await response.json();
            message = json.message;
          } catch {
            message = `status ${response.status}`;
          }
          addAlert('danger', `Failed to update ${cardName(card)} (${message})`);
          return;
        }

        const json = await response.json();
        if (json.success === 'true') {
          const oldCardID = card.cardID;
          const newCard = { ...card, ...updated };
          updateCubeCard(card.index, newCard);
          if (updated.cardID !== oldCardID) {
            // changed version
            const getResponse = await fetch(`/card/${updated.cardID}/details`);
            const getJson = await getResponse.json();
            updateCubeCard(card.index, { ...newCard, details: { ...newCard.details, ...getJson.card } });
          }
        }
      } catch (err) {
        addAlert('danger', 'Failed to send update request.');
        throw err;
      }
    },
    [cubeID, card, updateCubeCard, addAlert],
  );

  const updateTags = useCallback(
    async (newTags) => {
      setTags(newTags);
      try {
        await syncCard({ tags: newTags.map((newTag) => newTag.text) });
      } catch (err) {
        setTags(tags);
      }
    },
    [syncCard, tags],
  );

  const handleChange = useCallback(
    async (event) => {
      const { target } = event;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const { name, tagName } = target;

      const updateF = (currentValues) => ({
        ...currentValues,
        [name]: value,
      });

      if (tagName.toLowerCase() === 'select') {
        try {
          const updatedCard = {};
          if (name === 'colors') {
            updatedCard.colors = value === 'C' ? [] : Array.from(value);
          } else {
            updatedCard[name] = value;
          }

          await syncCard(updatedCard);
          setValues(updateF);
        } catch (err) {
          // FIXME: Display in UI.
          console.error(err);
        }
      } else {
        setValues(updateF);
      }
    },
    [syncCard],
  );

  const handleBlur = useCallback(
    async (event) => {
      const { target } = event;
      const { name, tagName } = target;
      const value = name === 'cmc' ? parseFloat(target.value) : target.value;

      // <select>s handled in handleChange above.
      if (tagName.toLowerCase() !== 'select') {
        try {
          // Note: We can use this logic on all but the colors field, which is a select anyway so this path is irrelevant.
          await syncCard({
            [name]: value,
          });
        } catch (err) {
          // FIXME: Display in UI.
          console.error(err);
        }
      }
    },
    [syncCard],
  );

  const inputProps = (field) => ({
    bsSize: 'sm',
    spinnerSize: 'sm',
    name: field,
    onChange: handleChange,
    onBlur: handleBlur,
    value: values[field],
    'data-lpignore': true,
  });

  return (
    <tr className={cardColorClass(card)}>
      <td className="align-middle">
        <Input
          type="checkbox"
          bsSize="sm"
          data-index={index}
          checked={checked}
          onChange={onCheck}
          className="d-block mx-auto"
        />
      </td>
      <AutocardTd className="align-middle text-truncate" card={card}>
        {cardName(card)}
      </AutocardTd>
      <td>
        <Input
          {...inputProps('cardID')}
          type="select"
          className="w-100"
          loading={versionsLoading ? true : null}
          sx={{ maxWidth: '6rem' }}
        >
          {versions.map(({ _id, version }) => (
            <option key={_id} value={_id}>
              {version}
            </option>
          ))}
        </Input>
      </td>
      <td>
        <LoadingInput {...inputProps('type_line')} type="text" />
      </td>
      <td>
        <LoadingInputChange {...inputProps('status')} type="select">
          {getLabels(null, 'Status').map((status) => (
            <option key={status}>{status}</option>
          ))}
        </LoadingInputChange>
      </td>
      <td>
        <LoadingInputChange {...inputProps('finish')} type="select">
          {getLabels(null, 'Finish').map((finish) => (
            <option key={finish}>{finish}</option>
          ))}
        </LoadingInputChange>
      </td>
      <td>
        <Input {...inputProps('cmc')} type="text" sx={{ maxWidth: '1rem' }} />
      </td>
      <td>
        <LoadingInputChange {...inputProps('colors')} type="select">
          {colorCombos.map((combo) => (
            <option key={combo}>{combo}</option>
          ))}
        </LoadingInputChange>
      </td>
      <TableCell sx={{ minWidth: '15rem' }}>
        <AutocompleteTagField
          updateTags={updateTags}
          tags={tags}
          InputProps={{ name: 'tagInput', fullWidth: true }}
          freeSolo
          multiple
        />
      </TableCell>
    </tr>
  );
};

ListViewRow.propTypes = {
  card: CardPropType.isRequired,
  versions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      version: PropTypes.string.isRequired,
    }),
  ).isRequired,
  versionsLoading: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  addAlert: PropTypes.func.isRequired,
};

const ListView = ({ cards }) => {
  const [versionDict, setVersionDict] = useState({});
  const [versionsLoading, setVersionsLoading] = useState(false);
  const [checked, setChecked] = useState([]);

  const { cube } = useContext(CubeContext);
  const { setGroupModalCards } = useContext(GroupModalContext);
  const { primary, secondary, tertiary, quaternary, showOther } = useContext(SortContext);

  const { addAlert, alerts } = useAlerts();

  useEffect(() => {
    const wrapper = async () => {
      setVersionsLoading(true);
      const response = await csrfFetch('/cards/versions', {
        method: 'POST',
        body: JSON.stringify(cube.cards.map(({ cardID }) => cardID)),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.error(response);
        return;
      }

      const json = await response.json();
      setVersionsLoading(false);
      setVersionDict((current) => ({ ...current, ...json.dict }));
    };
    wrapper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckAll = useCallback(
    (event) => {
      const value = event.target.checked;

      if (value) {
        setChecked(cards.map(({ index }) => index));
        setGroupModalCards(cards);
      } else {
        setChecked([]);
        setGroupModalCards([]);
      }
    },
    [cards, setGroupModalCards],
  );

  const handleCheck = useCallback(
    (event) => {
      const value = event.target.checked;
      const index = parseInt(event.target.getAttribute('data-index'), 10);
      if (Number.isInteger(index)) {
        let newChecked = checked;
        if (value) {
          if (!newChecked.includes(index)) {
            newChecked = [...checked, index];
          }
        } else {
          newChecked = checked.filter((testIndex) => testIndex !== index);
        }
        setChecked(newChecked);
        setGroupModalCards(
          newChecked.map((cardIndex) => cards.find((card) => card.index === cardIndex)).filter((x) => x),
        );
      }
    },
    [checked, cards, setGroupModalCards],
  );

  const sorted = sortDeep(cards, showOther, quaternary, primary, secondary, tertiary);

  const rows = sorted.map(([, group1]) =>
    group1.map(([, group2]) =>
      group2.map(([, group3]) =>
        group3.map((card) => (
          <ListViewRow
            key={card._id}
            card={card}
            versions={versionDict[normalizeName(cardName(card))] || defaultVersions(card)}
            versionsLoading={versionsLoading}
            checked={checked.includes(card.index)}
            onCheck={handleCheck}
            addAlert={addAlert}
          />
        )),
      ),
    ),
  );

  const rowsFlat = rows.flat().flat().flat();

  return (
    <>
      <Alerts alerts={alerts} />
      <Form inline>
        <PagedTable rows={rowsFlat} size="sm" pageSize={100} className="list-view-table">
          <thead>
            <tr>
              <th className="align-middle">
                <Input type="checkbox" className="d-block mx-auto" onChange={handleCheckAll} />
              </th>
              <th>Name</th>
              <th>Version</th>
              <th>Type</th>
              <th>Status</th>
              <th>Finish</th>
              <th>MV</th>
              <th>Color</th>
              <th>Tags</th>
            </tr>
          </thead>
        </PagedTable>
      </Form>
    </>
  );
};

ListView.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ListView;

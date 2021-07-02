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
import { useCallback, useContext, useEffect, useState } from 'react';

import { cardsAreEquivalent, normalizeName } from '@cubeartisan/client/utils/Card';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF';
import { arrayMove } from '@cubeartisan/client/utils/Util';

import CardModal from '@cubeartisan/client/components/CardModal';
import CardModalContext from '@cubeartisan/client/contexts/CardModalContext';
import ChangelistContext from '@cubeartisan/client/contexts/ChangelistContext';
import CubeContext from '@cubeartisan/client/contexts/CubeContext';
import MaybeboardContext from '@cubeartisan/client/contexts/MaybeboardContext';
import { cardGetLabels } from '@cubeartisan/client/utils/Sort';

const CardModalForm = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [card, setCard] = useState({ colors: [], details: { type: '' }, tags: [], type_line: '' });
  const [maybe, setMaybe] = useState(false);
  const [versionDict, setVersionDict] = useState({});
  const [versionsLoading, setVersionsLoading] = useState(true);
  const [formValues, setFormValues] = useState({ tags: [] });

  const { addChange } = useContext(ChangelistContext);
  const { updateMaybeboardCard } = useContext(MaybeboardContext);
  const { cube, canEdit, cubeID, updateCubeCard } = useContext(CubeContext);

  useEffect(() => {
    const wrapper = async () => {
      if (!cube) return;
      const allIds = [...cube.cards, ...(cube.maybe || [])].map(({ cardID }) => cardID);
      const response = await csrfFetch(`/cube/api/getversions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allIds),
      });
      const json = await response.json();
      setVersionDict(json.dict || {});
      setVersionsLoading(false);
    };
    wrapper();
  }, [cube]);

  const setTagInput = useCallback(
    (value) =>
      setFormValues((formValues) => ({
        ...formValues,
        tagInput: value,
      })),
    [],
  );

  const setTags = useCallback((tagF) => {
    setFormValues(({ tags, ...formValues }) => ({ ...formValues, tags: tagF(tags) }));
  }, []);
  const addTag = useCallback((tag) => {
    setTags((tags) => [...tags, tag]);
    setTagInput('');
  }, []);
  const addTagText = useCallback((tag) => tag.trim() && addTag({ text: tag.trim(), id: tag.trim() }), [addTag]);
  const deleteTag = useCallback((tagIndex) => {
    setTags((tags) => tags.filter((_, i) => i !== tagIndex));
  }, []);
  const reorderTag = useCallback((_, currIndex, newIndex) => {
    setTags((tags) => arrayMove(tags, currIndex, newIndex));
  }, []);

  const handleChange = useCallback((event) => {
    const { target } = event;
    const value = ['checkbox', 'radio'].includes(target.type) ? target.checked : target.value;
    const { name } = target;

    setFormValues((formValues) => ({
      ...formValues,
      [name]: value,
    }));
  }, []);

  const saveChanges = useCallback(async () => {
    const colors = [...'WUBRG'].filter((color) => formValues[`color${color}`]);
    const updated = { ...formValues, colors };
    updated.rarity = updated.rarity.toLowerCase();
    for (const color of [...'WUBRG']) {
      delete updated[`color${color}`];
    }
    if (updated.imgUrl === '') {
      updated.imgUrl = null;
    }
    if (updated.imgBackUrl === '') {
      updated.imgBackUrl = null;
    }
    if (updated.notes === '') {
      updated.notes = null;
    }
    if (updated.rarity === card.details.rarity) {
      updated.rarity = null;
    }
    if (updated.colorCategory === cardGetLabels(card, 'Color Category')) {
      updated.colorCategory = null;
    }
    // allow non-negative integers and half-integers
    updated.cmc = parseFloat(updated.cmc);
    if (!Number.isInteger(updated.cmc * 2) || updated.cmc < 0) {
      updated.cmc = null;
    }
    updated.cardID = updated.version;
    delete updated.version;
    updated.tags = updated.tags.map((tag) => tag.text);

    if (cardsAreEquivalent(updated, card)) {
      // no need to sync
      closeCardModal();
      return;
    }

    try {
      if (!maybe) {
        const response = await csrfFetch(`/cube/api/updatecard/${cubeID}`, {
          method: 'POST',
          body: JSON.stringify({ src: card, updated }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        if (json.success === 'true') {
          const cardResponse = await fetch(`/cube/api/getcardfromid/${updated.cardID}`);
          const cardJson = await cardResponse.json();

          const newCard = {
            ...card,
            ...updated,
            details: {
              ...card.details,
              ...cardJson.card,
            },
          };
          updateCubeCard(card.index, newCard);
          setIsOpen(false);
        }
      } else {
        const response = await csrfFetch(`/cube/api/maybe/update/${cubeID}`, {
          method: 'POST',
          body: JSON.stringify({ id: card._id, updated }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();

        if (json.success === 'true') {
          const newCard = {
            ...card,
            ...updated,
          };
          if (json.details) {
            newCard.details = json.details;
          }
          updateMaybeboardCard(newCard);
          setIsOpen(false);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [card, formValues, updateCubeCard, updateMaybeboardCard]);

  const queueRemoveCard = useCallback(() => {
    addChange({
      remove: card,
    });
    setIsOpen(false);
  }, [card, addChange]);

  const openCardModal = useCallback((newCard, newMaybe) => {
    const colors = newCard.colors || newCard.details.colors;
    const typeLine = newCard.type_line || newCard.details.type;
    let rarity = newCard.rarity || newCard.details.rarity;
    rarity = rarity[0].toUpperCase() + rarity.slice(1);
    const tags = newCard.tags || [];
    setCard(newCard);
    setMaybe(!!newMaybe);
    setFormValues({
      version: newCard.cardID,
      status: newCard.status,
      finish: newCard.finish,
      cmc: newCard.cmc,
      type_line: typeLine,
      rarity,
      imgUrl: newCard.imgUrl || '',
      imgBackUrl: newCard.imgBackUrl || '',
      notes: newCard.notes || '',
      tags: tags.map((tag) => ({ id: tag, text: tag })),
      tagInput: '',
      colorW: colors.includes('W'),
      colorU: colors.includes('U'),
      colorB: colors.includes('B'),
      colorR: colors.includes('R'),
      colorG: colors.includes('G'),
    });
    setIsOpen(true);
  }, []);

  const closeCardModal = useCallback(() => setIsOpen(false));

  const versions = card.details.name ? versionDict[normalizeName(card.details.name)] || [card.details] : [];
  const details = versions.find((version) => version._id === formValues.version) || card.details;
  const renderCard = {
    ...card,
    details: {
      ...card.details,
      image_normal: details.image_normal,
      image_flip: details.image_flip,
    },
  };
  return (
    <CardModalContext.Provider value={openCardModal}>
      {children}
      <CardModal
        values={formValues}
        onChange={handleChange}
        card={renderCard}
        maybe={maybe}
        versions={versions}
        versionsLoading={versionsLoading}
        toggle={closeCardModal}
        isOpen={isOpen}
        disabled={!canEdit}
        saveChanges={saveChanges}
        queueRemoveCard={queueRemoveCard}
        setTagInput={setTagInput}
        addTagText={addTagText}
        tagActions={{ addTag, deleteTag, reorderTag }}
        {...props}
      />
    </CardModalContext.Provider>
  );
};

export default CardModalForm;

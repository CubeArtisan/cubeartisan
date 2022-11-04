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
import PropTypes from 'prop-types';
import { lazy, useCallback, useContext, useEffect, useState } from 'react';

import CardModalContext from '@cubeartisan/client/components/contexts/CardModalContext.js';
import ChangelistContext from '@cubeartisan/client/components/contexts/ChangelistContext.js';
import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import MaybeboardContext from '@cubeartisan/client/components/contexts/MaybeboardContext.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import {
  cardName,
  cardsAreEquivalent,
  COLORS,
  makeDefaultCard,
  normalizeName,
} from '@cubeartisan/client/utils/Card.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';
import { cardGetLabels } from '@cubeartisan/client/utils/Sort.js';

const CardModal = lazy(() => import('@cubeartisan/client/components/modals/CardModal.js'));

const CardModalForm = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [card, setCard] = useState(makeDefaultCard());
  const [maybe, setMaybe] = useState(false);
  const [versionDict, setVersionDict] = useState({});
  const [versionsLoading, setVersionsLoading] = useState(true);
  const [formValues, setFormValues] = useState(makeDefaultCard());

  const { addChange } = useContext(ChangelistContext);
  const { updateMaybeboardCard } = useContext(MaybeboardContext);
  const { cube, canEdit, cubeID, updateCubeCard } = useContext(CubeContext);

  useEffect(() => {
    const wrapper = async () => {
      if (!cube) return;
      const allIds = [...(cube.cards ?? []), ...(cube.maybe ?? [])].map(({ cardID }) => cardID);
      const response = await csrfFetch(`/cards/versions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allIds),
      });
      const json = await response.json();
      setVersionDict(json.dict ?? {});
      setVersionsLoading(false);
    };
    wrapper();
  }, [cube]);

  const updateTags = useCallback((newTags) => {
    setFormValues(({ tags, ...oldFormValues }) => ({ ...oldFormValues, tags: newTags }));
  }, []);

  const handleChange = useCallback((event) => {
    const { target } = event;
    const value = ['checkbox', 'radio'].includes(target.type) ? target.checked : target.value;
    const { name } = target;

    setFormValues((oldFormValues) => ({
      ...oldFormValues,
      [name]: value,
    }));
  }, []);

  const closeCardModal = useCallback(() => setIsOpen(false), []);

  const saveChanges = useCallback(async () => {
    const colors = COLORS.filter((color) => formValues[`color${color}`]);
    const updated = { ...formValues, colors };
    updated.rarity = updated.rarity.toLowerCase();
    for (const color of Array.from('WUBRG')) {
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
        const response = await csrfFetch(`/cube/${cubeID}/card/${card._id}`, {
          method: 'PUT',
          body: JSON.stringify({ src: card, updated }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        if (json.success === 'true') {
          const cardResponse = await fetch(`/card/${updated.cardID}/details`);
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
        const response = await csrfFetch(`/cube/${cubeID}/maybe/${card._id}`, {
          method: 'PUT',
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
  }, [closeCardModal, card, cubeID, maybe, formValues, updateCubeCard, updateMaybeboardCard]);

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
      name: newCard.name,
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

  const versions = cardName(card) ? versionDict[normalizeName(cardName(card))] || [card.details] : [];
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
      <Suspense fallback={null}>
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
          updateTags={updateTags}
          {...props}
        />
      </Suspense>
    </CardModalContext.Provider>
  );
};
CardModalForm.propTypes = {
  children: PropTypes.node.isRequired,
};
export default CardModalForm;

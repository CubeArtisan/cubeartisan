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
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

import ErrorBoundary from '@cubeartisan/client/components/containers/ErrorBoundary.js';
import { compareStrings, SortableTable } from '@cubeartisan/client/components/containers/SortableTable.js';
import LabeledSelect from '@cubeartisan/client/components/inputs/LabeledSelect.js';
import { calculateAsfans } from '@cubeartisan/client/drafting/createdraft.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import { sortIntoGroups, SORTS } from '@cubeartisan/client/utils/Sort.js';

const Asfans = ({ cards: cardsNoAsfan, cube, defaultFormatId }) => {
  const [sort, setSort] = useQueryParam('sort', 'Color');
  const [draftFormat, setDraftFormat] = useQueryParam('formatId', defaultFormatId);

  const cards = useMemo(() => {
    if (draftFormat !== null) {
      try {
        const asfans = calculateAsfans(cube, draftFormat);
        return cardsNoAsfan.map((card) => ({ ...card, asfan: asfans[card.cardID] }));
      } catch (e) {
        console.error('Invalid Draft Format', draftFormat, cube.draft_formats[draftFormat], e);
      }
    }
    return Object.fromEntries(cube.cards.map((card) => [card.cardID, 0]));
  }, [cube, draftFormat, cardsNoAsfan]);

  const asfans = useMemo(
    () =>
      Object.entries(sortIntoGroups(cards, sort)).map(([label, cardsInGroup]) => ({
        label,
        asfan: cardsInGroup.reduce((acc, { asfan }) => acc + asfan, 0),
      })),
    [cards, sort],
  );

  const formatValues = useMemo(
    () => ['Standard Draft'].concat(cube.draft_formats.map(({ title }) => title)),
    [cube.draft_formats],
  );
  const formatKeys = useMemo(() => formatValues.map((_, idx) => `${idx - 1}`), [formatValues]);

  return (
    <>
      <Typography variant="h4">Asfans</Typography>
      <Typography variant="subtitle1" sx={{ marginY: 1 }}>
        View the expected number of cards per player, per draft format. Standard Draft assumes 3 packs of 15 cards.
      </Typography>
      <Typography variant="body1">
        We use 'Asfan' to mean the expected number of cards per player opened. So if red creatures have an Asfan of 2,
        on average I will see 2 red creatures in all the packs I open together. The more common meaning is per pack
        instead of per player, but with custom formats it makes more sense to talk about per player.
      </Typography>
      <LabeledSelect
        label="Draft Format:"
        baseId="asfans-format"
        value={`${draftFormat}`}
        setValue={(value) => setDraftFormat(value)}
        values={formatValues}
        keys={formatKeys}
      />
      <LabeledSelect label="Order By:" baseId="asfans-sort" value={sort} values={SORTS} setValue={setSort} />
      <ErrorBoundary>
        <SortableTable
          columnProps={[
            { key: 'label', title: sort, heading: true, sortable: true },
            { key: 'asfan', title: 'Asfan', heading: false, sortable: true },
          ]}
          data={asfans}
          sortFns={{ label: compareStrings }}
        />
      </ErrorBoundary>
    </>
  );
};
Asfans.propTypes = {
  cube: PropTypes.shape({
    cards: PropTypes.arrayOf(PropTypes.shape({})),
    draft_formats: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  defaultFormatId: PropTypes.number,
};
Asfans.defaultProps = {
  defaultFormatId: -1,
};
export default Asfans;

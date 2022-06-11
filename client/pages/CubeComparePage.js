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
import { useContext, useState } from 'react';

import CompareView from '@cubeartisan/client/components/CompareView.js';
import ErrorBoundary from '@cubeartisan/client/components/containers/ErrorBoundary.js';
import { DisplayContextProvider } from '@cubeartisan/client/components/contexts/DisplayContext.js';
import { SortContextProvider } from '@cubeartisan/client/components/contexts/SortContext.js';
import { TAG_COLORS, TagContextProvider } from '@cubeartisan/client/components/contexts/TagContext.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import MainLayout from '@cubeartisan/client/components/layouts/MainLayout.js';
import CardModalForm from '@cubeartisan/client/components/modals/CardModalForm.js';
import CubeCompareNavbar from '@cubeartisan/client/components/navbars/CubeCompareNavbar.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import Query from '@cubeartisan/client/utils/Query.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const deduplicateTags = (tagColors) => {
  const used = new Set();
  const result = [];
  for (const tagColor of tagColors) {
    if (!used.has(tagColor.tag)) {
      result.push(tagColor);
      used.add(tagColor.tag);
    }
  }
  return result;
};

export const CubeComparePage = ({
  cards,
  cube,
  cubeB,
  defaultTagColors,
  defaultShowTagColors,
  defaultSorts,
  loginCallback,
  both,
  onlyA,
  onlyB,
}) => {
  const [openCollapse, setOpenCollapse] = useState(Query.get('f', false) ? 'filter' : null);
  const [filter, setFilter] = useState(null);
  const { _id: userID } = useContext(UserContext);
  const defaultTagSet = new Set(cards.flatMap((card) => card.tags));
  const defaultTags = Array.from(defaultTagSet, (tag) => ({
    id: tag,
    text: tag,
  }));
  const filteredCards = filter ? cards.filter(filter) : cards;
  return (
    <MainLayout loginCallback={loginCallback}>
      <SortContextProvider defaultSorts={defaultSorts}>
        <TagContextProvider
          cubeID={cube._id}
          defaultTagColors={deduplicateTags(defaultTagColors)}
          defaultShowTagColors={defaultShowTagColors}
          defaultTags={defaultTags}
          userID={userID}
        >
          <CubeCompareNavbar
            cubeA={cube}
            cubeAID={cube._id}
            cubeB={cubeB}
            cubeBID={cubeB._id}
            cards={filteredCards}
            openCollapse={openCollapse}
            setOpenCollapse={setOpenCollapse}
            filter={filter}
            setFilter={setFilter}
          />
          <DynamicFlash />
          <ErrorBoundary>
            <CardModalForm>
              <CompareView cards={filteredCards} both={both} onlyA={onlyA} onlyB={onlyB} />
            </CardModalForm>
          </ErrorBoundary>
        </TagContextProvider>
      </SortContextProvider>
    </MainLayout>
  );
};
CubeComparePage.propTypes = {
  cards: PropTypes.arrayOf(CardPropType).isRequired,
  cube: CubePropType.isRequired,
  cubeB: CubePropType.isRequired,
  defaultTagColors: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.string.isRequired,
      color: PropTypes.oneOf(TAG_COLORS.map(([, c]) => c)),
    }),
  ).isRequired,
  defaultShowTagColors: PropTypes.bool.isRequired,
  defaultSorts: PropTypes.arrayOf(PropTypes.string).isRequired,
  loginCallback: PropTypes.string,
  both: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
  onlyA: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
  onlyB: PropTypes.arrayOf(CardPropType.isRequired).isRequired,
};
CubeComparePage.defaultProps = {
  loginCallback: '/',
};
export default RenderToRoot(CubeComparePage);

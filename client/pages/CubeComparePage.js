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
import { useState } from 'react';
import PropTypes from 'prop-types';
import CardPropType from '@hypercube/client/proptypes/CardPropType';
import CubePropType from '@hypercube/client/proptypes/CubePropType';

import Query from '@hypercube/client/utils/Query';

import CardModalForm from '@hypercube/client/components/CardModalForm';
import CompareView from '@hypercube/client/components/CompareView';
import CubeCompareNavbar from '@hypercube/client/components/CubeCompareNavbar';
import { DisplayContextProvider } from '@hypercube/client/contexts/DisplayContext';
import DynamicFlash from '@hypercube/client/components/DynamicFlash';
import ErrorBoundary from '@hypercube/client/components/ErrorBoundary';
import { SortContextProvider } from '@hypercube/client/contexts/SortContext';
import { TAG_COLORS, TagContextProvider } from '@hypercube/client/contexts/TagContext';
import MainLayout from '@hypercube/client/layouts/MainLayout';
import RenderToRoot from '@hypercube/client/utils/RenderToRoot';

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

const CubeComparePage = ({
  cards,
  cube,
  cubeB,
  defaultTagColors,
  defaultShowTagColors,
  defaultSorts,
  loginCallback,
  ...props
}) => {
  const [openCollapse, setOpenCollapse] = useState(Query.get('f', false) ? 'filter' : null);
  const [filter, setFilter] = useState(null);

  const defaultTagSet = new Set([].concat(...cards.map((card) => card.tags)));
  const defaultTags = [...defaultTagSet].map((tag) => ({
    id: tag,
    text: tag,
  }));
  const filteredCards = filter ? cards.filter(filter) : cards;
  return (
    <MainLayout loginCallback={loginCallback}>
      <SortContextProvider defaultSorts={defaultSorts}>
        <DisplayContextProvider>
          <TagContextProvider
            cubeID={cube._id}
            defaultTagColors={deduplicateTags(defaultTagColors)}
            defaultShowTagColors={defaultShowTagColors}
            defaultTags={defaultTags}
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
                <CompareView cards={filteredCards} {...props} />
              </CardModalForm>
            </ErrorBoundary>
          </TagContextProvider>
        </DisplayContextProvider>
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
};

CubeComparePage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(CubeComparePage);

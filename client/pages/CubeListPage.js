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
import { lazy, useContext, useEffect, useMemo, useState } from 'react';
import { UncontrolledAlert } from 'reactstrap';

import ErrorBoundary from '@cubeartisan/client/components/containers/ErrorBoundary.js';
import { ChangelistContextProvider } from '@cubeartisan/client/components/contexts/ChangelistContext.js';
import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';
import { MaybeboardContextProvider } from '@cubeartisan/client/components/contexts/MaybeboardContext.js';
import { SortContextProvider } from '@cubeartisan/client/components/contexts/SortContext.js';
import { TagContextProvider } from '@cubeartisan/client/components/contexts/TagContext.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import DynamicFlash from '@cubeartisan/client/components/DynamicFlash.js';
import CubeLayout from '@cubeartisan/client/components/layouts/CubeLayout.js';
import CardModalForm from '@cubeartisan/client/components/modals/CardModalForm.js';
import GroupModal from '@cubeartisan/client/components/modals/GroupModal.js';
import CubeListNavbar from '@cubeartisan/client/components/navbars/CubeListNavbar.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import { DEFAULT_FILTER } from '@cubeartisan/client/filtering/FilterCards.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import CubePropType from '@cubeartisan/client/proptypes/CubePropType.js';
import { getFromLocalStorage } from '@cubeartisan/client/utils/LocalStorage.js';
import Query from '@cubeartisan/client/utils/Query.js';
import RenderToRoot from '@cubeartisan/client/utils/RenderToRoot.js';

const VisualSpoiler = lazy(() => import('@cubeartisan/client/components/VisualSpoiler.js'));
const TableView = lazy(() => import('@cubeartisan/client/components/TableView.js'));
const ListView = lazy(() => import('@cubeartisan/client/components/ListView.js'));
const Maybeboard = lazy(() => import('@cubeartisan/client/components/Maybeboard.js'));
const CurveView = lazy(() => import('@cubeartisan/client/components/CurveView.js'));

const CUBE_VIEWS = {
  table: TableView,
  spoiler: VisualSpoiler,
  curve: CurveView,
  list: ListView,
};

/**
 * @typedef {import('@cubeartisan/client/filtering/FilterCards.js').Filter} Filter
 */

const CubeListPageRaw = ({
  defaultFilterText,
  defaultView,
  defaultShowTagColors,
  defaultPrimarySort,
  defaultSecondarySort,
  defaultTertiarySort,
  defaultQuaternarySort,
  defaultShowUnsorted,
}) => {
  const { cube, canEdit } = useContext(CubeContext);
  const { _id: userID } = useContext(UserContext);
  const { showMaybeboard } = useContext(DisplayContext);

  const [cubeView, setCubeView] = useQueryParam('view', defaultView);
  const [openCollapse, setOpenCollapse] = useState('');
  const [filter, setFilter] = useState(() => DEFAULT_FILTER);
  const [sorts, setSorts] = useState(null);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const savedChanges = cube._id && getFromLocalStorage(`changelist-${cube._id}`);
    if (savedChanges && savedChanges.length > 2 && Query.get('updated', false) !== 'true') {
      setOpenCollapse('edit');
    } else if (defaultFilterText && defaultFilterText.length > 0) {
      setOpenCollapse('filter');
    } else if (
      (defaultPrimarySort && defaultPrimarySort.length > 0) ||
      (defaultSecondarySort && defaultSecondarySort.length > 0)
    ) {
      setOpenCollapse('sort');
    }
  }, [cube._id, defaultFilterText, defaultPrimarySort, defaultSecondarySort]);

  const defaultTagSet = new Set(cube.cards.flatMap((card) => card.tags));
  const defaultTags = Array.from(defaultTagSet, (tag) => ({
    id: tag,
    text: tag,
  }));

  const filteredCards = useMemo(() => cube?.cards?.filter?.(filter) ?? [], [filter, cube]);
  console.log(filter, filteredCards);

  const CubeView = CUBE_VIEWS[cubeView];

  return (
    <SortContextProvider defaultSorts={cube.default_sorts} defaultShowOther={!!cube.default_show_unsorted}>
      <TagContextProvider
        cubeID={cube._id}
        defaultTagColors={cube.tag_colors}
        defaultShowTagColors={defaultShowTagColors}
        defaultTags={defaultTags}
        userID={userID}
      >
        <ChangelistContextProvider cubeID={cube._id} setOpenCollapse={setOpenCollapse}>
          <CardModalForm>
            <GroupModal cubeID={cube._id} canEdit={canEdit}>
              <CubeListNavbar
                cubeView={cubeView}
                setCubeView={setCubeView}
                openCollapse={openCollapse}
                setOpenCollapse={setOpenCollapse}
                defaultPrimarySort={defaultPrimarySort}
                defaultSecondarySort={defaultSecondarySort}
                defaultTertiarySort={defaultTertiarySort}
                defaultQuaternarySort={defaultQuaternarySort}
                defaultShowUnsorted={defaultShowUnsorted}
                sorts={sorts}
                setSorts={setSorts}
                defaultSorts={cube.default_sorts}
                cubeDefaultShowUnsorted={cube.default_show_unsorted}
                defaultFilterText={defaultFilterText}
                filter={filter}
                setFilter={setFilter}
                cards={filteredCards}
                alerts={alerts}
                setAlerts={setAlerts}
              />
              <DynamicFlash />
              {alerts.map(({ color, message }, index) => (
                <UncontrolledAlert color={color} key={/* eslint-disable-line react/no-array-index-key */ index}>
                  {message}
                </UncontrolledAlert>
              ))}
              <ErrorBoundary>
                {showMaybeboard ? (
                  <Suspense>
                    <MaybeboardContextProvider initialCards={cube.maybe}>
                      <Maybeboard filter={filter} />
                    </MaybeboardContextProvider>
                  </Suspense>
                ) : null}
              </ErrorBoundary>
              <ErrorBoundary>
                {filteredCards.length === 0 ? (
                  <Typography variant="h5" sx={{ marginTop: 1, marginBottom: 3 }}>
                    No cards match filter.
                  </Typography>
                ) : null}
                <Suspense>
                  <CubeView cards={filteredCards} />
                </Suspense>
              </ErrorBoundary>
            </GroupModal>
          </CardModalForm>
        </ChangelistContextProvider>
      </TagContextProvider>
    </SortContextProvider>
  );
};
CubeListPageRaw.propTypes = {
  defaultShowTagColors: PropTypes.bool.isRequired,
  defaultFilterText: PropTypes.string.isRequired,
  defaultView: PropTypes.string.isRequired,
  defaultPrimarySort: PropTypes.string.isRequired,
  defaultSecondarySort: PropTypes.string.isRequired,
  defaultTertiarySort: PropTypes.string.isRequired,
  defaultQuaternarySort: PropTypes.string.isRequired,
  defaultShowUnsorted: PropTypes.string.isRequired,
};

const CubeListPage = ({
  cube,
  defaultShowTagColors,
  defaultFilterText,
  defaultView,
  defaultPrimarySort,
  defaultSecondarySort,
  defaultTertiarySort,
  defaultQuaternarySort,
  defaultShowUnsorted,
  loginCallback,
}) => (
  <CubeLayout cube={cube} activeLink="list" loginCallback={loginCallback}>
    <CubeListPageRaw
      defaultShowTagColors={defaultShowTagColors}
      defaultFilterText={defaultFilterText}
      defaultView={defaultView}
      defaultPrimarySort={defaultPrimarySort}
      defaultSecondarySort={defaultSecondarySort}
      defaultTertiarySort={defaultTertiarySort}
      defaultQuaternarySort={defaultQuaternarySort}
      defaultShowUnsorted={defaultShowUnsorted}
    />
  </CubeLayout>
);
CubeListPage.propTypes = {
  cube: CubePropType.isRequired,
  defaultShowTagColors: PropTypes.bool.isRequired,
  defaultFilterText: PropTypes.string.isRequired,
  defaultView: PropTypes.string.isRequired,
  defaultPrimarySort: PropTypes.string.isRequired,
  defaultSecondarySort: PropTypes.string.isRequired,
  defaultTertiarySort: PropTypes.string.isRequired,
  defaultQuaternarySort: PropTypes.string.isRequired,
  defaultShowUnsorted: PropTypes.string.isRequired,
  loginCallback: PropTypes.string,
};
CubeListPage.defaultProps = {
  loginCallback: '/',
};
export default RenderToRoot(CubeListPage);

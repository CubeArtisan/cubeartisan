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
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { lazy, useCallback, useContext, useState } from 'react';

import CollapsingNavbar from '@cubeartisan/client/components/containers/CollapsingNavbar.js';
import CardModalContext from '@cubeartisan/client/components/contexts/CardModalContext.js';
import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';
import GroupModalContext from '@cubeartisan/client/components/contexts/GroupModalContext.js';
import SortContext from '@cubeartisan/client/components/contexts/SortContext.js';
import EditCollapse from '@cubeartisan/client/components/EditCollapse.js';
import FilterCollapse from '@cubeartisan/client/components/FilterCollapse.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import CSRFForm from '@cubeartisan/client/components/inputs/CSRFForm.js';
import LabeledSelect from '@cubeartisan/client/components/inputs/LabeledSelect.js';
import StyledButtonMenu from '@cubeartisan/client/components/inputs/StyledButtonMenu.js';
import SortCollapse from '@cubeartisan/client/components/SortCollapse.js';
import Suspense from '@cubeartisan/client/components/wrappers/Suspense.js';
import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';

const CustomizeBasicsModal = lazy(() => import('@cubeartisan/client/components/modals/CustomizeBasicsModal.js'));
const TagColorsModal = lazy(() => import('@cubeartisan/client/components/modals/TagColorsModal.js'));

const CustomizeBasicsModalLink = withModal(Button, CustomizeBasicsModal);

/**
 * @typedef {import('@cubeartisan/client/proptypes/CubePropType.js').Cube} Cube
 */

/** @param {string} cubeID */
const cloneCube = async (cubeID) => {
  const response = await csrfFetch(`/cube/${cubeID}/clone`, { method: 'POST' });
  const json = await response.json();
  if (json.success === 'false') {
    window.location.href = '/404';
  } else {
    window.location.href = json.newCube;
  }
};

const PasteBulkModal = ({ isOpen, toggle }) => {
  const { cubeID } = useContext(CubeContext);
  return (
    <Dialog open={isOpen} onClose={toggle}>
      <DialogTitle id="pasteBulkModalTitle">Bulk Upload - Paste Text</DialogTitle>
      <CSRFForm method="POST" action={`/cube/${cubeID}/import/paste`}>
        <DialogContent>
          <DialogContentText>
            Acceptable formats are:
            <br />• one card name per line, or
            <br />• one card name per line prepended with #x, such as &quot;2x island&quot;
          </DialogContentText>
          <TextField
            label="Card List"
            minRows="10"
            multiline
            placeholder="Paste Cube Here (max length 20000)"
            name="body"
            sx={{ width: '100%' }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="success" type="submit">
            Upload
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </DialogActions>
      </CSRFForm>
    </Dialog>
  );
};
PasteBulkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
const PasteBulkModalItem = withModal(MenuItem, PasteBulkModal);

const UploadBulkModal = ({ isOpen, toggle }) => {
  const { cubeID } = useContext(CubeContext);
  return (
    <Dialog open={isOpen} onClose={toggle}>
      <DialogTitle id="uploadBulkModalTitle">Bulk Upload - Upload File</DialogTitle>
      <CSRFForm method="POST" action={`/cube/${cubeID}/import/file`} encType="multipart/form-data">
        <DialogContent>
          <DialogContentText>
            Acceptable files are:
            <br />• .txt (plaintext) with one card name per line, or
            <br />• .csv with the same format as our .csv export (columns may be omitted and re-arranged, default values
            may be used).
          </DialogContentText>
          <input type="file" id="uploadBulkFile" name="document" style={{ display: 'none' }} />
          <label htmlFor="uploadBulkFile">
            <Button variant="outlined" component="span">
              Choose file
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button color="success" type="submit">
            Upload
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </DialogActions>
      </CSRFForm>
    </Dialog>
  );
};
UploadBulkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
const UploadBulkModalItem = withModal(MenuItem, UploadBulkModal);

const UploadBulkReplaceModal = ({ isOpen, toggle }) => {
  const { cubeID } = useContext(CubeContext);
  return (
    <Dialog open={isOpen} onClose={toggle} aria-labelledby="uploadReplacementModalTitle">
      <DialogTitle id="uploadReplacementModalTitle">Bulk Upload - Replace with CSV File Upload</DialogTitle>
      <CSRFForm method="POST" action={`/cube/${cubeID}/import/file/replace`} encType="multipart/form-data">
        <DialogContent>
          <DialogContentText>
            Replaces all cards in your cube and Maybeboard. Acceptable files are .csv files with the exact format as our
            .csv export.
          </DialogContentText>
          <input type="file" id="uploadReplacementFile" name="document" style={{ display: 'none' }} />
          <label htmlFor="uploadReplacementFile">
            <Button variant="outlined" component="span">
              Choose file
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button color="success" type="submit">
            Upload
          </Button>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </DialogActions>
      </CSRFForm>
    </Dialog>
  );
};
UploadBulkReplaceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

const UploadBulkReplaceModalItem = withModal(MenuItem, UploadBulkReplaceModal);

const SelectEmptyModal = ({ isOpen, toggle }) => (
  <Dialog open={isOpen} onClose={toggle} aria-labelledby="selectEmptyTitle">
    <DialogTitle id="selectEmptyTitle">Cannot Edit Selected</DialogTitle>
    <DialogContent>
      <DialogContentText>
        No cards are selected. To select and edit multiple cards, use the 'List View' and check the desired cards.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="secondary" onClick={toggle}>
        Close
      </Button>
    </DialogActions>
  </Dialog>
);
SelectEmptyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

/**
 * @typedef CompareCollapseProps
 * @property {boolean} open
 */

/** @type {React.FC<CompareCollapseProps>} */
const CompareCollapse = ({ open }) => {
  const { cubeID } = useContext(CubeContext);
  const [compareID, setCompareID] = useState('');
  const handleChange = useCallback(/** @param {any} event */ (event) => setCompareID(event.target.value), []);

  const targetUrl = `/cube/${cubeID}/compare/${compareID}`;

  return (
    <Collapse in={open} sx={{ backgroundColor: 'background.paper' }}>
      <Box component="form" method="GET" action={targetUrl} sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField placeholder="Comparison Cube ID" value={compareID} onChange={handleChange} sx={{ margin: 2 }} />
        <Button
          color="primary"
          variant="contained"
          size="medium"
          href={targetUrl}
          sx={{ height: '100%', verticalAlign: 'center' }}
        >
          Compare Cubes
        </Button>
      </Box>
    </Collapse>
  );
};
CompareCollapse.propTypes = {
  open: PropTypes.bool.isRequired,
};

const CubeListNavbar = ({
  cards,
  cubeView,
  setCubeView,
  openCollapse,
  setOpenCollapse,
  defaultPrimarySort,
  defaultSecondarySort,
  defaultTertiarySort,
  defaultQuaternarySort,
  defaultShowUnsorted,
  sorts,
  setSorts,
  defaultSorts,
  cubeDefaultShowUnsorted,
  defaultFilterText,
  filter,
  setFilter,
  alerts,
  setAlerts,
}) => {
  const [tagColorsModalOpen, setTagColorsModalOpen] = useState(false);
  const [selectEmptyModalOpen, setSelectEmptyModalOpen] = useState(false);
  const [isSortUsed, setIsSortUsed] = useState(true);
  const [isFilterUsed, setIsFilterUsed] = useState(true);

  const { cube, canEdit, cubeID, setCube } = useContext(CubeContext);
  const { groupModalCards, openGroupModal } = useContext(GroupModalContext);
  const { primary, secondary, tertiary, quaternary, showOther, changeSort } = useContext(SortContext);
  const openCardModal = useContext(CardModalContext);
  const { showCustomImages, toggleShowCustomImages, showMaybeboard, toggleShowMaybeboard, useSticky, toggleUseSticky } =
    useContext(DisplayContext);

  const addAlert = useCallback(
    /**
     * @param {string} color
     * @param {string} message
     */
    (color, message) => {
      setAlerts([...alerts, { color, message }]);
    },
    [alerts, setAlerts],
  );

  const onCubeUpdate = useCallback(
    /** @param {Cube} updated */
    (updated) => {
      addAlert('success', 'Update Successful');
      setCube(updated);
    },
    [addAlert, setCube],
  );

  const handleMassEdit = useCallback(
    /** @param {any} event */
    (event) => {
      event.preventDefault();
      if (cubeView === 'list') {
        if (groupModalCards.length === 0) {
          setSelectEmptyModalOpen(true);
        } else if (groupModalCards.length === 1) {
          openCardModal(groupModalCards[0]);
        } else if (groupModalCards.length > 1) {
          openGroupModal();
        }
      } else {
        setCubeView('list');
      }
    },
    [groupModalCards, openCardModal, openGroupModal, cubeView, setCubeView],
  );

  const handleOpenCollapse = useCallback(
    /** @param {any} event */
    (event) => {
      event.preventDefault();
      const { currentTarget } = event;
      const collapse = currentTarget.getAttribute('data-target');
      // Avoid shadowing the openCollapse prop
      setOpenCollapse(
        /**
         * @param {string} openCollapseArg
         */
        (openCollapseArg) => (openCollapseArg === collapse ? null : collapse),
      );
    },
    [setOpenCollapse],
  );

  const handleOpenTagColorsModal = useCallback(() => setTagColorsModalOpen(true), []);
  const handleToggleTagColorsModal = useCallback(() => setTagColorsModalOpen(false), []);
  const handleToggleSelectEmptyModal = useCallback(() => setSelectEmptyModalOpen(false), []);

  const enc = encodeURIComponent;
  const sortUrlSegment = `primary=${enc(primary)}&secondary=${enc(secondary)}&tertiary=${enc(
    tertiary,
  )}&quaternary=${enc(quaternary)}&showother=${enc(showOther)}`;
  const filterString = filter?.stringify ?? '';
  const filterUrlSegment = filterString ? `&filter=${enc(filterString)}` : '';
  const urlSegment = `${isSortUsed ? sortUrlSegment : ''}${isFilterUsed ? filterUrlSegment : ''}`;

  let editMenuItems = [];
  if (canEdit) {
    editMenuItems = [
      { text: 'Import', extraProps: { disabled: true } },
      { text: 'Paste Text', component: PasteBulkModalItem },
      { text: 'Upload File', component: UploadBulkModalItem },
      { text: 'Replace with CSV File Upload', component: UploadBulkReplaceModalItem },
      { extraProps: { divider: true } },
    ];
  }
  const importMenuItems = [
    ...editMenuItems,
    { text: 'Export', extraProps: { disabled: true } },
    { text: 'CloneCube', onClick: () => cloneCube(cubeID) },
    { text: 'CubeCobra (.txt)', link: `/cube/${cubeID}/export/cubecobra?${urlSegment}` },
    { text: 'Card Names (.txt)', link: `/cube/${cubeID}/export/plaintext?${urlSegment}` },
    { text: 'Comma-Separated (.csv)', link: `/cube/${cubeID}/export/csv?${urlSegment}` },
    { text: 'Forge (.dck)', link: `/cube/${cubeID}/export/forge?${urlSegment}` },
    { text: 'MTGO (.txt)', link: `/cube/${cubeID}/export/mtgo?${urlSegment}` },
    { text: 'XMage (.dck)', link: `/cube/${cubeID}/export/xmage?${urlSegment}` },
    {
      extraProps: {
        children: (
          <Tooltip title="Order export using current sort options.">
            <FormControl>
              <Checkbox checked={isSortUsed} onChange={(event) => setIsSortUsed(event.target.checked)} />
              <Typography variant="caption">Use Sort for Export.</Typography>
            </FormControl>
          </Tooltip>
        ),
      },
    },
    {
      extraProps: {
        children: (
          <Tooltip title="Include in export only cards matching current filter.">
            <FormControl>
              <Checkbox checked={isFilterUsed} onChange={(event) => setIsFilterUsed(event.target.checked)} />
              <Typography variant="caption">Use Filter</Typography>
            </FormControl>
          </Tooltip>
        ),
      },
    },
  ];

  const STYLE_VALUES = ['Table View', 'Visual Spoiler', ...(canEdit ? ['List View'] : []), 'Curve View'];
  const STYLE_KEYS = ['table', 'spoiler', ...(canEdit ? ['list'] : []), 'curve'];
  const DISPLAY_MENU = [
    { onClick: handleOpenTagColorsModal, text: canEdit ? 'Set Tag Colors' : 'View Tag Colors' },
    { onClick: toggleShowCustomImages, text: showCustomImages ? 'Hide Custom Images' : 'Show Custom Images' },
    { onClick: toggleShowMaybeboard, text: showMaybeboard ? 'Hide Maybeboard' : 'Show Maybeboard' },
    {
      onClick: () => changeSort({ showOther: !showOther }),
      text: showOther ? 'Hide Unsorted Cards' : 'Show Unsorted Cards',
    },
    { onClick: toggleUseSticky, text: `${useSticky ? 'Disable' : 'Enable'} Sticky Column Headers` },
  ];

  return (
    <>
      <Toolbar sx={{ backgroundColor: 'background.paper' }}>
        <LabeledSelect
          label="View"
          baseId="cube-view-style"
          values={STYLE_VALUES}
          keys={STYLE_KEYS}
          value={cubeView}
          setValue={setCubeView}
        />
        <CollapsingNavbar breakpoint={1000} sx={{ marginLeft: 'auto' }}>
          {!canEdit ? (
            ''
          ) : (
            <Button data-target="edit" onClick={handleOpenCollapse}>
              Add/Remove
            </Button>
          )}
          <Button data-target="sort" onClick={handleOpenCollapse}>
            Sort
          </Button>
          <Button data-target="filter" onClick={handleOpenCollapse}>
            Filter
          </Button>
          <Button data-target="compare" onClick={handleOpenCollapse}>
            Compare
          </Button>
          {!canEdit ? (
            ''
          ) : (
            <>
              <Button onClick={handleMassEdit}>{cubeView === 'list' ? 'Edit Selected' : 'Mass Edit'}</Button>
              <Suspense fallback={null}>
                <CustomizeBasicsModalLink
                  modalProps={{
                    cube,
                    /**
                     * @param {string} message
                     */
                    onError: (message) => {
                      addAlert('danger', message);
                    },
                    /**
                     * @param {string[]} basics
                     */
                    updateBasics: (basics) => {
                      const deepClone = JSON.parse(JSON.stringify(cube));
                      deepClone.basics = basics;
                      onCubeUpdate(deepClone);
                    },
                  }}
                >
                  Customize Basics
                </CustomizeBasicsModalLink>
              </Suspense>
            </>
          )}
          <StyledButtonMenu
            menuItems={DISPLAY_MENU}
            tooltip="Settings to control the UI of the CubeView."
            color="primary"
          >
            Display
          </StyledButtonMenu>
          <StyledButtonMenu menuItems={importMenuItems} tooltip="Import or Export cards from the cube" color="primary">
            {canEdit ? 'Import/Export' : 'Export'}
          </StyledButtonMenu>
        </CollapsingNavbar>
      </Toolbar>
      {!canEdit ? '' : <EditCollapse isOpen={openCollapse === 'edit'} />}
      <SortCollapse
        defaultPrimarySort={defaultPrimarySort}
        defaultSecondarySort={defaultSecondarySort}
        defaultTertiarySort={defaultTertiarySort}
        defaultQuaternarySort={defaultQuaternarySort}
        defaultShowUnsorted={defaultShowUnsorted}
        sorts={sorts}
        setSorts={setSorts}
        defaultSorts={defaultSorts}
        cubeDefaultShowUnsorted={cubeDefaultShowUnsorted}
        isOpen={openCollapse === 'sort'}
      />
      <FilterCollapse
        defaultFilterText={defaultFilterText}
        filter={filter}
        setFilter={setFilter}
        numCards={cards.length}
        numShown={0}
        isOpen={openCollapse === 'filter'}
        noCount={false}
      />
      <CompareCollapse open={openCollapse === 'compare'} />
      <TagColorsModal canEdit={canEdit} isOpen={tagColorsModalOpen} toggle={handleToggleTagColorsModal} />
      <SelectEmptyModal isOpen={selectEmptyModalOpen} toggle={handleToggleSelectEmptyModal} />
    </>
  );
};
CubeListNavbar.propTypes = {
  cards: PropTypes.arrayOf(CardPropType).isRequired,
  cubeView: PropTypes.string.isRequired,
  setCubeView: PropTypes.func.isRequired,
  openCollapse: PropTypes.string,
  setOpenCollapse: PropTypes.func.isRequired,
  defaultPrimarySort: PropTypes.string.isRequired,
  defaultSecondarySort: PropTypes.string.isRequired,
  defaultTertiarySort: PropTypes.string.isRequired,
  defaultQuaternarySort: PropTypes.string.isRequired,
  defaultShowUnsorted: PropTypes.string.isRequired,
  sorts: PropTypes.arrayOf(PropTypes.string),
  setSorts: PropTypes.func.isRequired,
  defaultSorts: PropTypes.arrayOf(PropTypes.string).isRequired,
  cubeDefaultShowUnsorted: PropTypes.bool,
  defaultFilterText: PropTypes.string.isRequired,
  filter: PropTypes.func,
  setFilter: PropTypes.func.isRequired,
  alerts: PropTypes.arrayOf(PropTypes.shape({ color: PropTypes.string, message: PropTypes.string.isRequired }))
    .isRequired,
  setAlerts: PropTypes.func.isRequired,
};
CubeListNavbar.defaultProps = {
  openCollapse: null,
  sorts: null,
  filter: null,
  cubeDefaultShowUnsorted: false,
};
export default CubeListNavbar;

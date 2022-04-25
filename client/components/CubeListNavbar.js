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
import React, { useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';
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
  InputLabel,
  Menu,
  MenuItem,
  Select,
  // TextareaAutosize,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import CardPropType from '@cubeartisan/client/proptypes/CardPropType.js';
import CardModalContext from '@cubeartisan/client/components/contexts/CardModalContext.js';
import CustomizeBasicsModal from '@cubeartisan/client/components/modals/CustomizeBasicsModal.js';
import CSRFForm from '@cubeartisan/client/components/CSRFForm.js';
import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';
import EditCollapse from '@cubeartisan/client/components/EditCollapse.js';
import FilterCollapse from '@cubeartisan/client/components/FilterCollapse.js';
import GroupModalContext from '@cubeartisan/client/components/contexts/GroupModalContext.js';
import SortCollapse from '@cubeartisan/client/components/SortCollapse.js';
import SortContext from '@cubeartisan/client/components/contexts/SortContext.js';
import TagColorsModal from '@cubeartisan/client/components/modals/TagColorsModal.js';
import withModal from '@cubeartisan/client/components/hoc/WithModal.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';

const CustomizeBasicsModalLink = withModal(Button, CustomizeBasicsModal);

/**
 * @param {string} cubeID
 */
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
          {/*
          <TextareaAutosize
            maxLength={20000}
            minRows="10"
            placeholder="Paste Cube Here (max length 20000)"
            name="body"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button color="success" type="submit" onClick={toggle}>
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
          <Button variant="outlined" component="label">
            Choose file
            <input type="file" id="uploadBulkFile" name="document" />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button color="success" type="submit" onClick={toggle}>
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
          <Button variant="outlined" component="label">
            <input type="file" id="uploadReplacementFile" name="document" />
            Choose file
          </Button>
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

const CompareCollapse = (props) => {
  const { cubeID } = useContext(CubeContext);
  const [compareID, setCompareID] = useState('');
  const handleChange = useCallback((event) => setCompareID(event.target.value), []);

  const targetUrl = `/cube/${cubeID}/compare/${compareID}`;

  return (
    <Collapse {...props} sx={{ backgroundColor: 'background.paper' }}>
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
  const [displayAnchorEl, setDisplayAnchorEl] = useState(null);
  const [importAnchorEl, setImportAnchorEl] = useState(null);

  const { cube, canEdit, cubeID, hasCustomImages, setCube } = useContext(CubeContext);
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
    (updated) => {
      addAlert('success', 'Update Successful');
      setCube(updated);
    },
    [addAlert, setCube],
  );

  const handleChangeCubeView = useCallback(
    (event) => {
      const { target } = event;
      const { value } = target;
      setCubeView(value);
    },
    [setCubeView],
  );

  const handleMassEdit = useCallback(
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
    (event) => {
      event.preventDefault();
      const { currentTarget } = event;
      const collapse = currentTarget.getAttribute('data-target');
      console.log(collapse);
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
  console.log(openCollapse);

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
      <MenuItem disabled>Import</MenuItem>,
      <PasteBulkModalItem modalProps={{}}>Paste Text</PasteBulkModalItem>,
      <UploadBulkModalItem modalProps={{}}>Upload File</UploadBulkModalItem>,
      <UploadBulkReplaceModalItem modalProps={{}}>Replace with CSV File Upload</UploadBulkReplaceModalItem>,
      <MenuItem divider />,
    ];
  }
  const importMenuItems = [
    ...editMenuItems,
    <MenuItem disabled>Export</MenuItem>,
    <MenuItem onClick={() => cloneCube(cubeID)}>Clone Cube</MenuItem>,
    <MenuItem href={`/cube/${cubeID}/export/cubecobra?${urlSegment}`}>CubeCobra (.txt)</MenuItem>,
    <MenuItem href={`/cube/${cubeID}/export/plaintext?${urlSegment}`}>Card Names (.txt)</MenuItem>,
    <MenuItem href={`/cube/${cubeID}/export/csv?${urlSegment}`}>Comma-Separated (.csv)</MenuItem>,
    <MenuItem href={`/cube/${cubeID}/export/forge?${urlSegment}`}>Forge (.dck)</MenuItem>,
    <MenuItem href={`/cube/${cubeID}/export/mtgo?${urlSegment}`}>MTGO (.txt)</MenuItem>,
    <MenuItem href={`/cube/${cubeID}/export/xmage${urlSegment}`}>XMage (.dck)</MenuItem>,
    <MenuItem divider />,
    <MenuItem>
      <Tooltip title="Order export using current sort options.">
        <FormControl>
          <Checkbox checked={isSortUsed} onChange={(event) => setIsSortUsed(event.target.checked)} />
          <Typography variant="caption">Use Sort for Export.</Typography>
        </FormControl>
      </Tooltip>
    </MenuItem>,
    <MenuItem>
      <Tooltip title="Include in export only cards matching current filter.">
        <FormControl>
          <Checkbox checked={isFilterUsed} onChange={(event) => setIsFilterUsed(event.target.checked)} />
          <Typography variant="caption">Use Filter</Typography>
        </FormControl>
      </Tooltip>
    </MenuItem>,
  ];

  return (
    <>
      <Toolbar sx={{ backgroundColor: 'background.paper' }}>
        <FormControl sx={{ marginY: 1 }}>
          <InputLabel id="cube-view-style-label">Cube View Style</InputLabel>
          <Select
            id="cube-view-style-select"
            labelId="cube-view-style-label"
            value={cubeView}
            onChange={handleChangeCubeView}
            autoWidth
            label="Cube View Style"
          >
            <MenuItem value="table">Table View</MenuItem>
            <MenuItem value="spoiler">Visual Spoiler</MenuItem>
            {!canEdit ? '' : <MenuItem value="list">List View</MenuItem>}
            <MenuItem value="curve">Curve View</MenuItem>
          </Select>
        </FormControl>
        <Box component="nav" sx={{ marginLeft: 'auto' }}>
          {!canEdit ? (
            ''
          ) : (
            <Button data-target="edit" onClick={handleOpenCollapse}>
              <Typography color="primary" variant="subtitle1">
                Add/Remove
              </Typography>
            </Button>
          )}
          <Button data-target="sort" onClick={handleOpenCollapse}>
            <Typography color="primary" variant="subtitle1">
              Sort
            </Typography>
          </Button>
          <Button data-target="filter" onClick={handleOpenCollapse}>
            <Typography color="primary" variant="subtitle1">
              Filter
            </Typography>
          </Button>
          <Button data-target="compare" onClick={handleOpenCollapse}>
            <Typography color="primary" variant="subtitle1">
              Compare
            </Typography>
          </Button>
          {!canEdit ? (
            ''
          ) : (
            <>
              <Button onClick={handleMassEdit}>
                <Typography color="primary" variant="subtitle1">
                  {cubeView === 'list' ? 'Edit Selected' : 'Mass Edit'}
                </Typography>
              </Button>
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
                <Typography color="primary" variant="subtitle1">
                  Customize Basics
                </Typography>
              </CustomizeBasicsModalLink>
            </>
          )}
          <Button
            id="display-menu-button"
            aria-controls={displayAnchorEl ? 'display-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={displayAnchorEl ? 'true' : undefined}
            onClick={(event) => setDisplayAnchorEl(event.currentTarget)}
          >
            Display
          </Button>
          <Menu
            id="display-menu"
            anchorEl={displayAnchorEl}
            open={!!displayAnchorEl}
            onClose={() => setDisplayAnchorEl(null)}
            MenuListProps={{ 'aria-labelledby': 'display-menu-button' }}
          >
            <MenuItem onClick={handleOpenTagColorsModal}>{canEdit ? 'Set Tag Colors' : 'View Tag Colors'}</MenuItem>
            {!hasCustomImages && (
              <MenuItem onClick={toggleShowCustomImages}>
                {showCustomImages ? 'Hide Custom Images' : 'Show Custom Images'}
              </MenuItem>
            )}
            <MenuItem onClick={toggleShowMaybeboard}>{showMaybeboard ? 'Hide Maybeboard' : 'Show Maybeboard'}</MenuItem>
            <MenuItem onClick={() => changeSort({ showOther: !showOther })}>
              {showOther ? 'Hide Unsorted Cards' : 'Show Unsorted Cards'}
            </MenuItem>
            <MenuItem onClick={() => toggleUseSticky()}>
              {`${useSticky ? 'Disable' : 'Enable'} Sticky Column Headers.`}
            </MenuItem>
          </Menu>
          <Button
            id="import-menu-button"
            aria-controls={importAnchorEl ? 'import-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={importAnchorEl ? 'true' : undefined}
            onClick={(event) => setImportAnchorEl(event.currentTarget)}
          >
            {canEdit ? 'Import/Export' : 'Export'}
          </Button>
          <Menu
            id="import-menu"
            anchorEl={importAnchorEl}
            open={!!importAnchorEl}
            onClose={() => setImportAnchorEl(null)}
            MenuListProps={{ 'aria-labelledby': 'import-menu-button' }}
          >
            {importMenuItems}
          </Menu>
        </Box>
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
      <CompareCollapse in={openCollapse === 'compare'} />
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
  cubeDefaultShowUnsorted: PropTypes.bool.isRequired,
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
};
export default CubeListNavbar;

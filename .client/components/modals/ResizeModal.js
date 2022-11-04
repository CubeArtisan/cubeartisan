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
import { Button, Modal, Paper, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

import {
  ContainerBody,
  ContainerFooter,
  ContainerHeader,
  LayoutContainer,
} from '@cubeartisan/client/components/containers/LayoutContainer.js';
import FilterCollapse from '@cubeartisan/client/components/FilterCollapse.js';
import CSRFForm from '@cubeartisan/client/components/inputs/CSRFForm.js';
import { DEFAULT_FILTER } from '@cubeartisan/client/filtering/FilterCards.js';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';

/**
 * @typedef {import('@cubeartisan/client/filtering/FilterCards.js').Filter} Filter
 */

/**
 * @typedef ResizeModalProps
 * @property {string} cubeID
 */

/** @type {React.FC<ResizeModalProps>} */
const ResizeModal = ({ cubeID }) => {
  const [open, toggleOpen] = useToggle(false);
  const [size, setSize] = useState('720');
  const [filter, setFilter] = useState(() => DEFAULT_FILTER);
  const valid = useMemo(() => !Number.isInteger(parseInt(size, 10)), [size]);

  return (
    <>
      <Button color="success" onClick={toggleOpen}>
        Resize
      </Button>
      <Modal open={open} onClose={toggleOpen}>
        <CSRFForm method="POST" action={`/cube/${cubeID}/resize/${size}`} encType="multipart/form-data">
          <LayoutContainer>
            <ContainerHeader title="Resize Cube" />
            <ContainerBody>
              <Typography variant="body1">
                Resize your cube to the set size. This will add or remove cards from the suggestions found in the
                recommender analysis tab in order to reach the requested size. For best results, don't use large deltas
                (20 to 360 won't be great).
              </Typography>
              <TextField
                name="size"
                label="New Size"
                placeholder="Desired New Size"
                value={size}
                error={size.length > 0 && !valid}
                onChange={(event) => setSize(event.target.value)}
                helperText={size.length > 0 && !valid ? 'Not a valid integer.' : null}
              />
              <input type="hidden" name="filter" value={filter?.stringify} />
              <Paper sx={{ padding: 3 }}>
                <Typography variant="h5">Filter for restrictions:</Typography>
                <Typography variant="body1">
                  If you include a filter, this will only add or remove cards that match the filter. If there are not
                  enough cards found to add or remove, your target size may not be reached.
                </Typography>
                <FilterCollapse defaultFilterText="" filter={filter} setFilter={setFilter} isOpen />
              </Paper>
            </ContainerBody>
            <ContainerFooter>
              <Button color="success" type="submit" disabled={!valid}>
                Resize
              </Button>
              <Button color="secondary" onClick={toggleOpen}>
                Close
              </Button>
            </ContainerFooter>
          </LayoutContainer>
        </CSRFForm>
      </Modal>
    </>
  );
};
ResizeModal.propTypes = {
  cubeID: PropTypes.string.isRequired,
};
export default ResizeModal;

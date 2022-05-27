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
  Alert,
  Box,
  Button,
  Collapse,
  Divider,
  FormControlLabel,
  Grid,
  Link,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useContext, useState } from 'react';

import AutocompleteInput from '@cubeartisan/client/components/AutocompleteInput.js';
import Changelist from '@cubeartisan/client/components/Changelist.js';
import ChangelistContext from '@cubeartisan/client/components/contexts/ChangelistContext.js';
import CubeContext from '@cubeartisan/client/components/contexts/CubeContext.js';
import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';
import ResizeModal from '@cubeartisan/client/components/modals/ResizeModal.js';
import CSRFForm from '@cubeartisan/client/components/utils/CSRFForm.js';
import useToggle from '@cubeartisan/client/hooks/UseToggle.js';
import { cardName, encodeName } from '@cubeartisan/client/utils/Card.js';

export const getCard = async (cubeID, name, setAlerts) => {
  if (name && name.length > 0) {
    const normalized = encodeName(name);
    const response = await fetch(`/card/${normalized}/details`);
    if (!response.ok) {
      const message = `Couldn't get card: ${response.status}.`;
      if (setAlerts) {
        setAlerts((alerts) => [...alerts, { color: 'danger', message }]);
      } else {
        console.error(message);
      }
      return null;
    }

    const json = await response.json();
    if (json.success !== 'true' || !json.card) {
      const message = `Couldn't find card [${name}].`;
      if (setAlerts) {
        setAlerts((alerts) => [...alerts, { color: 'danger', message }]);
      } else {
        console.error(message);
      }
      return null;
    }
    return json.card;
  }
  return null;
};

const EditCollapse = ({ isOpen }) => {
  const [alerts, setAlerts] = useState([]);
  const [specifyEdition, toggleSpecifyEdition] = useToggle(false);

  const {
    changes,
    addValue,
    setAddValue,
    removeValue,
    setRemoveValue,
    addInputRef,
    removeInputRef,
    addChange,
    setChanges,
  } = useContext(ChangelistContext);
  const { cube, cubeID } = useContext(CubeContext);
  const { toggleShowMaybeboard } = useContext(DisplayContext);

  const additions = changes.filter((change) => change.add || change.replace).length;
  const removals = changes.filter((change) => change.remove || change.replace).length;
  const newTotal = cube.cards.length + additions - removals;

  const handleChange = useCallback(
    (event) =>
      ({
        add: setAddValue,
        remove: setRemoveValue,
      }[event.target.name](event.target.value)),
    [setAddValue, setRemoveValue],
  );

  const handleAdd = useCallback(
    async (event, newValue) => {
      event.preventDefault();
      try {
        const card = await getCard(cubeID, newValue || addValue, setAlerts);
        if (!card) {
          return;
        }
        addChange({ add: { details: card } });
        setAddValue('');
        setRemoveValue('');
        if (addInputRef.current) {
          addInputRef.current.focus();
        }
      } catch (e) {
        console.error(e);
      }
    },
    [addChange, addValue, addInputRef, cubeID, setAddValue, setRemoveValue],
  );

  const handleRemoveReplace = useCallback(
    async (event, newValue) => {
      event.preventDefault();
      const replace = addValue.length > 0;
      try {
        const cardOut = cube.cards.find(
          (card) =>
            cardName(card).toLowerCase() === (newValue || removeValue).toLowerCase() &&
            !changes.some(
              (change) =>
                (change.remove && change.remove.index === card.index) ||
                (Array.isArray(change.replace) && change.replace[0].index === card.index),
            ),
        );
        if (!cardOut) {
          setAlerts((items) => [
            ...items,
            { color: 'danger', message: `Couldn't find a card with name [${newValue || removeValue}].` },
          ]);
          return;
        }
        if (replace) {
          const cardIn = await getCard(cubeID, addValue, setAlerts);
          if (!cardIn) {
            return;
          }
          addChange({ replace: [cardOut, { details: cardIn }] });
        } else {
          addChange({ remove: cardOut });
        }
        setAddValue('');
        setRemoveValue('');
        /* If replace, put focus back in addInputRef; otherwise leave it here. */
        const focus = replace ? addInputRef : removeInputRef;
        if (focus.current) {
          focus.current.focus();
        }
      } catch (e) {
        console.error(e);
      }
    },
    [addChange, addInputRef, addValue, removeInputRef, removeValue, cube, cubeID, changes, setAddValue, setRemoveValue],
  );

  const handleDiscardAll = useCallback(() => {
    setChanges([]);
  }, [setChanges]);

  return (
    <Collapse in={isOpen} sx={{ backgroundColor: 'background.paper' }}>
      <Box sx={{ padding: 2 }}>
        {alerts.map(({ color, message }, index) => (
          <Alert
            color={color}
            sx={{ marginY: 1 }}
            onClose={() => setAlerts((old) => old.filter((_, idx) => idx !== index))}
            key={/* eslint-disable-line react/no-array-index-key */ index}
          >
            {message}
          </Alert>
        ))}
        <Box sx={{ display: 'flex' }}>
          <Box component="form" sx={{ marginRight: 2, marginBottom: 2, display: 'flex' }} onSubmit={handleAdd}>
            <AutocompleteInput
              treeUrl={specifyEdition ? '/cards/names/full' : '/cards/names'}
              treePath="cardnames"
              type="text"
              innerRef={addInputRef}
              name="add"
              value={addValue}
              onChange={handleChange}
              onSubmit={handleAdd}
              placeholder="Card to Add"
              autoComplete="off"
              data-lpignore
              className="square-right"
            />
            <Button color="success" type="submit" disabled={addValue.length === 0}>
              Add
            </Button>
          </Box>
          <Box
            component="form"
            sx={{ marginRight: 2, marginBottom: 2, display: 'flex' }}
            onSubmit={handleRemoveReplace}
          >
            <AutocompleteInput
              cubeId={cube._id}
              treeUrl={`/cube/${cubeID}/cards/names`}
              treePath="cardnames"
              type="text"
              innerRef={removeInputRef}
              name="remove"
              value={removeValue}
              onChange={handleChange}
              onSubmit={handleRemoveReplace}
              placeholder="Card to Remove"
              autoComplete="off"
              data-lpignore
              className="square-right"
            />
            <Button color="success" type="submit" disabled={removeValue.length === 0}>
              Remove/Replace
            </Button>
          </Box>
          <FormControlLabel
            control={
              <Switch
                checked={specifyEdition}
                onChange={toggleSpecifyEdition}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Specify Versions"
          />
          <ResizeModal cubeID={cubeID} />
          <Button color="success" onClick={toggleShowMaybeboard}>
            Maybeboard
          </Button>
        </Box>
        <Collapse in={changes.length > 0}>
          <CSRFForm method="POST" action={`/cube/${cubeID}`}>
            <Grid container>
              <Grid item xs={12} lg={4} sx={{ paddingX: 1 }}>
                <Typography variant="h6">Changelist</Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ marginLeft: 'auto' }}
                >{`+${additions}, -${removals}, ${newTotal} Total`}</Typography>
                <Divider sx={{ marginY: 1 }} />
                <Changelist />
              </Grid>
              <Grid item xs={12} lg={8} sx={{ display: 'flex', flexFlow: 'column', paddingX: 1 }}>
                <Typography variant="h6">Blog Post</Typography>
                <TextField id="blog-post-name" name="title" label="Blog Title" sx={{ marginBottom: 1 }} />
                <TextField id="blog-post-body" name="blog" label="Blog Body" multiline rows={16} />
                <Typography variant="body1">
                  Having trouble formatting your posts? Check out the{' '}
                  <Link href="/markdown" target="_blank">
                    markdown guide
                  </Link>
                  .
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', marginBottom: 2 }}>
              <Button color="success" size="medium" type="submit">
                Save Changes
              </Button>
              <Button color="warning" onClick={handleDiscardAll}>
                Discard All
              </Button>
            </Box>
          </CSRFForm>
        </Collapse>
      </Box>
    </Collapse>
  );
};
EditCollapse.propTypes = {
  isOpen: PropTypes.bool,
};
EditCollapse.defaultProps = {
  isOpen: false,
};
export default EditCollapse;

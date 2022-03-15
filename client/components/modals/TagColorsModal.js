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
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { LoadingButton } from '@mui/lab';

import TagContext, { TAG_COLORS } from '@cubeartisan/client/components/contexts/TagContext.js';
import { arrayMove } from '@cubeartisan/client/utils/Util.js';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { DragHandle } from '@mui/icons-material';

const SortableDragHandle = SortableHandle(() => <DragHandle />);

const SortableItem = SortableElement(({ value }) => value);

const SortableList = SortableContainer(({ items }) => (
  <List>
    {items.map(({ element, key }, index) => (
      <SortableItem key={key} index={index} value={element} />
    ))}
  </List>
));

const TagColorRow = ({ tag, value, onChange, dragging }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (dragging) setOpen(false);
  }, [dragging]);
  const handleOpen = useCallback(() => setOpen(!dragging), [dragging]);
  const handleClose = useCallback(() => setOpen(false), []);
  return (
    <ListItem disableGutters>
      <SortableDragHandle />
      <FormControl fullWidth>
        <InputLabel id={`${tag}-color-select-id`}>{tag}</InputLabel>
        <Select
          open={open}
          labelId={`${tag}-color-select-id`}
          id={`${tag}-color-select`}
          label={`${tag} Color`}
          name={`tagcolor-${tag}`}
          value={value ?? 'none'}
          onChange={onChange}
          onOpen={handleOpen}
          onClose={handleClose}
          sx={{ backgroundColor: `tags.${value}` }}
        >
          {TAG_COLORS.map(([name, ivalue]) => (
            <MenuItem key={ivalue ?? 'none'} value={ivalue ?? 'none'} sx={{ backgroundColor: `tags.${ivalue}` }}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ListItem>
  );
};
TagColorRow.propTypes = {
  tag: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  dragging: PropTypes.bool,
};
TagColorRow.defaultProps = {
  value: null,
  dragging: false,
};

const TagColorsModal = ({ canEdit, isOpen, toggle }) => {
  const { tagColors: savedTagColors, setTagColors: saveTagColors, allTags } = useContext(TagContext);

  const [dragging, setDragging] = useState(false);
  const [tagColors, setTagColors] = useState(savedTagColors);

  const submit = useCallback(
    async (event) => {
      event.preventDefault();
      if (canEdit) {
        await saveTagColors(tagColors);
      }
      setDragging(true);
      return toggle();
    },
    [tagColors, saveTagColors, canEdit, toggle],
  );

  const changeColor = useCallback((event) => {
    const {
      target: { name, value },
    } = event;
    if (!name.startsWith('tagcolor-')) {
      return;
    }
    const tag = name.slice('tagcolor-'.length);
    const newColor = value === 'none' ? null : value;

    setTagColors((oldTagColors) => {
      const result = Array.from(oldTagColors);
      const index = oldTagColors.findIndex((tagColor) => tag === tagColor.tag);
      if (index > -1) {
        result[index] = { tag, color: newColor };
      } else {
        result.push({ tag, color: newColor });
      }
      return result;
    });
  }, []);

  const layoutTagColors = useCallback(() => {
    const knownTags = tagColors.map(({ tag }) => tag);
    const knownTagColors = tagColors.filter(({ tag }) => allTags.includes(tag));
    const unknownTags = allTags.filter((tag) => !knownTags.includes(tag));
    const unknownTagColors = unknownTags.map((tag) => ({ tag, color: null }));

    return [...knownTagColors, ...unknownTagColors];
  }, [allTags, tagColors]);

  const handleSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      setDragging(false);
      const allTagColors = layoutTagColors();
      setTagColors(arrayMove(allTagColors, oldIndex, newIndex));
    },
    [layoutTagColors],
  );
  const handleSortStart = useCallback(() => setDragging(true), []);

  const orderedTags = useMemo(layoutTagColors, [layoutTagColors]);

  const editableRows = useMemo(
    () =>
      orderedTags.map(({ tag, color }) => ({
        element: <TagColorRow tag={tag} value={color} key={tag} onChange={changeColor} dragging={dragging} />,
        key: tag,
      })),
    [orderedTags, changeColor, dragging],
  );

  const staticRows = useMemo(
    () =>
      orderedTags.map(({ tag, color }) => (
        <Typography variant="body1" key={tag} sx={{ backgroundColor: `tags.${color}` }}>
          {tag}
        </Typography>
      )),
    [orderedTags],
  );

  return (
    <Dialog open={isOpen} onClose={toggle}>
      <DialogTitle>{canEdit ? 'Set Tag Colors' : 'Tag Colors'}</DialogTitle>
      <DialogContent>
        {!canEdit ? (
          ''
        ) : (
          <Typography variant="subtitle1">
            Drag the tags below into a priority order to use for cards that have more than one tag
          </Typography>
        )}
        {!canEdit ? (
          staticRows
        ) : (
          <SortableList onSortStart={handleSortStart} onSortEnd={handleSortEnd} items={editableRows} useDragHandle />
        )}
      </DialogContent>
      <DialogActions>
        <LoadingButton color="success" onClick={submit}>
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
TagColorsModal.propTypes = {
  canEdit: PropTypes.bool,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
};
TagColorsModal.defaultProps = {
  canEdit: false,
  isOpen: false,
};
export default TagColorsModal;

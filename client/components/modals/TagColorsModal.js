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
import { DragHandle } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import TagContext, { TAG_COLORS } from '@cubeartisan/client/components/contexts/TagContext.js';
import DndProvider from '@cubeartisan/client/components/utils/DndProvider.js';
import { arrayMove } from '@cubeartisan/client/utils/Util.js';

/**
 * @typedef {import('@cubeartisan/client/components/contexts/TagContext.js').TagColor} TagColor
 */

const TagColorRow = ({ tag, value, onChange, idx, onSort, accept, sx }) => {
  const [open, setOpen] = useState(false);
  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag(() => ({
    type: accept,
    item: { tag, value, idx },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    // @ts-ignore
    drop: (item) => onSort(item?.idx, idx - 1),
  }));
  useEffect(() => {
    if (isDragging) setOpen(false);
  }, [isDragging]);
  const handleOpen = useCallback(() => setOpen(!isDragging), [isDragging]);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <Box ref={dropRef} sx={{ ...sx, display: isDragging ? 'none' : 'block' }}>
      {isOver && (
        <TagColorRow
          tag=""
          value=""
          onChange={() => {}}
          idx={-1}
          onSort={() => {}}
          accept=""
          sx={{ visibility: 'hidden' }}
        />
      )}
      <ListItem disableGutters ref={dragPreviewRef}>
        <ListItemIcon ref={dragRef}>
          <DragHandle />
        </ListItemIcon>
        <ListItemText>
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
        </ListItemText>
      </ListItem>
    </Box>
  );
};
TagColorRow.propTypes = {
  tag: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  onSort: PropTypes.func.isRequired,
  accept: PropTypes.oneOf(['', 'tag']),
  sx: PropTypes.shape({}),
};
TagColorRow.defaultProps = {
  value: null,
  accept: 'tag',
  sx: null,
};

const TagColorsModal = ({ canEdit, isOpen, toggle }) => {
  const { tagColors: savedTagColors, setTagColors: saveTagColors, allTags } = useContext(TagContext);

  const [tagColors, setTagColors] = useState(/** @type {TagColor[]} */ savedTagColors);

  const submit = useCallback(
    /** @param {any} event */
    async (event) => {
      event.preventDefault();
      if (canEdit) {
        await saveTagColors(tagColors);
      }
      return toggle();
    },
    [tagColors, saveTagColors, canEdit, toggle],
  );

  const changeColor = useCallback(
    /** @param {any} event */
    (event) => {
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
    },
    [],
  );

  const layoutTagColors = useCallback(() => {
    const knownTags = tagColors.map(({ tag }) => tag);
    const knownTagColors = tagColors.filter(({ tag }) => allTags.includes(tag));
    const unknownTags = allTags.filter((tag) => !knownTags.includes(tag));
    const unknownTagColors = unknownTags.map((tag) => ({ tag, color: null }));

    return [...knownTagColors, ...unknownTagColors];
  }, [allTags, tagColors]);

  const orderedTags = useMemo(layoutTagColors, [layoutTagColors]);

  const onSort = useCallback(
    /**
     * @param {number} oldIndex
     * @param {number} newIndex
     */
    (oldIndex, newIndex) => {
      const allTagColors = layoutTagColors();
      setTagColors(arrayMove(allTagColors, oldIndex, newIndex));
    },
    [layoutTagColors],
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
          <DndProvider>
            <List>
              {orderedTags.map(({ tag, color }, idx) => (
                <TagColorRow tag={tag} value={color} key={tag} idx={idx} onChange={changeColor} onSort={onSort} />
              ))}
            </List>
          </DndProvider>
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

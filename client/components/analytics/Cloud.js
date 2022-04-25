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
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { TagCloud } from 'react-tagcloud';
import PropTypes from 'prop-types';
import { Box, Tooltip, Typography } from '@mui/material';

import AsfanDropdown from '@cubeartisan/client/components/AsfanDropdown.js';
import useQueryParam from '@cubeartisan/client/hooks/useQueryParam.js';
import CubePropTypes from '@cubeartisan/client/proptypes/CubePropType.js';
import TagInput from '@cubeartisan/client/components/TagInput.js';
import { arrayMove } from '@cubeartisan/client/utils/Util.js';
import DisplayContext from '@cubeartisan/client/components/contexts/DisplayContext.js';

const TagCloudTag = ({ tag, size, color }) => (
  <Tooltip title={Number.isInteger(tag.count) ? tag.count : tag.count.toFixed(2)}>
    <Typography sx={{ fontSize: size, color }} align="center">
      {tag.value}
    </Typography>
  </Tooltip>
);

TagCloudTag.propTypes = {
  tag: PropTypes.shape({
    value: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

const COLOR_OPTIONS = {
  dark: 'light',
  default: 'dark',
  light: 'dark',
};

const Cloud = ({ cards, cube, setAsfans, defaultFormatId }) => {
  const { theme } = useContext(DisplayContext);

  const [exclude, setExclude] = useQueryParam('exclude', '');
  const [tagInput, setTagInput] = useState('');
  const excludeList = useMemo(
    () =>
      (exclude ?? '')
        .split(',')
        .map((ex) => ex.trim())
        .filter((t) => t),
    [exclude],
  );

  const tags = {};
  cards.forEach((card) =>
    card.tags.forEach((tag) => {
      if (card.asfan) {
        tag = tag.trim();
        if (tags[tag]) {
          tags[tag] += card.asfan;
        } else {
          tags[tag] = card.asfan;
        }
      }
    }),
  );
  const words = Object.entries(tags)
    .filter(([tag]) => !excludeList.includes(tag))
    .map(([value, count]) => ({ value, count }));

  const tagRenderer = (tag, size, color) => (
    <TagCloudTag tag={tag} size={size} color={color} key={tag.key || tag.value} />
  );

  const addTag = useCallback(
    ({ text }) => {
      text = text.trim();
      if (text && !excludeList.includes(text)) {
        setExclude([...excludeList, text].join(','));
      }
      setTagInput('');
    },
    [excludeList, setExclude],
  );
  const addTagText = useCallback((tag) => tag.trim() && addTag({ text: tag }), [addTag]);
  const deleteTag = useCallback(
    (tagIndex) => setExclude(excludeList.filter((_, i) => i !== tagIndex).join(',')),
    [excludeList, setExclude],
  );
  const reorderTag = useCallback(
    (_, currIndex, newIndex) => {
      setExclude(arrayMove(excludeList, currIndex, newIndex));
    },
    [excludeList, setExclude],
  );

  return (
    <>
      <Typography variant="h4">Tag Cloud</Typography>
      <Typography variant="subtitle1">
        Tags in your cube with random colors weighted by the expected number of cards with that tag a player will open
        on average.
      </Typography>
      <AsfanDropdown cube={cube} defaultFormatId={defaultFormatId} setAsfans={setAsfans} />
      <Box component="span">
        <Typography variant="body1">Tags to exclude</Typography>
        <TagInput
          tags={excludeList.map((t) => ({ text: t, id: t }))}
          inputValue={tagInput}
          handleInputChange={setTagInput}
          handleInputBlur={addTagText}
          addTag={addTag}
          deleteTag={deleteTag}
          reorderTag={reorderTag}
          dontAddSuggestions
        />
      </Box>
      <TagCloud minSize={10} maxSize={80} colorOptions={COLOR_OPTIONS[theme]} tags={words} renderer={tagRenderer} />
    </>
  );
};

Cloud.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  cube: CubePropTypes.isRequired,
  defaultFormatId: PropTypes.number,
  setAsfans: PropTypes.func.isRequired,
};
Cloud.defaultProps = {
  defaultFormatId: null,
};

export default Cloud;

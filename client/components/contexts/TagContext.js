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
import { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { csrfFetch } from '@cubeartisan/client/utils/CSRF';

export const getCardColorClass = (card) => {
  const type = card.type_line || card.details.type;
  const colors = card.colors || card.details.color_identity;
  if (type.toLowerCase().includes('land')) {
    return 'lands';
  }
  if (colors.length === 0) {
    return 'colorless';
  }
  if (colors.length > 1) {
    return 'multi';
  }
  if (colors.length === 1 && Array.from('WUBRGC').includes(colors[0])) {
    return {
      W: 'white',
      U: 'blue',
      B: 'black',
      R: 'red',
      G: 'green',
      C: 'colorless',
    }[colors[0]];
  }
  return 'colorless';
};

export const getCardTagColorClass = (tagColors, card) => {
  const tagColor = tagColors.find(({ tag }) => (card.tags || []).includes(tag));
  if (tagColor && tagColor.color) {
    return `tag-color tag-${tagColor.color}`;
  }
  return getCardColorClass(card);
};

export const getTagColorClass = (tagColors, tag) => {
  const tagColor = tagColors.find((tagColorB) => tag === tagColorB.tag);
  if (tagColor && tagColor.color) {
    return `tag-color tag-${tagColor.color}`;
  }
  return 'tag-no-color';
};

export const TAG_COLORS = [
  ['None', null],
  ['Red', 'red'],
  ['Brown', 'brown'],
  ['Orange', 'orange'],
  ['Yellow', 'yellow'],
  ['Green', 'green'],
  ['Turquoise', 'turquoise'],
  ['Blue', 'blue'],
  ['Purple', 'purple'],
  ['Violet', 'violet'],
  ['Pink', 'pink'],
];

const TagContext = createContext({
  addSuggestion: () => {
    console.error('Error: No TagContext!');
  },
  allSuggestions: [],
});

const TagContextProvider = ({ children, cubeID, defaultTagColors, defaultShowTagColors, defaultTags, userID }) => {
  const [tagColors, setTagColors] = useState(Array.from(defaultTagColors ?? []));
  const [showTagColors, setShowTagColors] = useState(!!defaultShowTagColors);
  const [tags, setTags] = useState(defaultTags ?? []);

  const saveTagColors = useCallback(
    async (newTagColors) => {
      const response = await csrfFetch(`/cube/${cubeID}/tags/colors`, {
        method: 'PUT',
        body: JSON.stringify(newTagColors),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setTagColors(newTagColors);
      } else {
        console.error('Request failed.');
      }
    },
    [cubeID],
  );

  const saveShowTagColors = useCallback(
    async (newShowTagColors) => {
      const response = await csrfFetch(`/user/${userID}/showtagcolors`, {
        method: 'PUT',
        body: JSON.stringify({
          show_tag_colors: newShowTagColors,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setShowTagColors(newShowTagColors);
      } else {
        console.error('Request failed.');
      }
    },
    [userID],
  );

  const addTag = useCallback(
    (tag) => {
      if (!tags.some((t) => t.id === tag.id)) {
        setTags((oldTags) => [...oldTags, tag]);
      }
    },
    [tags],
  );

  const cardColorClass = useCallback(
    (card) => {
      if (showTagColors) return getCardTagColorClass(tagColors, card);
      return getCardColorClass(card);
    },
    [tagColors, showTagColors],
  );

  const tagColorClass = useCallback(
    (tag) => {
      if (showTagColors) return getTagColorClass(tagColors, tag);
      return 'tag-no-color';
    },
    [tagColors, showTagColors],
  );

  const value = {
    allSuggestions: tags,
    addSuggestion: addTag,
    allTags: tags.map((tag) => tag.text),
    tagColors,
    setTagColors: saveTagColors,
    showTagColors,
    setShowTagColors: saveShowTagColors,
    cardColorClass,
    tagColorClass,
  };
  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};
TagContextProvider.propTypes = {
  cubeID: PropTypes.string.isRequired,
  defaultTagColors: PropTypes.arrayOf(PropTypes.string),
  defaultShowTagColors: PropTypes.bool,
  defaultTags: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
  userID: PropTypes.string.isRequired,
};
TagContextProvider.defaultProps = {
  defaultTagColors: [],
  defaultShowTagColors: false,
  defaultTags: [],
};
export default TagContext;

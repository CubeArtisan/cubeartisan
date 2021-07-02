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
import { useContext } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import PropTypes from 'prop-types';

import TagContext from '@cubeartisan/client/contexts/TagContext';

const TagInput = ({ tags, addTag, deleteTag, reorderTag, dontAddSuggestions, ...props }) => {
  const { allSuggestions, addSuggestion, tagColorClass } = useContext(TagContext);
  return (
    <ReactTags
      tags={tags.map((tag) => ({ ...tag, className: tagColorClass(tag.text) }))}
      suggestions={allSuggestions}
      handleAddition={(tag) => {
        if (!dontAddSuggestions) {
          addSuggestion(tag);
        }
        addTag(tag);
      }}
      handleDelete={deleteTag}
      handleDrag={reorderTag}
      placeholder="Tag (hit tab)..."
      maxLength={24}
      autofocus={false}
      classNames={{
        tags: 'flex-grow-1',
        tag: 'ReactTags__tag my-0',
        tagInput: 'ReactTags__tagInput m-0',
      }}
      {...props}
    />
  );
};

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string, id: PropTypes.string })).isRequired,
  addTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  reorderTag: PropTypes.func.isRequired,
  dontAddSuggestions: PropTypes.bool,
};
TagInput.defaultProps = {
  dontAddSuggestions: false,
};

export default TagInput;

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
import { useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

import TagContext, { getTagColorClass, TAG_COLORS } from '@cubeartisan/client/components/contexts/TagContext';
import { arrayMove } from '@cubeartisan/client/utils/Util';

import LoadingButton from '@cubeartisan/client/components/LoadingButton';

const SortableItem = SortableElement(({ value }) => <div className="sortable-item">{value}</div>);

const SortableList = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map(({ element, key }, index) => (
        <SortableItem key={key} index={index} value={element} />
      ))}
    </div>
  );
});

const TagColorRow = ({ tag, tagClass, value, onChange }) => (
  <Row className="tag-color-row">
    <Col>
      <div className={tagClass}>{tag}</div>
    </Col>
    <Col className="d-flex flex-column justify-content-center">
      <Input type="select" bsSize="sm" name={`tagcolor-${tag}`} value={value || 'none'} onChange={onChange}>
        {TAG_COLORS.map(([name, ivalue]) => (
          <option key={value || 'none'} value={ivalue || 'none'}>
            {name}
          </option>
        ))}
      </Input>
    </Col>
  </Row>
);
TagColorRow.propTypes = {
  tag: PropTypes.string.isRequired,
  tagClass: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
TagColorRow.defaultProps = {
  value: null,
};

const TagColorsModal = ({ canEdit, isOpen, toggle }) => {
  const {
    tagColors: savedTagColors,
    setTagColors: saveTagColors,
    showTagColors: savedShowTagColors,
    setShowTagColors: saveShowTagColors,
    allTags,
  } = useContext(TagContext);

  const [tagColors, setTagColors] = useState(savedTagColors);
  const [showTagColors, setShowTagColors] = useState(savedShowTagColors);

  const submit = useCallback(
    async (event) => {
      event.preventDefault();
      if (canEdit) {
        await Promise.all([saveTagColors(tagColors), saveShowTagColors(showTagColors)]);
      } else {
        await saveShowTagColors(showTagColors);
      }
      return toggle();
    },
    [tagColors, showTagColors, saveTagColors, saveShowTagColors, canEdit, toggle],
  );

  const changeColor = useCallback((event) => {
    const { target } = event;
    const name = target.getAttribute('name');
    if (!name.startsWith('tagcolor-')) {
      return;
    }
    const tag = name.slice('tagcolor-'.length);
    const color = target.value === 'none' ? null : target.value;

    setTagColors((oldTagColors) => {
      const result = Array.from(oldTagColors);
      const index = oldTagColors.findIndex((tagColor) => tag === tagColor.tag);
      if (index > -1) {
        result[index] = { tag, color };
      } else {
        result.push({ tag, color });
      }
      return {
        tagColors: result,
      };
    });
  }, []);

  const changeShowTagColors = useCallback((event) => {
    const {
      target: { checked },
    } = event;
    setShowTagColors(checked);
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
      const allTagColors = layoutTagColors();
      setTagColors(arrayMove(allTagColors, oldIndex, newIndex));
    },
    [layoutTagColors],
  );

  const orderedTags = useMemo(layoutTagColors, [layoutTagColors]);

  const editableRows = useMemo(
    () =>
      orderedTags.map(({ tag, color }) => {
        const tagClass = `tag ${getTagColorClass(tagColors, tag)}`;
        return {
          element: <TagColorRow tag={tag} tagClass={tagClass} value={color} onChange={changeColor} />,
          key: tag,
        };
      }),
    [orderedTags, tagColors, changeColor],
  );

  const staticRows = useMemo(
    () =>
      orderedTags.map(({ tag }) => {
        const tagClass = `mr-2 tag ${getTagColorClass(tagColors, tag)}`;
        return (
          <span key={tag} className={tagClass}>
            {tag}
          </span>
        );
      }),
    [orderedTags, tagColors],
  );

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{canEdit ? 'Set Tag Colors' : 'Tag Colors'}</ModalHeader>
      <ModalBody>
        <Form inline className="mb-2">
          <Label>
            <Input type="checkbox" checked={showTagColors} onChange={changeShowTagColors} />
            Show Tag Colors in Card List
          </Label>
        </Form>
        {!canEdit ? (
          ''
        ) : (
          <em>(Drag the tags below into a priority order to use for cards that have more than one tag)</em>
        )}
        {!canEdit ? (
          staticRows
        ) : (
          <Row className="tag-color-container">
            <Col>
              <SortableList onSortEnd={handleSortEnd} items={editableRows} />
            </Col>
          </Row>
        )}
      </ModalBody>
      <ModalFooter>
        <LoadingButton color="success" className="ml-auto" onClick={submit}>
          Submit
        </LoadingButton>
      </ModalFooter>
    </Modal>
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

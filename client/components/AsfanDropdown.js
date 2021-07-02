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
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Form, Label, Row, UncontrolledDropdown } from 'reactstrap';

import useQueryParam from '@cubeartisan/client/hooks/useQueryParam';
import { calculateAsfans } from '@cubeartisan/client/drafting/createdraft';
import { fromEntries } from '@cubeartisan/client/utils/Util';

const AsfanDropdown = ({ cube, defaultFormatId, setAsfans }) => {
  const [draftFormat, setDraftFormat] = useQueryParam('formatId', null);

  const labelText = useMemo(() => {
    if (draftFormat !== null) {
      if (draftFormat < 0) {
        return 'Standard Draft Format';
      }
      return cube.draft_formats[draftFormat].title;
    }
    return '';
  }, [draftFormat, cube]);
  const toggleUseAsfans = useCallback(
    ({ target }) => setDraftFormat(target.checked ? defaultFormatId : null),
    [setDraftFormat, defaultFormatId],
  );

  useEffect(() => {
    if (draftFormat !== null) {
      try {
        const asfans = calculateAsfans(cube, draftFormat);
        setAsfans(asfans);
      } catch (e) {
        console.error('Invalid Draft Format', draftFormat, cube.draft_formats[draftFormat], e);
        setAsfans(fromEntries(cube.cards.map((card) => [card.cardID, 0])));
      }
    } else {
      setAsfans(fromEntries(cube.cards.map((card) => [card.cardID, 1])));
    }
  }, [cube, draftFormat, setAsfans]);

  return (
    <Row>
      <Col xs="12" sm="6">
        <Label>
          <input type="checkbox" checked={draftFormat !== null} onChange={toggleUseAsfans} /> Use expected count per
          player in a draft format instead of card count.
        </Label>
      </Col>
      {draftFormat !== null && (
        <Col xs="12" sm="6">
          <Form inline>
            Draft Format:
            <UncontrolledDropdown disabled={draftFormat === null} className="ml-2">
              <DropdownToggle caret={draftFormat !== null} color={draftFormat !== null ? 'success' : 'disabled'}>
                {labelText}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => setDraftFormat(-1)}>Standard Draft Format</DropdownItem>
                {cube.draft_formats.length > 0 && <DropdownItem header>Custom Formats</DropdownItem>}
                {cube.draft_formats.map((format, index) => (
                  <DropdownItem key={format._id} onClick={() => setDraftFormat(index)}>
                    {format.title}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Form>
        </Col>
      )}
    </Row>
  );
};

AsfanDropdown.propTypes = {
  cube: PropTypes.shape({
    cards: PropTypes.arrayOf(PropTypes.shape({ cardID: PropTypes.string.isRequired })).isRequired,
    draft_formats: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    ).isRequired,
    defaultDraftFormat: PropTypes.number,
  }).isRequired,
  defaultFormatId: PropTypes.number,
  setAsfans: PropTypes.func.isRequired,
};
AsfanDropdown.defaultProps = {
  defaultFormatId: -1,
};

export default AsfanDropdown;

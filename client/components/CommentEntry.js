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
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';

import LinkButton from '@hypercube/client/components/LinkButton';

const CommentEntry = ({ submit, expanded, toggle, defaultValue }) => {
  const [text, setText] = useState(defaultValue);

  return (
    <Collapse isOpen={expanded}>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="2"
        maxLength="5000"
      />
      <LinkButton
        onClick={() => {
          submit(text);
          toggle();
          setText('');
        }}
      >
        <small>Submit</small>
      </LinkButton>
      <LinkButton className="ml-2" onClick={toggle}>
        <small>Cancel</small>
      </LinkButton>
    </Collapse>
  );
};

CommentEntry.propTypes = {
  submit: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
};

CommentEntry.defaultProps = {
  defaultValue: '',
};

export default CommentEntry;

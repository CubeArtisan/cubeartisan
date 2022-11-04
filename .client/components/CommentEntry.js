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
import { Button, Collapse, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * @typedef CommentEntryProps
 * @property {(text: string) => void} submit
 * @property {boolean} expanded
 * @property {() => void} toggle
 * @property {string?} [defaultValue]
 */

/**
 * @type {React.FC<CommentEntryProps>}
 */
const CommentEntry = ({ submit, expanded, toggle, defaultValue }) => {
  const [text, setText] = useState(defaultValue ?? '');

  return (
    <Collapse in={expanded}>
      <TextField
        value={text}
        onChange={(event) => setText(event.target.value)}
        id="exampleFormControlTextarea1"
        rows={2}
      />
      <Button
        onClick={() => {
          submit(text);
          toggle();
          setText('');
        }}
      >
        Submit
      </Button>
      <Button className="ml-2" onClick={toggle}>
        <small>Cancel</small>
      </Button>
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

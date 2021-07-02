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
import { useMemo } from 'react';

import { UncontrolledAlert } from 'reactstrap';

const DynamicFlash = (props) => {
  const messages = useMemo(() => {
    if (typeof document !== 'undefined') {
      const flashInput = document.getElementById('flash');
      const flashValue = flashInput ? flashInput.value : '[]';
      return JSON.parse(flashValue);
    }
    return [];
  }, []);

  return (
    <div className="mt-3">
      {Object.keys(messages).map((type) =>
        messages[type].map((message, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <UncontrolledAlert key={type + index} color={type} {...props}>
            {message}
          </UncontrolledAlert>
        )),
      )}
    </div>
  );
};

export default DynamicFlash;

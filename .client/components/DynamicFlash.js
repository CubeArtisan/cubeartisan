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
import { Stack } from '@mui/material';
import { useState } from 'react';

import Alert from '@cubeartisan/client/components/wrappers/Alert.js';

const DynamicFlash = (props) => {
  const [messages, setMessages] = useState(() => {
    if (typeof document !== 'undefined') {
      const flashInput = /** @type {HTMLInputElement | null} */ (document.getElementById('flash')); // eslint-disable-line prettier/prettier
      if (!flashInput) {
        return [];
      }
      const flashValue = flashInput?.value ?? '[]';
      console.log('FLASH VALUE', flashValue);
      return JSON.parse(flashValue);
    }
    return [];
  });

  if (Object.values(messages).some((inner) => inner.length > 0)) {
    return (
      <Stack spacing={1} sx={{ marginTop: 1 }}>
        {Object.entries(messages).map(([type, inner]) =>
          inner.map((message, index) => (
            <Alert
              key={type + index /* eslint-disable-line react/no-array-index-key */}
              color={type}
              onClose={() => setMessages((old) => ({ ...old, [type]: old[type].filter((_, idx) => idx !== index) }))}
              {...props}
            >
              {message}
            </Alert>
          )),
        )}
      </Stack>
    );
  }
  return null;
};
export default DynamicFlash;

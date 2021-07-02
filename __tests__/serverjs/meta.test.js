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
import generateMeta from '@hypercube/server/serverjs/meta';

test('generateMeta returns the expected object', () => {
  const title = 'the title';
  const description = 'the description';
  const image = 'a real image url';
  const url = 'a real og url';
  const width = 69;
  const height = 420;
  const expected = [
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: image,
    },
    {
      property: 'og:url',
      content: url,
    },
    {
      property: 'og:image:width',
      content: width || '',
    },
    {
      property: 'og:image:height',
      content: height || '',
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      property: 'twitter:title',
      content: title,
    },
    {
      property: 'twitter:description',
      content: description,
    },
    {
      property: 'twitter:image',
      content: image,
    },
    {
      property: 'twitter:url',
      content: url,
    },
  ];
  const result = generateMeta(title, description, image, url, width, height);
  expect(result).toEqual(expected);
});

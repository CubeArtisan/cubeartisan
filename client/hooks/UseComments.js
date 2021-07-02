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
import { useEffect, useState } from 'react';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF';
import { findUserLinks } from '@cubeartisan/client/markdown/parser';

const useToggle = (type, parent) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const addComment = async (comment) => {
    const mentions = findUserLinks(comment).join(';');
    const response = await csrfFetch(`/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment,
        mentions,
      }),
    });
    const val = await response.json();

    const clone = JSON.parse(JSON.stringify(comments));
    clone.push(val.comment);
    setComments(clone);
  };

  const editComment = async (comment) => {
    await csrfFetch(`/comment`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment,
      }),
    });

    const clone = JSON.parse(JSON.stringify(comments));

    for (let i = 0; i < clone.length; i++) {
      if (clone[i]._id === comment._id) {
        clone[i] = comment;
      }
    }

    setComments(clone);
  };

  useEffect(() => {
    const getData = async () => {
      // Default options are marked with *
      const response = await csrfFetch(`/comment/${type}/${parent}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const val = await response.json();
      return val;
    };

    getData().then((result) => {
      setComments(result.comments);
      setLoading(false);
    });
  }, [parent, type]);

  return [comments, addComment, loading, editComment];
};

export default useToggle;

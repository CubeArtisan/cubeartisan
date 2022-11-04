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
import { plugins } from '@cubeartisan/markdown';
import { useEffect, useState } from 'react';

import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';

/**
 * @typedef {import('@cubeartisan/client/proptypes/CommentPropType.js').Comment} Comment
 */

/**
 * @param {string} type
 * @param {string} parent
 * @returns {[Comment[], (content: string) => Promise<void>, boolean, (comment: Comment) => Promise<void>]} handles
 */
const useComment = (type, parent) => {
  const [comments, setComments] = useState(/** @type {Comment[]} */ []);
  const [loading, setLoading] = useState(true);

  /**
   * @param {string} content
   */
  const addComment = async (content) => {
    const mentions = plugins.findUserLinks(content).join(';');
    const response = await csrfFetch(`/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
        mentions,
      }),
    });
    const val = await response.json();

    const clone = JSON.parse(JSON.stringify(comments));
    clone.push(val.comment);
    setComments(clone);
  };

  /**
   * @param {Comment} comment
   */
  const editComment = async (comment) => {
    await csrfFetch(`/comment/${comment._id}`, {
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
    (async () => {
      // Default options are marked with *
      const response = await csrfFetch(`/comments/${parent}/${type}`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const result = await response.json();
      setComments(result.comments ?? []);
      setLoading(false);
    })();
  }, [parent, type]);

  return [comments, addComment, loading, editComment];
};
export default useComment;

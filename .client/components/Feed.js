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
import { Box, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import BlogPost from '@cubeartisan/client/components/BlogPost.js';
import UserContext from '@cubeartisan/client/components/contexts/UserContext.js';
import BlogPostPropType from '@cubeartisan/client/proptypes/BlogPostPropType.js';
import { csrfFetch } from '@cubeartisan/client/utils/CSRF.js';

const wait = async (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const Feed = ({ items }) => {
  const [feedItems, setFeedItems] = useState(items);
  const user = useContext(UserContext);
  const userID = user._id;

  const fetchMoreData = async () => {
    // intentionally wait to avoid too many DB queries
    await wait(2000);

    const response = await csrfFetch(`/user/${userID}/feeditems/${feedItems.length}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const json = await response.json();
      if (json.success === 'true') {
        const ids = new Set(feedItems.map((item) => item._id));
        const newFeedItems = Array.from(feedItems);
        for (const item of json.items) {
          if (!ids.has(item._id)) {
            newFeedItems.push(item);
          }
        }
        setFeedItems(newFeedItems);
      }
    }
  };

  const loader = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <CircularProgress sx={{ marginX: 'auto' }} />
    </Box>
  );

  return (
    <InfiniteScroll dataLength={feedItems.length} next={fetchMoreData} hasMore loader={loader}>
      {feedItems.map((item) => (
        <BlogPost key={item._id} post={item} />
      ))}
    </InfiniteScroll>
  );
};
Feed.propTypes = {
  items: PropTypes.arrayOf(BlogPostPropType.isRequired).isRequired,
};
export default Feed;

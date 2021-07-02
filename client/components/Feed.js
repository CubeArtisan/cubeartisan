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

import InfiniteScroll from 'react-infinite-scroll-component';

import BlogPost from '@hypercube/client/components/BlogPost';
import { csrfFetch } from '@hypercube/client/utils/CSRF';

import { Spinner } from 'reactstrap';
import BlogPostPropType from '@hypercube/client/proptypes/BlogPostPropType';

const wait = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const Feed = ({ items }) => {
  const [feedItems, setFeedItems] = useState(items);

  const fetchMoreData = async () => {
    // intentionally wait to avoid too many DB queries
    await wait(2000);

    const response = await csrfFetch(`/tool/getfeeditems/${feedItems.length}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const json = await response.json();
      if (json.success === 'true') {
        const ids = new Set(feedItems.map((item) => item._id));
        const newFeedItems = [...feedItems];
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
    <div className="centered py-3 my-4">
      <Spinner className="position-absolute" />
    </div>
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
  items: BlogPostPropType.isRequired,
};

export default Feed;

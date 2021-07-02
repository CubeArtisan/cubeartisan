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
import RSSParser from 'rss-parser';

const parser = new RSSParser({
  customFields: {
    feed: [['itunes:image', 'image']],
    item: [['enclosure', 'source']],
  },
});
/* we need:

{
  title,
  description,
  url,
  image
}

*/
const getFeedData = async (url) => {
  const feed = await parser.parseURL(url);

  return {
    title: feed.title,
    description: feed.description,
    url: feed.link,
    image: feed.image.$.href,
  };
};

/* we need:

{ 
  title,
  description,
  source,
  guid,
  date,
  link,
}

*/
const getFeedEpisodes = async (url) => {
  const feed = await parser.parseURL(url);

  return feed.items.map((episode) => ({
    title: episode.title,
    description: episode.content,
    source: episode.source.$.url,
    guid: episode.guid,
    date: episode.isoDate,
    link: episode.link,
  }));
};

export default {
  getFeedData,
  getFeedEpisodes,
};

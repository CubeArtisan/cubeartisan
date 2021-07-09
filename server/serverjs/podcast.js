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
import { getFeedEpisodes } from '@cubeartisan/server/serverjs/rss.js';
import PodcastEpisode from '@cubeartisan/server/models/podcastEpisode.js';

export const updatePodcast = async (podcast) => {
  const episodes = await getFeedEpisodes(podcast.rss);

  const liveEpisodes = await PodcastEpisode.find({ guid: { $in: episodes.map((episode) => episode.guid) } });

  const guids = liveEpisodes.map((episode) => episode.guid);

  const filtered = episodes.filter((episode) => !guids.includes(episode.guid));

  await Promise.all(
    filtered.map((episode) => {
      const podcastEpisode = new PodcastEpisode();

      podcastEpisode.title = episode.title;
      podcastEpisode.description = episode.description;
      podcastEpisode.source = episode.source;
      podcastEpisode.guid = episode.guid;
      podcastEpisode.link = episode.link;
      podcastEpisode.date = new Date(episode.date);

      podcastEpisode.podcast = podcast._id;
      podcastEpisode.owner = podcast.owner;
      podcastEpisode.image = podcast.image;
      podcastEpisode.username = podcast.username;
      podcastEpisode.podcastname = podcast.title;

      return podcastEpisode.save();
    }),
  );

  podcast.date = new Date();
  await podcast.save();
};

export default {
  updatePodcast,
};

import unified from 'unified';
import remark from 'remark-parse';
import gfm from 'remark-gfm';
import math from 'remark-math';
import slug from 'remark-slug';
import headings from 'remark-autolink-headings';
import cardlink from '@hypercube/client/markdown/cardlink';
import cardrow from '@hypercube/client/markdown/cardrow';
import centering from '@hypercube/client/markdown/centering';
import breaks from 'remark-breaks';
import symbols from '@hypercube/client/markdown/symbols';
import userlink from '@hypercube/client/markdown/userlink';

const VALID_SYMBOLS = 'wubrgcmtsqepxyz/-0123456789';

const BASE_PLUGINS = [
  cardrow,
  centering,
  math,
  cardlink,
  [gfm, { singleTilde: false }],
  [symbols, { allowed: VALID_SYMBOLS }],
];

export const LIMITED_PLUGINS = [...BASE_PLUGINS, userlink, breaks];

export const ALL_PLUGINS = [...LIMITED_PLUGINS, slug, headings];

export function findUserLinks(text) {
  const mentions = [];
  const processor = unified()
    .use(remark)
    .use(BASE_PLUGINS)
    .use(userlink, { callback: (name) => mentions.push(name) });
  processor.runSync(processor.parse(text));
  return mentions;
}

export default {
  findUserLinks,
  VALID_SYMBOLS,
  BASE_PLUGINS,
  LIMITED_PLUGINS,
  ALL_PLUGINS,
};

import syntax from '@cubeartisan/client/markdown/centering/micromark-centering.js';
import { fromMarkdown } from '@cubeartisan/client/markdown/centering/mdast-centering.js';
import { add } from '@cubeartisan/client/markdown/utils.js';

function centering() {
  const data = this.data();
  add(data, 'micromarkExtensions', syntax);
  add(data, 'fromMarkdownExtensions', fromMarkdown);
}

export default centering;

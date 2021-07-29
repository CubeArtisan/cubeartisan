import syntax from '@cubeartisan/markdown/plugins/centering/micromark-centering.js';
import { fromMarkdown } from '@cubeartisan/markdown/plugins/centering/mdast-centering.js';
import { add } from '@cubeartisan/markdown/plugins/utils.js';

function centering() {
  const data = this.data();
  add(data, 'micromarkExtensions', syntax);
  add(data, 'fromMarkdownExtensions', fromMarkdown);
}

export default centering;

import syntax from '@cubeartisan/markdown/plugins/cardrow/micromark-cardrow.js';
import { fromMarkdown } from '@cubeartisan/markdown/plugins/cardrow/mdast-cardrow.js';
import { add } from '@cubeartisan/markdown/plugins/utils.js';

function cardrow() {
  const data = this.data();
  add(data, 'micromarkExtensions', syntax);
  add(data, 'fromMarkdownExtensions', fromMarkdown);
}

export default cardrow;

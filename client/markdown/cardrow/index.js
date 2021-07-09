import syntax from '@cubeartisan/client/markdown/cardrow/micromark-cardrow.js';
import { fromMarkdown } from '@cubeartisan/client/markdown/cardrow/mdast-cardrow.js';
import { add } from '@cubeartisan/client/markdown/utils.js';

function cardrow() {
  const data = this.data();
  add(data, 'micromarkExtensions', syntax);
  add(data, 'fromMarkdownExtensions', fromMarkdown);
}

export default cardrow;

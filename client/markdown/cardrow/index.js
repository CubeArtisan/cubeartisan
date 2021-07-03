import syntax from '@cubeartisan/client/markdown/cardrow/micromark-cardrow';
import { fromMarkdown } from '@cubeartisan/client/markdown/cardrow/mdast-cardrow';
import { add } from '@cubeartisan/client/markdown/utils';

function cardrow() {
  const data = this.data();
  add(data, 'micromarkExtensions', syntax);
  add(data, 'fromMarkdownExtensions', fromMarkdown);
}

export default cardrow;

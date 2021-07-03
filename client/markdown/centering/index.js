import syntax from '@cubeartisan/client/markdown/centering/micromark-centering';
import { fromMarkdown } from '@cubeartisan/client/markdown/centering/mdast-centering';
import { add } from '@cubeartisan/client/markdown/utils';

function centering() {
  const data = this.data();
  add(data, 'micromarkExtensions', syntax);
  add(data, 'fromMarkdownExtensions', fromMarkdown);
}

export default centering;

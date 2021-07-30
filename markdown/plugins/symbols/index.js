import syntax from '@cubeartisan/markdown/plugins/symbols/micromark-symbols.js';
import { fromMarkdown } from '@cubeartisan/markdown/plugins/symbols/mdast-symbols.js';
import { add } from '@cubeartisan/markdown/plugins/utils.js';

function symbols(options) {
  if (!options?.allowed) {
    console.warn('[remark-symbols] Warning: no symbols specified!');
  }

  const data = this.data();
  const valid = options?.allowed || '';
  add(data, 'micromarkExtensions', syntax(valid));
  add(data, 'fromMarkdownExtensions', fromMarkdown);
}

export default symbols;

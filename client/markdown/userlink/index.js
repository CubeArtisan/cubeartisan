import syntax from '@cubeartisan/client/markdown/userlink/micromark-userlink.js';
import { fromMarkdown } from '@cubeartisan/client/markdown/userlink/mdast-userlink.js';
import { add } from '@cubeartisan/client/markdown/utils.js';
import visit from 'unist-util-visit';

function userlink(options = {}) {
  const data = this.data();
  add(data, 'micromarkExtensions', syntax);
  add(data, 'fromMarkdownExtensions', fromMarkdown);

  function visitor(node) {
    options.callback(node.value);
  }

  if (typeof options.callback === 'function') {
    return (tree) => visit(tree, 'userlink', visitor);
  }
  return false;
}

export default userlink;

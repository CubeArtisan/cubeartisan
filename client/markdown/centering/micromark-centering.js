import assert from 'assert';
import markdownSpace from 'micromark/dist/character/markdown-space';
import markdownLineEnding from 'micromark/dist/character/markdown-line-ending';
import spaceFactory from 'micromark/dist/tokenize/factory-space';
import types from 'micromark/lib/constant/types';
import codes from 'micromark/lib/character/codes';
import { shallowEqual } from '@cubeartisan/client/markdown/utils';

function centering() {
  let shouldEnd = false;
  let isOneLine = false;
  let endMark;

  const oneLineConstruct = { partial: true };

  const tokenizeCentering = (effects, ok, nok) => {
    let size = 0;

    const markOneLine = (code) => {
      isOneLine = true;
      return ok(code);
    };

    const after = (code) => {
      if (size < 3) return nok(code);
      if (markdownSpace(code)) {
        return spaceFactory(effects, after, types.whitespace)(code);
      }
      return effects.attempt(oneLineConstruct, markOneLine, ok)(code);
    };

    const sequence = (code) => {
      if (code === 62) {
        size += 1;
        effects.consume(code);
        return sequence;
      }
      effects.exit('centeringPrefix');
      return after(code);
    };

    return (code) => {
      assert(code === 62, 'expected `>`');
      effects.enter('centering', { _container: true });
      effects.enter('centeringPrefix');
      return sequence(code);
    };
  };

  const tokenizeCenteringEnd = (effects, ok, nok) => {
    let size = 0;

    const after = (code) => {
      if (markdownSpace(code)) {
        return spaceFactory(effects, after, types.whitespace)(code);
      }

      if (code === codes.eof || markdownLineEnding(code)) {
        return size === 3 ? ok(code) : nok(code);
      }

      return nok(code);
    };

    const sequence = (code) => {
      if (code === 60) {
        size += 1;
        effects.consume(code);
        return sequence;
      }

      effects.exit('centeringSuffix');
      return after(code);
    };

    return (code) => {
      effects.enter('centeringSuffix');
      return sequence(code);
    };
  };

  const endingConstruct = { tokenize: tokenizeCenteringEnd, partial: true };

  oneLineConstruct.tokenize = (effects, ok, nok) => {
    const end = (code) => {
      effects.exit('centeringLineValue');
      return effects.attempt(endingConstruct, ok)(code);
    };

    let consumeLt;

    const content = (code) => {
      if (code === 60) {
        return effects.check(endingConstruct, end, consumeLt)(code);
      }
      if (!code || markdownLineEnding(code)) {
        return nok(code);
      }
      effects.consume(code);
      return content;
    };

    consumeLt = (code) => {
      assert(code === 60, 'expected `<`');
      effects.consume(code);
      return content;
    };

    return (code) => {
      effects.enter('centeringLineValue', { contentType: 'flow' });
      return content(code);
    };
  };

  const tokenizeCenteringContinuation = (effects, ok, nok) => {
    if (isOneLine) return nok;
    const now = this.now();

    const markEnd = (code) => {
      // we want to include the closing fence in the block, but exit on the next line
      shouldEnd = true;
      // marking the point before the fence so that it can be checked in parent function.
      endMark = now;
      return ok(code);
    };
    // the tokenization can be callled twice on the same input, so we have to check where we are as well
    // otherwise the second invocation on the closing fence would return nok, which we don't want
    if (shouldEnd && !shallowEqual(now, endMark)) return nok;
    return spaceFactory(effects, effects.attempt(endingConstruct, markEnd, ok), types.linePrefix, 4);
  };

  const exit = (effects) => {
    effects.exit('centering');
    shouldEnd = false;
    isOneLine = false;
    endMark = undefined;
  };

  return {
    tokenize: tokenizeCentering,
    continuation: { tokenize: tokenizeCenteringContinuation },
    exit,
  };
}

export default {
  document: {
    62: centering(), // '>'
  },
};

import assert from 'assert';
import markdownLineEnding from 'micromark/dist/character/markdown-line-ending';
import chunkedSplice from 'micromark/dist/util/chunked-splice';

const resolveCardrow = (events, context) => {
  const contentEnd = 4;
  const contentStart = 3;

  assert(contentEnd > contentStart, 'content cannot end before it starts');
  const text = {
    type: 'chunkText',
    start: events[contentStart][1].start,
    end: events[contentEnd][1].end,
    contentType: 'text',
  };

  chunkedSplice(events, contentEnd, 0, [['exit', text, context]]);
  chunkedSplice(events, contentStart + 1, 0, [['enter', text, context]]);
  return events;
};

function tokenizeEnd(effects, ok, nok) {
  const end = (code) => {
    if (code === 62) {
      effects.consume(code);
      effects.exit('cardrowEndLabel');
      return ok;
    }

    return nok(code);
  };

  return (code) => {
    if (code === 62) {
      effects.exit('cardrowContent');
      effects.enter('cardrowEndLabel');
      effects.consume(code);
      return end;
    }

    return nok(code);
  };
}

const tokenizeCardrow = (effects, ok, nok) => {
  const closingConstruct = { tokenize: tokenizeEnd, partial: true };

  let content;

  const consumeGt = (code) => {
    assert(code === 62, 'expected `>`');
    effects.consume(code);
    return content;
  };

  const after = (code) => {
    effects.exit('cardrow');
    return ok(code);
  };

  content = (code) => {
    if (code === 62) {
      return effects.attempt(closingConstruct, after, consumeGt)(code);
    }

    if (!code || markdownLineEnding(code)) {
      return nok(code);
    }

    effects.consume(code);
    return content;
  };

  const contentStart = (code) => {
    if (!code || markdownLineEnding(code) || code === 62) {
      return nok(code);
    }

    return content(code);
  };

  const openingSequence = (code) => {
    if (code === 60) {
      effects.consume(code);
      effects.exit('cardrowStartLabel');
      effects.enter('cardrowContent');
      return contentStart;
    }

    return nok(code);
  };

  return (code) => {
    assert(code === 60, 'expected `<`');
    effects.enter('cardrow');
    effects.enter('cardrowStartLabel');
    effects.consume(code);
    return openingSequence;
  };
};

const cardrow = {
  tokenize: tokenizeCardrow,
  resolve: resolveCardrow,
};

export default {
  text: {
    60: cardrow,
  },
};

import assert from 'assert';

function tokenizeCardlink(effects, ok, nok) {
  const end = (code) => {
    if (code === 93) {
      effects.consume(code);
      effects.exit('cardlinkEndLabel');
      effects.exit('cardlink');
      return ok;
    }

    return nok(code);
  };

  const close = (code) => {
    if (code !== 93) {
      return nok(code);
    }

    effects.enter('cardlinkEndLabel');
    effects.consume(code);
    return end;
  };

  function value(code) {
    if (!code || code < 0) {
      return nok(code);
    }

    if (code === 93) {
      effects.exit('cardlinkValue');
      return close(code);
    }

    effects.consume(code);
    return value;
  }

  function valueStart(code) {
    if (code === 93) {
      return nok(code);
    }

    effects.enter('cardlinkValue');
    return value(code);
  }

  function open(code) {
    if (code !== 91) {
      return nok(code);
    }

    effects.consume(code);
    effects.exit('cardlinkStartLabel');
    return valueStart;
  }

  return (code) => {
    assert(code === 91, 'expected `[`');
    effects.enter('cardlink');
    effects.enter('cardlinkStartLabel');
    effects.consume(code);
    return open;
  };
}

const cardlink = {
  tokenize: tokenizeCardlink,
};

export default {
  text: {
    91: cardlink,
  },
};

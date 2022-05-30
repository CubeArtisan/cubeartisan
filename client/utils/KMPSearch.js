export const makeKMPTable = (word) => {
  const results = [];
  let pos = 2;
  let cnd = 0;

  results[0] = -1;
  results[1] = 0;
  while (pos < word.length) {
    if (word[pos - 1] === word[cnd]) {
      cnd += 1;
      results[pos] = cnd;
      pos += 1;
    } else if (cnd > 0) {
      cnd = results[cnd];
    } else {
      results[pos] = 0;
      pos += 1;
    }
  }
  return results;
};

export const KMPSearch = (string, word, table) => {
  const index = -1;
  let m = 0;
  let i = 0;

  while (m + i < string.length) {
    if (word[i] === string[m + i]) {
      if (i === word.length - 1) {
        return m;
      }
      i += 1;
    } else {
      m = m + i - table[i];
      if (table[i] > -1) {
        i = table[i];
      } else {
        i = 0;
      }
    }
  }
  return index;
};

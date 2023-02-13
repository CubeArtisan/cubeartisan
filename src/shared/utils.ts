import Filter from 'bad-words';

export const hasProfanity = (text: string): boolean => {
  if (!text) return false;

  const filter = new Filter();
  const removeWords = ['hell', 'sadist', 'God'];
  filter.removeWords(...removeWords);

  return filter.isProfane(text.toLowerCase());
};

export const toBase36 = (num: number): string => num.toString(36);

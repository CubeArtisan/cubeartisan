export const shadow = {
  none: '0 0 #0000',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.09), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.09), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.09), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.09), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.24)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
} as const;

// filters
export const blur = {
  none: '0',
  xs: '0.25rem',
  sm: '0.50rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
} as const;

export const brightness = {
  0: 0,
  0.5: 0.5,
  0.75: 0.75,
  0.9: 0.9,
  0.95: 0.95,
  1: 1,
  1.05: 1.05,
  1.1: 1.1,
  1.25: 1.25,
  1.5: 1.5,
  2: 2,
} as const;

export const contrast = {
  0: 0,
  0.5: 0.5,
  0.75: 0.75,
  1: 1,
  1.25: 1.25,
  1.5: 1.5,
  2: 2,
} as const;

export const dropShadow = {
  xs: '0 1px 1px rgb(0 0 0 / 0.05)',
  sm: ['0 1px 2px rgb(0 0 0 / 0.1)', '0 1px 1px rgb(0 0 0 / 0.06)'],
  md: ['0 4px 3px rgb(0 0 0 / 0.07)', '0 2px 2px rgb(0 0 0 / 0.06)'],
  lg: ['0 10px 8px rgb(0 0 0 / 0.04)', '0 4px 3px rgb(0 0 0 / 0.1)'],
  xl: ['0 20px 13px rgb(0 0 0 / 0.03)', '0 8px 5px rgb(0 0 0 / 0.08)'],
  '2xl': '0 25px 25px rgb(0 0 0 / 0.15)',
  none: '0 0 #0000',
} as const;

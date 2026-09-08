/** TMDB `gender` codes returned on person payloads. */
export const GENDER = {
  0: 'Not specified',
  1: 'Female',
  2: 'Male',
  3: 'Non-binary'
} as const;

/** TMDB caps list/search endpoints at page 500. */
export const MAX_PAGE = 500;

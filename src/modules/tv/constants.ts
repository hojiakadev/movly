/** `sort_by` values accepted by `/discover/tv`. */
export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most popular' },
  { value: 'popularity.asc', label: 'Least popular' },
  { value: 'first_air_date.desc', label: 'Newest first' },
  { value: 'first_air_date.asc', label: 'Oldest first' },
  { value: 'vote_average.desc', label: 'Highest rated' },
  { value: 'vote_average.asc', label: 'Lowest rated' },
  { value: 'vote_count.desc', label: 'Most voted' },
  { value: 'vote_count.asc', label: 'Least voted' },
  { value: 'name.asc', label: 'Name A-Z' },
  { value: 'name.desc', label: 'Name Z-A' }
];

export const DEFAULT_SORT_BY = 'popularity.desc';

/** `with_status` values accepted by `/discover/tv`. */
export const SHOW_STATUS = {
  returningSeries: 0,
  planned: 1,
  inProduction: 2,
  ended: 3,
  cancelled: 4,
  pilot: 5
} as const;

/** `with_type` values accepted by `/discover/tv`. */
export const SHOW_TYPE = {
  documentary: 0,
  news: 1,
  miniseries: 2,
  reality: 3,
  scripted: 4,
  talkShow: 5,
  video: 6
} as const;

/** TMDB caps `/discover` and list endpoints at page 500. */
export const MAX_PAGE = 500;

export const FIRST_AIR_YEAR = 1920;

export const POPULAR_REGIONS = [
  'AR', // Argentina
  'AU', // Australia
  'AT', // Austria
  'BE', // Belgium
  'BR', // Brazil
  'CA', // Canada
  'CN', // China
  'CZ', // Czech Republic
  'DK', // Denmark
  'FI', // Finland
  'FR', // France
  'DE', // Germany
  'HK', // Hong Kong
  'HU', // Hungary
  'IN', // India
  'IE', // Ireland
  'IL', // Israel
  'IT', // Italy
  'JP', // Japan
  'LU', // Luxembourg
  'MX', // Mexico
  'NL', // Netherlands
  'NZ', // New Zealand
  'NO', // Norway
  'PL', // Poland
  'RO', // Romania
  'RU', // Russia
  'ZA', // South Africa
  'KR', // South Korea
  'ES', // Spain
  'SE', // Sweden
  'CH', // Switzerland
  'TW', // Taiwan
  'TH', // Thailand
  'GB', // United Kingdom
  'US' // United States of America
];

/** `sort_by` values accepted by `/discover/movie`. */
export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most popular' },
  { value: 'popularity.asc', label: 'Least popular' },
  { value: 'primary_release_date.desc', label: 'Newest first' },
  { value: 'primary_release_date.asc', label: 'Oldest first' },
  { value: 'vote_average.desc', label: 'Highest rated' },
  { value: 'vote_average.asc', label: 'Lowest rated' },
  { value: 'vote_count.desc', label: 'Most voted' },
  { value: 'revenue.desc', label: 'Highest revenue' },
  { value: 'title.asc', label: 'Title A-Z' },
  { value: 'title.desc', label: 'Title Z-A' }
];

export const DEFAULT_SORT_BY = 'popularity.desc';

/** `with_release_type` values accepted by `/discover/movie`. */
export const RELEASE_TYPE = {
  premiere: 1,
  theatricalLimited: 2,
  theatrical: 3,
  digital: 4,
  physical: 5,
  tv: 6
} as const;

/** TMDB caps `/discover` and list endpoints at page 500. */
export const MAX_PAGE = 500;

export const FIRST_RELEASE_YEAR = 1874;

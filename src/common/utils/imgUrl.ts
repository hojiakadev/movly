export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export type ImageSize =
  | 'w45'
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w300'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'w1280'
  | 'w1920'
  | 'h632'
  | 'original';

export default function imageUrl(path: string | null | undefined, size: ImageSize = 'original') {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

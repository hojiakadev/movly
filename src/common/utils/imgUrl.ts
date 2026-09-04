export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export function imageUrl(
  path: string | null | undefined,
  size: 'w342' | 'w500' | 'w780' | 'w1280' | 'w1920' | 'original' = 'original'
) {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

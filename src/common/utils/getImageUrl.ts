const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

type ImageSize = 'w500' | 'w780' | 'w1280' | 'original';

const getImageUrl = (path: string | null | undefined, size: ImageSize = 'w1280') => {
  if (!path) return null;

  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export default getImageUrl;

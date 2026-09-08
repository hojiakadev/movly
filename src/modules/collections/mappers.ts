import { get } from 'radash';

import type * as Types from './types';

export const Collection = (src: any): Types.IEntity.Collection => ({
  id: get(src, 'id', 0),
  name: get(src, 'name', ''),
  overview: get(src, 'overview', ''),
  posterPath: get(src, 'poster_path') || '',
  backdropPath: get(src, 'backdrop_path') || ''
});

export const Part = (src: any): Types.IEntity.Part => ({
  id: get(src, 'id', 0),
  adult: get(src, 'adult', false),
  title: get(src, 'title', ''),
  originalTitle: get(src, 'original_title', ''),
  overview: get(src, 'overview', ''),
  posterPath: get(src, 'poster_path') || '',
  backdropPath: get(src, 'backdrop_path') || '',
  releaseDate: get(src, 'release_date') || '',
  voteAverage: get(src, 'vote_average', 0),
  voteCount: get(src, 'vote_count', 0),
  popularity: get(src, 'popularity', 0),
  genreIds: get(src, 'genre_ids', []),
  mediaType: get(src, 'media_type') || 'movie'
});

export const CollectionDetails = (src: any): Types.IEntity.CollectionDetails => ({
  ...Collection(src),
  // A collection reads best chronologically, and TMDB does not guarantee an order.
  parts: (get(src, 'parts', []) as any[]).map(Part).sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))
});

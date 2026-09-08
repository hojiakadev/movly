import { get } from 'radash';

import type * as Types from './types';

export const Item = (src: any): Types.IEntity.Item => ({
  id: get(src, 'id', 0),
  mediaType: get(src, 'media_type') || 'movie',
  // lists mix movies (`title`/`release_date`) and tv shows (`name`/`first_air_date`)
  title: get(src, 'title') || get(src, 'name') || '',
  overview: get(src, 'overview', ''),
  posterPath: get(src, 'poster_path') || '',
  backdropPath: get(src, 'backdrop_path') || '',
  releaseDate: get(src, 'release_date') || get(src, 'first_air_date') || '',
  voteAverage: get(src, 'vote_average', 0)
});

export const List = (src: any): Types.IEntity.List => ({
  id: get(src, 'id', 0),
  name: get(src, 'name', ''),
  description: get(src, 'description', ''),
  favoriteCount: get(src, 'favorite_count', 0),
  itemCount: get(src, 'item_count', 0),
  iso6391: get(src, 'iso_639_1') || '',
  posterPath: get(src, 'poster_path') || '',
  createdBy: get(src, 'created_by', ''),
  items: (get(src, 'items', []) as any[]).map(Item)
});

export const ItemStatus = (src: any): Types.IEntity.ItemStatus => ({
  id: get(src, 'id', 0),
  itemPresent: get(src, 'item_present', false)
});

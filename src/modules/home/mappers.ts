import { get } from 'radash';
import * as Types from './types';

import * as ListModule from '@/common/modules/list';

export const Movie = (src: any): Types.IEntity.Movie => {
  return {
    adult: get(src, 'adult', false),
    backdropPath: get(src, 'backdrop_path', ''),
    genreIds: get(src, 'genre_ids', []),
    id: get(src, 'id', 0),
    originalLanguage: get(src, 'original_language', ''),
    originalTitle: get(src, 'original_title', ''),
    overview: get(src, 'overview', ''),
    popularity: get(src, 'popularity', 0),
    posterPath: get(src, 'poster_path', ''),
    releaseDate: get(src, 'release_date', ''),
    title: get(src, 'title', ''),
    video: get(src, 'video', false),
    voteAverage: get(src, 'vote_average', 0),
    voteCount: get(src, 'vote_count', 0)
  };
};

export const List = (src: any): Types.IQuery.List => ({
  results: get(src, 'results', []).map(Movie),
  dates: {
    maximum: get(src, 'dates.maximum') || '',
    minimum: get(src, 'dates.minimum') || ''
  },
  meta: ListModule.Mappers.Meta(src)
});

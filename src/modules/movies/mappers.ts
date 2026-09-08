import { get } from 'radash';

import { toCsv } from '@/common/utils';

import type * as Types from './types';

import * as ListModule from '@/common/modules/list';
import * as TmdbModule from '@/common/modules/tmdb';

export const Movie = (src: any): Types.IEntity.Movie => ({
  adult: get(src, 'adult', false),
  backdropPath: get(src, 'backdrop_path') || '',
  genreIds: get(src, 'genre_ids', []),
  id: get(src, 'id', 0),
  originalLanguage: get(src, 'original_language', ''),
  originalTitle: get(src, 'original_title', ''),
  overview: get(src, 'overview', ''),
  popularity: get(src, 'popularity', 0),
  posterPath: get(src, 'poster_path') || '',
  releaseDate: get(src, 'release_date') || '',
  title: get(src, 'title', ''),
  video: get(src, 'video', false),
  voteAverage: get(src, 'vote_average', 0),
  voteCount: get(src, 'vote_count', 0)
});

export const MovieDetails = (src: any): Types.IEntity.MovieDetails => ({
  ...Movie(src),
  budget: get(src, 'budget', 0),
  revenue: get(src, 'revenue', 0),
  runtime: get(src, 'runtime', 0),
  status: get(src, 'status', ''),
  tagline: get(src, 'tagline', ''),
  homepage: get(src, 'homepage', ''),
  imdbId: get(src, 'imdb_id') || '',
  genres: (get(src, 'genres', []) as any[]).map(TmdbModule.Mappers.Genre),
  originCountry: get(src, 'origin_country', []),
  spokenLanguages: (get(src, 'spoken_languages', []) as any[]).map(TmdbModule.Mappers.Language),
  productionCompanies: (get(src, 'production_companies', []) as any[]).map(TmdbModule.Mappers.Company),
  productionCountries: (get(src, 'production_countries', []) as any[]).map(TmdbModule.Mappers.Country),
  belongsToCollection: TmdbModule.Mappers.CollectionRef(get(src, 'belongs_to_collection'))
});

export const List = (src: any): Types.IQuery.List => ({
  results: (get(src, 'results', []) as any[]).map(Movie),
  dates: {
    maximum: get(src, 'dates.maximum') || '',
    minimum: get(src, 'dates.minimum') || ''
  },
  meta: ListModule.Mappers.Meta(src)
});

export const ReleaseDate = (src: any): Types.IEntity.ReleaseDate => ({
  certification: get(src, 'certification', ''),
  iso6391: get(src, 'iso_639_1') || '',
  note: get(src, 'note', ''),
  releaseDate: get(src, 'release_date', ''),
  type: get(src, 'type', 0)
});

export const ReleaseDates = (src: any): Types.IEntity.ReleaseDatesByCountry[] =>
  (get(src, 'results', []) as any[]).map(item => ({
    iso31661: get(item, 'iso_3166_1', ''),
    releaseDates: (get(item, 'release_dates', []) as any[]).map(ReleaseDate)
  }));

/** camelCased discover params -> TMDB's snake_cased query object. */
export const DiscoverRequest = (params?: Types.IEntity.DiscoverParams): Types.IApi.DiscoverRequest => ({
  page: params?.page || 1,
  language: params?.language || 'en-US',
  region: params?.region,
  sort_by: params?.sortBy || 'popularity.desc',
  include_adult: params?.includeAdult ?? false,
  include_video: params?.includeVideo,
  certification: params?.certification,
  certification_country: params?.certificationCountry,
  'certification.gte': params?.certificationGte,
  'certification.lte': params?.certificationLte,
  primary_release_year: params?.primaryReleaseYear,
  'primary_release_date.gte': params?.primaryReleaseDateGte,
  'primary_release_date.lte': params?.primaryReleaseDateLte,
  year: params?.year,
  'release_date.gte': params?.releaseDateGte,
  'release_date.lte': params?.releaseDateLte,
  'vote_average.gte': params?.voteAverageGte,
  'vote_average.lte': params?.voteAverageLte,
  'vote_count.gte': params?.voteCountGte,
  'vote_count.lte': params?.voteCountLte,
  'with_runtime.gte': params?.runtimeGte,
  'with_runtime.lte': params?.runtimeLte,
  with_genres: toCsv(params?.withGenres),
  without_genres: toCsv(params?.withoutGenres),
  with_companies: toCsv(params?.withCompanies),
  without_companies: toCsv(params?.withoutCompanies),
  with_keywords: toCsv(params?.withKeywords),
  without_keywords: toCsv(params?.withoutKeywords),
  with_cast: toCsv(params?.withCast),
  with_crew: toCsv(params?.withCrew),
  with_people: toCsv(params?.withPeople),
  with_original_language: params?.withOriginalLanguage,
  with_origin_country: params?.withOriginCountry,
  with_release_type: toCsv(params?.withReleaseType, '|'),
  with_watch_providers: toCsv(params?.withWatchProviders, '|'),
  with_watch_monetization_types: toCsv(params?.withWatchMonetizationTypes, '|'),
  watch_region: params?.watchRegion
});

/** Maps the UI filter form (route search params) onto discover params. */
export const FilterToDiscoverParams = (filter: Types.IForm.Filter): Types.IEntity.DiscoverParams => ({
  page: filter.page,
  sortBy: filter.sortBy,
  includeAdult: filter.includeAdult,
  withGenres: filter.genres,
  primaryReleaseYear: filter.year,
  voteAverageGte: filter.voteAverageGte,
  voteCountGte: filter.voteCountGte,
  runtimeLte: filter.runtimeLte,
  withOriginalLanguage: filter.originalLanguage
});

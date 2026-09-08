import { get } from 'radash';

import { toCsv } from '@/common/utils';

import type * as Types from './types';

import * as ListModule from '@/common/modules/list';
import * as TmdbModule from '@/common/modules/tmdb';

export const Show = (src: any): Types.IEntity.Show => ({
  adult: get(src, 'adult', false),
  backdropPath: get(src, 'backdrop_path') || '',
  firstAirDate: get(src, 'first_air_date') || '',
  genreIds: get(src, 'genre_ids', []),
  id: get(src, 'id', 0),
  name: get(src, 'name', ''),
  originCountry: get(src, 'origin_country', []),
  originalLanguage: get(src, 'original_language', ''),
  originalName: get(src, 'original_name', ''),
  overview: get(src, 'overview', ''),
  popularity: get(src, 'popularity', 0),
  posterPath: get(src, 'poster_path') || '',
  voteAverage: get(src, 'vote_average', 0),
  voteCount: get(src, 'vote_count', 0)
});

export const Creator = (src: any): Types.IEntity.Creator => ({
  id: get(src, 'id', 0),
  creditId: get(src, 'credit_id') || '',
  name: get(src, 'name', ''),
  profilePath: get(src, 'profile_path') || '',
  gender: get(src, 'gender', 0)
});

export const Episode = (src: any): Types.IEntity.Episode => ({
  id: get(src, 'id', 0),
  name: get(src, 'name', ''),
  overview: get(src, 'overview', ''),
  airDate: get(src, 'air_date') || '',
  episodeNumber: get(src, 'episode_number', 0),
  seasonNumber: get(src, 'season_number', 0),
  runtime: get(src, 'runtime') || 0,
  stillPath: get(src, 'still_path') || '',
  voteAverage: get(src, 'vote_average', 0),
  voteCount: get(src, 'vote_count', 0),
  productionCode: get(src, 'production_code', ''),
  episodeType: get(src, 'episode_type', ''),
  showId: get(src, 'show_id', 0)
});

export const EpisodeOrNull = (src: any): Types.IEntity.Episode | null => (src ? Episode(src) : null);

export const EpisodeDetails = (src: any): Types.IEntity.EpisodeDetails => ({
  ...Episode(src),
  crew: (get(src, 'crew', []) as any[]).map(TmdbModule.Mappers.Crew),
  guestStars: (get(src, 'guest_stars', []) as any[]).map(TmdbModule.Mappers.Cast)
});

export const Season = (src: any): Types.IEntity.Season => ({
  id: get(src, 'id', 0),
  airDate: get(src, 'air_date') || '',
  episodeCount: get(src, 'episode_count', 0),
  name: get(src, 'name', ''),
  overview: get(src, 'overview', ''),
  posterPath: get(src, 'poster_path') || '',
  seasonNumber: get(src, 'season_number', 0),
  voteAverage: get(src, 'vote_average', 0)
});

export const SeasonDetails = (src: any): Types.IEntity.SeasonDetails => ({
  ...Season(src),
  episodes: (get(src, 'episodes', []) as any[]).map(Episode)
});

export const ShowDetails = (src: any): Types.IEntity.ShowDetails => ({
  ...Show(src),
  createdBy: (get(src, 'created_by', []) as any[]).map(Creator),
  episodeRunTime: get(src, 'episode_run_time', []),
  genres: (get(src, 'genres', []) as any[]).map(TmdbModule.Mappers.Genre),
  homepage: get(src, 'homepage', ''),
  inProduction: get(src, 'in_production', false),
  languages: get(src, 'languages', []),
  lastAirDate: get(src, 'last_air_date') || '',
  lastEpisodeToAir: EpisodeOrNull(get(src, 'last_episode_to_air')),
  nextEpisodeToAir: EpisodeOrNull(get(src, 'next_episode_to_air')),
  networks: (get(src, 'networks', []) as any[]).map(TmdbModule.Mappers.Company),
  numberOfEpisodes: get(src, 'number_of_episodes', 0),
  numberOfSeasons: get(src, 'number_of_seasons', 0),
  productionCompanies: (get(src, 'production_companies', []) as any[]).map(TmdbModule.Mappers.Company),
  productionCountries: (get(src, 'production_countries', []) as any[]).map(TmdbModule.Mappers.Country),
  spokenLanguages: (get(src, 'spoken_languages', []) as any[]).map(TmdbModule.Mappers.Language),
  status: get(src, 'status', ''),
  tagline: get(src, 'tagline', ''),
  type: get(src, 'type', ''),
  seasons: (get(src, 'seasons', []) as any[]).map(Season)
});

export const List = (src: any): Types.IQuery.List => ({
  results: (get(src, 'results', []) as any[]).map(Show),
  meta: ListModule.Mappers.Meta(src)
});

export const ContentRating = (src: any): Types.IEntity.ContentRating => ({
  iso31661: get(src, 'iso_3166_1', ''),
  rating: get(src, 'rating', ''),
  descriptors: get(src, 'descriptors', [])
});

export const ContentRatings = (src: any): Types.IEntity.ContentRating[] =>
  (get(src, 'results', []) as any[]).map(ContentRating);

/** camelCased discover params -> TMDB's snake_cased query object. */
export const DiscoverRequest = (params?: Types.IEntity.DiscoverParams): Types.IApi.DiscoverRequest => ({
  page: params?.page || 1,
  language: params?.language || 'en-US',
  sort_by: params?.sortBy || 'popularity.desc',
  include_adult: params?.includeAdult ?? false,
  include_null_first_air_dates: params?.includeNullFirstAirDates,
  first_air_date_year: params?.firstAirDateYear,
  'first_air_date.gte': params?.firstAirDateGte,
  'first_air_date.lte': params?.firstAirDateLte,
  'air_date.gte': params?.airDateGte,
  'air_date.lte': params?.airDateLte,
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
  with_networks: toCsv(params?.withNetworks),
  with_original_language: params?.withOriginalLanguage,
  with_origin_country: params?.withOriginCountry,
  with_status: toCsv(params?.withStatus, '|'),
  with_type: toCsv(params?.withType, '|'),
  with_watch_providers: toCsv(params?.withWatchProviders, '|'),
  with_watch_monetization_types: toCsv(params?.withWatchMonetizationTypes, '|'),
  watch_region: params?.watchRegion,
  screened_theatrically: params?.screenedTheatrically,
  timezone: params?.timezone
});

/** Maps the UI filter form (route search params) onto discover params. */
export const FilterToDiscoverParams = (filter: Types.IForm.Filter): Types.IEntity.DiscoverParams => ({
  page: filter.page,
  sortBy: filter.sortBy,
  includeAdult: filter.includeAdult,
  withGenres: filter.genres,
  firstAirDateYear: filter.year,
  voteAverageGte: filter.voteAverageGte,
  voteCountGte: filter.voteCountGte,
  withOriginalLanguage: filter.originalLanguage
});

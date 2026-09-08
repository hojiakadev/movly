import { get } from 'radash';

import type * as Types from './types';

import * as ListModule from '@/common/modules/list';
import * as TmdbModule from '@/common/modules/tmdb';

/** `movie` unless the payload explicitly says otherwise (or exposes `first_air_date`/`name`). */
const mediaType = (src: any, fallback?: Types.IEntity.MediaType): Types.IEntity.MediaType => {
  const raw = get<string>(src, 'media_type');

  if (raw === 'movie' || raw === 'tv') return raw;
  if (fallback) return fallback;

  const firstAirDate = get<string>(src, 'first_air_date');
  const name = get<string>(src, 'name');

  return firstAirDate || name ? 'tv' : 'movie';
};

/** `known_for` entry on `/person/popular` results — either a movie or a tv show. */
export const KnownFor = (src: any): Types.IEntity.KnownFor => ({
  id: get(src, 'id', 0),
  mediaType: mediaType(src),
  title: get(src, 'title') || get(src, 'name') || '',
  posterPath: get(src, 'poster_path') || '',
  backdropPath: get(src, 'backdrop_path') || '',
  overview: get(src, 'overview', ''),
  releaseDate: get(src, 'release_date') || get(src, 'first_air_date') || '',
  voteAverage: get(src, 'vote_average', 0)
});

export const Person = (src: any): Types.IEntity.Person => ({
  id: get(src, 'id', 0),
  name: get(src, 'name', ''),
  adult: get(src, 'adult', false),
  gender: get(src, 'gender', 0),
  popularity: get(src, 'popularity', 0),
  profilePath: get(src, 'profile_path') || '',
  knownForDepartment: get(src, 'known_for_department') || '',
  originalName: get(src, 'original_name') || get(src, 'name') || '',
  knownFor: (get(src, 'known_for', []) as any[]).map(KnownFor)
});

export const PersonDetails = (src: any): Types.IEntity.PersonDetails => ({
  ...Person(src),
  alsoKnownAs: get(src, 'also_known_as', []),
  biography: get(src, 'biography', ''),
  birthday: get(src, 'birthday') || '',
  deathday: get(src, 'deathday') || '',
  homepage: get(src, 'homepage') || '',
  imdbId: get(src, 'imdb_id') || '',
  placeOfBirth: get(src, 'place_of_birth') || ''
});

export const List = (src: any): Types.IQuery.List => ({
  results: (get(src, 'results', []) as any[]).map(Person),
  meta: ListModule.Mappers.Meta(src)
});

const CreditBase = (src: any, fallback?: Types.IEntity.MediaType): Types.IEntity.CreditBase => ({
  id: get(src, 'id', 0),
  creditId: get(src, 'credit_id') || '',
  mediaType: mediaType(src, fallback),
  title: get(src, 'title') || get(src, 'name') || '',
  originalTitle: get(src, 'original_title') || get(src, 'original_name') || '',
  overview: get(src, 'overview', ''),
  posterPath: get(src, 'poster_path') || '',
  backdropPath: get(src, 'backdrop_path') || '',
  releaseDate: get(src, 'release_date') || get(src, 'first_air_date') || '',
  voteAverage: get(src, 'vote_average', 0),
  voteCount: get(src, 'vote_count', 0),
  popularity: get(src, 'popularity', 0),
  genreIds: get(src, 'genre_ids', []),
  adult: get(src, 'adult', false),
  episodeCount: get<number | undefined>(src, 'episode_count')
});

export const CastCredit = (src: any, fallback?: Types.IEntity.MediaType): Types.IEntity.CastCredit => ({
  ...CreditBase(src, fallback),
  character: get(src, 'character', ''),
  order: get(src, 'order', 0)
});

export const CrewCredit = (src: any, fallback?: Types.IEntity.MediaType): Types.IEntity.CrewCredit => ({
  ...CreditBase(src, fallback),
  job: get(src, 'job', ''),
  department: get(src, 'department', '')
});

/**
 * `/person/{id}/combined_credits` entries carry `media_type`; `movie_credits`
 * and `tv_credits` entries do not, so the caller passes the fallback.
 */
export const Credits = (src: any, fallback?: Types.IEntity.MediaType): Types.IEntity.Credits => ({
  id: get(src, 'id', 0),
  cast: (get(src, 'cast', []) as any[]).map(item => CastCredit(item, fallback)),
  crew: (get(src, 'crew', []) as any[]).map(item => CrewCredit(item, fallback))
});

export const TaggedImageMedia = (src: any): Types.IEntity.TaggedImageMedia => ({
  id: get(src, 'id', 0),
  title: get(src, 'title') || get(src, 'name') || '',
  posterPath: get(src, 'poster_path') || '',
  backdropPath: get(src, 'backdrop_path') || '',
  mediaType: mediaType(src)
});

export const TaggedImage = (src: any): Types.IEntity.TaggedImage => ({
  ...TmdbModule.Mappers.Image(src),
  id: get(src, 'id', ''),
  imageType: get(src, 'image_type', ''),
  mediaType: get(src, 'media_type', ''),
  media: TaggedImageMedia(get(src, 'media'))
});

export const TaggedImages = (src: any): Types.IQuery.TaggedImages => ({
  results: (get(src, 'results', []) as any[]).map(TaggedImage),
  meta: ListModule.Mappers.Meta(src)
});

/** camelCased search params -> TMDB's snake_cased `/search/person` query. */
export const SearchRequest = (params: Types.IEntity.SearchParams): Types.IApi.SearchRequest => ({
  query: params.query,
  page: params.page || 1,
  language: params.language || 'en-US',
  include_adult: params.includeAdult ?? false
});

import { get } from 'radash';

import type * as Types from './types';

import * as ListModule from '@/common/modules/list';

export const Genre = (src: any): Types.IEntity.Genre => ({
  id: get(src, 'id', 0),
  name: get(src, 'name', '')
});

export const Genres = (src: any): Types.IQuery.Genres => ({
  results: (get(src, 'genres', []) as any[]).map(Genre)
});

export const Keyword = (src: any): Types.IEntity.Keyword => ({
  id: get(src, 'id', 0),
  name: get(src, 'name', '')
});

export const Keywords = (src: any): Types.IQuery.Keywords => ({
  // `/movie/{id}/keywords` returns `keywords`, `/tv/{id}/keywords` returns `results`
  results: ((get(src, 'keywords') || get(src, 'results') || []) as any[]).map(Keyword)
});

export const Company = (src: any): Types.IEntity.Company => ({
  id: get(src, 'id', 0),
  name: get(src, 'name', ''),
  logoPath: get(src, 'logo_path') || '',
  originCountry: get(src, 'origin_country', '')
});

export const Country = (src: any): Types.IEntity.Country => ({
  iso31661: get(src, 'iso_3166_1', ''),
  name: get(src, 'name') || get(src, 'english_name') || ''
});

export const Language = (src: any): Types.IEntity.Language => ({
  iso6391: get(src, 'iso_639_1', ''),
  name: get(src, 'name', ''),
  englishName: get(src, 'english_name', '')
});

export const CollectionRef = (src: any): Types.IEntity.CollectionRef | null => {
  if (!src) return null;

  return {
    id: get(src, 'id', 0),
    name: get(src, 'name', ''),
    posterPath: get(src, 'poster_path') || '',
    backdropPath: get(src, 'backdrop_path') || ''
  };
};

export const Cast = (src: any): Types.IEntity.Cast => ({
  id: get(src, 'id', 0),
  adult: get(src, 'adult', false),
  gender: get(src, 'gender', 0),
  name: get(src, 'name', ''),
  originalName: get(src, 'original_name', ''),
  // aggregate credits expose the character through `roles[0].character`
  character: get(src, 'character') || get(src, 'roles.0.character') || '',
  creditId: get(src, 'credit_id') || get(src, 'roles.0.credit_id') || '',
  order: get(src, 'order', 0),
  popularity: get(src, 'popularity', 0),
  profilePath: get(src, 'profile_path') || '',
  knownForDepartment: get(src, 'known_for_department', '')
});

export const Crew = (src: any): Types.IEntity.Crew => ({
  id: get(src, 'id', 0),
  adult: get(src, 'adult', false),
  gender: get(src, 'gender', 0),
  name: get(src, 'name', ''),
  originalName: get(src, 'original_name', ''),
  job: get(src, 'job') || get(src, 'jobs.0.job') || '',
  department: get(src, 'department', ''),
  creditId: get(src, 'credit_id') || get(src, 'jobs.0.credit_id') || '',
  popularity: get(src, 'popularity', 0),
  profilePath: get(src, 'profile_path') || '',
  knownForDepartment: get(src, 'known_for_department', '')
});

export const Credits = (src: any): Types.IEntity.Credits => ({
  id: get(src, 'id', 0),
  cast: (get(src, 'cast', []) as any[]).map(Cast),
  crew: (get(src, 'crew', []) as any[]).map(Crew)
});

export const Image = (src: any): Types.IEntity.Image => ({
  filePath: get(src, 'file_path') || '',
  width: get(src, 'width', 0),
  height: get(src, 'height', 0),
  aspectRatio: get(src, 'aspect_ratio', 0),
  voteAverage: get(src, 'vote_average', 0),
  voteCount: get(src, 'vote_count', 0),
  iso6391: get(src, 'iso_639_1') || ''
});

export const Images = (src: any): Types.IEntity.Images => ({
  id: get(src, 'id', 0),
  backdrops: (get(src, 'backdrops', []) as any[]).map(Image),
  posters: (get(src, 'posters', []) as any[]).map(Image),
  logos: (get(src, 'logos', []) as any[]).map(Image),
  profiles: (get(src, 'profiles', []) as any[]).map(Image),
  stills: (get(src, 'stills', []) as any[]).map(Image)
});

export const Video = (src: any): Types.IEntity.Video => ({
  id: get(src, 'id', ''),
  key: get(src, 'key', ''),
  name: get(src, 'name', ''),
  site: get(src, 'site', ''),
  size: get(src, 'size', 0),
  type: get(src, 'type', ''),
  official: get(src, 'official', false),
  publishedAt: get(src, 'published_at', ''),
  iso6391: get(src, 'iso_639_1', ''),
  iso31661: get(src, 'iso_3166_1', '')
});

export const Videos = (src: any): Types.IEntity.Video[] => (get(src, 'results', []) as any[]).map(Video);

export const Review = (src: any): Types.IEntity.Review => ({
  id: get(src, 'id', ''),
  author: get(src, 'author', ''),
  content: get(src, 'content', ''),
  createdAt: get(src, 'created_at', ''),
  updatedAt: get(src, 'updated_at', ''),
  url: get(src, 'url', ''),
  rating: get(src, 'author_details.rating') ?? null,
  username: get(src, 'author_details.username', ''),
  avatarPath: get(src, 'author_details.avatar_path') || ''
});

export const Reviews = (src: any): Types.IQuery.Reviews => ({
  results: (get(src, 'results', []) as any[]).map(Review),
  meta: ListModule.Mappers.Meta(src)
});

export const ExternalIds = (src: any): Types.IEntity.ExternalIds => ({
  imdbId: get(src, 'imdb_id') || '',
  wikidataId: get(src, 'wikidata_id') || '',
  facebookId: get(src, 'facebook_id') || '',
  instagramId: get(src, 'instagram_id') || '',
  twitterId: get(src, 'twitter_id') || '',
  tiktokId: get(src, 'tiktok_id') || '',
  youtubeId: get(src, 'youtube_id') || '',
  freebaseId: get(src, 'freebase_id') || '',
  tvdbId: get(src, 'tvdb_id') ?? null,
  tvrageId: get(src, 'tvrage_id') ?? null
});

export const WatchProvider = (src: any): Types.IEntity.WatchProvider => ({
  providerId: get(src, 'provider_id', 0),
  providerName: get(src, 'provider_name', ''),
  logoPath: get(src, 'logo_path') || '',
  displayPriority: get(src, 'display_priority', 0)
});

export const WatchProviderRegion = (src: any): Types.IEntity.WatchProviderRegion => ({
  link: get(src, 'link', ''),
  flatrate: (get(src, 'flatrate', []) as any[]).map(WatchProvider),
  buy: (get(src, 'buy', []) as any[]).map(WatchProvider),
  rent: (get(src, 'rent', []) as any[]).map(WatchProvider),
  ads: (get(src, 'ads', []) as any[]).map(WatchProvider),
  free: (get(src, 'free', []) as any[]).map(WatchProvider)
});

export const WatchProviders = (src: any): Types.IEntity.WatchProviders => {
  const raw = (get(src, 'results') || {}) as Record<string, any>;

  return {
    id: get(src, 'id', 0),
    results: Object.entries(raw).reduce<Record<string, Types.IEntity.WatchProviderRegion>>((acc, [region, value]) => {
      acc[region] = WatchProviderRegion(value);
      return acc;
    }, {})
  };
};

export const Translation = (src: any): Types.IEntity.Translation => ({
  iso31661: get(src, 'iso_3166_1', ''),
  iso6391: get(src, 'iso_639_1', ''),
  name: get(src, 'name', ''),
  englishName: get(src, 'english_name', ''),
  data: (get(src, 'data') || {}) as Record<string, string>
});

export const Translations = (src: any): Types.IEntity.Translations => ({
  id: get(src, 'id', 0),
  translations: (get(src, 'translations', []) as any[]).map(Translation)
});

export const AccountStates = (src: any): Types.IEntity.AccountStates => ({
  id: get(src, 'id', 0),
  favorite: get(src, 'favorite', false),
  watchlist: get(src, 'watchlist', false),
  rated: get(src, 'rated.value') ?? null
});

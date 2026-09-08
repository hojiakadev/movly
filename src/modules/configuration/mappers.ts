import { get } from 'radash';

import type * as Types from './types';

import * as TmdbModule from '@/common/modules/tmdb';

/**
 * Several `/configuration/*` endpoints answer with a bare top-level array
 * instead of the usual `{ results: [] }` envelope.
 */
const collection = (src: any): any[] => (Array.isArray(src) ? src : (get(src, 'results', []) as any[]));

export const Configuration = (src: any): Types.IEntity.Configuration => ({
  images: {
    baseUrl: get(src, 'images.base_url', ''),
    secureBaseUrl: get(src, 'images.secure_base_url', ''),
    backdropSizes: get(src, 'images.backdrop_sizes', []),
    logoSizes: get(src, 'images.logo_sizes', []),
    posterSizes: get(src, 'images.poster_sizes', []),
    profileSizes: get(src, 'images.profile_sizes', []),
    stillSizes: get(src, 'images.still_sizes', [])
  },
  changeKeys: get(src, 'change_keys', [])
});

export const Countries = (src: any): Types.IQuery.Countries => ({
  results: collection(src).map(TmdbModule.Mappers.Country)
});

export const Languages = (src: any): Types.IQuery.Languages => ({
  results: collection(src).map(TmdbModule.Mappers.Language)
});

export const Job = (src: any): Types.IEntity.Job => ({
  department: get(src, 'department', ''),
  jobs: get(src, 'jobs', [])
});

export const Jobs = (src: any): Types.IQuery.Jobs => ({
  results: collection(src).map(Job)
});

export const PrimaryTranslations = (src: any): Types.IQuery.PrimaryTranslations => ({
  // this endpoint returns a flat array of locale strings (e.g. `en-US`)
  results: collection(src).map(String)
});

export const Timezone = (src: any): Types.IEntity.Timezone => ({
  iso31661: get(src, 'iso_3166_1', ''),
  zones: get(src, 'zones', [])
});

export const Timezones = (src: any): Types.IQuery.Timezones => ({
  results: collection(src).map(Timezone)
});

export const WatchProviders = (src: any): Types.IQuery.WatchProviders => ({
  results: collection(src).map(TmdbModule.Mappers.WatchProvider)
});

export const WatchProviderRegionOption = (src: any): Types.IEntity.WatchProviderRegionOption => ({
  iso31661: get(src, 'iso_3166_1', ''),
  englishName: get(src, 'english_name', ''),
  nativeName: get(src, 'native_name', '')
});

export const ProviderRegions = (src: any): Types.IQuery.ProviderRegions => ({
  results: collection(src).map(WatchProviderRegionOption)
});

/** camelCased watch provider params -> TMDB's snake_cased query object. */
export const WatchProvidersRequest = (
  params?: Types.IEntity.WatchProvidersParams
): Types.IApi.WatchProvidersRequest => ({
  language: params?.language || 'en-US',
  watch_region: params?.watchRegion
});

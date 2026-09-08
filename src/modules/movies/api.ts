import type { AxiosPromise } from 'axios';

import { http } from '@/common/services';

import * as Mappers from './mappers';
import type * as Types from './types';

import * as ListModule from '@/common/modules/list';

interface IParams {
  params?: ListModule.Types.IEntity.Params;
}

interface ISingle {
  id: number;
  params?: ListModule.Types.IEntity.Params;
}

const list = (path: string, { params }: IParams = {}): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get(path, { params: ListModule.Mappers.Request(params) });

/** `/movie/now_playing` */
export const List = (args: IParams = {}) => list('3/movie/now_playing', args);

/** `/movie/popular` */
export const Popular = (args: IParams = {}) => list('3/movie/popular', args);

/** `/movie/top_rated` */
export const TopRated = (args: IParams = {}) => list('3/movie/top_rated', args);

/** `/movie/upcoming` */
export const Upcoming = (args: IParams = {}) => list('3/movie/upcoming', args);

/** `/discover/movie` */
export const Discover = ({
  params
}: { params?: Types.IEntity.DiscoverParams } = {}): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get('3/discover/movie', { params: Mappers.DiscoverRequest(params) });

/** `/search/movie` */
export const Search = ({ params }: { params: Types.IEntity.SearchParams }): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get('3/search/movie', {
    params: {
      query: params.query,
      page: params.page || 1,
      language: params.language || 'en-US',
      region: params.region,
      include_adult: params.includeAdult ?? false,
      primary_release_year: params.primaryReleaseYear,
      year: params.year
    }
  });

/** `/movie/{id}` */
export const Single = ({ id, params }: ISingle): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.get(`3/movie/${id}`, { params: { language: params?.language || 'en-US' } });

/** `/movie/{id}/credits` */
export const Credits = ({ id, params }: ISingle) =>
  http.request.get(`3/movie/${id}/credits`, { params: { language: params?.language || 'en-US' } });

/** `/movie/{id}/external_ids` */
export const ExternalIds = ({ id }: { id: number }) => http.request.get(`3/movie/${id}/external_ids`);

/** `/movie/{id}/images` */
export const Images = ({ id }: { id: number }) => http.request.get(`3/movie/${id}/images`);

/** `/movie/{id}/keywords` */
export const Keywords = ({ id }: { id: number }) => http.request.get(`3/movie/${id}/keywords`);

/** `/movie/{id}/recommendations` */
export const Recommendations = ({ id, params }: ISingle): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get(`3/movie/${id}/recommendations`, { params: ListModule.Mappers.Request(params) });

/** `/movie/{id}/similar` */
export const Similar = ({ id, params }: ISingle): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get(`3/movie/${id}/similar`, { params: ListModule.Mappers.Request(params) });

/** `/movie/{id}/release_dates` */
export const ReleaseDates = ({ id }: { id: number }) => http.request.get(`3/movie/${id}/release_dates`);

/** `/movie/{id}/reviews` */
export const Reviews = ({ id, params }: ISingle) =>
  http.request.get(`3/movie/${id}/reviews`, { params: ListModule.Mappers.Request(params) });

/** `/movie/{id}/translations` */
export const Translations = ({ id }: { id: number }) => http.request.get(`3/movie/${id}/translations`);

/** `/movie/{id}/videos` */
export const Videos = ({ id, params }: ISingle) =>
  http.request.get(`3/movie/${id}/videos`, { params: { language: params?.language || 'en-US' } });

/** `/movie/{id}/watch/providers` */
export const WatchProviders = ({ id }: { id: number }) => http.request.get(`3/movie/${id}/watch/providers`);

/**
 * `/movie/{id}/account_states` — requires a user session. The project has no
 * TMDB session/auth infrastructure yet, so this is only callable once a
 * `sessionId` is available.
 */
export const AccountStates = ({ id, sessionId }: { id: number; sessionId: string }) =>
  http.request.get(`3/movie/${id}/account_states`, { params: { session_id: sessionId } });

/** `/genre/movie/list` */
export const Genres = ({ params }: IParams = {}) =>
  http.request.get('3/genre/movie/list', { params: { language: params?.language || 'en-US' } });

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

interface ISeason {
  id: number;
  seasonNumber: number;
  params?: ListModule.Types.IEntity.Params;
}

interface IEpisode extends ISeason {
  episodeNumber: number;
}

const list = (path: string, { params }: IParams = {}): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get(path, { params: ListModule.Mappers.Request(params) });

/** `/tv/popular` */
export const Popular = (args: IParams = {}) => list('3/tv/popular', args);

/** `/tv/airing_today` */
export const AiringToday = (args: IParams = {}) => list('3/tv/airing_today', args);

/** `/tv/on_the_air` */
export const OnTheAir = (args: IParams = {}) => list('3/tv/on_the_air', args);

/** `/tv/top_rated` */
export const TopRated = (args: IParams = {}) => list('3/tv/top_rated', args);

/** `/discover/tv` */
export const Discover = ({
  params
}: { params?: Types.IEntity.DiscoverParams } = {}): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get('3/discover/tv', { params: Mappers.DiscoverRequest(params) });

/** `/search/tv` */
export const Search = ({ params }: { params: Types.IEntity.SearchParams }): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get('3/search/tv', {
    params: {
      query: params.query,
      page: params.page || 1,
      language: params.language || 'en-US',
      include_adult: params.includeAdult ?? false,
      first_air_date_year: params.firstAirDateYear,
      year: params.year
    }
  });

/** `/tv/{id}` */
export const Single = ({ id, params }: ISingle): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.get(`3/tv/${id}`, { params: { language: params?.language || 'en-US' } });

/** `/tv/{id}/credits` */
export const Credits = ({ id, params }: ISingle) =>
  http.request.get(`3/tv/${id}/credits`, { params: { language: params?.language || 'en-US' } });

/** `/tv/{id}/aggregate_credits` */
export const AggregateCredits = ({ id, params }: ISingle) =>
  http.request.get(`3/tv/${id}/aggregate_credits`, { params: { language: params?.language || 'en-US' } });

/** `/tv/{id}/external_ids` */
export const ExternalIds = ({ id }: { id: number }) => http.request.get(`3/tv/${id}/external_ids`);

/** `/tv/{id}/images` */
export const Images = ({ id }: { id: number }) => http.request.get(`3/tv/${id}/images`);

/** `/tv/{id}/keywords` */
export const Keywords = ({ id }: { id: number }) => http.request.get(`3/tv/${id}/keywords`);

/** `/tv/{id}/recommendations` */
export const Recommendations = ({ id, params }: ISingle): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get(`3/tv/${id}/recommendations`, { params: ListModule.Mappers.Request(params) });

/** `/tv/{id}/similar` */
export const Similar = ({ id, params }: ISingle): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get(`3/tv/${id}/similar`, { params: ListModule.Mappers.Request(params) });

/** `/tv/{id}/content_ratings` */
export const ContentRatings = ({ id }: { id: number }) => http.request.get(`3/tv/${id}/content_ratings`);

/** `/tv/{id}/reviews` */
export const Reviews = ({ id, params }: ISingle) =>
  http.request.get(`3/tv/${id}/reviews`, { params: ListModule.Mappers.Request(params) });

/** `/tv/{id}/translations` */
export const Translations = ({ id }: { id: number }) => http.request.get(`3/tv/${id}/translations`);

/** `/tv/{id}/videos` */
export const Videos = ({ id, params }: ISingle) =>
  http.request.get(`3/tv/${id}/videos`, { params: { language: params?.language || 'en-US' } });

/** `/tv/{id}/watch/providers` */
export const WatchProviders = ({ id }: { id: number }) => http.request.get(`3/tv/${id}/watch/providers`);

/**
 * `/tv/{id}/account_states` — requires a user session. The project has no
 * TMDB session/auth infrastructure yet, so this is only callable once a
 * `sessionId` is available.
 */
export const AccountStates = ({ id, sessionId }: { id: number; sessionId: string }) =>
  http.request.get(`3/tv/${id}/account_states`, { params: { session_id: sessionId } });

/** `/tv/{series_id}/season/{season_number}` */
export const Season = ({ id, seasonNumber, params }: ISeason) =>
  http.request.get(`3/tv/${id}/season/${seasonNumber}`, { params: { language: params?.language || 'en-US' } });

/** `/tv/{series_id}/season/{season_number}/credits` */
export const SeasonCredits = ({ id, seasonNumber, params }: ISeason) =>
  http.request.get(`3/tv/${id}/season/${seasonNumber}/credits`, { params: { language: params?.language || 'en-US' } });

/** `/tv/{series_id}/season/{season_number}/aggregate_credits` */
export const SeasonAggregateCredits = ({ id, seasonNumber, params }: ISeason) =>
  http.request.get(`3/tv/${id}/season/${seasonNumber}/aggregate_credits`, {
    params: { language: params?.language || 'en-US' }
  });

/** `/tv/{series_id}/season/{season_number}/images` */
export const SeasonImages = ({ id, seasonNumber }: ISeason) =>
  http.request.get(`3/tv/${id}/season/${seasonNumber}/images`);

/** `/tv/{series_id}/season/{season_number}/videos` */
export const SeasonVideos = ({ id, seasonNumber, params }: ISeason) =>
  http.request.get(`3/tv/${id}/season/${seasonNumber}/videos`, { params: { language: params?.language || 'en-US' } });

/** `/tv/{series_id}/season/{season_number}/external_ids` */
export const SeasonExternalIds = ({ id, seasonNumber }: ISeason) =>
  http.request.get(`3/tv/${id}/season/${seasonNumber}/external_ids`);

/** `/tv/{series_id}/season/{season_number}/episode/{episode_number}` */
export const Episode = ({ id, seasonNumber, episodeNumber, params }: IEpisode) =>
  http.request.get(`3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`, {
    params: { language: params?.language || 'en-US' }
  });

/** `/tv/{series_id}/season/{season_number}/episode/{episode_number}/credits` */
export const EpisodeCredits = ({ id, seasonNumber, episodeNumber, params }: IEpisode) =>
  http.request.get(`3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}/credits`, {
    params: { language: params?.language || 'en-US' }
  });

/** `/tv/{series_id}/season/{season_number}/episode/{episode_number}/images` */
export const EpisodeImages = ({ id, seasonNumber, episodeNumber }: IEpisode) =>
  http.request.get(`3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}/images`);

/** `/tv/{series_id}/season/{season_number}/episode/{episode_number}/videos` */
export const EpisodeVideos = ({ id, seasonNumber, episodeNumber, params }: IEpisode) =>
  http.request.get(`3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}/videos`, {
    params: { language: params?.language || 'en-US' }
  });

/** `/tv/{series_id}/season/{season_number}/episode/{episode_number}/external_ids` */
export const EpisodeExternalIds = ({ id, seasonNumber, episodeNumber }: IEpisode) =>
  http.request.get(`3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}/external_ids`);

/** `/genre/tv/list` */
export const Genres = ({ params }: IParams = {}) =>
  http.request.get('3/genre/tv/list', { params: { language: params?.language || 'en-US' } });

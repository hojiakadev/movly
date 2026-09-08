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

/** `/person/popular` */
export const Popular = ({ params }: IParams = {}): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get('3/person/popular', { params: ListModule.Mappers.Request(params) });

/** `/search/person` */
export const Search = ({ params }: { params: Types.IEntity.SearchParams }): AxiosPromise<Types.IApi.List.Response> =>
  http.request.get('3/search/person', { params: Mappers.SearchRequest(params) });

/** `/person/{id}` */
export const Single = ({ id, params }: ISingle): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.get(`3/person/${id}`, { params: { language: params?.language || 'en-US' } });

/** `/person/{id}/combined_credits` */
export const CombinedCredits = ({ id, params }: ISingle) =>
  http.request.get(`3/person/${id}/combined_credits`, { params: { language: params?.language || 'en-US' } });

/** `/person/{id}/movie_credits` */
export const MovieCredits = ({ id, params }: ISingle) =>
  http.request.get(`3/person/${id}/movie_credits`, { params: { language: params?.language || 'en-US' } });

/** `/person/{id}/tv_credits` */
export const TvCredits = ({ id, params }: ISingle) =>
  http.request.get(`3/person/${id}/tv_credits`, { params: { language: params?.language || 'en-US' } });

/** `/person/{id}/images` */
export const Images = ({ id }: { id: number }) => http.request.get(`3/person/${id}/images`);

/** `/person/{id}/external_ids` */
export const ExternalIds = ({ id }: { id: number }) => http.request.get(`3/person/${id}/external_ids`);

/** `/person/{id}/tagged_images` */
export const TaggedImages = ({ id, params }: ISingle): AxiosPromise<Types.IApi.TaggedImages.Response> =>
  http.request.get(`3/person/${id}/tagged_images`, { params: ListModule.Mappers.Request(params) });

/** `/person/{id}/translations` */
export const Translations = ({ id }: { id: number }) => http.request.get(`3/person/${id}/translations`);

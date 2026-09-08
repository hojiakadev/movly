import type { AxiosPromise } from 'axios';

import { http } from '@/common/services';

import type * as Types from './types';

import type * as ListModule from '@/common/modules/list';

interface ISingle {
  id: number;
  params?: ListModule.Types.IEntity.Params;
}

/** `/collection/{id}` */
export const Single = ({ id, params }: ISingle): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.get(`3/collection/${id}`, { params: { language: params?.language || 'en-US' } });

/** `/collection/{id}/images` */
export const Images = ({ id }: { id: number }) => http.request.get(`3/collection/${id}/images`);

/** `/collection/{id}/translations` */
export const Translations = ({ id }: { id: number }) => http.request.get(`3/collection/${id}/translations`);

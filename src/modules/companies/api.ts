import type { AxiosPromise } from 'axios';

import { http } from '@/common/services';

import type * as Types from './types';

/** `/company/{id}` */
export const Single = ({ id }: { id: number }): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.get(`3/company/${id}`);

/** `/company/{id}/alternative_names` */
export const AlternativeNames = ({ id }: { id: number }): AxiosPromise<Types.IApi.AlternativeNames.Response> =>
  http.request.get(`3/company/${id}/alternative_names`);

/** `/company/{id}/images` */
export const Images = ({ id }: { id: number }) => http.request.get(`3/company/${id}/images`);

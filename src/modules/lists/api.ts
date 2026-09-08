import type { AxiosPromise } from 'axios';

import { http } from '@/common/services';

import type * as Types from './types';

import type * as ListModule from '@/common/modules/list';

interface ISingle {
  id: number;
  params?: ListModule.Types.IEntity.Params;
}

/** `/list/{id}` */
export const Single = ({ id, params }: ISingle): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.get(`3/list/${id}`, { params: { language: params?.language || 'en-US' } });

/** `/list/{id}/item_status` */
export const ItemStatus = ({
  id,
  movieId
}: {
  id: number;
  movieId: number;
}): AxiosPromise<Types.IApi.ItemStatus.Response> =>
  http.request.get(`3/list/${id}/item_status`, { params: { movie_id: movieId } });

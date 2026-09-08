import type { AxiosPromise } from 'axios';

import { http } from '@/common/services';

import type * as Types from './types';

/** `/keyword/{id}` */
export const Single = ({ id }: { id: number }): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.get(`3/keyword/${id}`);

/** `/search/keyword` */
export const Search = ({ params }: { params: Types.IEntity.SearchParams }): AxiosPromise<Types.IApi.Search.Response> =>
  http.request.get('3/search/keyword', {
    params: {
      query: params.query,
      page: params.page || 1
    }
  });

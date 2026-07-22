import { http } from '@/common/services';
import * as Types from './types';

import { type AxiosPromise } from 'axios';

import * as ListModule from '@/common/modules/list';

export const List = ({ params }: { params?: ListModule.Types.IEntity.Params } = {}) =>
  http.request.get('3/movie/now_playing', {
    params: {
      page: params?.page ?? 1,
      language: params?.language ?? 'en-US',
      region: params?.region
    }
  });

export const Upcoming = ({ params }: { params?: ListModule.Types.IEntity.Params } = {}) =>
  http.request.get('3/movie/upcoming', {
    params: {
      page: params?.page ?? 1,
      language: params?.language ?? 'en-US',
      region: params?.region
    }
  });

export const Single = ({ id }: { id: number }): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.get(`3/movie/${id}`);

import { http } from '@/common/services';

import * as Types from './types';

import * as ListModule from '@/common/modules/list';

export const Movies = (params?: Types.IForm.Filter) => {
  return http.request.get(`3/movie/now_playing`, {
    params: {
      page: params?.page ?? 1
    }
  });
};

export const Upcoming = ({ params }: { params?: ListModule.Types.IEntity.Params } = {}) =>
  http.request.get('3/movie/upcoming', {
    params: {
      page: params?.page ?? 1,
      language: params?.language ?? 'en-US',
      region: params?.region
    }
  });

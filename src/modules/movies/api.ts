import { http } from '@/common/services';

import * as Types from './types';

export const Movies = (params?: Types.IForm.Filter) => {
  return http.request.get(`3/movie/now_playing`, {
    params: {
      page: params?.page ?? 1
    }
  });
};

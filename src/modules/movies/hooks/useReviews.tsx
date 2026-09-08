import { keepPreviousData, useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as ListModule from '@/common/modules/list';
import * as TmdbModule from '@/common/modules/tmdb';

interface IProps {
  params?: ListModule.Types.IEntity.Params;
  enabled?: boolean;
}

/** `/movie/{id}/reviews` */
const useReviews = (id: number, { params, enabled = true }: IProps = {}) => {
  const initialData = { results: [], meta: ListModule.Mappers.Meta() } as TmdbModule.Types.IQuery.Reviews;

  const paramsWithDefaults = ListModule.Mappers.Params(params);

  const { data = initialData, ...args } = useQuery<TmdbModule.Types.IQuery.Reviews>({
    queryKey: ['movies', 'reviews', id, paramsWithDefaults],
    queryFn: async () => {
      const { data } = await Api.Reviews({ id, params: paramsWithDefaults });
      return TmdbModule.Mappers.Reviews(data);
    },
    placeholderData: keepPreviousData,
    enabled: enabled && Boolean(id)
  });

  return { ...args, data: data.results, meta: data.meta };
};

export default useReviews;

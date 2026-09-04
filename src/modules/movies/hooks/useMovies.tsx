import { keepPreviousData, useQuery } from '@tanstack/react-query';

import * as ListModule from '@/common/modules/list';

import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';

const useMovies = (params?: { page?: number }) => {
  const initialData = {
    results: [],
    dates: { maximum: '', minimum: '' },
    meta: ListModule.Mappers.Meta()
  } as Types.IQuery.List;

  const { data = initialData, ...args } = useQuery<Types.IQuery.List, string, Types.IQuery.List>({
    queryKey: ['movies', 'list', params?.page],
    queryFn: async () => {
      const { data } = await Api.Movies(params);
      return Mappers.List(data);
    },
    placeholderData: keepPreviousData,
    enabled: true
  });

  return {
    data: data.results,
    meta: { ...data.meta, totalPages: Math.min(data.meta.totalPages, 500) },
    ...args
  };
};

export default useMovies;

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';
import { MAX_PAGE } from '../constants';

import * as ListModule from '@/common/modules/list';

interface IProps {
  params: Types.IEntity.SearchParams;
  enabled?: boolean;
}

/** `/search/movie` — text oriented, not to be confused with `/discover/movie`. */
const useSearch = ({ params, enabled = true }: IProps) => {
  const initialData = {
    results: [],
    dates: { maximum: '', minimum: '' },
    meta: ListModule.Mappers.Meta()
  } as Types.IQuery.List;

  const query = params.query.trim();

  const { data = initialData, ...args } = useQuery<Types.IQuery.List, string, Types.IQuery.List>({
    queryKey: ['movies', 'search', { ...params, query }],
    queryFn: async () => {
      const { data } = await Api.Search({ params: { ...params, query } });
      return Mappers.List(data);
    },
    placeholderData: keepPreviousData,
    enabled: enabled && Boolean(query)
  });

  return {
    data: data.results,
    meta: { ...data.meta, totalPages: Math.min(data.meta.totalPages, MAX_PAGE) },
    ...args
  };
};

export default useSearch;

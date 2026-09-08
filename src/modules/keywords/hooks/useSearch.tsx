import { keepPreviousData, useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

import * as ListModule from '@/common/modules/list';

interface IProps {
  params: Types.IEntity.SearchParams;
  enabled?: boolean;
}

/** `/search/keyword` — look keywords up by name. */
const useSearch = ({ params, enabled = true }: IProps) => {
  const initialData = { results: [], meta: ListModule.Mappers.Meta() } as Types.IQuery.List;

  const query = params.query.trim();
  const page = params.page || 1;

  const { data = initialData, ...args } = useQuery<Types.IQuery.List>({
    queryKey: ['keywords', 'search', query, page],
    queryFn: async () => {
      const { data } = await Api.Search({ params: { query, page } });
      return Mappers.List(data);
    },
    placeholderData: keepPreviousData,
    enabled: enabled && Boolean(query)
  });

  return { ...args, data: data.results, meta: data.meta };
};

export default useSearch;

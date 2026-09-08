import { keepPreviousData, useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';
import { MAX_PAGE } from '../constants';

import * as ListModule from '@/common/modules/list';

interface IProps {
  params?: Types.IEntity.DiscoverParams;
  enabled?: boolean;
}

/** `/discover/tv` — filtering oriented, not to be confused with `/search/tv`. */
const useDiscover = ({ params, enabled = true }: IProps = {}) => {
  const initialData = { results: [], meta: ListModule.Mappers.Meta() } as Types.IQuery.List;

  // The whole request shape is part of the cache identity, so any filter change
  // (page, genres, year, sort, ...) produces a new query.
  const request = Mappers.DiscoverRequest(params);

  const { data = initialData, ...args } = useQuery<Types.IQuery.List, string, Types.IQuery.List>({
    queryKey: ['tv', 'discover', request],
    queryFn: async () => {
      const { data } = await Api.Discover({ params });
      return Mappers.List(data);
    },
    placeholderData: keepPreviousData,
    enabled
  });

  return {
    data: data.results,
    meta: { ...data.meta, totalPages: Math.min(data.meta.totalPages, MAX_PAGE) },
    ...args
  };
};

export default useDiscover;

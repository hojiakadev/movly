import { keepPreviousData, useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

import * as ListModule from '@/common/modules/list';

interface IProps {
  params?: ListModule.Types.IEntity.Params;
  enabled?: boolean;
}

/** `/tv/{id}/recommendations` */
const useRecommendations = (id: number, { params, enabled = true }: IProps = {}) => {
  const initialData = { results: [], meta: ListModule.Mappers.Meta() } as Types.IQuery.List;

  const paramsWithDefaults = ListModule.Mappers.Params(params);

  const { data = initialData, ...args } = useQuery<Types.IQuery.List>({
    queryKey: ['tv', 'recommendations', id, paramsWithDefaults],
    queryFn: async () => {
      const { data } = await Api.Recommendations({ id, params: paramsWithDefaults });
      return Mappers.List(data);
    },
    placeholderData: keepPreviousData,
    enabled: enabled && Boolean(id)
  });

  return { ...args, data: data.results, meta: data.meta };
};

export default useRecommendations;

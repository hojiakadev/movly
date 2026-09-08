import { keepPreviousData, useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

import * as ListModule from '@/common/modules/list';

interface IProps {
  params?: ListModule.Types.IEntity.Params;
  enabled?: boolean;
}

/** `/tv/popular` */
const usePopular = ({ params, enabled = true }: IProps = {}) => {
  const initialData = { results: [], meta: ListModule.Mappers.Meta() } as Types.IQuery.List;

  const paramsWithDefaults = ListModule.Mappers.Params(params);

  const { data = initialData, ...args } = useQuery<Types.IQuery.List, string, Types.IQuery.List>({
    queryKey: ['tv', 'popular', paramsWithDefaults],
    queryFn: async () => {
      const { data } = await Api.Popular({ params: paramsWithDefaults });
      return Mappers.List(data);
    },
    placeholderData: keepPreviousData,
    enabled
  });

  return { data: data.results, meta: data.meta, ...args };
};

export default usePopular;

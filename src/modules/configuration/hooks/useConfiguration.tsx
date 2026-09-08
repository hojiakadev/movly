import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/configuration` — image base urls / sizes, effectively static. */
const useConfiguration = (enabled = true) => {
  const { data, ...args } = useQuery<Types.IEntity.Configuration>({
    queryKey: ['configuration', 'details'],
    queryFn: async () => {
      const { data } = await Api.Configuration();
      return Mappers.Configuration(data);
    },
    staleTime: Infinity,
    enabled
  });

  return { ...args, data, images: data?.images };
};

export default useConfiguration;

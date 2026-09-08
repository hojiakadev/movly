import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/list/{id}` */
const useSingle = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<Types.IEntity.List>({
    queryKey: ['lists', 'single', id],
    queryFn: async () => {
      const { data } = await Api.Single({ id });
      return Mappers.List(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data, items: data?.items ?? [] };
};

export default useSingle;

import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/collection/{id}` */
const useSingle = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<Types.IEntity.CollectionDetails>({
    queryKey: ['collections', 'single', id],
    queryFn: async () => {
      const { data } = await Api.Single({ id });
      return Mappers.CollectionDetails(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data, parts: data?.parts ?? [] };
};

export default useSingle;

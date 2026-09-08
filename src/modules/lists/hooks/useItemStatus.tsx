import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/list/{id}/item_status` — whether a movie is already part of the list. */
const useItemStatus = (listId: number, movieId: number, enabled = true) => {
  const { data, ...args } = useQuery<Types.IEntity.ItemStatus>({
    queryKey: ['lists', 'item-status', listId, movieId],
    queryFn: async () => {
      const { data } = await Api.ItemStatus({ id: listId, movieId });
      return Mappers.ItemStatus(data);
    },
    enabled: enabled && Boolean(listId) && Boolean(movieId)
  });

  return { ...args, data, itemPresent: data?.itemPresent ?? false };
};

export default useItemStatus;

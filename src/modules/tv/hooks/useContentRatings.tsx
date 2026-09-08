import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/tv/{id}/content_ratings` */
const useContentRatings = (id: number, enabled = true) => {
  const { data = [], ...args } = useQuery<Types.IEntity.ContentRating[]>({
    queryKey: ['tv', 'content-ratings', id],
    queryFn: async () => {
      const { data } = await Api.ContentRatings({ id });
      return Mappers.ContentRatings(data);
    },
    enabled: enabled && Boolean(id)
  });

  /** Rating for a given country, e.g. `TV-MA` for `US`. */
  const rating = (iso31661 = 'US') => data.find(item => item.iso31661 === iso31661)?.rating ?? '';

  return { ...args, data, rating };
};

export default useContentRatings;

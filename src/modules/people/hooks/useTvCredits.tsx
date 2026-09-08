import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/person/{id}/tv_credits` — entries are always tv shows. */
const useTvCredits = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<Types.IEntity.Credits>({
    queryKey: ['people', 'tv-credits', id],
    queryFn: async () => {
      const { data } = await Api.TvCredits({ id });
      return Mappers.Credits(data, 'tv');
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data, cast: data?.cast ?? [], crew: data?.crew ?? [] };
};

export default useTvCredits;

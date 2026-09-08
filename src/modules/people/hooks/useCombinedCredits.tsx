import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/person/{id}/combined_credits` — entries carry their own `media_type`. */
const useCombinedCredits = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<Types.IEntity.Credits>({
    queryKey: ['people', 'combined-credits', id],
    queryFn: async () => {
      const { data } = await Api.CombinedCredits({ id });
      return Mappers.Credits(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data, cast: data?.cast ?? [], crew: data?.crew ?? [] };
};

export default useCombinedCredits;

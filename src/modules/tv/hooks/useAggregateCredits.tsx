import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/**
 * `/tv/{id}/aggregate_credits` — cast/crew aggregated across every season.
 * The shared TMDB `Cast`/`Crew` mappers already read `roles[0]` / `jobs[0]`.
 */
const useAggregateCredits = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.Credits>({
    queryKey: ['tv', 'aggregate-credits', id],
    queryFn: async () => {
      const { data } = await Api.AggregateCredits({ id });
      return TmdbModule.Mappers.Credits(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, cast: data?.cast ?? [], crew: data?.crew ?? [], data };
};

export default useAggregateCredits;

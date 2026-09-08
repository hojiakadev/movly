import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/tv/{id}/watch/providers` */
const useWatchProviders = (id: number, region = 'US', enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.WatchProviders>({
    queryKey: ['tv', 'watch-providers', id],
    queryFn: async () => {
      const { data } = await Api.WatchProviders({ id });
      return TmdbModule.Mappers.WatchProviders(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data, region: data?.results[region] ?? null };
};

export default useWatchProviders;

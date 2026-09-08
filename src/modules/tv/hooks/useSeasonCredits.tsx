import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/tv/{series_id}/season/{season_number}/credits` */
const useSeasonCredits = (id: number, seasonNumber: number, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.Credits>({
    queryKey: ['tv', 'season-credits', id, seasonNumber],
    queryFn: async () => {
      const { data } = await Api.SeasonCredits({ id, seasonNumber });
      return TmdbModule.Mappers.Credits(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, cast: data?.cast ?? [], crew: data?.crew ?? [], data };
};

export default useSeasonCredits;

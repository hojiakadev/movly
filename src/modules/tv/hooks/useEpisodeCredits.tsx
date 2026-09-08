import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/tv/{series_id}/season/{season_number}/episode/{episode_number}/credits` */
const useEpisodeCredits = (id: number, seasonNumber: number, episodeNumber: number, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.Credits>({
    queryKey: ['tv', 'episode-credits', id, seasonNumber, episodeNumber],
    queryFn: async () => {
      const { data } = await Api.EpisodeCredits({ id, seasonNumber, episodeNumber });
      return TmdbModule.Mappers.Credits(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, cast: data?.cast ?? [], crew: data?.crew ?? [], data };
};

export default useEpisodeCredits;

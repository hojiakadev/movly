import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/tv/{series_id}/season/{season_number}/episode/{episode_number}/external_ids` */
const useEpisodeExternalIds = (id: number, seasonNumber: number, episodeNumber: number, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.ExternalIds>({
    queryKey: ['tv', 'episode-external-ids', id, seasonNumber, episodeNumber],
    queryFn: async () => {
      const { data } = await Api.EpisodeExternalIds({ id, seasonNumber, episodeNumber });
      return TmdbModule.Mappers.ExternalIds(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data };
};

export default useEpisodeExternalIds;

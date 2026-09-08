import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/tv/{series_id}/season/{season_number}/episode/{episode_number}` */
const useEpisode = (id: number, seasonNumber: number, episodeNumber: number, enabled = true) => {
  const { data, ...args } = useQuery<Types.IEntity.EpisodeDetails>({
    queryKey: ['tv', 'episode', id, seasonNumber, episodeNumber],
    queryFn: async () => {
      const { data } = await Api.Episode({ id, seasonNumber, episodeNumber });
      return Mappers.EpisodeDetails(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data };
};

export default useEpisode;

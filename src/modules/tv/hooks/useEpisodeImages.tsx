import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/tv/{series_id}/season/{season_number}/episode/{episode_number}/images` */
const useEpisodeImages = (id: number, seasonNumber: number, episodeNumber: number, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.Images>({
    queryKey: ['tv', 'episode-images', id, seasonNumber, episodeNumber],
    queryFn: async () => {
      const { data } = await Api.EpisodeImages({ id, seasonNumber, episodeNumber });
      return TmdbModule.Mappers.Images(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data, stills: data?.stills ?? [] };
};

export default useEpisodeImages;

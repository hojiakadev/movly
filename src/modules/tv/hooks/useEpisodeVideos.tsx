import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/tv/{series_id}/season/{season_number}/episode/{episode_number}/videos` */
const useEpisodeVideos = (id: number, seasonNumber: number, episodeNumber: number, enabled = true) => {
  const { data = [], ...args } = useQuery<TmdbModule.Types.IEntity.Video[]>({
    queryKey: ['tv', 'episode-videos', id, seasonNumber, episodeNumber],
    queryFn: async () => {
      const { data } = await Api.EpisodeVideos({ id, seasonNumber, episodeNumber });
      return TmdbModule.Mappers.Videos(data);
    },
    enabled: enabled && Boolean(id)
  });

  const trailer = data.find(video => video.type === 'Trailer' && video.site === 'YouTube') ?? null;

  return { ...args, data, trailer };
};

export default useEpisodeVideos;

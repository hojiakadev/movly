import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/tv/{series_id}/season/{season_number}/videos` */
const useSeasonVideos = (id: number, seasonNumber: number, enabled = true) => {
  const { data = [], ...args } = useQuery<TmdbModule.Types.IEntity.Video[]>({
    queryKey: ['tv', 'season-videos', id, seasonNumber],
    queryFn: async () => {
      const { data } = await Api.SeasonVideos({ id, seasonNumber });
      return TmdbModule.Mappers.Videos(data);
    },
    enabled: enabled && Boolean(id)
  });

  const trailer = data.find(video => video.type === 'Trailer' && video.site === 'YouTube') ?? null;

  return { ...args, data, trailer };
};

export default useSeasonVideos;

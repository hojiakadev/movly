import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/movie/{id}/videos` */
const useVideos = (id: number, enabled = true) => {
  const { data = [], ...args } = useQuery<TmdbModule.Types.IEntity.Video[]>({
    queryKey: ['movies', 'videos', id],
    queryFn: async () => {
      const { data } = await Api.Videos({ id });
      return TmdbModule.Mappers.Videos(data);
    },
    enabled: enabled && Boolean(id)
  });

  const trailer = data.find(video => video.type === 'Trailer' && video.site === 'YouTube') ?? null;

  return { ...args, data, trailer };
};

export default useVideos;

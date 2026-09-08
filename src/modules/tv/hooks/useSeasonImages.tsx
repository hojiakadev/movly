import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/tv/{series_id}/season/{season_number}/images` */
const useSeasonImages = (id: number, seasonNumber: number, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.Images>({
    queryKey: ['tv', 'season-images', id, seasonNumber],
    queryFn: async () => {
      const { data } = await Api.SeasonImages({ id, seasonNumber });
      return TmdbModule.Mappers.Images(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data, posters: data?.posters ?? [] };
};

export default useSeasonImages;

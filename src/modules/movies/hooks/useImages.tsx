import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/movie/{id}/images` */
const useImages = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.Images>({
    queryKey: ['movies', 'images', id],
    queryFn: async () => {
      const { data } = await Api.Images({ id });
      return TmdbModule.Mappers.Images(data);
    },
    enabled: enabled && Boolean(id)
  });

  return {
    ...args,
    data,
    posters: data?.posters ?? [],
    backdrops: data?.backdrops ?? [],
    logos: data?.logos ?? []
  };
};

export default useImages;

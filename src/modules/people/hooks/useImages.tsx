import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/person/{id}/images` — profile images only. */
const useImages = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.Images>({
    queryKey: ['people', 'images', id],
    queryFn: async () => {
      const { data } = await Api.Images({ id });
      return TmdbModule.Mappers.Images(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data, profiles: data?.profiles ?? [] };
};

export default useImages;

import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/company/{id}/images` — companies only expose logos. */
const useImages = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.Images>({
    queryKey: ['companies', 'images', id],
    queryFn: async () => {
      const { data } = await Api.Images({ id });
      return TmdbModule.Mappers.Images(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data, logos: data?.logos ?? [] };
};

export default useImages;

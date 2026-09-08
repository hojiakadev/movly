import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/collection/{id}/images` — collections only expose posters and backdrops. */
const useImages = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.Images>({
    queryKey: ['collections', 'images', id],
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
    backdrops: data?.backdrops ?? []
  };
};

export default useImages;

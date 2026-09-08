import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/movie/{id}/credits` */
const useCredits = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.Credits>({
    queryKey: ['movies', 'credits', id],
    queryFn: async () => {
      const { data } = await Api.Credits({ id });
      return TmdbModule.Mappers.Credits(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, cast: data?.cast ?? [], crew: data?.crew ?? [], data };
};

export default useCredits;

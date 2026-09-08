import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/movie/{id}/keywords` */
const useKeywords = (id: number, enabled = true) => {
  const initialData = { results: [] } as TmdbModule.Types.IQuery.Keywords;

  const { data = initialData, ...args } = useQuery<TmdbModule.Types.IQuery.Keywords>({
    queryKey: ['movies', 'keywords', id],
    queryFn: async () => {
      const { data } = await Api.Keywords({ id });
      return TmdbModule.Mappers.Keywords(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data: data.results };
};

export default useKeywords;

import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/genre/tv/list` — genres rarely change, so they are cached for the session. */
const useGenres = (enabled = true) => {
  const initialData = { results: [] } as TmdbModule.Types.IQuery.Genres;

  const { data = initialData, ...args } = useQuery<TmdbModule.Types.IQuery.Genres>({
    queryKey: ['tv', 'genres'],
    queryFn: async () => {
      const { data } = await Api.Genres();
      return TmdbModule.Mappers.Genres(data);
    },
    staleTime: Infinity,
    enabled
  });

  const byId = (id: number) => data.results.find(genre => genre.id === id) ?? null;

  return { ...args, data: data.results, byId };
};

export default useGenres;

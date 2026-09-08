import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/person/{id}/movie_credits` — entries are always movies. */
const useMovieCredits = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<Types.IEntity.Credits>({
    queryKey: ['people', 'movie-credits', id],
    queryFn: async () => {
      const { data } = await Api.MovieCredits({ id });
      return Mappers.Credits(data, 'movie');
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data, cast: data?.cast ?? [], crew: data?.crew ?? [] };
};

export default useMovieCredits;

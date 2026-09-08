import { keepPreviousData, useQuery } from '@tanstack/react-query';

import * as ListModule from '@/common/modules/list';
import { Api as MoviesApi, Mappers as MoviesMappers, type Types as MoviesTypes } from '@/modules/movies';

interface IProps {
  params?: ListModule.Types.IEntity.Params;
  enabled?: boolean;
}

/**
 * Movies belonging to a keyword.
 *
 * TMDB deprecated `/keyword/{id}/movies` in favour of
 * `/discover/movie?with_keywords={id}`, which also exposes the full discover
 * filter/sort surface. So this hook goes through the movies module's discover
 * api + mappers instead of re-declaring movie types/mappers here.
 */
const useMovies = (id: number, { params, enabled = true }: IProps = {}) => {
  const initialData = {
    results: [],
    dates: { maximum: '', minimum: '' },
    meta: ListModule.Mappers.Meta()
  } as MoviesTypes.IQuery.List;

  const discoverParams: MoviesTypes.IEntity.DiscoverParams = {
    ...ListModule.Mappers.Params(params),
    withKeywords: [id]
  };

  const request = MoviesMappers.DiscoverRequest(discoverParams);

  const { data = initialData, ...args } = useQuery<MoviesTypes.IQuery.List>({
    queryKey: ['keywords', 'movies', id, request],
    queryFn: async () => {
      const { data } = await MoviesApi.Discover({ params: discoverParams });
      return MoviesMappers.List(data);
    },
    placeholderData: keepPreviousData,
    enabled: enabled && Boolean(id)
  });

  return { ...args, data: data.results, meta: data.meta };
};

export default useMovies;

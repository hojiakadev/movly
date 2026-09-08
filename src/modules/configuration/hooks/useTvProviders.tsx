import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

interface IProps {
  params?: Types.IEntity.WatchProvidersParams;
  enabled?: boolean;
}

/** `/watch/providers/tv` — reference data, cached for the session. */
const useTvProviders = ({ params, enabled = true }: IProps = {}) => {
  const initialData = { results: [] } as Types.IQuery.WatchProviders;

  const request = Mappers.WatchProvidersRequest(params);

  const { data = initialData, ...args } = useQuery<Types.IQuery.WatchProviders>({
    queryKey: ['configuration', 'tv-providers', request],
    queryFn: async () => {
      const { data } = await Api.TvProviders({ params });
      return Mappers.WatchProviders(data);
    },
    staleTime: Infinity,
    enabled
  });

  return { ...args, data: data.results };
};

export default useTvProviders;

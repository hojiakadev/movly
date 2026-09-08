import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/watch/providers/regions` — reference data, cached for the session. */
const useProviderRegions = (language = 'en-US', enabled = true) => {
  const initialData = { results: [] } as Types.IQuery.ProviderRegions;

  const { data = initialData, ...args } = useQuery<Types.IQuery.ProviderRegions>({
    queryKey: ['configuration', 'provider-regions', language],
    queryFn: async () => {
      const { data } = await Api.ProviderRegions({ params: { language } });
      return Mappers.ProviderRegions(data);
    },
    staleTime: Infinity,
    enabled
  });

  return { ...args, data: data.results };
};

export default useProviderRegions;

import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/configuration/countries` — reference data, cached for the session. */
const useCountries = (language = 'en-US', enabled = true) => {
  const initialData = { results: [] } as Types.IQuery.Countries;

  const { data = initialData, ...args } = useQuery<Types.IQuery.Countries>({
    queryKey: ['configuration', 'countries', language],
    queryFn: async () => {
      const { data } = await Api.Countries({ params: { language } });
      return Mappers.Countries(data);
    },
    staleTime: Infinity,
    enabled
  });

  return { ...args, data: data.results };
};

export default useCountries;

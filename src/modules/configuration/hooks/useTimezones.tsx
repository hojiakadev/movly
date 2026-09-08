import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/configuration/timezones` — reference data, cached for the session. */
const useTimezones = (enabled = true) => {
  const initialData = { results: [] } as Types.IQuery.Timezones;

  const { data = initialData, ...args } = useQuery<Types.IQuery.Timezones>({
    queryKey: ['configuration', 'timezones'],
    queryFn: async () => {
      const { data } = await Api.Timezones();
      return Mappers.Timezones(data);
    },
    staleTime: Infinity,
    enabled
  });

  return { ...args, data: data.results };
};

export default useTimezones;

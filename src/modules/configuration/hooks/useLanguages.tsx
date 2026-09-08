import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/configuration/languages` — reference data, cached for the session. */
const useLanguages = (enabled = true) => {
  const initialData = { results: [] } as Types.IQuery.Languages;

  const { data = initialData, ...args } = useQuery<Types.IQuery.Languages>({
    queryKey: ['configuration', 'languages'],
    queryFn: async () => {
      const { data } = await Api.Languages();
      return Mappers.Languages(data);
    },
    staleTime: Infinity,
    enabled
  });

  return { ...args, data: data.results };
};

export default useLanguages;

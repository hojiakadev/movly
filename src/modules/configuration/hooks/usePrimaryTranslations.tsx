import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/configuration/primary_translations` — reference data, cached for the session. */
const usePrimaryTranslations = (enabled = true) => {
  const initialData = { results: [] } as Types.IQuery.PrimaryTranslations;

  const { data = initialData, ...args } = useQuery<Types.IQuery.PrimaryTranslations>({
    queryKey: ['configuration', 'primary-translations'],
    queryFn: async () => {
      const { data } = await Api.PrimaryTranslations();
      return Mappers.PrimaryTranslations(data);
    },
    staleTime: Infinity,
    enabled
  });

  return { ...args, data: data.results };
};

export default usePrimaryTranslations;

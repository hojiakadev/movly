import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/company/{id}/alternative_names` */
const useAlternativeNames = (id: number, enabled = true) => {
  const initialData = { results: [] } as Types.IQuery.AlternativeNames;

  const { data = initialData, ...args } = useQuery<Types.IQuery.AlternativeNames>({
    queryKey: ['companies', 'alternative-names', id],
    queryFn: async () => {
      const { data } = await Api.AlternativeNames({ id });
      return Mappers.AlternativeNames(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data: data.results };
};

export default useAlternativeNames;

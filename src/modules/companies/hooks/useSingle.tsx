import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/company/{id}` */
const useSingle = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<Types.IEntity.CompanyDetails>({
    queryKey: ['companies', 'single', id],
    queryFn: async () => {
      const { data } = await Api.Single({ id });
      return Mappers.CompanyDetails(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data };
};

export default useSingle;

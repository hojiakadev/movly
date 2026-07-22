import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';

const useSingle = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<Types.IEntity.Movie>({
    queryKey: ['movies', 'single', id],
    queryFn: async () => {
      const { data } = await Api.Single({ id });
      return Mappers.Movie(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data };
};

export default useSingle;

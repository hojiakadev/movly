import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/keyword/{id}` */
const useSingle = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.Keyword>({
    queryKey: ['keywords', 'single', id],
    queryFn: async () => {
      const { data } = await Api.Single({ id });
      return TmdbModule.Mappers.Keyword(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data };
};

export default useSingle;

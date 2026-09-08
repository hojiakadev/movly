import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/person/{id}/external_ids` */
const useExternalIds = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.ExternalIds>({
    queryKey: ['people', 'external-ids', id],
    queryFn: async () => {
      const { data } = await Api.ExternalIds({ id });
      return TmdbModule.Mappers.ExternalIds(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data };
};

export default useExternalIds;

import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/tv/{series_id}/season/{season_number}/external_ids` */
const useSeasonExternalIds = (id: number, seasonNumber: number, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.ExternalIds>({
    queryKey: ['tv', 'season-external-ids', id, seasonNumber],
    queryFn: async () => {
      const { data } = await Api.SeasonExternalIds({ id, seasonNumber });
      return TmdbModule.Mappers.ExternalIds(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data };
};

export default useSeasonExternalIds;

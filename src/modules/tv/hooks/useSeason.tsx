import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/tv/{series_id}/season/{season_number}` */
const useSeason = (id: number, seasonNumber: number, enabled = true) => {
  const { data, ...args } = useQuery<Types.IEntity.SeasonDetails>({
    queryKey: ['tv', 'season', id, seasonNumber],
    queryFn: async () => {
      const { data } = await Api.Season({ id, seasonNumber });
      return Mappers.SeasonDetails(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data, episodes: data?.episodes ?? [] };
};

export default useSeason;

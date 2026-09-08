import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/**
 * `/tv/{id}/account_states` — needs a TMDB `session_id`. The project has no
 * TMDB user-session infrastructure yet, so callers must pass one explicitly;
 * without it the query stays disabled.
 */
const useAccountStates = (id: number, sessionId?: string, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.AccountStates>({
    queryKey: ['tv', 'account-states', id, sessionId],
    queryFn: async () => {
      const { data } = await Api.AccountStates({ id, sessionId: sessionId as string });
      return TmdbModule.Mappers.AccountStates(data);
    },
    enabled: enabled && Boolean(id) && Boolean(sessionId)
  });

  return { ...args, data };
};

export default useAccountStates;

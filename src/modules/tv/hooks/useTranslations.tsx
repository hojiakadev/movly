import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';

import * as TmdbModule from '@/common/modules/tmdb';

/** `/tv/{id}/translations` */
const useTranslations = (id: number, enabled = true) => {
  const { data, ...args } = useQuery<TmdbModule.Types.IEntity.Translations>({
    queryKey: ['tv', 'translations', id],
    queryFn: async () => {
      const { data } = await Api.Translations({ id });
      return TmdbModule.Mappers.Translations(data);
    },
    enabled: enabled && Boolean(id)
  });

  return { ...args, data: data?.translations ?? [] };
};

export default useTranslations;

import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/movie/{id}/release_dates` */
const useReleaseDates = (id: number, enabled = true) => {
  const { data = [], ...args } = useQuery<Types.IEntity.ReleaseDatesByCountry[]>({
    queryKey: ['movies', 'release-dates', id],
    queryFn: async () => {
      const { data } = await Api.ReleaseDates({ id });
      return Mappers.ReleaseDates(data);
    },
    enabled: enabled && Boolean(id)
  });

  /** Certification for a given country, e.g. `PG-13` for `US`. */
  const certification = (iso31661 = 'US') =>
    data
      .find(item => item.iso31661 === iso31661)
      ?.releaseDates.find(item => Boolean(item.certification))?.certification ?? '';

  return { ...args, data, certification };
};

export default useReleaseDates;

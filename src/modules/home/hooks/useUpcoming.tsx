import dayjs from 'dayjs';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

import * as ListModule from '@/common/modules/list';

interface IProps {
  params?: ListModule.Types.IEntity.Params;
  enabled?: boolean;
}

const useUpcoming = ({ params, enabled = true }: IProps = {}) => {
  const initialData = {
    results: [],
    dates: { maximum: '', minimum: '' },
    meta: ListModule.Mappers.Meta()
  } as Types.IQuery.List;

  const paramsWithDefaults = ListModule.Mappers.Params(params);

  const { data = initialData, ...args } = useQuery<Types.IQuery.List, string, Types.IQuery.List>({
    queryKey: ['movies', 'upcoming', paramsWithDefaults],
    queryFn: async () => {
      const { data } = await Api.Upcoming({ params: paramsWithDefaults });
      return Mappers.List(data);
    },
    placeholderData: keepPreviousData,
    enabled
  });

  const today = dayjs().startOf('day');
  const upcomingOnly = data.results.filter(m => {
    if (!m.releaseDate) return true;
    return dayjs(m.releaseDate).isAfter(today);
  });

  return { data: upcomingOnly, meta: data.meta, ...args };
};

export default useUpcoming;


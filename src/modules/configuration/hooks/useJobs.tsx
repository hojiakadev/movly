import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

/** `/configuration/jobs` — departments and their job titles, cached for the session. */
const useJobs = (enabled = true) => {
  const initialData = { results: [] } as Types.IQuery.Jobs;

  const { data = initialData, ...args } = useQuery<Types.IQuery.Jobs>({
    queryKey: ['configuration', 'jobs'],
    queryFn: async () => {
      const { data } = await Api.Jobs();
      return Mappers.Jobs(data);
    },
    staleTime: Infinity,
    enabled
  });

  const byDepartment = (department: string) => data.results.find(item => item.department === department) ?? null;

  return { ...args, data: data.results, byDepartment };
};

export default useJobs;

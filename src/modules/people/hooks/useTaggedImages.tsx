import { keepPreviousData, useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Mappers from '../mappers';
import type * as Types from '../types';

import * as ListModule from '@/common/modules/list';

interface IProps {
  params?: ListModule.Types.IEntity.Params;
  enabled?: boolean;
}

/** `/person/{id}/tagged_images` */
const useTaggedImages = (id: number, { params, enabled = true }: IProps = {}) => {
  const initialData = { results: [], meta: ListModule.Mappers.Meta() } as Types.IQuery.TaggedImages;

  const paramsWithDefaults = ListModule.Mappers.Params(params);

  const { data = initialData, ...args } = useQuery<Types.IQuery.TaggedImages>({
    queryKey: ['people', 'tagged-images', id, paramsWithDefaults],
    queryFn: async () => {
      const { data } = await Api.TaggedImages({ id, params: paramsWithDefaults });
      return Mappers.TaggedImages(data);
    },
    placeholderData: keepPreviousData,
    enabled: enabled && Boolean(id)
  });

  return { ...args, data: data.results, meta: data.meta };
};

export default useTaggedImages;

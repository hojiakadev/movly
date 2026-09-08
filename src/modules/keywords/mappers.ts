import { get } from 'radash';

import type * as Types from './types';

import * as ListModule from '@/common/modules/list';
import * as TmdbModule from '@/common/modules/tmdb';

/** `/search/keyword` — a plain paginated list of `{ id, name }` keywords. */
export const List = (src: any): Types.IQuery.List => ({
  results: (get(src, 'results', []) as any[]).map(TmdbModule.Mappers.Keyword),
  meta: ListModule.Mappers.Meta(src)
});

import { z } from 'zod';

import { DEFAULT_SORT_BY, FIRST_RELEASE_YEAR, MAX_PAGE } from './constants';

const currentYear = new Date().getFullYear();

/**
 * `/movies` route search params. Mirrors `Types.IForm.Filter` and feeds
 * `Mappers.FilterToDiscoverParams`. Every field uses `.catch()` so a
 * hand-edited/stale URL never breaks the page.
 */
export const searchSchema = z.object({
  page: z.coerce.number().int().min(1).max(MAX_PAGE).default(1).catch(1),
  genres: z.array(z.coerce.number().int()).default([]).catch([]),
  year: z.coerce
    .number()
    .int()
    .min(FIRST_RELEASE_YEAR)
    .max(currentYear + 10)
    .optional()
    .catch(undefined),
  sortBy: z.string().default(DEFAULT_SORT_BY).catch(DEFAULT_SORT_BY),
  voteAverageGte: z.coerce.number().min(0).max(10).optional().catch(undefined),
  voteCountGte: z.coerce.number().int().min(0).optional().catch(undefined),
  runtimeLte: z.coerce.number().int().min(0).optional().catch(undefined),
  originalLanguage: z.string().optional().catch(undefined),
  includeAdult: z.coerce.boolean().default(false).catch(false),
  query: z.string().optional().catch(undefined)
});

export type SearchSchema = z.infer<typeof searchSchema>;

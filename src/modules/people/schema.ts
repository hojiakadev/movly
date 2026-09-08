import { z } from 'zod';

import { MAX_PAGE } from './constants';

/**
 * `/people` route search params. Every field uses `.catch()` so a
 * hand-edited/stale URL never breaks the page.
 */
export const searchSchema = z.object({
  page: z.coerce.number().int().min(1).max(MAX_PAGE).default(1).catch(1),
  query: z.string().optional().catch(undefined)
});

export type SearchSchema = z.infer<typeof searchSchema>;

import { z } from 'zod';

export const searchSchema = z.object({
  query: z.string().catch(''),
  type: z.enum(['movie', 'tv', 'person']).catch('movie'),
  page: z.number().catch(1)
});

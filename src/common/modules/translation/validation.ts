import { z } from 'zod';

export const TranslationValidation = z.object({
  oz: z.string().min(1),
  uz: z.string().min(1),
  ru: z.string().min(1)
});

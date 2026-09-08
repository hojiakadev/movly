import { createFileRoute } from '@tanstack/react-router';

import { Movies } from '@/pages/Movies';
import { Schema } from '@/modules/movies';

export const Route = createFileRoute('/movies/')({
  component: Movies,
  validateSearch: Schema.searchSchema
});

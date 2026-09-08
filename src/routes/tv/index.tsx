import { createFileRoute } from '@tanstack/react-router';

import { TV } from '@/pages/TV';
import { Schema } from '@/modules/tv';

export const Route = createFileRoute('/tv/')({
  component: TV,
  validateSearch: Schema.searchSchema
});

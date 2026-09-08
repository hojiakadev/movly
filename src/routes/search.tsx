import { createFileRoute } from '@tanstack/react-router';

import { Search } from '@/pages/Search';
import { Schema } from '@/modules/search';

export const Route = createFileRoute('/search')({
  component: Search,
  validateSearch: Schema.searchSchema
});

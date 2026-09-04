import { createFileRoute } from '@tanstack/react-router';

import { View } from '@/pages/Home';

export const Route = createFileRoute('/')({
  component: View
});

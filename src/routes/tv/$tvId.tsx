import { createFileRoute } from '@tanstack/react-router';

import { TVDetails } from '@/pages/TVDetails';

export const Route = createFileRoute('/tv/$tvId')({
  component: RouteComponent
});

function RouteComponent() {
  const { tvId } = Route.useParams();
  return <TVDetails id={Number(tvId)} />;
}

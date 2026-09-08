import { createFileRoute } from '@tanstack/react-router';

import { PersonDetails } from '@/pages/PersonDetails';

export const Route = createFileRoute('/people/$id')({
  component: RouteComponent
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <PersonDetails id={Number(id)} />;
}

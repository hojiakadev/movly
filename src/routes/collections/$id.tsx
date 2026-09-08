import { createFileRoute } from '@tanstack/react-router';

import { CollectionDetails } from '@/pages/CollectionDetails';

export const Route = createFileRoute('/collections/$id')({
  component: RouteComponent
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <CollectionDetails id={Number(id)} />;
}

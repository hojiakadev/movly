import { createFileRoute } from '@tanstack/react-router';

import { KeywordMovies } from '@/pages/KeywordMovies';

export const Route = createFileRoute('/keywords/$id')({
  component: RouteComponent
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <KeywordMovies id={Number(id)} />;
}

import { createFileRoute } from '@tanstack/react-router';

import { MovieDetails } from '@/pages/MovieDetails';

export const Route = createFileRoute('/movies/$id')({
  component: RouteComponent
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <MovieDetails id={Number(id)} />;
}

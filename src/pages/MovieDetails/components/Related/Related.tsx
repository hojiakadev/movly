import { Hooks } from '@/modules/movies';

import { Grid } from '@/components/Grid';
import { State } from '@/components/State';
import { Section } from '@/components/Section';
import { MovieCard } from '@/components/Cards/Movie';

type IProps = {
  id: number;
};

const Related = ({ id }: IProps) => {
  const { data: similar, isLoading: similarLoading, error: similarError, refetch: refetchSimilar } = Hooks.useSimilar(id);
  const {
    data: recommendations,
    isLoading: recommendationsLoading,
    error: recommendationsError,
    refetch: refetchRecommendations
  } = Hooks.useRecommendations(id);

  return (
    <>
      <Section title="Recommendations">
        <State
          error={recommendationsError}
          onRetry={refetchRecommendations}
          isLoading={recommendationsLoading}
          isEmpty={!recommendations.length}
          emptyText="No recommendations"
        >
          <Grid>
            {recommendations.map(movie => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.posterPath}
                releaseDate={movie.releaseDate}
                voteAverage={movie.voteAverage}
              />
            ))}
          </Grid>
        </State>
      </Section>

      <Section title="Similar movies">
        <State
          error={similarError}
          onRetry={refetchSimilar}
          isLoading={similarLoading}
          isEmpty={!similar.length}
          emptyText="No similar movies"
        >
          <Grid>
            {similar.map(movie => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.posterPath}
                releaseDate={movie.releaseDate}
                voteAverage={movie.voteAverage}
              />
            ))}
          </Grid>
        </State>
      </Section>
    </>
  );
};

export default Related;

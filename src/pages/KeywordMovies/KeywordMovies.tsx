import { Hooks } from '@/modules/keywords';

import { State } from '@/components/State';
import { Grid } from '@/components/Grid';
import { MovieCard } from '@/components/Cards/Movie';

import classes from './KeywordMovies.module.scss';

type IProps = {
  id: number;
};

const KeywordMovies = ({ id }: IProps) => {
  const { data: keyword, isLoading: keywordLoading, error: keywordError, refetch: refetchKeyword } = Hooks.useSingle(id);
  const { data: movies, isLoading: moviesLoading, error: moviesError, refetch: refetchMovies } = Hooks.useMovies(id);

  const isLoading = keywordLoading || moviesLoading;
  const error = keywordError || moviesError;
  const onRetry = () => {
    refetchKeyword();
    refetchMovies();
  };

  return (
    <State error={error} onRetry={onRetry} isLoading={isLoading} isEmpty={!keyword} emptyText="Keyword not found">
      {keyword && (
        <>
          <section className={classes.header}>
            <h1 className={classes.title}>{keyword.name} movies</h1>
          </section>

          <State isEmpty={!movies.length} emptyText="No movies found for this keyword" error={error} onRetry={onRetry}>
            <Grid>
              {movies.map(movie => (
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
        </>
      )}
    </State>
  );
};

export default KeywordMovies;

import { Hooks } from '@/modules/collections';

import { State } from '@/components/State';
import { Grid } from '@/components/Grid';
import { Section } from '@/components/Section';
import { MovieCard } from '@/components/Cards/Movie';

import classes from './CollectionDetails.module.scss';

type IProps = {
  id: number;
};

const CollectionDetails = ({ id }: IProps) => {
  const { data, isLoading, error, refetch } = Hooks.useSingle(id);

  return (
    <State error={error} onRetry={refetch} isLoading={isLoading} isEmpty={!data} emptyText="Collection not found">
      {data && (
        <>
          <section className={classes.header}>
            <h1 className={classes.title}>{data.name}</h1>
            {data.overview && <p className={classes.overview}>{data.overview}</p>}
          </section>

          <Section title={`Movies in this collection (${data.parts.length})`}>
            <Grid>
              {data.parts.map(movie => (
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
          </Section>
        </>
      )}
    </State>
  );
};

export default CollectionDetails;

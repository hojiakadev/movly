import { Hooks } from '@/modules/movies';

import { State } from '@/components/State';
import { Section } from '@/components/Section';

import { Hero } from './components/Hero';
import { Cast } from './components/Cast';
import { Media } from './components/Media';
import { Reviews } from './components/Reviews';
import { Related } from './components/Related';

type IProps = {
  id: number;
};

const MovieDetails = ({ id }: IProps) => {
  const { data, isLoading, error, refetch } = Hooks.useSingle(id);

  return (
    <State error={error} onRetry={refetch} isLoading={isLoading} isEmpty={!data} emptyText="Movie not found">
      {data && (
        <>
          <Hero movie={data} />

          <Cast id={id} />

          <Media id={id} />

          <Section title="Reviews">
            <Reviews id={id} />
          </Section>

          <Related id={id} />
        </>
      )}
    </State>
  );
};

export default MovieDetails;

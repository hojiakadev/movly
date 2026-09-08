import { Hooks } from '@/modules/movies';

import { Grid } from '@/components/Grid';
import { State } from '@/components/State';
import { Section } from '@/components/Section';
import { PersonCard } from '@/components/Cards/Person';

type IProps = {
  id: number;
};

const Cast = ({ id }: IProps) => {
  const { cast, crew, isLoading, error, refetch } = Hooks.useCredits(id);

  const directors = crew.filter(member => member.job === 'Director');
  const writers = crew.filter(member => ['Writer', 'Screenplay', 'Story'].includes(member.job));

  const subtitle = [
    directors.length && `Director: ${directors.map(member => member.name).join(', ')}`,
    writers.length && `Writer: ${writers.map(member => member.name).join(', ')}`
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <Section title="Top billed cast" action={subtitle || undefined}>
      <State error={error} onRetry={refetch} isLoading={isLoading} isEmpty={!cast.length} emptyText="No cast listed">
        <Grid>
          {cast.slice(0, 12).map(member => (
            <PersonCard
              key={member.creditId || member.id}
              id={member.id}
              name={member.name}
              profilePath={member.profilePath}
              subtitle={member.character}
            />
          ))}
        </Grid>
      </State>
    </Section>
  );
};

export default Cast;

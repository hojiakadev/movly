import { Hooks } from '@/modules/tv';

import { Grid } from '@/components/Grid';
import { State } from '@/components/State';
import { Section } from '@/components/Section';
import { PersonCard } from '@/components/Cards/Person';
import type * as TmdbModule from '@/common/modules/tmdb';

type IProps = {
  id: number;
};

const Cast = ({ id }: IProps) => {
  const { cast, crew, isLoading, error, refetch } = Hooks.useCredits(id);

  const creators = crew.filter((member: TmdbModule.Types.IEntity.Crew) =>
    ['Creator', 'Executive Producer'].includes(member.job)
  );

  const subtitle = creators.length
    ? `Created by ${creators.map((member: TmdbModule.Types.IEntity.Crew) => member.name).join(', ')}`
    : undefined;

  return (
    <Section title="Top billed cast" action={subtitle}>
      <State error={error} onRetry={refetch} isLoading={isLoading} isEmpty={!cast.length} emptyText="No cast listed">
        <Grid>
          {cast.slice(0, 12).map((member: TmdbModule.Types.IEntity.Cast) => (
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

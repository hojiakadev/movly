import dayjs from 'dayjs';
import { useUpcoming } from '@/modules/movies/hooks';

import { State } from '@/components/State';
import { Section } from '@/components/Section';
import { UpcomingCard } from '@/components/Cards/Upcoming';

import classes from './Upcoming.module.scss';

const Upcoming = () => {
  const { data, isLoading, error, refetch } = useUpcoming({ params: { page: 1 } });

  return (
    <Section title="Upcoming Movies">
      <State
        error={error}
        onRetry={refetch}
        isLoading={isLoading}
        isEmpty={!data.length}
        emptyText="No upcoming releases announced"
      >
        <div className={classes.wrapper}>
          {data.map(movie => (
            <UpcomingCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              releaseDate={movie.releaseDate}
              daysLeft={dayjs(movie.releaseDate).diff(dayjs(), 'day')}
              poster={movie.posterPath}
              backdrop={movie.backdropPath}
              description={movie.overview}
            />
          ))}
        </div>
      </State>
    </Section>
  );
};

export default Upcoming;

import dayjs from 'dayjs';
import { useUpcoming } from '@/modules/movies/hooks';

import { Section } from '@/components/Section';
import { UpcomingCard } from '@/components/Cards/Upcoming';

import classes from './Upcoming.module.scss';

const Upcoming = () => {
  const { data } = useUpcoming({ params: { page: 1 } });

  return (
    <Section title="Upcoming Movies">
      <div className={classes.wrapper}>
        {data?.map(movie => (
          <UpcomingCard
            key={movie.id}
            title={movie.title}
            releaseDate={movie.releaseDate}
            daysLeft={dayjs(movie.releaseDate).diff(dayjs(), 'day')}
            poster={movie.posterPath}
            backdrop={movie.backdropPath}
            description={movie.overview}
          />
        ))}
      </div>
    </Section>
  );
};

export default Upcoming;

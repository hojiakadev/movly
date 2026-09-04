import dayjs from 'dayjs';
import { useUpcoming } from '@/modules/movies/hooks';

import { UpcomingCard } from '@/components/Cards/Upcoming';

import { Typography } from 'antd';

const { Title } = Typography;

import classes from './Upcoming.module.scss';

const Upcoming = () => {
  const { data } = useUpcoming({ params: { page: 1 } });

  return (
    <section className={classes.section} aria-label="Coming soon">
      <Title level={2}>Upcoming Movies</Title>

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
    </section>
  );
};

export default Upcoming;

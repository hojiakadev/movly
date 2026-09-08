import { formatDate } from '@/common/utils';
import { useList } from '@/modules/movies/hooks';
import { useNavigate } from '@tanstack/react-router';

import { Button } from 'antd';
import { Grid } from '@/components/Grid';
import { State } from '@/components/State';
import { Section } from '@/components/Section';
import { PosterCard } from '@/components/Cards/Poster';

const Trending = () => {
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useList();
  const { data: nextPage } = useList({ params: { page: 2 } });

  const movies = [...data, ...nextPage.slice(0, 15)];

  return (
    <Section
      title="Now Playing"
      action={
        <Button type="link" size="large" onClick={() => navigate({ to: '/movies' })}>
          See all
        </Button>
      }
    >
      <State
        error={error}
        onRetry={refetch}
        isLoading={isLoading}
        isEmpty={!movies.length}
        emptyText="No movies are playing right now"
      >
        <Grid>
          {movies.map(item => (
            <PosterCard
              key={item.id}
              title={item.title}
              imagePath={item.posterPath}
              subtitle={formatDate(item.releaseDate)}
            />
          ))}
        </Grid>
      </State>
    </Section>
  );
};

export default Trending;

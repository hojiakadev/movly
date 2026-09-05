import { useMovies } from '@/modules/movies/hooks';

import { Filter } from 'lucide-react';

import { Button, Col, Row } from 'antd';
import { Section } from '@/components/Section';
import { MovieCard } from '@/components/Cards/Movie';

import classes from './Movies.module.scss';

const Movies = () => {
  const { data } = useMovies();
  const { data: trendingData } = useMovies({ page: 2 });

  const movies = [...data, ...trendingData.slice(0, 15)];

  return (
    <Section
      title="Now Playing"
      action={
        <Button type="primary" size="large" icon={<Filter size={16} />}>
          Filter
        </Button>
      }
    >
      <Row className={classes.wrapper}>
        {movies.map(item => (
          <Col key={item.id}>
            <MovieCard title={item.title} posterPath={item.posterPath} releaseDate={item.releaseDate} />
          </Col>
        ))}
      </Row>
    </Section>
  );
};

export default Movies;

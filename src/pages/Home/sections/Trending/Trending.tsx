import { useMovies } from '@/modules/movies/hooks';

import { Col, Row, Typography } from 'antd';
import { MovieCard } from '@/components/Cards/Movie';

const { Title } = Typography;

import classes from './Trending.module.scss';

const Trending = () => {
  const { data } = useMovies();
  const { data: trendingData } = useMovies({ page: 2 });

  const movies = [...data, ...trendingData.slice(0, 15)];

  return (
    <section className={classes.section}>
      <Title level={2}>Now Playing</Title>

      <Row className={classes.wrapper}>
        {movies.map(item => (
          <Col key={item.id}>
            <MovieCard title={item.title} posterPath={item.posterPath} releaseDate={item.releaseDate} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Trending;

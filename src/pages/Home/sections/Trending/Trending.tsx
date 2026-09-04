import { useMovies } from '@/modules/movies/hooks';
import { formatDate, imageUrl } from '@/common/utils';

import { Card, Col, Row, Typography } from 'antd';

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
            <Card
              hoverable
              size="small"
              variant="borderless"
              style={{ width: '100%' }}
              cover={<img draggable={false} alt={item.title} src={imageUrl(item.posterPath)} />}
            >
              <Card.Meta title={item.title} description={formatDate(item.releaseDate)} className={classes.meta} />
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Trending;

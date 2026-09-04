import { formatDate, imageUrl } from '@/common/utils';

import { Card } from 'antd';

import classes from './Movie.module.scss';

type MovieProps = {
  title: string;
  posterPath: string;
  releaseDate: string;
};

const MovieCard = ({ title, posterPath, releaseDate }: MovieProps) => {
  return (
    <Card
      hoverable
      size="small"
      variant="borderless"
      style={{ width: '100%' }}
      cover={<img draggable={false} alt={title} src={imageUrl(posterPath)} />}
    >
      <Card.Meta title={title} description={formatDate(releaseDate)} className={classes.meta} />
    </Card>
  );
};

export default MovieCard;

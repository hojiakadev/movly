import { Card } from 'antd';
import { Image as ImageIcon, Star } from 'lucide-react';

import { imageUrl } from '@/common/utils';

import classes from './Poster.module.scss';

type IProps = {
  title: string;
  subtitle?: string;
  imagePath?: string;
  rating?: number;
};

/**
 * Presentational 2:3 poster card. Domain cards (Movie, Show, Person) wrap it in
 * their own router link, so the visual treatment stays in a single place.
 */
const Poster = ({ title, subtitle, imagePath, rating }: IProps) => (
  <Card
    hoverable
    size="small"
    variant="borderless"
    className={classes.card}
    cover={
      <>
        {imagePath ? (
          <img draggable={false} alt={title} src={imageUrl(imagePath, 'w342')} loading="lazy" />
        ) : (
          <div className={classes.fallback}>
            <ImageIcon size={28} />
          </div>
        )}

        {Boolean(rating) && (
          <span className={classes.rating}>
            <Star size={11} strokeWidth={2.5} fill="currentColor" />
            {rating?.toFixed(1)}
          </span>
        )}
      </>
    }
  >
    <Card.Meta title={title} description={subtitle} className={classes.meta} />
  </Card>
);

export default Poster;

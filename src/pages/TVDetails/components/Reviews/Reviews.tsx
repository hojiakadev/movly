import { Card, Rate, Space, Typography } from 'antd';

import { Hooks } from '@/modules/tv';
import { formatDate } from '@/common/utils';
import type * as TmdbModule from '@/common/modules/tmdb';

import { State } from '@/components/State';

import classes from './Reviews.module.scss';

const { Text } = Typography;

type IProps = {
  id: number;
};

const Reviews = ({ id }: IProps) => {
  const { data: reviews, isLoading, error, refetch } = Hooks.useReviews(id);

  return (
    <State error={error} onRetry={refetch} isLoading={isLoading} isEmpty={!reviews.length} emptyText="No reviews yet">
      <Space direction="vertical" size="middle" className={classes.list}>
        {reviews.map((review: TmdbModule.Types.IEntity.Review) => (
          <Card key={review.id} size="small" className={classes.card}>
            <div className={classes.header}>
              <Text strong>{review.author}</Text>
              {Boolean(review.rating) && <Rate disabled allowHalf value={review.rating ? review.rating / 2 : 0} />}
              <Text type="secondary">{formatDate(review.createdAt)}</Text>
            </div>

            <p className={classes.content}>{review.content}</p>
          </Card>
        ))}
      </Space>
    </State>
  );
};

export default Reviews;

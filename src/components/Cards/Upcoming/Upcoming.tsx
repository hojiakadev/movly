import { formatDate, imageUrl } from '@/common/utils';

import { Space, Tag, Typography } from 'antd';

import classes from './Upcoming.module.scss';

const { Title, Paragraph } = Typography;

interface MovieReleaseCardProps {
  title: string;
  releaseDate: string;
  daysLeft: number;
  description: string;
  poster: string;
  backdrop: string;
}

export function UpcomingCard({ title, releaseDate, daysLeft, description, poster, backdrop }: MovieReleaseCardProps) {
  return (
    <article
      className={classes.card}
      style={
        {
          '--backdrop': `url(${imageUrl(backdrop)})`
        } as React.CSSProperties
      }
    >
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div className={classes.posterWrapper}>
          <img className={classes.poster} src={imageUrl(poster)} alt={title} />
        </div>

        <div className={classes.info}>
          <Title level={3} className={classes.title}>
            {title}
          </Title>

          <Space size={16} wrap className={classes.meta}>
            <Tag className={classes.releaseTag}>Release: {formatDate(releaseDate)}</Tag>

            <Tag className={classes.daysTag}>{daysLeft} days left</Tag>
          </Space>

          <Paragraph className={classes.description}>{description}</Paragraph>
        </div>
      </div>
    </article>
  );
}

export default UpcomingCard;

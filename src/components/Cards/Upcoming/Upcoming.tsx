import { Link } from '@tanstack/react-router';

import { Space, Tag, Typography } from 'antd';

import { formatDate, imageUrl } from '@/common/utils';

import classes from './Upcoming.module.scss';

const { Title, Paragraph } = Typography;

type IProps = {
  id: number;
  title: string;
  releaseDate: string;
  daysLeft: number;
  description: string;
  poster: string;
  backdrop: string;
};

export function UpcomingCard({ id, title, releaseDate, daysLeft, description, poster, backdrop }: IProps) {
  return (
    <article
      className={classes.card}
      style={
        {
          '--backdrop': backdrop ? `url(${imageUrl(backdrop, 'w1280')})` : 'none'
        } as React.CSSProperties
      }
    >
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Link to="/movies/$id" params={{ id: String(id) }} className={classes.posterWrapper}>
          {poster && <img className={classes.poster} src={imageUrl(poster, 'w342')} alt={title} loading="lazy" />}
        </Link>

        <div className={classes.info}>
          <Title level={3} className={classes.title}>
            <Link to="/movies/$id" params={{ id: String(id) }} className={classes.titleLink}>
              {title}
            </Link>
          </Title>

          <Space size={16} wrap className={classes.meta}>
            {releaseDate && <Tag className={classes.releaseTag}>Release: {formatDate(releaseDate)}</Tag>}

            {daysLeft > 0 && <Tag className={classes.daysTag}>{daysLeft} days left</Tag>}
          </Space>

          {description && <Paragraph className={classes.description}>{description}</Paragraph>}
        </div>
      </div>
    </article>
  );
}

export default UpcomingCard;

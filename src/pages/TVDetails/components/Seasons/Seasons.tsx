import { Card } from 'antd';

import { formatDate, imageUrl } from '@/common/utils';
import type * as TvModule from '@/modules/tv';

import classes from './Seasons.module.scss';

type IProps = {
  seasons: TvModule.Types.IEntity.Season[];
};

const Seasons = ({ seasons }: IProps) => (
  <div className={classes.grid}>
    {seasons.map(season => (
      <Card
        key={season.id}
        className={classes.card}
        cover={
          season.posterPath ? (
            <img className={classes.poster} src={imageUrl(season.posterPath, 'w342')} alt={season.name} />
          ) : null
        }
      >
        <Card.Meta
          title={season.name}
          description={`${season.episodeCount} episode${season.episodeCount === 1 ? '' : 's'}${season.airDate ? ` · ${formatDate(season.airDate)}` : ''}`}
        />
      </Card>
    ))}
  </div>
);

export default Seasons;

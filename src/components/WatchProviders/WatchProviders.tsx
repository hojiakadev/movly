import { Tooltip } from 'antd';

import { imageUrl } from '@/common/utils';
import type * as TmdbModule from '@/common/modules/tmdb';

import classes from './WatchProviders.module.scss';

type IProps = {
  region: TmdbModule.Types.IEntity.WatchProviderRegion | null;
};

const groups: { key: keyof TmdbModule.Types.IEntity.WatchProviderRegion; label: string }[] = [
  { key: 'flatrate', label: 'Stream' },
  { key: 'free', label: 'Free' },
  { key: 'ads', label: 'With ads' },
  { key: 'rent', label: 'Rent' },
  { key: 'buy', label: 'Buy' }
];

/** Renders TMDB watch providers for one region; renders nothing when unavailable. */
const WatchProviders = ({ region }: IProps) => {
  if (!region) return null;

  const available = groups.filter(group => (region[group.key] as TmdbModule.Types.IEntity.WatchProvider[]).length);

  if (!available.length) return null;

  return (
    <div className={classes.wrapper}>
      {available.map(group => (
        <div key={group.key} className={classes.group}>
          <span className={classes.label}>{group.label}</span>

          {(region[group.key] as TmdbModule.Types.IEntity.WatchProvider[]).map(provider => (
            <Tooltip key={provider.providerId} title={provider.providerName}>
              <img
                className={classes.logo}
                src={imageUrl(provider.logoPath, 'w92')}
                alt={provider.providerName}
                loading="lazy"
              />
            </Tooltip>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WatchProviders;

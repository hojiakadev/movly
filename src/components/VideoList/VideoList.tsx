import { useState } from 'react';
import { PlayCircle } from 'lucide-react';

import { Trailer } from '@/components/Trailer';
import type * as TmdbModule from '@/common/modules/tmdb';

import classes from './VideoList.module.scss';

type IProps = {
  videos: TmdbModule.Types.IEntity.Video[];
  limit?: number;
};

/** YouTube videos from TMDB `/videos`, played in a modal. Non-YouTube sites are skipped. */
const VideoList = ({ videos, limit = 6 }: IProps) => {
  const [active, setActive] = useState<TmdbModule.Types.IEntity.Video | null>(null);

  const playable = videos.filter(video => video.site === 'YouTube').slice(0, limit);

  if (!playable.length) return null;

  return (
    <>
      <div className={classes.grid}>
        {playable.map(video => (
          <button key={video.id} type="button" className={classes.item} onClick={() => setActive(video)}>
            <span className={classes.thumb}>
              <img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} alt={video.name} loading="lazy" />
              <span className={classes.play}>
                <PlayCircle size={42} strokeWidth={1.5} />
              </span>
            </span>

            <span className={classes.info}>
              <span className={classes.name}>{video.name}</span>
              <span className={classes.type}>{video.type}</span>
            </span>
          </button>
        ))}
      </div>

      <Trailer
        open={Boolean(active)}
        title={active?.name ?? ''}
        videoKey={active?.key}
        onClose={() => setActive(null)}
      />
    </>
  );
};

export default VideoList;

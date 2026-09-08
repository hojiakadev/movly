import cx from 'clsx';
import { Image } from 'antd';

import { imageUrl } from '@/common/utils';
import type * as TmdbModule from '@/common/modules/tmdb';

import classes from './Gallery.module.scss';

type IProps = {
  images: TmdbModule.Types.IEntity.Image[];
  variant?: 'poster' | 'backdrop';
  limit?: number;
};

/** TMDB image gallery with full-size preview. Renders nothing when there are no images. */
const Gallery = ({ images, variant = 'poster', limit = 12 }: IProps) => {
  if (!images.length) return null;

  return (
    <Image.PreviewGroup>
      <div className={cx(classes.grid, classes[variant])}>
        {images.slice(0, limit).map(image => (
          <div key={image.filePath} className={classes.item}>
            <Image
              src={imageUrl(image.filePath, variant === 'poster' ? 'w342' : 'w780')}
              preview={{ src: imageUrl(image.filePath, 'original') }}
              alt=""
            />
          </div>
        ))}
      </div>
    </Image.PreviewGroup>
  );
};

export default Gallery;

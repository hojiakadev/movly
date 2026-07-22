import placeholderImg from '@/assets/images/placeholder-img.webp';
import getImageUrl from '@/common/utils/getImageUrl';

import type { IEntity } from '@/modules/home/types';

import classes from './Slide.module.css';

type IProps = {
  movie: IEntity.Movie;
};

const Slide = ({ movie }: IProps) => {
  const imageSrc = getImageUrl(movie.backdropPath) ?? placeholderImg;

  return (
    <div className={classes.slide}>
      <img className={classes.backdrop} src={imageSrc} alt={movie.title} loading="lazy" />
      <div className={classes.gradient} aria-hidden />

      <div className={classes.content}>
        <h2 className={classes.title}>{movie.title}</h2>

        <div className={classes.meta}>
          {movie.releaseDate ? <span>{movie.releaseDate.slice(0, 4)}</span> : null}
          <span className={classes.rating}>★ {movie.voteAverage.toFixed(1)}</span>
        </div>

        {movie.overview ? <p className={classes.overview}>{movie.overview}</p> : null}
      </div>
    </div>
  );
};

export default Slide;

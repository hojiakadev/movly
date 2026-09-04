// src/components/Hero/Hero.tsx
import { Button, Carousel } from 'antd';
import { Star, Play } from 'lucide-react';

import { imageUrl } from '@/common/utils/imgUrl';

import * as Types from '@/modules/movies/types';

import classes from './Hero.module.scss';

type IProps = {
  movies: Types.IEntity.Movie[];
  onPlay?: (movie: Types.IEntity.Movie) => void;
};

const Hero = ({ movies, onPlay }: IProps) => {
  return (
    <section className={classes.hero}>
      <Carousel
        fade
        autoplay
        infinite
        draggable
        autoplaySpeed={6000}
        className={classes.carousel}
        dots={{ className: classes.dots }}
      >
        {movies.map(movie => {
          const hasImage = Boolean(movie.backdropPath);
          const imagePath = hasImage ? imageUrl(movie.backdropPath, 'w1920') : '';

          return (
            <div key={movie.id} className={classes.slideWrap}>
              <article className={classes.banner}>
                <div className={classes.backdrop} style={{ backgroundImage: `url(${imagePath})` }} />
                <div className={classes.scrim} />

                <div className={classes.content}>
                  {movie.voteAverage !== undefined && (
                    <div className={classes.meta}>
                      <span className={classes.ratingBadge}>
                        <Star size={14} strokeWidth={2.25} fill="currentColor" />
                        {movie.voteAverage.toFixed(1)}
                      </span>
                      {movie.releaseDate && <span className={classes.year}>{movie.releaseDate}</span>}
                    </div>
                  )}

                  <h3 className={classes.movieTitle}>{movie.title}</h3>

                  {movie.overview && <p className={classes.description}>{movie.overview}</p>}

                  <Button
                    size="large"
                    variant="solid"
                    icon={<Play size={16} strokeWidth={2.5} fill="currentColor" />}
                    onClick={() => onPlay?.(movie)}
                  >
                    Watch Now
                  </Button>
                </div>
              </article>
            </div>
          );
        })}
      </Carousel>
    </section>
  );
};

export default Hero;

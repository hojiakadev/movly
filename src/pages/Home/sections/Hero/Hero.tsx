import { useMovies } from '@/modules/movies/hooks';

import { Button, Carousel } from 'antd';
import { Star, Play } from 'lucide-react';

import { formatDate, imageUrl } from '@/common/utils';

import classes from './Hero.module.scss';

const Hero = () => {
  const { data } = useMovies();

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
        {data?.map(movie => {
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
                      {movie.releaseDate && <span className={classes.year}>{formatDate(movie.releaseDate)}</span>}
                    </div>
                  )}

                  <h3 className={classes.movieTitle}>{movie.title}</h3>

                  {movie.overview && <p className={classes.description}>{movie.overview}</p>}

                  <Button
                    size="large"
                    variant="solid"
                    icon={<Play size={16} strokeWidth={2.5} fill="currentColor" />}
                    onClick={() => console.log('play', movie.title)}
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

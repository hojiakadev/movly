import { useList } from '@/modules/movies/hooks';

import { Button, Carousel } from 'antd';
import { Play, Star } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import { State } from '@/components/State';
import { formatDate, imageUrl } from '@/common/utils';

import classes from './Hero.module.scss';

const Hero = () => {
  const { data, isLoading, error, refetch } = useList();

  const slides = data.slice(0, 6);

  return (
    <section className={classes.hero}>
      <State error={error} onRetry={refetch} isLoading={isLoading} isEmpty={!slides.length}>
        <Carousel
          fade
          autoplay
          infinite
          draggable
          autoplaySpeed={6000}
          className={classes.carousel}
          dots={{ className: classes.dots }}
        >
          {slides.map(movie => (
            <div key={movie.id} className={classes.slideWrap}>
              <article className={classes.banner}>
                <div
                  className={classes.backdrop}
                  style={{ backgroundImage: movie.backdropPath ? `url(${imageUrl(movie.backdropPath, 'w1920')})` : '' }}
                />
                <div className={classes.scrim} />

                <div className={classes.content}>
                  <div className={classes.meta}>
                    {Boolean(movie.voteAverage) && (
                      <span className={classes.ratingBadge}>
                        <Star size={14} strokeWidth={2.25} fill="currentColor" />
                        {movie.voteAverage.toFixed(1)}
                      </span>
                    )}
                    {movie.releaseDate && <span className={classes.year}>{formatDate(movie.releaseDate)}</span>}
                  </div>

                  <h3 className={classes.movieTitle}>{movie.title}</h3>

                  {movie.overview && <p className={classes.description}>{movie.overview}</p>}

                  <Link to="/movies/$id" params={{ id: String(movie.id) }}>
                    <Button size="large" type="primary" icon={<Play size={16} strokeWidth={2.5} fill="currentColor" />}>
                      Watch Now
                    </Button>
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </Carousel>
      </State>
    </section>
  );
};

export default Hero;

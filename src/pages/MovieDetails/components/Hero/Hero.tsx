import { useState } from 'react';
import { Button, Space, Tag, Typography } from 'antd';
import { ExternalLink, Layers, Play } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import { Hooks, type Types } from '@/modules/movies';
import { formatDate, imageUrl } from '@/common/utils';

import { Trailer } from '@/components/Trailer';
import { WatchProviders } from '@/components/WatchProviders';

import classes from './Hero.module.scss';

const { Title, Paragraph } = Typography;

type IProps = {
  movie: Types.IEntity.MovieDetails;
};

const money = (value: number) =>
  value ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : '—';

const runtime = (minutes: number) => (minutes ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : '—');

const Hero = ({ movie }: IProps) => {
  const [isTrailerOpen, setTrailerOpen] = useState(false);

  const { trailer } = Hooks.useVideos(movie.id);
  const { data: keywords } = Hooks.useKeywords(movie.id);
  const { certification } = Hooks.useReleaseDates(movie.id);
  const { region: providers } = Hooks.useWatchProviders(movie.id);
  const { data: externalIds } = Hooks.useExternalIds(movie.id);

  const year = movie.releaseDate ? movie.releaseDate.slice(0, 4) : '';
  const imdbId = externalIds?.imdbId || movie.imdbId;

  return (
    <section className={classes.hero}>
      <div
        className={classes.backdrop}
        style={{ backgroundImage: movie.backdropPath ? `url(${imageUrl(movie.backdropPath, 'w1920')})` : '' }}
      />
      <div className={classes.scrim} />

      <div className={classes.content}>
        {movie.posterPath ? (
          <img className={classes.poster} src={imageUrl(movie.posterPath, 'w500')} alt={movie.title} />
        ) : (
          <div className={classes.posterFallback} />
        )}

        <div className={classes.info}>
          <Title level={1} className={classes.title}>
            {movie.title} {year && <span className={classes.year}>({year})</span>}
          </Title>

          {movie.tagline && <p className={classes.tagline}>{movie.tagline}</p>}

          <div className={classes.meta}>
            {Boolean(movie.voteAverage) && (
              <span className={classes.rating}>
                {movie.voteAverage.toFixed(1)}
                <span>/ 10</span>
              </span>
            )}
            {certification() && <span className={classes.certification}>{certification()}</span>}
            {movie.releaseDate && <span>{formatDate(movie.releaseDate)}</span>}
            {Boolean(movie.runtime) && <span>{runtime(movie.runtime)}</span>}
            {Boolean(movie.voteCount) && <span>{movie.voteCount.toLocaleString('en-US')} votes</span>}
          </div>

          {Boolean(movie.genres.length) && (
            <Space size={[6, 6]} wrap>
              {movie.genres.map(genre => (
                <Tag key={genre.id} bordered={false}>
                  {genre.name}
                </Tag>
              ))}
            </Space>
          )}

          {movie.overview && <Paragraph className={classes.overview}>{movie.overview}</Paragraph>}

          <div className={classes.actions}>
            {trailer && (
              <Button type="primary" size="large" icon={<Play size={16} />} onClick={() => setTrailerOpen(true)}>
                Watch trailer
              </Button>
            )}

            {movie.belongsToCollection && (
              <Link to="/collections/$id" params={{ id: String(movie.belongsToCollection.id) }}>
                <Button size="large" icon={<Layers size={16} />}>
                  {movie.belongsToCollection.name}
                </Button>
              </Link>
            )}

            {imdbId && (
              <Button
                size="large"
                type="text"
                icon={<ExternalLink size={15} />}
                href={`https://www.imdb.com/title/${imdbId}`}
                target="_blank"
              >
                IMDb
              </Button>
            )}

            {movie.homepage && (
              <Button size="large" type="text" icon={<ExternalLink size={15} />} href={movie.homepage} target="_blank">
                Website
              </Button>
            )}
          </div>

          {providers && (
            <div>
              <p className={classes.heading}>Where to watch</p>
              <WatchProviders region={providers} />
            </div>
          )}

          <div className={classes.facts}>
            <span className={classes.fact}>
              <span className={classes.factLabel}>Status</span>
              {movie.status || '—'}
            </span>
            <span className={classes.fact}>
              <span className={classes.factLabel}>Budget</span>
              {money(movie.budget)}
            </span>
            <span className={classes.fact}>
              <span className={classes.factLabel}>Revenue</span>
              {money(movie.revenue)}
            </span>
            <span className={classes.fact}>
              <span className={classes.factLabel}>Original language</span>
              {movie.spokenLanguages[0]?.englishName || movie.originalLanguage.toUpperCase() || '—'}
            </span>
            {Boolean(movie.productionCompanies.length) && (
              <span className={classes.fact}>
                <span className={classes.factLabel}>Production</span>
                {movie.productionCompanies.map(company => company.name).join(', ')}
              </span>
            )}
          </div>

          {Boolean(keywords.length) && (
            <Space size={[6, 6]} wrap>
              {keywords.slice(0, 14).map(keyword => (
                <Link key={keyword.id} to="/keywords/$id" params={{ id: String(keyword.id) }}>
                  <Tag bordered={false}>{keyword.name}</Tag>
                </Link>
              ))}
            </Space>
          )}
        </div>
      </div>

      <Trailer
        open={isTrailerOpen}
        title={`${movie.title} — ${trailer?.name ?? 'Trailer'}`}
        videoKey={trailer?.key}
        onClose={() => setTrailerOpen(false)}
      />
    </section>
  );
};

export default Hero;

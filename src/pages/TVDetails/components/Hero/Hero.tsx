import { useState } from 'react';
import { Button, Space, Tag, Typography } from 'antd';
import { ExternalLink, Play } from 'lucide-react';

import { Hooks, type Types } from '@/modules/tv';
import { formatDate, imageUrl } from '@/common/utils';
import type * as TmdbModule from '@/common/modules/tmdb';

import { Trailer } from '@/components/Trailer';
import { WatchProviders } from '@/components/WatchProviders';

import classes from './Hero.module.scss';

const { Title, Paragraph } = Typography;

type IProps = {
  show: Types.IEntity.ShowDetails;
};

const runtime = (minutes: number) => (minutes ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : '');

const years = (first?: string, last?: string) => {
  const firstYear = first ? first.slice(0, 4) : '';
  const lastYear = last ? last.slice(0, 4) : '';
  if (!firstYear) return '';
  return lastYear && lastYear !== firstYear ? `${firstYear}–${lastYear}` : firstYear;
};

const Hero = ({ show }: IProps) => {
  const [isTrailerOpen, setTrailerOpen] = useState(false);

  const { trailer } = Hooks.useVideos(show.id);
  const { data: keywords } = Hooks.useKeywords(show.id);
  const { rating } = Hooks.useContentRatings(show.id);
  const { region: providers } = Hooks.useWatchProviders(show.id);
  const { data: externalIds } = Hooks.useExternalIds(show.id);

  const year = years(show.firstAirDate, show.lastAirDate);
  const imdbId = externalIds?.imdbId;

  return (
    <section className={classes.hero}>
      <div
        className={classes.backdrop}
        style={{ backgroundImage: show.backdropPath ? `url(${imageUrl(show.backdropPath, 'w1920')})` : '' }}
      />
      <div className={classes.scrim} />

      <div className={classes.content}>
        {show.posterPath ? (
          <img className={classes.poster} src={imageUrl(show.posterPath, 'w500')} alt={show.name} />
        ) : (
          <div className={classes.posterFallback} />
        )}

        <div className={classes.info}>
          <Title level={1} className={classes.title}>
            {show.name} {year && <span className={classes.year}>({year})</span>}
          </Title>

          {show.tagline && <p className={classes.tagline}>{show.tagline}</p>}

          <div className={classes.meta}>
            {Boolean(show.voteAverage) && (
              <span className={classes.rating}>
                {show.voteAverage.toFixed(1)}
                <span>/ 10</span>
              </span>
            )}
            {rating() && <span className={classes.certification}>{rating()}</span>}
            {show.firstAirDate && <span>{formatDate(show.firstAirDate)}</span>}
            {show.episodeRunTime.length > 0 && Boolean(show.episodeRunTime[0]) && (
              <span>{runtime(show.episodeRunTime[0])}</span>
            )}
            {Boolean(show.voteCount) && <span>{show.voteCount.toLocaleString('en-US')} votes</span>}
            {show.numberOfSeasons > 0 && (
              <span>
                {show.numberOfSeasons} season{show.numberOfSeasons === 1 ? '' : 's'}
              </span>
            )}
          </div>

          {Boolean(show.genres.length) && (
            <Space size={[6, 6]} wrap>
              {show.genres.map(genre => (
                <Tag key={genre.id} bordered={false}>
                  {genre.name}
                </Tag>
              ))}
            </Space>
          )}

          {show.overview && <Paragraph className={classes.overview}>{show.overview}</Paragraph>}

          <div className={classes.actions}>
            {trailer && (
              <Button type="primary" size="large" icon={<Play size={16} />} onClick={() => setTrailerOpen(true)}>
                Watch trailer
              </Button>
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

            {show.homepage && (
              <Button size="large" type="text" icon={<ExternalLink size={15} />} href={show.homepage} target="_blank">
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
              {show.status || '—'}
            </span>
            <span className={classes.fact}>
              <span className={classes.factLabel}>Type</span>
              {show.type || '—'}
            </span>
            <span className={classes.fact}>
              <span className={classes.factLabel}>Original language</span>
              {show.spokenLanguages[0]?.englishName || show.originalLanguage.toUpperCase() || '—'}
            </span>
            {Boolean(show.networks.length) && (
              <span className={classes.fact}>
                <span className={classes.factLabel}>Networks</span>
                {show.networks.map(network => network.name).join(', ')}
              </span>
            )}
            {show.createdBy.length > 0 && (
              <span className={classes.fact}>
                <span className={classes.factLabel}>Created by</span>
                {show.createdBy.map(creator => creator.name).join(', ')}
              </span>
            )}
          </div>

          {Boolean(keywords.length) && (
            <Space size={[6, 6]} wrap>
              {keywords.slice(0, 14).map((keyword: TmdbModule.Types.IEntity.Keyword) => (
                <Tag key={keyword.id} bordered={false}>
                  {keyword.name}
                </Tag>
              ))}
            </Space>
          )}
        </div>
      </div>

      <Trailer
        open={isTrailerOpen}
        title={`${show.name} — ${trailer?.name ?? 'Trailer'}`}
        videoKey={trailer?.key}
        onClose={() => setTrailerOpen(false)}
      />
    </section>
  );
};

export default Hero;

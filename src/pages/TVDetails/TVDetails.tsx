import { Hooks, type Types } from '@/modules/tv';

import { State } from '@/components/State';
import { Section } from '@/components/Section';
import { Grid } from '@/components/Grid';
import { Gallery } from '@/components/Gallery';
import { VideoList } from '@/components/VideoList';
import { ShowCard } from '@/components/Cards/Show';

import { Hero } from './components/Hero';
import { Cast } from './components/Cast';
import { Seasons } from './components/Seasons';
import { Reviews } from './components/Reviews';

import classes from './TVDetails.module.scss';

type IProps = {
  id: number;
};

const TVDetails = ({ id }: IProps) => {
  const { data, isLoading, error, refetch } = Hooks.useSingle(id);

  const { data: images, isLoading: imagesLoading, error: imagesError, refetch: refetchImages } = Hooks.useImages(id);
  const { data: videos, isLoading: videosLoading, error: videosError, refetch: refetchVideos } = Hooks.useVideos(id);
  const {
    data: recommendations,
    isLoading: recommendationsLoading,
    error: recommendationsError,
    refetch: refetchRecommendations
  } = Hooks.useRecommendations(id);
  const {
    data: similar,
    isLoading: similarLoading,
    error: similarError,
    refetch: refetchSimilar
  } = Hooks.useSimilar(id);

  return (
    <State error={error} onRetry={refetch} isLoading={isLoading} isEmpty={!data} emptyText="TV show not found">
      {data && (
        <>
          <Hero show={data} />

          <Cast id={id} />

          {Boolean(data.seasons.length) && (
            <Section title="Seasons">
              <Seasons seasons={data.seasons} />
            </Section>
          )}

          <Section title="Media">
            <State
              error={imagesError || videosError}
              onRetry={() => {
                refetchImages();
                refetchVideos();
              }}
              isLoading={imagesLoading || videosLoading}
              isEmpty={!images?.backdrops.length && !images?.posters.length && !videos?.length}
              emptyText="No media available"
            >
              {Boolean(images?.backdrops.length) && (
                <>
                  <p className={classes.heading}>Backdrops</p>
                  <Gallery images={images!.backdrops} variant="backdrop" limit={8} />
                </>
              )}

              {Boolean(images?.posters.length) && (
                <>
                  <p className={classes.heading}>Posters</p>
                  <Gallery images={images!.posters} limit={12} />
                </>
              )}

              {Boolean(videos?.length) && (
                <>
                  <p className={classes.heading}>Videos</p>
                  <VideoList videos={videos!} limit={8} />
                </>
              )}
            </State>
          </Section>

          <Section title="Reviews">
            <Reviews id={id} />
          </Section>

          <Section title="Recommendations">
            <State
              error={recommendationsError}
              onRetry={refetchRecommendations}
              isLoading={recommendationsLoading}
              isEmpty={!recommendations.length}
              emptyText="No recommendations"
            >
              <Grid>
                {recommendations.map((show: Types.IEntity.Show) => (
                  <ShowCard
                    key={show.id}
                    id={show.id}
                    name={show.name}
                    posterPath={show.posterPath}
                    firstAirDate={show.firstAirDate}
                    voteAverage={show.voteAverage}
                  />
                ))}
              </Grid>
            </State>
          </Section>

          <Section title="Similar shows">
            <State
              error={similarError}
              onRetry={refetchSimilar}
              isLoading={similarLoading}
              isEmpty={!similar.length}
              emptyText="No similar shows"
            >
              <Grid>
                {similar.map((show: Types.IEntity.Show) => (
                  <ShowCard
                    key={show.id}
                    id={show.id}
                    name={show.name}
                    posterPath={show.posterPath}
                    firstAirDate={show.firstAirDate}
                    voteAverage={show.voteAverage}
                  />
                ))}
              </Grid>
            </State>
          </Section>
        </>
      )}
    </State>
  );
};

export default TVDetails;

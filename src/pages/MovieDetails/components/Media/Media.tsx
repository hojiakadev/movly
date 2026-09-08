import { Hooks } from '@/modules/movies';

import { Section } from '@/components/Section';
import { State } from '@/components/State';
import { Gallery } from '@/components/Gallery';
import { VideoList } from '@/components/VideoList';

type IProps = {
  id: number;
};

const Media = ({ id }: IProps) => {
  const { data: images, isLoading: imagesLoading, error: imagesError, refetch: refetchImages } = Hooks.useImages(id);
  const { data: videos, isLoading: videosLoading, error: videosError, refetch: refetchVideos } = Hooks.useVideos(id);

  const isLoading = imagesLoading || videosLoading;
  const error = imagesError || videosError;
  const onRetry = () => {
    refetchImages();
    refetchVideos();
  };

  const hasBackdrops = Boolean(images?.backdrops.length);
  const hasPosters = Boolean(images?.posters.length);
  const hasVideos = Boolean(videos?.length);

  return (
    <>
      <Section title="Backdrops">
        <State
          error={error}
          onRetry={onRetry}
          isLoading={isLoading}
          isEmpty={!hasBackdrops}
          emptyText="No backdrops available"
        >
          {images && <Gallery images={images.backdrops} variant="backdrop" limit={8} />}
        </State>
      </Section>

      <Section title="Posters">
        <State error={error} isLoading={isLoading} isEmpty={!hasPosters} emptyText="No posters available">
          {images && <Gallery images={images.posters} limit={12} />}
        </State>
      </Section>

      <Section title="Videos">
        <State error={error} isLoading={isLoading} isEmpty={!hasVideos} emptyText="No videos available">
          {videos && <VideoList videos={videos} limit={8} />}
        </State>
      </Section>
    </>
  );
};

export default Media;

import { useRef } from 'react';
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import type { IEntity } from '@/modules/home/types';
import { useAutoplay } from './Autoplay';
import { useAutoplayProgress } from './AutoplayProgress';
import { NextButton, PrevButton, usePrevNextButtons } from './ArrowButtons';
import { Slide } from './Slide';

type IProps = {
  slides: IEntity.Movie[];
  options?: EmblaOptionsType;
};

const EmblaCarousel = (props: IProps) => {
  const { slides, options } = props;
  const progressNode = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 3000, playOnInit: false })]);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const { onAutoplayButtonClick } = useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);

  if (slides.length === 0) return null;

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map(movie => (
            <div className="embla__slide" key={movie.id}>
              <Slide movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={() => onAutoplayButtonClick(onPrevButtonClick)} disabled={prevBtnDisabled} />
        </div>

        <div className={`embla__progress`.concat(showAutoplayProgress ? '' : ' embla__progress--hidden')}>
          <div className="embla__progress__bar" ref={progressNode} />
        </div>

        <div className="embla__buttons">
          <NextButton onClick={() => onAutoplayButtonClick(onNextButtonClick)} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;

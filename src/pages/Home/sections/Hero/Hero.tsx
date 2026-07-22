import '@/components/Carousel/css/embla.css';

import { useList } from '@/modules/home/hooks';

import { Carousel } from '@/components/Carousel';

import classes from './Hero.module.css';

const Hero = () => {
  const { data, isPending, isError } = useList();

  if (isPending) {
    return (
      <div className={classes.container}>
        <div className={classes.state}>Loading movies...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={classes.container}>
        <div className={classes.state}>Failed to load movies. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Carousel slides={data} options={{ loop: true }} />
    </div>
  );
};

export default Hero;

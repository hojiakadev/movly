import { Hero } from '@/pages/Home/sections/Hero';

import classes from './View.module.css';

const View = () => {
  return (
    <div className={classes.container}>
      <Hero />
    </div>
  );
};

export default View;

import { memo } from 'react';
import { Link } from 'react-router-dom';

import logo from '@/assets/images/logo.svg';

import classes from './Logo.module.css';

const Logo = () => {
  return (
    <Link to="/" className={classes.link} aria-label="Movly home">
      <img src={logo} alt="Movly" className={classes.logo} />
      <p className={classes.logo_title}>MOVLY</p>
    </Link>
  );
};

export default memo(Logo);

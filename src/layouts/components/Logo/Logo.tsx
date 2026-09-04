import { Link } from '@tanstack/react-router';

import logo from '@/assets/svg/logo.svg';

import classes from './Logo.module.scss';

const Logo = () => {
  return (
    <Link to="/" className={classes.wrapper} aria-label="Movly">
      <img src={logo} alt="zaro logo" className={classes.logo} />
      <span className={classes.title}>MOVLY</span>
    </Link>
  );
};

export default Logo;

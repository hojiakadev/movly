import { Layout } from 'antd';
import { Logo } from '../Logo';
import { Link } from '@tanstack/react-router';

import classes from './Footer.module.scss';

const navItems = [
  { id: 1, to: '/', label: 'Home' },
  { id: 2, to: '/movies', label: 'Movies' },
  { id: 3, to: '/tv', label: 'TV Shows' }
];

const Footer = () => {
  return (
    <Layout.Footer className={classes.footer}>
      <div className={classes.container}>
        <Logo />

        <nav aria-label="Footer">
          <ul className={classes.nav}>
            {navItems.map(item => (
              <li key={item.id}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className={classes.copy}>&copy; {new Date().getFullYear()} MOVLY · All rights reserved.</p>
        <p className={classes.attribution}>
          Powered by{' '}
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            TMDB
          </a>
        </p>
      </div>
    </Layout.Footer>
  );
};

export default Footer;

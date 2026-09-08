import { Layout } from 'antd';
import { Link } from '@tanstack/react-router';
import { Clapperboard, Heart, Search, Telescope, Tv } from 'lucide-react';

import { Logo } from '../Logo';

import classes from './Footer.module.scss';

const discoverLinks = [
  { to: '/', label: 'Home', icon: Telescope },
  { to: '/movies', label: 'Movies', icon: Clapperboard },
  { to: '/tv', label: 'TV Shows', icon: Tv },
  { to: '/search', label: 'Search', icon: Search }
];

const legalLinks = [
  { to: '/people', label: 'People' },
  { to: '/collections', label: 'Collections' },
  { href: 'https://www.themoviedb.org/', label: 'TMDB', external: true }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Layout.Footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.brand}>
          <Logo />
          <p className={classes.tagline}>Discover movies, TV shows, and people powered by the TMDB database.</p>
        </div>

        <nav aria-label="Discover" className={classes.column}>
          <h3 className={classes.heading}>Discover</h3>
          <ul className={classes.links}>
            {discoverLinks.map(link => {
              const Icon = link.icon;

              return (
                <li key={link.to}>
                  <Link to={link.to} className={classes.link}>
                    <Icon size={16} />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <nav aria-label="Explore" className={classes.column}>
          <h3 className={classes.heading}>Explore</h3>
          <ul className={classes.links}>
            {legalLinks.map(link => (
              <li key={link.href || link.to}>
                {link.external ? (
                  <a href={link.href} className={classes.link} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                ) : (
                  <Link to={link.to} className={classes.link}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={classes.bottom}>
        <p className={classes.copy}>
          &copy; {currentYear} MOVLY · Made with <Heart size={12} className={classes.heart} /> for movies & TV.
        </p>
        <p className={classes.attribution}>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </div>
    </Layout.Footer>
  );
};

export default Footer;

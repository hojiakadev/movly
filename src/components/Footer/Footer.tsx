import { Link } from 'react-router-dom';

import styles from './Footer.module.css';

const navItems = [
  { id: 1, to: '/', label: 'Home' },
  { id: 2, to: '/movies', label: 'Movies' },
  { id: 3, to: '/tv', label: 'TV Shows' }
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} aria-label="Movly home">
          MOVLY
        </Link>

        <nav aria-label="Footer">
          <ul className={styles.nav}>
            {navItems.map(item => (
              <li key={item.id}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className={styles.copy}>&copy; {new Date().getFullYear()} MOVLY · All rights reserved.</p>
        <p className={styles.attribution}>
          Powered by{' '}
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            TMDB
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

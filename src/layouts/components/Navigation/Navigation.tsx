import { nav } from '../../nav';

import { Link } from '@tanstack/react-router';

import classes from './Navigation.module.scss';

const Navigation = () => {
  return (
    <nav className={classes.nav} aria-label="Primary navigation">
      <ul>
        {nav.map(item => (
          <li key={item.id} className={classes.list}>
            <Link to={item.to} activeProps={{ className: classes.active }} className={classes.link}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;

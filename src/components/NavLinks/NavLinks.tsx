import { nav_items } from './nav';

import { Link } from 'react-router-dom';

import classes from './NavLinks.module.css';

const NavLinks = () => {
  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        {nav_items.map(item => (
          <li key={item.id} className={classes.list_item}>
            <Link to={item.to} className={classes.link}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;

import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { Menu, X } from 'lucide-react';

import { nav } from '../../nav';
import { Link } from '@tanstack/react-router';

import classes from './Navigation.module.scss';

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
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

      <Button
        type="text"
        className={classes.hamburger}
        icon={<Menu size={22} />}
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      />

      <Drawer
        title="Menu"
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        className={classes.drawer}
        closeIcon={<X size={20} />}
        width={280}
      >
        <nav aria-label="Mobile navigation">
          <ul className={classes.mobileNav}>
            {nav.map(item => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className={classes.mobileLink}
                  activeProps={{ className: classes.mobileActive }}
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
    </>
  );
};

export default Navigation;

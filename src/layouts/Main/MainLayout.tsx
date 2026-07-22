import { Logo } from '@/components/Logo';
import { Outlet } from 'react-router-dom';
import { Footer } from '@/components/Footer';
import { NavLinks } from '@/components/NavLinks';

import classes from './MainLayout.module.scss';

const MainLayout = () => {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.header_inner}>
          <Logo />
          <div className={classes.header_right}>
            <NavLinks />
          </div>
        </div>
      </header>
      <main className={classes.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;

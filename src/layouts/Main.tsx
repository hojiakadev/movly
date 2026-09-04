import { Layout } from 'antd';
import { Logo } from './components/Logo';
import { Footer } from './components/Footer';
import { Navigation } from './components/Navigation';

import classes from './Main.module.scss';

const { Header, Content } = Layout;

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout className={classes.layout}>
      <Header className={classes.header}>
        <Logo />
        <Navigation />
      </Header>
      <Content className={classes.content}>{children}</Content>
      <Footer />
    </Layout>
  );
};

export default Main;

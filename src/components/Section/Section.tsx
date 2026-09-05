import classes from './Section.module.scss';

type IProps = {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

const Section = ({ title, action, children }: IProps) => {
  return (
    <section className={classes.section}>
      <div className={classes.header}>
        <h2 className={classes.title}>{title}</h2>
        {action && action}
      </div>

      {children}
    </section>
  );
};

export default Section;

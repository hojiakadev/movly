import cx from 'clsx';

import classes from './Grid.module.scss';

type IProps = {
  variant?: 'poster' | 'wide';
  className?: string;
  children: React.ReactNode;
};

/** Responsive card grid shared by every list/section screen. */
const Grid = ({ variant = 'poster', className, children }: IProps) => (
  <div className={cx(classes.grid, classes[variant], className)}>{children}</div>
);

export default Grid;

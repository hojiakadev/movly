import { useThemeMode } from '@/common/providers';

import classes from './Mode.module.scss';

const Mode = () => {
  const { mode, toggleMode } = useThemeMode();
  return (
    <label className={classes.switch}>
      <input type="checkbox" checked={mode === 'dark'} onChange={toggleMode} />
      <span className={classes.slider}></span>
    </label>
  );
};

export default Mode;

import { Alert, Empty, Spin } from 'antd';

import { getApiError } from '@/common/utils';

import classes from './State.module.scss';

type IProps = {
  isLoading?: boolean;
  error?: unknown;
  isEmpty?: boolean;
  emptyText?: string;
  onRetry?: () => void;
  children: React.ReactNode;
};

/**
 * Centralizes the loading / error / empty branches every TMDB-backed screen
 * needs, so pages stay focused on composition and never crash on missing data.
 */
const State = ({ isLoading, error, isEmpty, emptyText = 'Nothing found', onRetry, children }: IProps) => {
  if (error) {
    return (
      <div className={classes.state}>
        <Alert
          showIcon
          type="error"
          className={classes.alert}
          message="Could not load this content"
          description={getApiError(error).message}
          action={
            onRetry && (
              <a role="button" onClick={onRetry}>
                Retry
              </a>
            )
          }
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={classes.state}>
        <Spin size="large" />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={classes.state}>
        <Empty description={emptyText} />
      </div>
    );
  }

  return children;
};

export default State;

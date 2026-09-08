import { Hooks } from '@/modules/people';

import { imageUrl } from '@/common/utils';

import { State } from '@/components/State';

import classes from './PersonDetails.module.scss';

type IProps = {
  id: number;
};

const PersonDetails = ({ id }: IProps) => {
  const { data, isLoading, error, refetch } = Hooks.useSingle(id);

  return (
    <State error={error} onRetry={refetch} isLoading={isLoading} isEmpty={!data} emptyText="Person not found">
      {data && (
        <div className={classes.person}>
          {data.profilePath && (
            <img className={classes.photo} src={imageUrl(data.profilePath, 'h632')} alt={data.name} />
          )}

          <div className={classes.info}>
            <h1 className={classes.name}>{data.name}</h1>
            {data.knownForDepartment && <p className={classes.meta}>{data.knownForDepartment}</p>}
            {data.biography && <p className={classes.bio}>{data.biography}</p>}
          </div>
        </div>
      )}
    </State>
  );
};

export default PersonDetails;

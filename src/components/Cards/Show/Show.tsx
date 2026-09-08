import { Link } from '@tanstack/react-router';

import { formatDate } from '@/common/utils';
import { PosterCard } from '@/components/Cards/Poster';

import classes from './Show.module.scss';

type IProps = {
  id: number;
  name: string;
  posterPath?: string;
  firstAirDate?: string;
  voteAverage?: number;
};

const ShowCard = ({ id, name, posterPath, firstAirDate, voteAverage }: IProps) => (
  <Link to="/tv/$tvId" params={{ tvId: String(id) }} className={classes.link}>
    <PosterCard title={name} subtitle={formatDate(firstAirDate ?? '')} imagePath={posterPath} rating={voteAverage} />
  </Link>
);

export default ShowCard;

import { Link } from '@tanstack/react-router';

import { formatDate } from '@/common/utils';
import { PosterCard } from '@/components/Cards/Poster';

import classes from './Movie.module.scss';

type IProps = {
  id: number;
  title: string;
  posterPath?: string;
  releaseDate?: string;
  voteAverage?: number;
};

const MovieCard = ({ id, title, posterPath, releaseDate, voteAverage }: IProps) => (
  <Link to="/movies/$id" params={{ id: String(id) }} className={classes.link}>
    <PosterCard title={title} subtitle={formatDate(releaseDate ?? '')} imagePath={posterPath} rating={voteAverage} />
  </Link>
);

export default MovieCard;

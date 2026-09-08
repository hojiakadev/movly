import { Link } from '@tanstack/react-router';

import { PosterCard } from '@/components/Cards/Poster';

import classes from './Person.module.scss';

type IProps = {
  id: number;
  name: string;
  profilePath?: string;
  /** Character name, job, or "known for" department depending on the context. */
  subtitle?: string;
};

const PersonCard = ({ id, name, profilePath, subtitle }: IProps) => (
  <Link to="/people/$id" params={{ id: String(id) }} className={classes.link}>
    <PosterCard title={name} subtitle={subtitle} imagePath={profilePath} />
  </Link>
);

export default PersonCard;

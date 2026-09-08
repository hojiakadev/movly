import { useCallback } from 'react';
import { Input, Pagination, Segmented } from 'antd';
import { useNavigate, useSearch } from '@tanstack/react-router';

import config from '@/config';
import { Hooks as MoviesHooks, type Types as MoviesTypes } from '@/modules/movies';
import { Hooks as TvHooks, type Types as TvTypes } from '@/modules/tv';
import { Hooks as PeopleHooks, type Types as PeopleTypes } from '@/modules/people';

import { Grid } from '@/components/Grid';
import { State } from '@/components/State';
import { Section } from '@/components/Section';
import { MovieCard } from '@/components/Cards/Movie';
import { ShowCard } from '@/components/Cards/Show';
import { PersonCard } from '@/components/Cards/Person';

import classes from './Search.module.scss';

type SearchType = 'movie' | 'tv' | 'person';

const TYPES: { label: string; value: SearchType }[] = [
  { label: 'Movies', value: 'movie' },
  { label: 'TV', value: 'tv' },
  { label: 'People', value: 'person' }
];

const Search = () => {
  const navigate = useNavigate({ from: '/search' });
  const search = useSearch({ from: '/search' });

  const { query = '', type = 'movie', page = 1 } = search;
  const q = query.trim();

  const set = useCallback(
    (partial: Partial<typeof search>) => navigate({ search: prev => ({ ...prev, ...partial }) }),
    [navigate]
  );

  const params = { query: q, page, includeAdult: false };

  const movieSearch = MoviesHooks.useSearch({ params, enabled: type === 'movie' && Boolean(q) });
  const tvSearch = TvHooks.useSearch({ params, enabled: type === 'tv' && Boolean(q) });
  const peopleSearch = PeopleHooks.useSearch({ params, enabled: type === 'person' && Boolean(q) });

  const active = { movie: movieSearch, tv: tvSearch, person: peopleSearch }[type];

  return (
    <Section
      title="Search"
      action={
        <Input.Search
          allowClear
          defaultValue={q}
          className={classes.search}
          placeholder={`Search ${TYPES.find(t => t.value === type)?.label.toLowerCase()}`}
          onSearch={value => set({ query: value, page: 1 })}
        />
      }
    >
      <div className={classes.tabs}>
        <Segmented value={type} options={TYPES} onChange={value => set({ type: value as SearchType, page: 1 })} />
      </div>

      <State
        error={active.error}
        onRetry={active.refetch}
        isLoading={active.isLoading}
        isEmpty={!q || !active.data.length}
        emptyText={
          q ? `No ${TYPES.find(t => t.value === type)?.label.toLowerCase()} match “${q}”` : 'Enter a search term'
        }
      >
        <Grid>
          {type === 'movie' &&
            movieSearch.data.map((movie: MoviesTypes.IEntity.Movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.posterPath}
                releaseDate={movie.releaseDate}
                voteAverage={movie.voteAverage}
              />
            ))}

          {type === 'tv' &&
            tvSearch.data.map((show: TvTypes.IEntity.Show) => (
              <ShowCard
                key={show.id}
                id={show.id}
                name={show.name}
                posterPath={show.posterPath}
                firstAirDate={show.firstAirDate}
                voteAverage={show.voteAverage}
              />
            ))}

          {type === 'person' &&
            peopleSearch.data.map((person: PeopleTypes.IEntity.Person) => (
              <PersonCard
                key={person.id}
                id={person.id}
                name={person.name}
                profilePath={person.profilePath}
                subtitle={person.knownForDepartment}
              />
            ))}
        </Grid>
      </State>

      {active.meta.totalPages > 1 && (
        <Pagination
          align="center"
          hideOnSinglePage
          showSizeChanger={false}
          className={classes.pagination}
          current={page}
          pageSize={config.list.perPage}
          total={active.meta.totalPages * config.list.perPage}
          onChange={p => set({ page: p })}
        />
      )}
    </Section>
  );
};

export default Search;

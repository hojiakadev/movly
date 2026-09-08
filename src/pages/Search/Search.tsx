import { useEffect, useMemo, useState } from 'react';
import { AutoComplete, Empty, Input, Pagination, Segmented } from 'antd';
import { Clapperboard, Film, Search as SearchIcon, Tv, User } from 'lucide-react';
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

const TYPE_ICONS: Record<SearchType, typeof Film> = {
  movie: Clapperboard,
  tv: Tv,
  person: User
};

const TYPE_ROUTES: Record<SearchType, string> = {
  movie: '/movies/$id',
  tv: '/tv/$tvId',
  person: '/people/$id'
};

const TYPE_PARAMS_KEY: Record<SearchType, string> = {
  movie: 'id',
  tv: 'tvId',
  person: 'id'
};

const Search = () => {
  const navigate = useNavigate();
  const setSearch = useNavigate({ from: '/search' });
  const search = useSearch({ from: '/search' });

  const { query = '', type = 'movie', page = 1 } = search;

  const [input, setInput] = useState(query);
  const [debouncedInput, setDebouncedInput] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedInput(input.trim()), 220);
    return () => clearTimeout(timer);
  }, [input]);

  const hasSuggestions = debouncedInput.length > 2;

  const movieSuggestions = MoviesHooks.useSearch({
    params: { query: debouncedInput, page: 1, includeAdult: false },
    enabled: hasSuggestions
  });
  const tvSuggestions = TvHooks.useSearch({
    params: { query: debouncedInput, page: 1, includeAdult: false },
    enabled: hasSuggestions
  });
  const peopleSuggestions = PeopleHooks.useSearch({
    params: { query: debouncedInput, page: 1, includeAdult: false },
    enabled: hasSuggestions
  });

  const suggestionsLoading = movieSuggestions.isLoading || tvSuggestions.isLoading || peopleSuggestions.isLoading;

  const options = useMemo(() => {
    if (!hasSuggestions) return [];

    const buildOptions = <
      T extends {
        id: number;
        title?: string;
        name?: string;
        posterPath?: string;
        profilePath?: string;
        voteAverage?: number;
      }
    >(
      type: SearchType,
      data: T[]
    ) =>
      data.slice(0, 3).map(item => {
        const Icon = TYPE_ICONS[type];
        const title = 'title' in item && item.title ? item.title : item.name;

        return {
          value: `${type}:${item.id}`,
          label: (
            <span className={classes.suggestion}>
              <Icon size={16} />
              <span className={classes.suggestionText}>{title}</span>
              {type !== 'person' && item.voteAverage ? (
                <span className={classes.suggestionMeta}>{item.voteAverage.toFixed(1)}</span>
              ) : null}
            </span>
          )
        };
      });

    return [
      ...buildOptions<MoviesTypes.IEntity.Movie>('movie', movieSuggestions.data),
      ...buildOptions<TvTypes.IEntity.Show>('tv', tvSuggestions.data),
      ...buildOptions<PeopleTypes.IEntity.Person>('person', peopleSuggestions.data)
    ];
  }, [hasSuggestions, movieSuggestions.data, tvSuggestions.data, peopleSuggestions.data]);

  const params = { query, page, includeAdult: false };

  const movieSearch = MoviesHooks.useSearch({ params, enabled: type === 'movie' && Boolean(query) });
  const tvSearch = TvHooks.useSearch({ params, enabled: type === 'tv' && Boolean(query) });
  const peopleSearch = PeopleHooks.useSearch({
    params,
    enabled: type === 'person' && Boolean(query)
  });

  const active = { movie: movieSearch, tv: tvSearch, person: peopleSearch }[type];

  const set = (partial: Partial<typeof search>) => setSearch({ search: prev => ({ ...prev, ...partial }) });

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    set({ query: trimmed || undefined, page: 1 });
  };

  const handleSelect = (value: string) => {
    const [resultType, rawId] = value.split(':');
    if (!resultType || !rawId) return;

    const route = TYPE_ROUTES[resultType as SearchType];
    const paramKey = TYPE_PARAMS_KEY[resultType as SearchType];
    if (!route || !paramKey) return;

    navigate({ to: route, params: { [paramKey]: rawId } as unknown as Record<string, string> });
  };

  const handleTypeChange = (next: SearchType) => {
    set({ type: next, page: 1 });
  };

  return (
    <>
      <div className={classes.hero}>
        <h1 className={classes.heading}>Search MOVLY</h1>
        <p className={classes.subheading}>Find movies, TV shows, and people from the TMDB database.</p>

        <AutoComplete
          value={input}
          options={options}
          filterOption={false}
          className={classes.search}
          onChange={setInput}
          onSelect={handleSelect}
          onSearch={handleSearch}
          notFoundContent={hasSuggestions && !suggestionsLoading && !options.length ? 'No suggestions' : undefined}
        >
          <Input.Search
            size="large"
            allowClear
            loading={suggestionsLoading}
            placeholder="Search for a movie, TV show, or person..."
            prefix={<SearchIcon size={18} />}
            enterButton
            onSearch={handleSearch}
          />
        </AutoComplete>
      </div>

      {query ? (
        <Section title="Results">
          <div className={classes.tabs}>
            <Segmented value={type} options={TYPES} onChange={value => handleTypeChange(value as SearchType)} />
          </div>

          <State
            error={active.error}
            onRetry={active.refetch}
            isLoading={active.isLoading}
            isEmpty={!active.data.length}
            emptyText={`No ${TYPES.find(t => t.value === type)?.label.toLowerCase()} match “${query}”`}
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
      ) : (
        <div className={classes.empty}>
          <Empty
            image={<SearchIcon size={80} strokeWidth={1} />}
            imageStyle={{ color: 'var(--color-text-secondary)', height: 120 }}
            description={
              <span className={classes.emptyText}>Start typing to discover movies, TV shows, and people.</span>
            }
          />
        </div>
      )}
    </>
  );
};

export default Search;

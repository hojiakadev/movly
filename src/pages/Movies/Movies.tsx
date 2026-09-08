import { useState } from 'react';
import { Button, Input, Pagination } from 'antd';
import { SlidersHorizontal } from 'lucide-react';
import { useNavigate, useSearch } from '@tanstack/react-router';

import config from '@/config';
import { Hooks, Mappers, type Types } from '@/modules/movies';

import { Grid } from '@/components/Grid';
import { State } from '@/components/State';
import { Section } from '@/components/Section';
import { Filter } from './components/Filter';
import { MovieCard } from '@/components/Cards/Movie';

import classes from './Movies.module.scss';

const Movies = () => {
  const navigate = useNavigate({ from: '/movies/' });
  const search = useSearch({ from: '/movies/' });

  const [isFilterOpen, setFilterOpen] = useState(false);

  const query = search.query?.trim() ?? '';

  // `/search/movie` is text oriented, `/discover/movie` is filter oriented —
  // only one of them runs at a time.
  const discover = Hooks.useDiscover({
    params: Mappers.FilterToDiscoverParams(search),
    enabled: !query
  });

  const searchResults = Hooks.useSearch({
    params: { query, page: search.page, includeAdult: search.includeAdult },
    enabled: Boolean(query)
  });

  const { data, meta, isLoading, error, refetch } = query ? searchResults : discover;

  const apply = (values: Partial<Types.IForm.Filter>) => navigate({ search: previous => ({ ...previous, ...values }) });

  return (
    <Section
      title={query ? `Results for “${query}”` : 'Discover movies'}
      action={
        <div className={classes.toolbar}>
          <Input.Search
            allowClear
            defaultValue={query}
            className={classes.search}
            placeholder="Search movies"
            onSearch={value => apply({ query: value || undefined, page: 1 })}
          />

          <Button
            size="large"
            type="primary"
            icon={<SlidersHorizontal size={16} />}
            onClick={() => setFilterOpen(true)}
          >
            Filter
          </Button>
        </div>
      }
    >
      <State
        error={error}
        onRetry={refetch}
        isLoading={isLoading}
        isEmpty={!data.length}
        emptyText={query ? 'No movies match that search' : 'No movies match these filters'}
      >
        <Grid>
          {data.map(movie => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.posterPath}
              releaseDate={movie.releaseDate}
              voteAverage={movie.voteAverage}
            />
          ))}
        </Grid>
      </State>

      {meta.totalPages > 1 && (
        <Pagination
          align="center"
          hideOnSinglePage
          showSizeChanger={false}
          className={classes.pagination}
          current={search.page}
          pageSize={config.list.perPage}
          total={meta.totalPages * config.list.perPage}
          onChange={page => apply({ page })}
        />
      )}

      <Filter value={search} open={isFilterOpen} onApply={apply} onClose={() => setFilterOpen(false)} />
    </Section>
  );
};

export default Movies;

import { useState } from 'react';
import { Button, Pagination } from 'antd';
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

  const { data, meta, isLoading, error, refetch } = Hooks.useDiscover({
    params: Mappers.FilterToDiscoverParams(search)
  });

  const apply = (values: Partial<Types.IForm.Filter>) => navigate({ search: previous => ({ ...previous, ...values }) });

  return (
    <Section
      title="Discover movies"
      action={
        <Button size="large" type="primary" icon={<SlidersHorizontal size={16} />} onClick={() => setFilterOpen(true)}>
          Filter
        </Button>
      }
    >
      <State
        error={error}
        onRetry={refetch}
        isLoading={isLoading}
        isEmpty={!data.length}
        emptyText="No movies match these filters"
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

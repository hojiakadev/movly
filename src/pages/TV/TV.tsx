import { useState } from 'react';
import { Button, Input, Pagination } from 'antd';
import { SlidersHorizontal } from 'lucide-react';
import { useNavigate, useSearch } from '@tanstack/react-router';

import config from '@/config';
import { Hooks, Mappers, type Types } from '@/modules/tv';

import { Grid } from '@/components/Grid';
import { State } from '@/components/State';
import { Section } from '@/components/Section';
import { ShowCard } from '@/components/Cards/Show';
import { Filter } from './components/Filter';

import classes from './TV.module.scss';

const TV = () => {
  const navigate = useNavigate({ from: '/tv/' });
  const search = useSearch({ from: '/tv/' });

  const [isFilterOpen, setFilterOpen] = useState(false);

  const query = search.query?.trim() ?? '';

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
      title={query ? `Results for “${query}”` : 'Discover TV shows'}
      action={
        <div className={classes.toolbar}>
          <Input.Search
            allowClear
            defaultValue={query}
            className={classes.search}
            placeholder="Search TV shows"
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
        emptyText={query ? 'No shows match that search' : 'No shows match these filters'}
      >
        <Grid>
          {data.map((show: Types.IEntity.Show) => (
            <ShowCard
              key={show.id}
              id={show.id}
              name={show.name}
              posterPath={show.posterPath}
              firstAirDate={show.firstAirDate}
              voteAverage={show.voteAverage}
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

export default TV;

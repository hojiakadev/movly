import { useState } from 'react';
import { Button, Pagination } from 'antd';
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

  const { data, meta, isLoading, error, refetch } = Hooks.useDiscover({
    params: Mappers.FilterToDiscoverParams(search)
  });

  const apply = (values: Partial<Types.IForm.Filter>) => navigate({ search: previous => ({ ...previous, ...values }) });

  return (
    <Section
      title="Discover TV shows"
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
        emptyText="No shows match these filters"
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

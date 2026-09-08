import { Controller, useForm } from 'react-hook-form';
import { Button, Drawer, InputNumber, Select, Slider, Switch } from 'antd';

import * as TmdbModule from '@/common/modules/tmdb';
import { Constants, Hooks, type Types } from '@/modules/tv';

import classes from './Filter.module.scss';

type IProps = {
  open: boolean;
  value: Types.IForm.Filter;
  onClose: () => void;
  onApply: (values: Types.IForm.Filter) => void;
};

const defaults: Types.IForm.Filter = {
  page: 1,
  genres: [],
  sortBy: Constants.DEFAULT_SORT_BY,
  includeAdult: false
};

const currentYear = new Date().getFullYear();

const years = Array.from({ length: currentYear - 1920 + 1 }, (_, index) => currentYear - index);

const Filter = ({ open, value, onClose, onApply }: IProps) => {
  const { data: genres, isLoading: isGenresLoading } = Hooks.useGenres();

  const form = useForm<Types.IForm.Filter>({ values: value, defaultValues: defaults });

  const submit = form.handleSubmit(values => {
    onApply({ ...values, page: 1 });
    onClose();
  });

  const reset = () => {
    form.reset(defaults);
    onApply({ ...defaults, query: value.query });
    onClose();
  };

  return (
    <Drawer
      open={open}
      width={380}
      title="Filter TV shows"
      onClose={onClose}
      footer={
        <div className={classes.actions}>
          <Button type="primary" block onClick={submit}>
            Apply
          </Button>
          <Button block onClick={reset}>
            Reset
          </Button>
        </div>
      }
    >
      <form className={classes.form} onSubmit={submit}>
        <div className={classes.field}>
          <span className={classes.label}>Sort by</span>
          <Controller
            name="sortBy"
            control={form.control}
            render={({ field }) => <Select {...field} options={Constants.SORT_OPTIONS} />}
          />
        </div>

        <div className={classes.field}>
          <span className={classes.label}>Genres</span>
          <Controller
            name="genres"
            control={form.control}
            render={({ field }) => (
              <Select
                {...field}
                mode="multiple"
                allowClear
                loading={isGenresLoading}
                placeholder="Any genre"
                optionFilterProp="label"
                options={genres.map((genre: TmdbModule.Types.IEntity.Genre) => ({
                  value: genre.id,
                  label: genre.name
                }))}
              />
            )}
          />
        </div>

        <div className={classes.field}>
          <span className={classes.label}>First air year</span>
          <Controller
            name="year"
            control={form.control}
            render={({ field }) => (
              <Select
                {...field}
                allowClear
                showSearch
                placeholder="Any year"
                options={years.map(year => ({ value: year, label: String(year) }))}
              />
            )}
          />
        </div>

        <div className={classes.field}>
          <span className={classes.label}>Minimum rating</span>
          <Controller
            name="voteAverageGte"
            control={form.control}
            render={({ field }) => (
              <Slider
                {...field}
                min={0}
                max={10}
                step={0.5}
                value={field.value ?? 0}
                tooltip={{ open: false }}
                marks={{ 0: '0', 5: '5', 10: '10' }}
              />
            )}
          />
        </div>

        <div className={classes.field}>
          <span className={classes.label}>Minimum vote count</span>
          <Controller
            name="voteCountGte"
            control={form.control}
            render={({ field }) => (
              <InputNumber {...field} min={0} step={50} placeholder="Any" style={{ width: '100%' }} />
            )}
          />
        </div>

        <div className={classes.inline}>
          <span className={classes.label}>Include adult titles</span>
          <Controller
            name="includeAdult"
            control={form.control}
            render={({ field }) => <Switch checked={field.value} onChange={field.onChange} />}
          />
        </div>
      </form>
    </Drawer>
  );
};

export default Filter;

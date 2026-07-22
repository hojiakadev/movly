import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { get } from 'radash';

export interface IMethods {
  pushQuery: (params: any) => void;
}

export type TReturn = [query: any, methods: IMethods];

const useQueryParams = (): TReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = useMemo(() => {
    return [...searchParams.entries()].reduce(
      (accum, current) => ({ ...accum, [get(current, '0') as string]: get(current, '1') }),
      {}
    );
  }, [searchParams]);

  const pushQuery = (params: any) => {
    const newQuery = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      // Empty string skip
      if (typeof value === 'string' && value.trim() === '') return;

      // TMDB array format: key[]=value
      if (Array.isArray(value)) {
        if (value.length === 0) return;
        value.forEach(v => {
          if (v !== null && v !== undefined && String(v).trim() !== '') {
            newQuery.append(`${key}[]`, String(v));
          }
        });
        return;
      }

      // Primitive values
      newQuery.set(key, String(value));
    });

    setSearchParams(newQuery);
  };

  return [query, { pushQuery }];
};

export default useQueryParams;

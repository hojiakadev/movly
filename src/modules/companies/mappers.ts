import { get } from 'radash';

import type * as Types from './types';

import * as TmdbModule from '@/common/modules/tmdb';

export const CompanyDetails = (src: any): Types.IEntity.CompanyDetails => ({
  ...TmdbModule.Mappers.Company(src),
  description: get(src, 'description', ''),
  headquarters: get(src, 'headquarters', ''),
  homepage: get(src, 'homepage', ''),
  parentCompany: get(src, 'parent_company') ? TmdbModule.Mappers.Company(get(src, 'parent_company')) : null
});

export const AlternativeName = (src: any): Types.IEntity.AlternativeName => ({
  name: get(src, 'name', ''),
  type: get(src, 'type', '')
});

export const AlternativeNames = (src: any): Types.IQuery.AlternativeNames => ({
  results: (get(src, 'results', []) as any[]).map(AlternativeName)
});

import type { AxiosPromise } from 'axios';

import { http } from '@/common/services';

import * as Mappers from './mappers';
import type * as Types from './types';

import type * as ListModule from '@/common/modules/list';

interface IParams {
  params?: ListModule.Types.IEntity.Params;
}

interface IProviders {
  params?: Types.IEntity.WatchProvidersParams;
}

/** `/configuration` */
export const Configuration = (): AxiosPromise<Types.IApi.Configuration.Response> => http.request.get('3/configuration');

/** `/configuration/countries` */
export const Countries = ({ params }: IParams = {}) =>
  http.request.get('3/configuration/countries', { params: { language: params?.language || 'en-US' } });

/** `/configuration/languages` */
export const Languages = () => http.request.get('3/configuration/languages');

/** `/configuration/jobs` */
export const Jobs = () => http.request.get('3/configuration/jobs');

/** `/configuration/primary_translations` */
export const PrimaryTranslations = (): AxiosPromise<string[]> =>
  http.request.get('3/configuration/primary_translations');

/** `/configuration/timezones` */
export const Timezones = () => http.request.get('3/configuration/timezones');

/** `/watch/providers/movie` */
export const MovieProviders = ({ params }: IProviders = {}) =>
  http.request.get('3/watch/providers/movie', { params: Mappers.WatchProvidersRequest(params) });

/** `/watch/providers/tv` */
export const TvProviders = ({ params }: IProviders = {}) =>
  http.request.get('3/watch/providers/tv', { params: Mappers.WatchProvidersRequest(params) });

/** `/watch/providers/regions` */
export const ProviderRegions = ({ params }: IParams = {}) =>
  http.request.get('3/watch/providers/regions', { params: { language: params?.language || 'en-US' } });
